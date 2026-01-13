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
            const res = await fetch('${__API_BASE_URL__}/api/auth/notifications', { headers: { Authorization: `Bearer ${token}` } })
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
            await fetch('${__API_BASE_URL__}/api/auth/notifications/mark-read', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id }) })
            fetchNotifications()
        } catch (e) { }
    }

    async function markAll() {
        try {
            const token = localStorage.getItem('token')
            await fetch('${__API_BASE_URL__}/api/auth/notifications/mark-all', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
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
                    EduWay
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
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--white) 50%, var(--accent-light) 100%)',
                padding: '80px 24px',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    {/* Hero Content */}
                    <div style={{ animation: 'slideUp 0.8s ease-out' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            background: 'var(--primary)',
                            color: 'var(--white)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '14px',
                            fontWeight: '700',
                            marginBottom: '24px',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            ✨ Welcome to EduWay
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: '900',
                            color: 'var(--text-primary)',
                            lineHeight: '1.1',
                            marginBottom: '24px',
                            letterSpacing: '-0.03em'
                        }}>
                            Your Path to<br/>
                            <span style={{ 
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Exam Success</span>
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8',
                            marginBottom: '40px',
                            maxWidth: '600px'
                        }}>
                            Master competitive exams with AI-powered study tools, comprehensive question banks, and a supportive learning community.
                        </p>
                        {!isAuthenticated && (
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <Link to="/signup" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '18px 32px',
                                    background: 'var(--primary)',
                                    color: 'var(--white)',
                                    borderRadius: 'var(--radius-lg)',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    boxShadow: 'var(--shadow-lg)',
                                    transition: 'all var(--transition-base)',
                                    border: '2px solid var(--primary)'
                                }}>
                                    Get Started Free →
                                </Link>
                                <Link to="/login" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '18px 32px',
                                    background: 'transparent',
                                    color: 'var(--text-primary)',
                                    borderRadius: 'var(--radius-lg)',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    border: '2px solid var(--border-dark)',
                                    transition: 'all var(--transition-base)'
                                }}>
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Hero Visual */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'slideUp 0.8s ease-out 0.2s both'
                    }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '500px',
                            aspectRatio: '1',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            borderRadius: 'var(--radius-2xl)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '120px',
                            boxShadow: 'var(--shadow-2xl)',
                            border: '4px solid var(--white)',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: '-20px',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                borderRadius: 'var(--radius-2xl)',
                                opacity: 0.1,
                                filter: 'blur(40px)'
                            }}/>
                            🎓
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{
                padding: '100px 24px',
                background: 'var(--white)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{
                            fontSize: '42px',
                            fontWeight: '800',
                            color: 'var(--text-primary)',
                            marginBottom: '16px',
                            letterSpacing: '-0.02em'
                        }}>
                            Everything You Need
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Comprehensive tools and resources to excel in your exam preparation
                        </p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { icon: '📚', title: 'Question Bank', desc: '100+ past papers from top competitive exams with detailed solutions', color: 'var(--primary)' },
                            { icon: '🤖', title: 'AI Assistant', desc: 'Get instant help, explanations, and personalized study recommendations', color: 'var(--secondary)' },
                            { icon: '🎯', title: 'Smart Challenges', desc: 'Compete with friends through timed quizzes and track your progress', color: 'var(--accent)' },
                            { icon: '👥', title: 'Study Groups', desc: 'Connect with peers, share resources, and learn together', color: 'var(--success)' }
                        ].map((feature, i) => (
                            <div key={i} style={{
                                background: 'var(--white)',
                                padding: '32px',
                                borderRadius: 'var(--radius-xl)',
                                border: '2px solid var(--border-light)',
                                transition: 'all var(--transition-base)',
                                animation: `slideUp 0.6s ease-out ${i * 0.1}s both`
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: `${feature.color}20`,
                                    borderRadius: 'var(--radius-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '20px'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    marginBottom: '12px'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    fontSize: '15px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.7'
                                }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{
                padding: '100px 24px',
                background: 'var(--primary)',
                color: 'var(--white)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '48px',
                        textAlign: 'center'
                    }}>
                        {[
                            { number: 10000, label: 'Students' },
                            { number: 100, label: 'Past Papers' },
                            { number: 25, label: 'Exams Covered' },
                            { number: 500, label: 'Success Stories' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div style={{
                                    fontSize: '56px',
                                    fontWeight: '900',
                                    marginBottom: '8px',
                                    letterSpacing: '-0.02em'
                                }} data-count={stat.number}>
                                    {stat.number.toLocaleString()}
                                </div>
                                <div style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    opacity: 0.9,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{
                padding: '100px 24px',
                background: 'var(--bg-secondary)',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--white)',
                    padding: '64px 48px',
                    borderRadius: 'var(--radius-2xl)',
                    border: '2px solid var(--border-light)',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <h2 style={{
                        fontSize: '40px',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em'
                    }}>
                        Ready to Excel?
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        lineHeight: '1.7',
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        Join thousands of students who are acing their exams with EduWay's comprehensive study platform.
                    </p>
                    <Link to="/signup" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '20px 40px',
                        background: 'var(--primary)',
                        color: 'var(--white)',
                        borderRadius: 'var(--radius-lg)',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '18px',
                        boxShadow: 'var(--shadow-xl)',
                        transition: 'all var(--transition-base)',
                        border: '2px solid var(--primary)'
                    }}>
                        Start Learning Free →
                    </Link>
                </div>
            </section>
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
