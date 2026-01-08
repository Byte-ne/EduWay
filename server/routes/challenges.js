const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Challenge = require('../models/Challenge')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

function getUserIdFromHeader(req) {
    const auth = req.headers.authorization
    if (!auth) return null
    const parts = auth.split(' ')
    if (parts.length !== 2) return null
    try { return jwt.verify(parts[1], JWT_SECRET).id } catch (e) { return null }
}

const GROQ_KEY = process.env.GROQ_API_KEY

async function generateQuestions(exam, count = 5) {
    // Best-effort: call GROQ text generation if key present; fallback to simple templates
    if (GROQ_KEY) {
        try {
            const prompt = `Generate ${count} multiple-choice questions (4 options each) for exam: ${exam}. Provide JSON array of objects with question, options and answerIndex (0-3).`
            const res = await fetch('https://api.groq.ai/v1/complete', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, max_tokens: 800 })
            })
            if (res.ok) {
                const j = await res.json()
                // Attempt to parse JSON from response text
                const txt = j.output || JSON.stringify(j)
                try {
                    const parsed = JSON.parse(Array.isArray(txt) ? txt.join('') : txt)
                    return parsed
                } catch (e) {
                    // best-effort: try to extract JSON substring
                    const m = (Array.isArray(txt) ? txt.join('') : txt).match(/\[\{[\s\S]*\}\]/)
                    if (m) try { return JSON.parse(m[0]) } catch (e2) { }
                }
            }
        } catch (e) {
            console.warn('Groq question generation failed', e.message || e)
        }
    }
    // Fallback simple generated questions
    const template = []
    for (let i = 1; i <= count; i++) {
        template.push({
            question: `${exam} sample question ${i}: What is ${i}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            answerIndex: 0
        })
    }
    return template
}

// Create a challenge request
router.post('/request', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { toUserId, exam } = req.body
        if (!toUserId || !exam) return res.status(400).json({ message: 'Missing toUserId or exam' })
        const c = new Challenge({ challenger: userId, recipient: toUserId, exam, status: 'pending' })
        await c.save()
        // push notification to recipient
        const other = await User.findById(toUserId)
        const me = await User.findById(userId).select('name')
        if (other) {
            other.notifications = other.notifications || []
            other.notifications.push({ type: 'challenge_request', text: `${me.name || 'Someone'} challenged you for ${exam}`, from: userId, createdAt: new Date(), meta: { challengeId: c._id.toString(), exam } })
            await other.save()
        }
        try { req.app.get('io')?.emit('notification:received', { to: toUserId }) } catch (e) { }
        res.json({ message: 'Challenge request sent', challengeId: c._id })
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Respond to a challenge (accept/reject)
router.post('/:id/respond', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { accept } = req.body
        const c = await Challenge.findById(req.params.id).populate('challenger', 'name').populate('recipient', 'name')
        if (!c) return res.status(404).json({ message: 'Not found' })
        if (c.recipient._id.toString() !== userId) return res.status(403).json({ message: 'Not allowed' })
        if (!accept) {
            c.status = 'rejected'
            await c.save()
            // notify challenger
            const challenger = await User.findById(c.challenger._id)
            challenger.notifications = challenger.notifications || []
            challenger.notifications.push({ type: 'challenge_rejected', text: `${c.recipient.name || 'User'} declined your challenge`, from: c.recipient._id })
            await challenger.save()
            try { req.app.get('io')?.emit('notification:received', { to: c.challenger._id.toString() }) } catch (e) { }
            return res.json({ message: 'Challenge rejected' })
        }
        // accept -> generate questions and mark active
        const questions = await generateQuestions(c.exam, 5)
        c.questions = Array.isArray(questions) ? questions : []
        c.status = 'active'
        await c.save()
        // notify challenger and emit start event with questions
        try { req.app.get('io')?.emit('challenge:start', { challengeId: c._id.toString(), challenger: c.challenger._id.toString(), recipient: c.recipient._id.toString(), questions: c.questions, exam: c.exam }) } catch (e) { }
        return res.json({ message: 'Challenge accepted', questions: c.questions })
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Submit answers for a challenge
router.post('/:id/submit', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { answers } = req.body // expected [{ qIndex, choice }]
        const c = await Challenge.findById(req.params.id)
        if (!c) return res.status(404).json({ message: 'Not found' })
        if (!['active'].includes(c.status)) return res.status(400).json({ message: 'Challenge not active' })
        const score = (answers || []).reduce((acc, a) => {
            const q = c.questions[a.qIndex]
            if (!q) return acc
            return acc + (q.answerIndex === a.choice ? 1 : 0)
        }, 0)
        c.results = c.results || []
        c.results.push({ user: userId, answers: answers || [], score })
        // if both participants submitted, mark finished
        const participants = [c.challenger.toString(), c.recipient.toString()]
        if (c.results && c.results.filter(r => participants.includes(r.user.toString())).length >= 2) c.status = 'finished'
        await c.save()
        return res.json({ message: 'Submitted', score })
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Get challenge
router.get('/:id', async (req, res) => {
    try {
        const c = await Challenge.findById(req.params.id).populate('challenger', 'name').populate('recipient', 'name')
        if (!c) return res.status(404).json({ message: 'Not found' })
        res.json(c)
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
