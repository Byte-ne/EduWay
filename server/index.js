const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exam-compass'
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

// Auth routes
app.use('/api/auth', require('./routes/auth'))
// Posts / feed
app.use('/api/posts', require('./routes/posts'))
// Groups (chat-like study groups)
app.use('/api/groups', require('./routes/groups'))
// Users search
app.use('/api/users', require('./routes/users'))
// Challenges (peer challenge requests)
app.use('/api/challenges', require('./routes/challenges'))
// Study AI and question generator
app.use('/api/study', require('./routes/study'))

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server' })
})

// Set up HTTP server and Socket.IO for real-time updates
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { cors: { origin: '*' } })

app.set('io', io)

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id)
    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id))
})
    ;

// Try to preload NSFW model (optional). Requires @tensorflow/tfjs-node and nsfwjs installed.
(async function preloadNSFW() {
    try {
        const tf = require('@tensorflow/tfjs-node')
        const nsfw = require('nsfwjs')
        console.log('Loading NSFW model (this may take a while)...')
        const model = await nsfw.load()
        global.nsfwModel = model
        console.log('NSFW model loaded and available')
    } catch (e) {
        console.warn('Could not load NSFW model on startup (optional). Install @tensorflow/tfjs-node and nsfwjs to enable image moderation.')
    }
})()

server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
