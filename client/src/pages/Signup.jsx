import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, Compass, CheckCircle } from 'lucide-react'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getDetailedError = (message) => {
        const errorMap = {
            'User already exists': 'An account with this email already exists. Please sign in instead.',
            'Email already in use': 'This email is already registered. Try signing in or use a different email.',
            'Invalid email': 'Please enter a valid email address.',
            'Password too short': 'Password must be at least 6 characters long.',
            'Registration failed': 'Unable to create account. Please try again.',
            'Network error': 'Connection failed. Please check your internet connection and try again.'
        }
        return errorMap[message] || message
    }

    async function handle(e) {
        e.preventDefault()
        setLoading(true)

        // Client-side validation
        if (name.trim().length < 2) {
            alert('Name must be at least 2 characters long.')
            setLoading(false)
            return
        }

        if (username.trim().length < 3) {
            alert('Username must be at least 3 characters long.')
            setLoading(false)
            return
        }

        const ageNum = parseInt(age, 10)
        if (isNaN(ageNum) || ageNum < 13) {
            alert('You must be 13 or older to register.')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long for security.')
            setLoading(false)
            return
        }

        try {
            const res = await fetch(`${__API_URL__}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, username, age })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(getDetailedError(data.message || 'Registration failed'))
                setLoading(false)
                return
            }

            localStorage.setItem('token', data.token)
            alert('Welcome to EduWay! Your learning journey starts now.')

            // Navigate after success toast
            setTimeout(() => {
                navigate('/profile')
            }, 1000)
        } catch (err) {
            alert(getDetailedError('Network error'))
            setLoading(false)
        }
    }

    return (
        <div className="auth-shell">
            <form className="auth-card" onSubmit={handle}>
                <Compass className="auth-card-icon" size={40} />

                <h2 className="title">Join EduWay</h2>
                <p className="subtitle">
                    Start your path to exam success with personalized AI-powered tools
                </p>

                <div className="field">
                    <label htmlFor="name" className="field-label">Full Name</label>
                    <div className="field-input-wrapper">
                        <User size={18} className="field-icon" />
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            disabled={loading}
                            minLength={2}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="email" className="field-label">Email</label>
                    <div className="field-input-wrapper">
                        <Mail size={18} className="field-icon" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="username" className="field-label">Username</label>
                    <div className="field-input-wrapper">
                        <User size={18} className="field-icon" />
                        <input
                            id="username"
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            disabled={loading}
                            minLength={3}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="age" className="field-label">Age</label>
                    <div className="field-input-wrapper">
                        <input
                            id="age"
                            type="number"
                            placeholder="Your age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            required
                            disabled={loading}
                            min={13}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="password" className="field-label">Password</label>
                    <div className="field-input-wrapper">
                        <Lock size={18} className="field-icon" />
                        <input
                            id="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Create a password (min. 6 characters)"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                        />
                        <button
                            type="button"
                            className="show-btn"
                            onClick={() => setShow(s => !s)}
                            aria-label="Toggle password visibility"
                            disabled={loading}
                        >
                            {show ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button className="submit" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Creating account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>

                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </div>
            </form>
        </div>
    )
}
