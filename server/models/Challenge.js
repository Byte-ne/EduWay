const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema({
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    exam: { type: String },
    status: { type: String, enum: ['pending', 'active', 'rejected', 'finished'], default: 'pending' },
    questions: [{ question: String, options: [String], answerIndex: Number }],
    results: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, answers: [{ qIndex: Number, choice: Number }], score: Number }],
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Challenge', ChallengeSchema)
