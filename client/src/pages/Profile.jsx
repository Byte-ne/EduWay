import React, { useEffect, useState } from 'react'
import { MapPin, Mail, Calendar, Award, User as UserIcon, Edit3, Camera, Lock, Target, Users, FileText, Save, X } from 'lucide-react'

export default function Profile() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ name: '', bio: '', goal: '', profilePic: '' })
    const [pwState, setPwState] = useState({ currentPassword: '', newPassword: '', message: '' })
    const [saving, setSaving] = useState(false)
    const [showBuddies, setShowBuddies] = useState(false)
    const [showBuddiesModal, setShowBuddiesModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [selectedMembers, setSelectedMembers] = useState([])
    const [notifications, setNotifications] = useState([])
    const [loadingNotifications, setLoadingNotifications] = useState(false)

    useEffect(() => {
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function load() {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
            setError('Not logged in')
            setLoading(false)
            return
        }

        fetch('${__API_URL__}/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(r => r.json())
            .then(data => {
                if (data.message) setError(data.message)
                else {
                    setUser(data)
                    setForm({ name: data.name || '', bio: data.bio || '', goal: data.goal || '', profilePic: data.profilePic || '' })
                }
                setLoading(false)
            }).catch(() => { setError('Network error'); setLoading(false) })
    }

    async function loadNotifications() {
        setLoadingNotifications(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('${__API_URL__}/api/auth/notifications', { headers: { 'Authorization': `Bearer ${token}` } })
            const data = await res.json()
            setNotifications(Array.isArray(data) ? data : [])
        } catch (e) { setNotifications([]) }
        setLoadingNotifications(false)
    }

    useEffect(() => {
        if (showBuddiesModal) loadNotifications()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBuddiesModal])

    async function saveProfile(e) {
        e && e.preventDefault()
        setSaving(true)
        const token = localStorage.getItem('token')
        try {
            const res = await fetch('${__API_URL__}/api/auth/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (!res.ok) setError(data.message || 'Update failed')
            else { setUser(data); setEditing(false); setError('') }
        } catch (err) { setError('Network error') }
        setSaving(false)
    }

    function onFileChange(e) {
        const file = e.target.files && e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setForm(prev => ({ ...prev, profilePic: reader.result }))
        }
        reader.readAsDataURL(file)
    }

    async function changePassword(e) {
        e.preventDefault()
        setPwState(prev => ({ ...prev, message: '' }))
        const token = localStorage.getItem('token')
        try {
            const res = await fetch('${__API_URL__}/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: pwState.currentPassword, newPassword: pwState.newPassword })
            })
            const data = await res.json()
            if (!res.ok) setPwState(prev => ({ ...prev, message: data.message || 'Failed to change password' }))
            else setPwState({ currentPassword: '', newPassword: '', message: 'Password changed successfully!' })
        } catch (err) { setPwState(prev => ({ ...prev, message: 'Network error. Please try again.' })) }
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
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
                    Loading your profile...
                </div>
            </div>
        )
    }

    if (error && !user) {
        return (
            <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px' }}>
                <div className="error">{error}</div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)', minHeight: 'calc(100vh - 72px)' }}>
            {/* Profile Header */}
            <div style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                border: '2px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 'var(--space-6)'
            }}>
                <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Avatar */}
                    <div style={{ textAlign: 'center' }}>
                        {form.profilePic ? (
                            <img
                                src={form.profilePic}
                                alt="Profile"
                                style={{
                                    width: '140px',
                                    height: '140px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '4px solid var(--primary-light)',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--white)',
                                fontSize: '56px',
                                fontWeight: '800',
                                boxShadow: 'var(--shadow-lg)',
                                border: '4px solid var(--white)'
                            }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        {editing && (
                            <label style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                marginTop: 'var(--space-3)',
                                padding: 'var(--space-2) var(--space-4)',
                                background: 'var(--primary-light)',
                                color: 'var(--primary)',
                                borderRadius: 'var(--radius-lg)',
                                border: '2px solid var(--primary)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '700',
                                transition: 'all var(--transition-base)'
                            }}>
                                <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                                <Camera size={16} />
                                Change Photo
                            </label>
                        )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: '400px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                            <h1 style={{
                                fontSize: '36px',
                                fontWeight: '800',
                                color: 'var(--text-primary)',
                                margin: 0,
                                letterSpacing: '-0.02em'
                            }}>
                                {user.name}
                            </h1>
                            {!editing && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(true)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-2)',
                                        padding: 'var(--space-3) var(--space-5)',
                                        background: 'var(--primary)',
                                        color: 'var(--white)',
                                        border: 'none',
                                        borderRadius: 'var(--radius-lg)',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        fontFamily: 'inherit',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-base)',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                >
                                    <Edit3 size={18} />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--text-secondary)',
                            fontSize: '15px',
                            marginBottom: 'var(--space-4)',
                            fontWeight: '500'
                        }}>
                            <Mail size={18} />
                            {user.email}
                        </div>

                        {user.goal && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--text-secondary)',
                                fontSize: '14px',
                                marginBottom: '16px'
                            }}>
                                <Target size={16} />
                                <strong>Goal:</strong> {user.goal}
                            </div>
                        )}

                        {user.bio && (
                            <p style={{
                                color: 'var(--text-primary)',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                marginBottom: '16px'
                            }}>
                                {user.bio}
                            </p>
                        )}

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setShowBuddiesModal(true)}
                                onKeyDown={e => { if (e.key === 'Enter') setShowBuddiesModal(true) }}
                                style={{
                                    padding: 'var(--space-4) var(--space-5)',
                                    background: 'var(--primary-light)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '2px solid var(--primary)',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-base)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)', justifyContent: 'center' }}>
                                    <Users size={18} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>
                                        {user.studyBuddies ? user.studyBuddies.length : 0}
                                    </span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Study Buddies</div>
                            </div>

                            <div style={{
                                padding: 'var(--space-4) var(--space-5)',
                                background: 'var(--success-light)',
                                border: '2px solid var(--success)',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                    <FileText size={18} style={{ color: 'var(--success)' }} />
                                    <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--success)' }}>
                                        {user.posts ? user.posts.length : 0}
                                    </span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Posts</div>
                            </div>

                            <div style={{
                                padding: 'var(--space-4) var(--space-5)',
                                background: 'var(--accent-light)',
                                border: '2px solid var(--accent)',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                    <Target size={18} style={{ color: 'var(--accent)' }} />
                                    <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent)' }}>
                                        {user.examTargets ? user.examTargets.length : 0}
                                    </span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Targets</div>
                            </div>
                        </div>
                        {/* Always-visible quick-add/search for buddies */}
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Find or Add Study Buddies</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name or email" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-light)' }} />
                                <button type="button" onClick={async () => {
                                    setSearching(true)
                                    try {
                                        const token = localStorage.getItem('token')
                                        const res = await fetch(`${__API_URL__}/api/users/search?q=${encodeURIComponent(searchQuery)}`, { headers: { 'Authorization': `Bearer ${token}` } })
                                        const data = await res.json()
                                        setSearchResults(Array.isArray(data) ? data : (data.results || []))
                                    } catch (e) { setSearchResults([]) }
                                    setSearching(false)
                                }} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>{searching ? 'Searching...' : 'Search'}</button>
                            </div>
                            {searchResults && searchResults.length > 0 && (
                                <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                                    {searchResults.map((r, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, background: 'var(--white)', borderRadius: 8 }}>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                {r.profilePic ? <img src={r.profilePic} alt={r.name || r.email} style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover' }} /> : <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{(r.name || r.email || 'U').charAt(0).toUpperCase()}</div>}
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{r.name || r.email}</div>
                                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.username ? `@${r.username}` : r.email}</div>
                                                </div>
                                            </div>
                                            <button type="button" onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem('token')
                                                    await fetch(`${__API_URL__}/api/auth/add-buddy`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ buddyId: r._id || r.id }) })
                                                    alert('Study buddy request sent')
                                                } catch (e) { alert('Failed to send request') }
                                            }} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--accent-green)', color: '#fff', border: 'none' }}>Add</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Popup for full buddy list and group features */}
                        {showBuddiesModal && (
                            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }} onClick={() => setShowBuddiesModal(false)}>
                                <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{ width: 'min(960px, 95%)', maxHeight: '85vh', overflowY: 'auto', background: 'var(--white)', borderRadius: 12, padding: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.2)', transformOrigin: 'center', animation: 'pop 220ms ease' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <h3 style={{ margin: 0 }}>{user.studyBuddies && user.studyBuddies.length ? `Study Buddies (${user.studyBuddies.length})` : 'Study Buddies'}</h3>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button type="button" onClick={() => { setShowBuddiesModal(false) }} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Close</button>
                                        </div>
                                    </div>

                                    {/* Notifications / Buddy list */}
                                    {loadingNotifications && (
                                        <div style={{ padding: 12 }}>Loading requests...</div>
                                    )}

                                    {!loadingNotifications && notifications && notifications.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                                            <div style={{ fontWeight: 700 }}>Requests</div>
                                            {notifications.map((n, idx) => {
                                                if (n.type === 'buddy_request') return (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, background: 'var(--off-white)', borderRadius: 8 }}>
                                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                            {n.from && n.from.profilePic ? <img src={n.from.profilePic} alt={n.from.name} style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover' }} /> : <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{(n.from && n.from.name ? n.from.name.charAt(0).toUpperCase() : 'U')}</div>}
                                                            <div>
                                                                <div style={{ fontWeight: 600 }}>{n.from?.name || 'User'}</div>
                                                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{n.from?.email || ''}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 8 }}>
                                                            <button type="button" onClick={async () => {
                                                                const token = localStorage.getItem('token')
                                                                await fetch('/api/auth/respond-buddy', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ buddyId: n.from._id || n.from.id, action: 'accept' }) })
                                                                setNotifications(prev => prev.filter(x => x !== n))
                                                                load()
                                                            }} style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--accent-green)', color: '#fff', border: 'none' }}>Accept</button>
                                                            <button type="button" onClick={async () => {
                                                                const token = localStorage.getItem('token')
                                                                await fetch('/api/auth/respond-buddy', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ buddyId: n.from._id || n.from.id, action: 'reject' }) })
                                                                setNotifications(prev => prev.filter(x => x !== n))
                                                            }} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Reject</button>
                                                        </div>
                                                    </div>
                                                )

                                                if (n.type === 'challenge_request') return (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, background: 'var(--off-white)', borderRadius: 8 }}>
                                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--primary-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{(n.from && n.from.name ? n.from.name.charAt(0).toUpperCase() : 'C')}</div>
                                                            <div>
                                                                <div style={{ fontWeight: 600 }}>{n.from?.name || 'User'}</div>
                                                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{n.text}</div>
                                                                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{n.meta && n.meta.exam ? `Exam: ${n.meta.exam}` : ''}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 8 }}>
                                                            <button type="button" onClick={async () => {
                                                                try {
                                                                    const token = localStorage.getItem('token')
                                                                    const res = await fetch(`/api/challenges/${n.meta && n.meta.challengeId}/respond`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ accept: true }) })
                                                                    const d = await res.json()
                                                                    // store pending challenge so Feed can pick it up after redirect
                                                                    if (res.ok) {
                                                                        try { localStorage.setItem('pendingChallenge', JSON.stringify({ challengeId: n.meta.challengeId, questions: d.questions, exam: n.meta.exam })) } catch (e) { }
                                                                        setNotifications(prev => prev.filter(x => x !== n))
                                                                        // redirect to feed where challenge UI will start
                                                                        window.location.href = '/feed'
                                                                    } else alert(d.message || 'Failed')
                                                                } catch (e) { alert('Failed') }
                                                            }} style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--accent-green)', color: '#fff', border: 'none' }}>Accept</button>
                                                            <button type="button" onClick={async () => {
                                                                try {
                                                                    const token = localStorage.getItem('token')
                                                                    await fetch(`/api/challenges/${n.meta && n.meta.challengeId}/respond`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ accept: false }) })
                                                                    setNotifications(prev => prev.filter(x => x !== n))
                                                                } catch (e) { }
                                                            }} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Decline</button>
                                                        </div>
                                                    </div>
                                                )

                                                return null
                                            })}
                                        </div>
                                    )}

                                    {!loadingNotifications && (!notifications || notifications.length === 0) && (user.studyBuddies && user.studyBuddies.length > 0) && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                                            {user.studyBuddies.map((b, i) => {
                                                const name = (b && typeof b === 'object') ? (b.name || b.email || 'User') : (typeof b === 'string' ? `User ${b.slice(0, 6)}` : 'User')
                                                const username = (b && typeof b === 'object' && b.username) ? `@${b.username}` : ''
                                                const pic = (b && typeof b === 'object' && b.profilePic) ? b.profilePic : null
                                                return (
                                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 10, background: 'var(--off-white)' }}>
                                                        {pic ? <img src={pic} alt={name} style={{ width: 56, height: 56, borderRadius: 999, objectFit: 'cover' }} /> : <div style={{ width: 56, height: 56, borderRadius: 999, background: 'linear-gradient(135deg,var(--primary-blue),var(--primary-blue-dark))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{name?.charAt(0)?.toUpperCase()}</div>}
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontWeight: 700 }}>{name}</div>
                                                            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{username || (b && b.email)}</div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 8 }}>
                                                            <button type="button" onClick={() => { navigator.clipboard?.writeText(username || (b && b.email) || '') }} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Copy</button>
                                                            <button type="button" onClick={() => alert('Open chat (not implemented)')} style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Message</button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}

                                    {!loadingNotifications && (!notifications || notifications.length === 0) && (!user.studyBuddies || user.studyBuddies.length === 0) && (
                                        <div style={{ textAlign: 'center', padding: 40 }}>
                                            <div style={{ fontSize: 48 }}>📝✏️</div>
                                            <h4 style={{ marginTop: 12 }}>Looks like you haven't made any buddies</h4>
                                            <p style={{ color: 'var(--text-secondary)' }}>Search above to find classmates and send buddy requests.</p>
                                        </div>
                                    )}

                                    {/* Create Study Group */}
                                    <div style={{ marginTop: 18, paddingTop: 12, borderTop: '1px dashed var(--border-light)' }}>
                                        <h4 style={{ margin: '0 0 8px 0' }}>Create Study Group</h4>
                                        <input value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="Group name" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 8 }} />
                                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                            <input placeholder="Add member username or id" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-light)' }} onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault(); if (e.target.value.trim()) { setSelectedMembers(s => [...s, e.target.value.trim()]); e.target.value = '' }
                                                }
                                            }} />
                                            <button type="button" onClick={() => alert('Video call will start in a new window (placeholder)')} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--accent-green)', color: '#fff', border: 'none' }}>Start Video Call</button>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                                            {selectedMembers.map((m, idx) => <div key={idx} style={{ padding: '6px 10px', background: 'var(--off-white)', borderRadius: 999 }}>{m}</div>)}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button type="button" onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem('token')
                                                    await fetch('${__API_URL__}/api/groups', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name: groupName, members: selectedMembers }) })
                                                    alert('Group created (if backend implemented)')
                                                } catch (e) { alert('Failed to create group') }
                                            }} style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Create Group</button>
                                            <button type="button" onClick={() => { setSelectedMembers([]); setGroupName('') }} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-light)', background: 'transparent' }}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit Form */}
                {editing && (
                    <form onSubmit={saveProfile} style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
                        {error && <div className="error" style={{ marginBottom: '16px' }}>{error}</div>}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                                    Full Name
                                </label>
                                <input
                                    className="field"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                                    Goal
                                </label>
                                <input
                                    value={form.goal}
                                    onChange={e => setForm({ ...form, goal: e.target.value })}
                                    placeholder="e.g., JEE 2026, NEET 2025"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                                Bio
                            </label>
                            <textarea
                                value={form.bio}
                                onChange={e => setForm({ ...form, bio: e.target.value })}
                                placeholder="Tell us about yourself and your study journey"
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '15px',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'all var(--transition-fast)'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 20px',
                                    background: 'var(--accent-green)',
                                    color: 'var(--white)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    opacity: saving ? 0.6 : 1,
                                    transition: 'all var(--transition-fast)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(false)
                                    setForm({ name: user.name || '', bio: user.bio || '', goal: user.goal || '', profilePic: user.profilePic || '' })
                                    setError('')
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 20px',
                                    background: 'var(--white)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}
                            >
                                <X size={16} />
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
                {/* Posts Section */}
                <div style={{
                    background: 'var(--white)',
                    padding: '24px',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <MapPin size={24} style={{ color: 'var(--primary-blue)' }} />
                        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                            Journey Posts & Milestones
                        </h2>
                    </div>

                    {user.posts && user.posts.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {user.posts.map((p, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--off-white)',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: '4px solid var(--primary-blue)'
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: 'var(--text-primary)',
                                        marginBottom: '8px'
                                    }}>
                                        {p.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5',
                                        margin: 0
                                    }}>
                                        {p.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 20px',
                            color: 'var(--text-secondary)'
                        }}>
                            <FileText size={48} style={{
                                color: 'var(--border-medium)',
                                marginBottom: '16px',
                                opacity: 0.5
                            }} />
                            <p style={{ fontSize: '15px', margin: 0 }}>
                                No posts yet. Share your study journey with others!
                            </p>
                        </div>
                    )}
                </div>

                {/* Account Settings Section */}
                <div style={{
                    background: 'var(--white)',
                    padding: '24px',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)',
                    height: 'fit-content'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Lock size={24} style={{ color: 'var(--error)' }} />
                        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                            Security Settings
                        </h2>
                    </div>

                    <form onSubmit={changePassword}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={pwState.currentPassword}
                                onChange={e => setPwState({ ...pwState, currentPassword: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'all var(--transition-fast)'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={pwState.newPassword}
                                onChange={e => setPwState({ ...pwState, newPassword: e.target.value })}
                                required
                                minLength={6}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'all var(--transition-fast)'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--primary-blue)',
                                color: 'var(--white)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                        >
                            Change Password
                        </button>

                        {pwState.message && (
                            <div style={{
                                marginTop: '12px',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                ...(pwState.message.includes('success') || pwState.message.includes('Changed') ? {
                                    background: 'var(--success-bg)',
                                    color: 'var(--success)',
                                    borderLeft: '4px solid var(--success)'
                                } : {
                                    background: 'var(--error-bg)',
                                    color: 'var(--error)',
                                    borderLeft: '4px solid var(--error)'
                                })
                            }}>
                                {pwState.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}