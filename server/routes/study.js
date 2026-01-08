const express = require('express')
const Groq = require('groq-sdk')
const router = express.Router()

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

// Middleware to verify token (assuming you have it)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Access token required' })
    }

    try {
        const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' })
    }
}

// Ask AI endpoint
router.post('/ask-ai', authenticateToken, async (req, res) => {
    try {
        const { query } = req.body

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ message: 'Query is required and must be a string' })
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI study assistant helping students with exam preparation. Provide clear, accurate, and helpful explanations. Keep responses concise but comprehensive.'
                },
                {
                    role: 'user',
                    content: query
                }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
            max_tokens: 1024
        })

        const response = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

        res.json({ response })
    } catch (error) {
        console.error('Groq API error:', error)
        res.status(500).json({ message: 'Failed to get AI response' })
    }
})

// Generate questions endpoint
router.post('/generate-questions', authenticateToken, async (req, res) => {
    try {
        const { type } = req.body

        if (!type || !['jee', 'neet', 'upsc'].includes(type)) {
            return res.status(400).json({ message: 'Valid type (jee, neet, upsc) is required' })
        }

        const examPrompts = {
            jee: 'Generate 5 multiple choice questions for JEE (Joint Entrance Examination) Physics/Chemistry/Mathematics. Each question should have 4 options (a, b, c, d) and include the correct answer. Format as JSON array with objects having question, options (array), and answer (string).',
            neet: 'Generate 5 multiple choice questions for NEET (National Eligibility cum Entrance Test) Biology/Physics/Chemistry. Each question should have 4 options (a, b, c, d) and include the correct answer. Format as JSON array with objects having question, options (array), and answer (string).',
            upsc: 'Generate 5 multiple choice questions for UPSC (Union Public Service Commission) General Studies/History/Polity/Geography. Each question should have 4 options (a, b, c, d) and include the correct answer. Format as JSON array with objects having question, options (array), and answer (string).'
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a question generator for competitive exams. Generate high-quality, educational questions with accurate answers.'
                },
                {
                    role: 'user',
                    content: examPrompts[type]
                }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.8,
            max_tokens: 2048
        })

        const responseText = chatCompletion.choices[0]?.message?.content || '[]'

        // Try to parse the JSON response
        let questions = []
        try {
            // Extract JSON from response if wrapped in text
            const jsonMatch = responseText.match(/\[.*\]/s)
            const jsonText = jsonMatch ? jsonMatch[0] : responseText
            questions = JSON.parse(jsonText)
        } catch (parseError) {
            console.error('Failed to parse questions JSON:', parseError)
            // Fallback: create a simple question
            questions = [{
                question: "Sample question: What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                answer: "Paris"
            }]
        }

        res.json({ questions })
    } catch (error) {
        console.error('Groq API error:', error)
        res.status(500).json({ message: 'Failed to generate questions' })
    }
})

module.exports = router
