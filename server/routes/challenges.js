const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

function getUserIdFromHeader(req) {
    const auth = req.headers.authorization
    if (!auth) return null
    const parts = auth.split(' ')
    if (parts.length !== 2) return null
    const token = parts[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded.id
    } catch (e) {
        return null
    }
}

// simple in-memory storage for active challenges (not persisted)
const challenges = {}

function generateQuestionsForExam(exam) {
    // Minimal mock questions for demo purposes
    const bank = {
        JEE: [
            { question: 'What is derivative of x^2?', options: ['2x', 'x', 'x^2', '1'], answerIndex: 0 },
            { question: 'If sin^2 + cos^2 = ?', options: ['1', '0', 'sin', 'cos'], answerIndex: 0 }
        ],
        NEET: [
            { question: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi'], answerIndex: 0 },
            { question: 'Blood group with both A and B antigens is?', options: ['AB', 'A', 'B', 'O'], answerIndex: 0 }
        ],
        UPSC: [
            { question: 'Who is the current PM of India (as of 2025)?', options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'], answerIndex: 0 }
        ]
    }
    return (bank[exam] || bank.JEE).map(q => ({ question: q.question, options: q.options, answerIndex: q.answerIndex }))
}

// Send a challenge request: { toUserId, exam }
router.post('/request', async (req, res) => {
    try {
        const fromId = getUserIdFromHeader(req)
        if (!fromId) return res.status(401).json({ message: 'Invalid token' })
        const { toUserId, exam } = req.body
        if (!toUserId || !exam) return res.status(400).json({ message: 'Missing fields' })

        const toUser = await User.findById(toUserId)
        if (!toUser) return res.status(404).json({ message: 'Recipient not found' })

        const id = new mongoose.Types.ObjectId().toString()
        const questions = generateQuestionsForExam(exam)

        challenges[id] = {
            _id: id,
            challenger: fromId,
            recipient: toUserId,
            exam,
            questions
        }

        // emit socket event so both users (challenger & recipient) can start
        try {
            const io = req.app.get('io')
            if (io) {
                io.emit('challenge:start', { challengeId: id, challenger: fromId, recipient: toUserId, questions, exam })
            }
        } catch (e) { console.warn('Socket emit failed for challenge:start', e) }

        res.json({ message: 'Challenge sent', challengeId: id })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Server error' })
    }
})

// Submit answers for a challenge: /:id/submit { answers: [{ qIndex, choice }] }
router.post('/:id/submit', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Invalid token' })
        const { id } = req.params
        const { answers } = req.body
        const ch = challenges[id]
        if (!ch) return res.status(404).json({ message: 'Challenge not found' })

        // basic validation: ensure participant
        if (ch.challenger !== userId && ch.recipient !== userId) return res.status(403).json({ message: 'Not a participant' })

        const total = (ch.questions || []).length
        let score = 0
        (answers || []).forEach(a => {
            const q = ch.questions[a.qIndex]
            if (q && q.answerIndex === a.choice) score += 1
        })

        // optional: remove challenge after submission
        delete challenges[id]

        res.json({ message: 'Submitted', score, total })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
