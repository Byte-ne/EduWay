import React, { useEffect, useState } from 'react'
import { io as ioClient } from 'socket.io-client'
import { Home, TrendingUp, Users, Heart, MessageSquare, Send, MapPin, Lightbulb, Image as ImageIcon, UserPlus, Edit3, ChevronsLeft, ChevronsRight, Trash } from 'lucide-react'

function Sidebar({ active, setActive }) {
    const tabs = [
        { key: 'home', label: 'Home', icon: Home },
        { key: 'trending', label: 'Trending Exams', icon: TrendingUp },
        { key: 'groups', label: 'Study Groups', icon: Users }
    ]

    return (
        <aside style={{ width: '280px', position: 'sticky', top: '88px', height: 'fit-content' }}>
            <div style={{ background: 'var(--white)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ margin: '0 0 var(--space-4) 0', color: 'var(--text-primary)', fontSize: '18px', fontWeight: '700' }}>Explore</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {tabs.map(t => {
                        const Icon = t.icon
                        const isActive = active === t.key
                        return (
                            <button
                                type="button"
                                key={t.key}
                                onClick={() => setActive(t.key)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                    background: isActive ? 'var(--primary-light)' : 'transparent',
                                    border: `2px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    transition: 'all var(--transition-base)',
                                    fontFamily: 'inherit'
                                }}
                            >
                                <Icon size={20} />
                                {t.label}
                            </button>
                        )
                    })}
                </nav>
                {/* Trending Tags */}
                <div style={{ marginTop: 'var(--space-5)', borderTop: '2px solid var(--border-light)', paddingTop: 'var(--space-4)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trending Tags</div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                        {['jee', 'neet', 'upsc', 'studygroup', 'resource'].map((t, i) => (
                            <button key={i} type="button" onClick={() => setActive('trending')} className="chip" style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--primary-light)', border: '2px solid transparent', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all var(--transition-base)' }}>
                                #{t}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                        <button type="button" onClick={() => alert('Start a Study Room feature coming soon')} style={{ flex: 1, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'inherit' }}>Start Room</button>
                        <button type="button" onClick={() => alert('AI Summary coming soon')} style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '2px solid var(--border-medium)', cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'inherit' }}>AI</button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

function PostCard({ p, onLike, onComment, onStudyRequest }) {
    const [commentText, setCommentText] = useState('')
    const [showComments, setShowComments] = useState(false)

    return (
        <div style={{
            background: 'var(--white)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-4)',
            border: '2px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition-base)'
        }}>
            {/* Post Header */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                {p.author.profilePic ? (
                    <img
                        src={p.author.profilePic}
                        alt="avatar"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid var(--off-white)'
                        }}
                    />
                ) : (
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--white)',
                        fontWeight: '600',
                        fontSize: '18px'
                    }}>
                        {p.author.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>
                        {p.author.name}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                        {new Date(p.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                    margin: '0 0 8px 0',
                    color: 'var(--text-primary)',
                    fontSize: '18px',
                    fontWeight: '600'
                }}>
                    {p.title}
                </h4>
                <p style={{
                    margin: '0 0 12px 0',
                    color: 'var(--text-primary)',
                    fontSize: '15px',
                    lineHeight: '1.6'
                }}>
                    {p.content}
                </p>

                {/* Media */}
                {p.media && p.media.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                        {p.isVideo ? (
                            <video
                                src={p.media[0]}
                                controls
                                style={{
                                    width: '100%',
                                    borderRadius: 'var(--radius-lg)',
                                    maxHeight: '400px',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <img
                                src={p.media[0]}
                                alt="media"
                                style={{
                                    width: '100%',
                                    borderRadius: 'var(--radius-lg)',
                                    maxHeight: '400px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </div>
                )}
                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {p.tags.map((t, i) => (
                            <span key={i} style={{ padding: '6px 10px', background: '#f1edff', color: '#4a2bff', borderRadius: 999, fontSize: 12 }}>
                                #{t}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
                marginBottom: '12px'
            }}>
                <button
                    type="button"
                    onClick={() => onLike(p._id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--off-white)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    <Heart size={16} style={{ color: 'var(--error)' }} />
                    {p.likes?.length || 0}
                </button>

                <button
                    type="button"
                    onClick={() => setShowComments(!showComments)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--off-white)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    <MessageSquare size={16} style={{ color: 'var(--primary-blue)' }} />
                    {p.comments?.length || 0}
                </button>

                <button
                    type="button"
                    onClick={() => onStudyRequest(p._id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: '#E6F4EA',
                        color: 'var(--accent-green)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all var(--transition-fast)',
                        marginLeft: 'auto'
                    }}
                >
                    <Users size={16} />
                    Study Buddy
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div style={{ marginTop: '12px' }}>
                    {/* Comment Input */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <input
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    if (commentText.trim()) {
                                        onComment(p._id, commentText)
                                        setCommentText('')
                                    }
                                }
                            }}
                            placeholder="Write a comment..."
                            style={{
                                flex: 1,
                                padding: '10px 12px',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (commentText.trim()) {
                                    onComment(p._id, commentText)
                                    setCommentText('')
                                }
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 16px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--primary-blue)',
                                color: 'var(--white)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all var(--transition-fast)',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    {/* Comments List */}
                    {p.comments && p.comments.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {p.comments.map((c, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '12px',
                                        background: 'var(--off-white)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '14px',
                                        color: 'var(--text-primary)',
                                        lineHeight: '1.5'
                                    }}>
                                        <strong style={{ fontWeight: '600' }}>
                                            {c.author?.name || 'User'}
                                        </strong>{' '}
                                        {c.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function RightSidebar() {
    return (
        <aside style={{
            width: '300px',
            position: 'sticky',
            top: '88px',
            height: 'fit-content'
        }}>
            <div style={{
                background: 'var(--white)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <Lightbulb size={20} style={{ color: 'var(--accent)' }} />
                    <h4 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '700',
                        color: 'var(--text-primary)'
                    }}>
                        Quick Tips
                    </h4>
                </div>
                <ul style={{
                    paddingLeft: '20px',
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: '1.8'
                }}>
                    <li>Share photos of your study notes</li>
                    <li>Upload short video explanations</li>
                    <li>Ask questions and help others</li>
                    <li>Connect with study buddies</li>
                    <li>Be respectful and encouraging</li>
                </ul>
            </div>

            <div style={{
                background: 'var(--white)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                marginTop: 'var(--space-4)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <MapPin size={20} style={{ color: 'var(--success)' }} />
                    <h4 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '700',
                        color: 'var(--text-primary)'
                    }}>
                        Your Journey
                    </h4>
                </div>
                <p style={{
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: '1.6'
                }}>
                    Track your progress and share milestones with the community. Every step counts!
                </p>
            </div>
        </aside>
    )
}

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('home')
    const [user, setUser] = useState(null)
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [groupMessages, setGroupMessages] = useState([])
    const [groupMessageText, setGroupMessageText] = useState('')
    const [groupsCollapsed, setGroupsCollapsed] = useState(false)
    const [addMemberModal, setAddMemberModal] = useState({ open: false, groupId: null })
    const [memberSearchQuery, setMemberSearchQuery] = useState('')
    const [memberSearchResults, setMemberSearchResults] = useState([])
    const [renaming, setRenaming] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')


    // create post state
    const [creating, setCreating] = useState(false)
    const [postContent, setPostContent] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postMedia, setPostMedia] = useState(null)
    const [postIsVideo, setPostIsVideo] = useState(false)

    function load() {
        setLoading(true)
        fetch('${__API_BASE_URL__}/api/posts')
            .then(r => r.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false))
    }

    // load current user for My Targets
    async function loadUser() {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
            const res = await fetch('${__API_BASE_URL__}/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
            const data = await res.json()
            if (!res.ok) return
            setUser(data)
        } catch (e) {/*ignore*/ }
    }

    useEffect(() => { load(); loadUser() }, [])

    useEffect(() => {
        if (activeTab === 'groups') loadGroups()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab])



    async function searchMember(q) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${__API_BASE_URL__}/api/users/search?q=${encodeURIComponent(q)}`, { headers: { Authorization: `Bearer ${token}` } })
            const data = await res.json()
            setMemberSearchResults(Array.isArray(data) ? data : [])
        } catch (e) { setMemberSearchResults([]) }
    }

    async function addMemberToGroup(groupId, memberId) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${__API_BASE_URL__}/api/groups/${groupId}/add-member`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ memberId }) })
            const data = await res.json()
            if (res.ok) {
                // refresh groups and selected group
                loadGroups()
                if (selectedGroup && selectedGroup._id === groupId) selectGroup(groupId)
                setAddMemberModal({ open: false, groupId: null })
            } else alert(data.message || 'Failed')
        } catch (e) { alert('Failed to add member') }
    }

    async function renameGroup(groupId, name) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${__API_BASE_URL__}/api/groups/${groupId}/rename`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name }) })
            const data = await res.json()
            if (res.ok) {
                loadGroups()
                selectGroup(groupId)
                setRenaming(false)
            } else alert(data.message || 'Rename failed')
        } catch (e) { alert('Rename failed') }
    }

    useEffect(() => {
        const socket = ioClient('${__API_BASE_URL__}')
        socket.on('connect', () => console.log('connected to socket', socket.id))
        socket.on('post:created', (p) => {
            setPosts(prev => [p, ...prev])
        })
        socket.on('post:liked', ({ id, likes }) => {
            setPosts(prev => prev.map(x => x._id === id ? ({ ...x, likes: new Array(likes).fill(null) }) : x))
        })
        socket.on('post:commented', ({ id, comments }) => {
            setPosts(prev => prev.map(x => x._id === id ? ({ ...x, comments }) : x))
        })
        socket.on('group:message', ({ groupId, message }) => {
            setGroupMessages(prev => prev.concat([message]))
            // if currently selected group, append; otherwise ignore
        })
        // Live updates for group rename and member additions
        socket.on('group:renamed', ({ groupId, name }) => {
            setGroups(prev => prev.map(g => (g._id === groupId ? { ...g, name } : g)))
            setSelectedGroup(prev => (prev && prev._id === groupId ? { ...prev, name } : prev))
        })

        socket.on('group:member-added', async ({ groupId, memberId }) => {
            setGroups(prev => prev.map(g => (g._id === groupId ? { ...g, members: Array.isArray(g.members) ? [...g.members, memberId] : [memberId] } : g)))
            // if the group is open, refresh its details
            setSelectedGroup(prev => {
                if (prev && prev._id === groupId) {
                    // fetch updated group
                    (async () => {
                        try {
                            const res = await fetch(`${__API_BASE_URL__}/api/groups/${groupId}`)
                            const data = await res.json()
                            setSelectedGroup(data)
                            setGroupMessages(data.messages || [])
                        } catch (e) { console.warn('Failed to refresh group after member added') }
                    })()
                }
                return prev
            })
        })

        return () => { socket.disconnect() }
    }, [])

    // create post helpers
    function onMediaChange(e) {
        const f = e.target.files && e.target.files[0]
        if (!f) return
        const reader = new FileReader()
        reader.onload = () => {
            setPostMedia(reader.result)
            setPostIsVideo(f.type.startsWith('video'))
        }
        reader.readAsDataURL(f)
    }

    async function createPost(e) {
        e && e.preventDefault()
        setCreating(true)
        const token = localStorage.getItem('token')
        try {
            const res = await fetch('${__API_BASE_URL__}/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title: postTitle, content: postContent, media: postMedia ? [postMedia] : [], isVideo: postIsVideo })
            })
            const data = await res.json()
            if (res.ok) {
                setPostContent(''); setPostTitle(''); setPostMedia(null); setPostIsVideo(false)
                load()
            } else {
                alert(data.message || 'Failed')
            }
        } catch (err) { alert('Network error') }
        setCreating(false)
    }

    // filter posts based on active tab
    const displayedPosts = posts.filter(p => {
        if (activeTab === 'home') return true
        if (activeTab === 'trending') {
            const examTags = ['jee', 'upsc', 'clat', 'neet']
            return (p.tags || []).some(t => examTags.includes(t))
        }
        if (activeTab === 'groups') return (p.tags || []).includes('studygroup')
        return true
    })

    async function like(id) {
        await fetch(`${__API_BASE_URL__}/api/posts/${id}/like`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        load()
    }

    async function comment(id, text) {
        if (!text) return
        await fetch(`${__API_BASE_URL__}/api/posts/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ text })
        })
        load()
    }

    async function studyRequest(id) {
        await fetch(`${__API_BASE_URL__}/api/posts/${id}/study-request`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        alert('Study buddy request sent! 🎯')
    }

    // Groups helpers
    async function loadGroups() {
        try {
            const res = await fetch('${__API_BASE_URL__}/api/groups')
            const data = await res.json()
            if (Array.isArray(data)) setGroups(data)
        } catch (e) { }
    }

    async function selectGroup(id) {
        try {
            const res = await fetch(`${__API_BASE_URL__}/api/groups/${id}`)
            const data = await res.json()
            setSelectedGroup(data)
            setGroupMessages(data.messages || [])
        } catch (e) { }
    }

    async function createGroup(name) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('${__API_BASE_URL__}/api/groups', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name, members: [] }) })
            const data = await res.json()
            setGroups(g => [data, ...g])
            return data
        } catch (e) { alert('Failed creating group') }
    }

    async function sendGroupMessage(groupId, text) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${__API_BASE_URL__}/api/groups/${groupId}/message`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ text }) })
            const data = await res.json()
            // message will be appended via socket event
            return data
        } catch (e) { console.warn(e) }
    }

    return (
        <div style={{
            display: 'flex',
            gap: 'var(--space-6)',
            padding: 'var(--space-6)',
            maxWidth: '1400px',
            margin: '0 auto',
            minHeight: 'calc(100vh - 72px)'
        }}>
            <Sidebar active={activeTab} setActive={setActiveTab} />

            <main style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h2 style={{
                        color: 'var(--text-primary)',
                        fontSize: '32px',
                        fontWeight: '800',
                        margin: '0 0 var(--space-2) 0',
                        letterSpacing: '-0.02em'
                    }}>
                        Community Feed
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '16px',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>
                        Discover study insights, connect with peers, and share your journey
                    </p>
                </div>

                {/* Create Post Card */}
                {activeTab !== 'groups' && (
                    <div style={{ marginBottom: 'var(--space-4)', background: 'var(--white)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                        <form onSubmit={createPost}>
                            <input value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder="Title (optional)" style={{ width: '100%', padding: 'var(--space-3)', marginBottom: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-medium)', fontSize: '15px', fontFamily: 'inherit', fontWeight: '500' }} />
                            <textarea value={postContent} onChange={e => setPostContent(e.target.value)} placeholder="Share something... Use #hashtags to categorize" style={{ width: '100%', padding: 'var(--space-3)', minHeight: 100, borderRadius: 'var(--radius-md)', border: '2px solid var(--border-medium)', fontSize: '15px', fontFamily: 'inherit', fontWeight: '500', resize: 'vertical' }} />
                            {postMedia && (
                                <div style={{ marginTop: 8 }}>
                                    {postIsVideo ? (
                                        <video src={postMedia} controls style={{ width: '100%', borderRadius: 8 }} />
                                    ) : (
                                        <img src={postMedia} alt="preview" style={{ width: '100%', borderRadius: 8 }} />
                                    )}
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', alignItems: 'center' }}>
                                <label style={{ padding: 'var(--space-3)', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '2px solid transparent', transition: 'all var(--transition-base)' }}>
                                    <ImageIcon size={18} color="var(--primary)" />
                                    <input type="file" accept="image/*,video/*" onChange={onMediaChange} style={{ display: 'none' }} />
                                </label>
                                <button type="submit" disabled={creating} style={{ padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: 'var(--white)', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>{creating ? 'Posting...' : 'Post'}</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* tab-specific header for Targets */}
                {activeTab === 'targets' && (
                    <div style={{ marginBottom: 12, background: 'var(--white)', padding: 12, borderRadius: 12 }}>
                        <h3 style={{ margin: 0 }}>My Targets</h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            {user && user.examTargets && user.examTargets.length ? (
                                <ul style={{ marginTop: 8 }}>
                                    {user.examTargets.map((t, i) => (<li key={i}>{t.exam} — {t.targetDate ? new Date(t.targetDate).toLocaleDateString() : 'No date'}</li>))}
                                </ul>
                            ) : 'You have not added any targets yet.'}
                        </p>
                    </div>
                )}

                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '60px 0',
                        color: 'var(--text-secondary)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="spinner" style={{
                                margin: '0 auto 16px',
                                width: '40px',
                                height: '40px',
                                borderColor: 'var(--border-light)',
                                borderTopColor: 'var(--primary-blue)'
                            }}></div>
                            Loading feed...
                        </div>
                    </div>
                ) : (
                    activeTab === 'groups' ? (
                        <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ width: groupsCollapsed ? 72 : 320, transition: 'width 180ms' }}>
                                <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <button type="button" onClick={async () => { const g = await createGroup('New Group'); if (g) selectGroup(g._id); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: 'var(--primary)', color: '#fff', border: 'none', fontSize: groupsCollapsed ? '12px' : '14px' }}>
                                        {groupsCollapsed ? '+' : 'New Group'}
                                    </button>
                                    <button type="button" onClick={() => loadGroups()} style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Refresh</button>
                                    <button type="button" onClick={() => setGroupsCollapsed(s => !s)} style={{ padding: 8, borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>
                                        {groupsCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {groups.length > 0 ? groups.map(g => (
                                        <div key={g._id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <button type="button" onClick={() => selectGroup(g._id)} style={{ textAlign: groupsCollapsed ? 'center' : 'left', padding: groupsCollapsed ? 8 : 10, borderRadius: 8, background: selectedGroup && selectedGroup._id === g._id ? 'rgba(138,108,255,0.08)' : 'var(--white)', border: '1px solid var(--border-light)', width: '100%' }}>{groupsCollapsed ? (g.name?.charAt(0)?.toUpperCase() || 'G') : (<><div style={{ fontWeight: 700 }}>{g.name}</div><div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{g.members?.length || 0} members</div></>)}</button>
                                            {!groupsCollapsed && <button type="button" onClick={() => setAddMemberModal({ open: true, groupId: g._id })} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }} title="Add member"><UserPlus size={18} /></button>}
                                            {!groupsCollapsed && <button type="button" onClick={async () => {
                                                if (!window.confirm('Delete this group?')) return
                                                try {
                                                    const token = localStorage.getItem('token')
                                                    const res = await fetch(`${__API_BASE_URL__}/api/groups/${g._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
                                                    if (res.ok) { loadGroups(); if (selectedGroup && selectedGroup._id === g._id) setSelectedGroup(null) }
                                                    else { const d = await res.json(); alert(d.message || 'Failed') }
                                                } catch (e) { alert('Failed') }
                                            }} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }} title="Delete group"><Trash size={16} /></button>}
                                        </div>
                                    )) : <div style={{ padding: 20, color: 'var(--text-secondary)' }}>No groups yet</div>}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                {selectedGroup ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {renaming ? (
                                                <>
                                                    <input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="Group name" style={{ padding: 8, borderRadius: 8, border: '1px solid var(--border-light)', flex: 1 }} />
                                                    <button type="button" onClick={() => renameGroup(selectedGroup._id, newGroupName)} style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Save</button>
                                                    <button type="button" onClick={() => { setRenaming(false); setNewGroupName('') }} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 style={{ margin: 0, flex: 1 }}>{selectedGroup.name}</h3>
                                                    <button type="button" onClick={() => { setRenaming(true); setNewGroupName(selectedGroup.name || '') }} style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }} title="Rename group"><Edit3 size={18} /></button>
                                                </>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '60vh', overflowY: 'auto', padding: 8 }}>
                                            {groupMessages.map((m, i) => (
                                                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                                    <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.author?.name?.charAt(0)?.toUpperCase()}</div>
                                                    <div style={{ background: 'var(--white)', padding: 10, borderRadius: 8, boxShadow: 'var(--shadow-sm)' }}>
                                                        <div style={{ fontWeight: 700 }}>{m.author?.name}</div>
                                                        <div style={{ color: 'var(--text-secondary)' }}>{m.text}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <button type="button" onClick={async () => {
                                                            if (!window.confirm('Delete this message?')) return
                                                            try {
                                                                const token = localStorage.getItem('token')
                                                                const res = await fetch(`${__API_BASE_URL__}/api/groups/${selectedGroup._id}/messages/${m._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
                                                                if (res.ok) {
                                                                    setGroupMessages(prev => prev.filter(x => x._id !== m._id))
                                                                } else {
                                                                    const d = await res.json(); alert(d.message || 'Failed')
                                                                }
                                                            } catch (e) { alert('Failed') }
                                                        }} style={{ padding: 6, marginLeft: 6, border: 'none', background: 'transparent', cursor: 'pointer' }} title="Delete message"><Trash size={14} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <input value={groupMessageText} onChange={e => setGroupMessageText(e.target.value)} placeholder="Write a message" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-light)' }} />
                                            <button type="button" onClick={async () => { if (groupMessageText.trim()) { await sendGroupMessage(selectedGroup._id, groupMessageText); setGroupMessageText('') } }} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Send</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ padding: 20, color: 'var(--text-secondary)' }}>Select a group to open the chat</div>
                                )}
                            </div>

                            {/* Add member modal */}
                            {addMemberModal.open && (
                                <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', zIndex: 60 }} onClick={() => setAddMemberModal({ open: false, groupId: null })}>
                                    <div role="dialog" onClick={e => e.stopPropagation()} style={{ width: 420, background: 'var(--white)', borderRadius: 12, padding: 16, boxShadow: 'var(--shadow-lg)' }}>
                                        <h4 style={{ marginTop: 0 }}>Add member to group</h4>
                                        <input placeholder="Search by name, username or user id" value={memberSearchQuery} onChange={e => { setMemberSearchQuery(e.target.value); searchMember(e.target.value) }} style={{ width: '100%', padding: 8, border: '1px solid var(--border-light)', borderRadius: 8, marginBottom: 8 }} />
                                        <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                                            {memberSearchResults.length === 0 && <div style={{ padding: 8, color: 'var(--text-secondary)' }}>No results</div>}
                                            {memberSearchResults.map(u => (
                                                <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, borderBottom: '1px solid var(--border-light)' }}>
                                                    <div>
                                                        <div style={{ fontWeight: 700 }}>{u.name} {u.username ? `@${u.username}` : ''}</div>
                                                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u._id}</div>
                                                    </div>
                                                    <div>
                                                        <button type="button" onClick={() => addMemberToGroup(addMemberModal.groupId, u._id)} style={{ padding: '6px 8px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Add</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                                            <button type="button" onClick={() => setAddMemberModal({ open: false, groupId: null })} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : displayedPosts.length > 0 ? (
                        displayedPosts.map(p => (
                            <PostCard
                                key={p._id}
                                p={p}
                                onLike={like}
                                onComment={comment}
                                onStudyRequest={studyRequest}
                            />
                        ))
                    ) : (
                        <div style={{
                            background: 'var(--white)',
                            padding: '60px 40px',
                            borderRadius: 'var(--radius-xl)',
                            textAlign: 'center',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <MapPin size={64} style={{
                                color: 'var(--border-medium)',
                                marginBottom: '20px',
                                opacity: 0.5
                            }} />
                            <h3 style={{
                                color: 'var(--text-primary)',
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '8px'
                            }}>
                                No posts yet
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '15px',
                                margin: 0
                            }}>
                                Be the first to share your study journey with the community!
                            </p>
                        </div>
                    )
                )}
            </main>

            <RightSidebar />
        </div>
    )
}
