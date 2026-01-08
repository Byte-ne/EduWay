import React from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Compass, Home, UserCircle, LogOut, MapPin, Newspaper, Bell, Lightbulb, BookOpen, FileText } from 'lucide-react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Study from './pages/Study'
import QuestionBank from './pages/QuestionBank'
import ExamDetails from './pages/ExamDetails'
import ProtectedRoute from './components/ProtectedRoute'

function Navigation() {
    const navigate = useNavigate()
    const isAuthenticated = !!localStorage.getItem('token')
    const [notifications, setNotifications] = React.useState([])
    const [unread, setUnread] = React.useState(0)
    const [showNotif, setShowNotif] = React.useState(false)

    async function fetchNotifications() {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const res = await fetch('http://localhost:5000/api/auth/notifications', { headers: { Authorization: `Bearer ${token}` } })
            const data = await res.json()
            setNotifications(Array.isArray(data) ? data : [])
            setUnread((Array.isArray(data) ? data : []).filter(n => !n.read).length)
        } catch (e) { }
    }

    React.useEffect(() => {
        if (isAuthenticated) fetchNotifications()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    async function markRead(id) {
        try {
            const token = localStorage.getItem('token')
            await fetch('http://localhost:5000/api/auth/notifications/mark-read', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id }) })
            fetchNotifications()
        } catch (e) { }
    }

    async function markAll() {
        try {
            const token = localStorage.getItem('token')
            await fetch('http://localhost:5000/api/auth/notifications/mark-all', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
            fetchNotifications()
        } catch (e) { }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <Compass size={24} />
                    Exam Compass
                </Link>

                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/" className="nav-link">
                                <Home size={16} />
                                Home
                            </Link>
                            <Link to="/feed" className="nav-link">
                                <Newspaper size={16} />
                                Feed
                            </Link>
                            <Link to="/study" className="nav-link">
                                <Lightbulb size={16} />
                                Study
                            </Link>
                            <Link to="/question-bank" className="nav-link">
                                <BookOpen size={16} />
                                Question Bank
                            </Link>
                            <Link to="/exam-details" className="nav-link">
                                <FileText size={16} />
                                Exam Details
                            </Link>
                            <Link to="/profile" className="nav-link">
                                <UserCircle size={16} />
                                Profile
                            </Link>
                            <div style={{ position: 'relative' }}>
                                <button type="button" className="nav-link" onClick={() => { setShowNotif(s => !s); if (!showNotif) fetchNotifications() }} style={{ position: 'relative' }}>
                                    <Bell size={16} />
                                    Notifications
                                    {unread > 0 && <span className="notif-badge">{unread}</span>}
                                </button>
                                {showNotif && (
                                    <div className="notif-dropdown">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--border-light)' }}>
                                            <strong>Notifications</strong>
                                            <button type="button" onClick={markAll} style={{ background: 'transparent', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer' }}>Mark all read</button>
                                        </div>
                                        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                                            {notifications.length === 0 && <div style={{ padding: 12, color: 'var(--text-secondary)' }}>No notifications</div>}
                                            {notifications.map((n) => (
                                                <div key={n._id} className="notif-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ padding: 10 }}>
                                                        <div style={{ fontWeight: 600 }}>{n.type.replace('_', ' ')}</div>
                                                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.text}</div>
                                                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{new Date(n.createdAt).toLocaleString()}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 8 }}>
                                                        {!n.read && <button type="button" onClick={() => markRead(n._id)} style={{ padding: '6px 8px', borderRadius: 8, background: 'var(--primary-blue)', color: '#fff', border: 'none' }}>Mark read</button>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="nav-link"
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <LogOut size={16} />
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                <MapPin size={16} />
                                Sign in
                            </Link>
                            <Link to="/signup" className="nav-link primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

function HomePage() {
    const isAuthenticated = !!localStorage.getItem('token')
    const [stats, setStats] = React.useState({
        students: 0,
        papers: 0,
        exams: 0,
        stories: 0
    })

    React.useEffect(() => {
        // Animate stats counters
        const animateCounter = (element, target) => {
            let current = 0
            const increment = target / 100
            const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                    current = target
                    clearInterval(timer)
                }
                element.textContent = Math.floor(current).toLocaleString()
            }, 30)
        }

        const statElements = document.querySelectorAll('[data-count]')
        statElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'))
            animateCounter(el, target)
        })
    }, [])

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: 'url(/src/assets/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            {/* Hero Section */}
            <main style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 24px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '400px 1fr',
                    gap: '60px',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    width: '100%'
                }}>
                    <div style={{
                        animation: 'float 4s ease-in-out infinite',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: '-10px',
                            background: 'linear-gradient(135deg, #4285F4, #34A853)',
                            borderRadius: '24px',
                            opacity: 0.1,
                            zIndex: -1,
                            animation: 'pulse 2s ease-in-out infinite'
                        }}></div>
                        <div style={{
                            width: '100%',
                            height: '300px',
                            background: 'linear-gradient(135deg, #4285F4, #34A853)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            boxShadow: '0 12px 40px rgba(66, 133, 244, 0.2)',
                            border: '3px solid #E8F0FE'
                        }}>
                            🎓
                        </div>
                    </div>
                    <div style={{
                        animation: 'slideInRight 0.8s ease-out 0.2s both'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                            marginBottom: '16px',
                            color: 'var(--text-primary)',
                            fontWeight: '900',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Learn. Compete. Succeed.
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '20px',
                            marginBottom: '32px',
                            lineHeight: '1.7',
                            fontWeight: '400'
                        }}>
                            Your ultimate companion for competitive exam preparation with 100+ past papers and engaging games.
                        </p>
                        {!isAuthenticated && (
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Link
                                    to="/signup"
                                    style={{
                                        padding: '14px 32px',
                                        background: '#4285F4',
                                        color: 'white',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 16px rgba(66, 133, 244, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    style={{
                                        padding: '14px 32px',
                                        background: 'white',
                                        color: '#4285F4',
                                        border: '2px solid #4285F4',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Learn More
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section style={{
                padding: '80px 24px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '36px',
                        textAlign: 'center',
                        marginBottom: '60px',
                        color: 'var(--text-primary)',
                        fontWeight: '700'
                    }}>
                        Everything You Need to Succeed
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { icon: '📄', title: 'Past Year Papers', desc: 'Access 100+ past papers for all major competitive exams. Practice with authentic questions and excel in your preparation.', color: '#4285F4' },
                            { icon: '📸', title: 'Success Stories', desc: 'Share your achievements and inspire others. Post your success pictures and stories with the community.', color: '#34A853' },
                            { icon: '🎮', title: 'Competitive Games', desc: 'Challenge your friends with educational games. Make learning fun while competing and improving together.', color: '#4285F4' },
                            { icon: '🔍', title: 'Exam Deep Dive', desc: 'Get comprehensive insights about all competitive exams. Understand patterns, strategies, and requirements.', color: '#34A853' }
                        ].map((feature, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '32px',
                                borderRadius: '20px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '2px solid #F5F5F5',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    background: `linear-gradient(90deg, ${feature.color}, #34A853)`
                                }}></div>
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '16px',
                                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                                    color: feature.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.2rem',
                                    marginBottom: '24px',
                                    boxShadow: `0 4px 12px ${feature.color}30`,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    marginBottom: '12px',
                                    color: 'var(--text-primary)',
                                    fontWeight: '600'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.7',
                                    fontSize: '15px'
                                }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                padding: '80px 24px',
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { number: 10000, label: 'Active Students' },
                            { number: 100, label: 'Past Papers' },
                            { number: 25, label: 'Competitive Exams' },
                            { number: 500, label: 'Success Stories' }
                        ].map((stat, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                color: 'white',
                                padding: '32px'
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    fontWeight: '800',
                                    marginBottom: '8px'
                                }} data-count={stat.number}>
                                    0
                                </div>
                                <div style={{
                                    fontSize: '18px',
                                    opacity: 0.9
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '80px 24px',
                background: 'rgba(245, 245, 245, 0.95)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    padding: '48px',
                    background: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '32px',
                        marginBottom: '16px',
                        color: 'var(--text-primary)',
                        fontWeight: '700'
                    }}>
                        Ready to Ace Your Exams?
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: 'var(--text-secondary)',
                        marginBottom: '32px',
                        lineHeight: '1.7'
                    }}>
                        Join thousands of students preparing smarter with 100+ past papers and competitive games.
                    </p>
                    <Link
                        to="/signup"
                        style={{
                            padding: '16px 40px',
                            background: 'linear-gradient(135deg, #4285F4, #34A853)',
                            color: 'white',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontSize: '18px',
                            fontWeight: '600',
                            boxShadow: '0 8px 32px rgba(66, 133, 244, 0.3)',
                            display: 'inline-block',
                            transition: 'all 0.2s'
                        }}
                    >
                        Start Preparing Now
                    </Link>
                </div>
            </section>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.05); opacity: 0.15; }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                    <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />
                    <Route path="/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
                    <Route path="/exam-details" element={<ProtectedRoute><ExamDetails /></ProtectedRoute>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
