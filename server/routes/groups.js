const express = require('express')
const router = express.Router()
const Group = require('../models/Group')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

function getUserIdFromHeader(req) {
    const auth = req.headers.authorization
    if (!auth) return null
    const parts = auth.split(' ')
    if (parts.length !== 2) return null
    try { return jwt.verify(parts[1], JWT_SECRET).id } catch (e) { return null }
}

const { moderateText } = require('../utils/moderation')

// Create group
router.post('/', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { name, members } = req.body
        const group = new Group({ name, members: Array.isArray(members) ? members : [], members: [...(Array.isArray(members) ? members : []), userId] })
        await group.save()
        res.json(group)
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Rename group
router.patch('/:id/rename', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { name } = req.body
        if (!name) return res.status(400).json({ message: 'Missing name' })
        const g = await Group.findById(req.params.id)
        if (!g) return res.status(404).json({ message: 'Group not found' })
        // simple permission: allow if requester is a member
        if (!g.members.map(m => m.toString()).includes(userId)) return res.status(403).json({ message: 'Not allowed' })
        g.name = name
        await g.save()
        try { req.app.get('io')?.emit('group:renamed', { groupId: g._id.toString(), name: g.name }) } catch (e) { }
        res.json({ message: 'Renamed', group: g })
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Add member to group by id
router.post('/:id/add-member', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { memberId } = req.body
        if (!memberId) return res.status(400).json({ message: 'Missing memberId' })
        const g = await Group.findById(req.params.id)
        if (!g) return res.status(404).json({ message: 'Group not found' })
        if (!g.members.map(m => m.toString()).includes(userId)) return res.status(403).json({ message: 'Not allowed' })
        if (!g.members.map(m => m.toString()).includes(memberId)) {
            g.members.push(memberId)
            await g.save()
        }
        try { req.app.get('io')?.emit('group:member-added', { groupId: g._id.toString(), memberId }) } catch (e) { }
        res.json({ message: 'Member added', group: g })
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// List groups (simple)
router.get('/', async (req, res) => {
    try {
        const list = await Group.find().sort({ createdAt: -1 }).limit(50).select('name members createdAt')
        res.json(list)
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Get group
router.get('/:id', async (req, res) => {
    try {
        const g = await Group.findById(req.params.id).populate('members', 'name profilePic username').populate('messages.author', 'name profilePic')
        if (!g) return res.status(404).json({ message: 'Not found' })
        res.json(g)
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Post message to group
router.post('/:id/message', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { text, media } = req.body
        const g = await Group.findById(req.params.id)
        if (!g) return res.status(404).json({ message: 'Not found' })
        // moderate message text
        const check = await moderateText(text || '')
        if (!check.ok) return res.status(400).json({ message: check.reason || 'Message not allowed' })
        g.messages.push({ author: userId, text: text || '', media: Array.isArray(media) ? media : [] })
        await g.save()
        const populated = await Group.findById(g._id).populate('messages.author', 'name profilePic')
        try { req.app.get('io')?.emit('group:message', { groupId: g._id.toString(), message: populated.messages[populated.messages.length - 1] }) } catch (e) { }
        res.json(populated.messages[populated.messages.length - 1])
    } catch (e) { console.error(e); res.status(500).json({ message: 'Server error' }) }
})

// Delete message from group
router.delete('/:id/messages/:messageId', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })
        const { id, messageId } = req.params
        const g = await Group.findById(id)
        if (!g) return res.status(404).json({ message: 'Group not found' })

        // Check if user is a member of the group
        if (!g.members.map(m => m.toString()).includes(userId)) {
            return res.status(403).json({ message: 'Not allowed - you are not a member of this group' })
        }

        // Find and remove the message
        const messageIndex = g.messages.findIndex(msg => msg._id.toString() === messageId)
        if (messageIndex === -1) {
            return res.status(404).json({ message: 'Message not found' })
        }

        // Allow any group member to delete messages (similar to most chat applications)
        // No additional author check needed since membership was already verified above

        g.messages.splice(messageIndex, 1)
        await g.save()

        res.json({ message: 'Message deleted successfully' })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' })
    }
})

// Delete entire group
router.delete('/:id', async (req, res) => {
    try {
        const userId = getUserIdFromHeader(req)
        if (!userId) return res.status(401).json({ message: 'Unauthorized' })

        const g = await Group.findById(req.params.id)
        if (!g) return res.status(404).json({ message: 'Group not found' })

        // Check if user is a member of the group (for now, allow any member to delete)
        // In a production app, you might want to restrict this to group creators/admins
        if (!g.members.map(m => m.toString()).includes(userId)) {
            return res.status(403).json({ message: 'Not allowed - you are not a member of this group' })
        }

        // Delete the group
        await Group.findByIdAndDelete(req.params.id)

        res.json({ message: 'Group deleted successfully' })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' })
    }
})

// Delete all groups (admin function)
router.delete('/', async (req, res) => {
    try {
        const result = await Group.deleteMany({})
        res.json({
            message: 'All groups deleted successfully',
            deletedCount: result.deletedCount
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router

