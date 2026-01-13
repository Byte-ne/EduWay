import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resetMode, setResetMode] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [resetStep, setResetStep] = useState(1) // 1: email, 2: code, 3: new password
    const navigate = useNavigate()

    const getDetailedError = (message) => {
        const errorMap = {
            'User not found': 'No account found with this email address. Please check your email or sign up.',
            'Invalid credentials': 'Incorrect password. Please try again or reset your password.',
            'Invalid email or password': 'The email or password you entered is incorrect. Please try again.',
            'Login failed': 'Unable to sign in. Please check your credentials and try again.',
            'Network error': 'Connection failed. Please check your internet connection and try again.',
            'Invalid reset code': 'The reset code you entered is incorrect. Please check and try again.',
            'Reset code expired': 'The reset code has expired. Please request a new one.',
            'Password reset failed': 'Unable to reset password. Please try again.'
        }
        return errorMap[message] || message
    }

    const handleForgotPassword = () => {
        setResetMode(true)
        setResetStep(1)
        setResetEmail('')
        setResetCode('')
        setNewPassword('')
    }

    const handleResetBack = () => {
        setResetMode(false)
        setResetStep(1)
        setResetEmail('')
        setResetCode('')
        setNewPassword('')
    }

    const handleResetRequest = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`https://final-hackathon-me4n.onrender.com/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(getDetailedError(data.message || 'Failed to send reset code'))
                setLoading(false)
                return
            }

            alert('Reset code sent to your email. Please check your inbox.')
            setResetStep(2)
        } catch (err) {
            alert(getDetailedError('Network error'))
        }
        setLoading(false)
    }

    const handleResetVerify = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`https://final-hackathon-me4n.onrender.com/api/auth/verify-reset-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, code: resetCode })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(getDetailedError(data.message || 'Invalid reset code'))
                setLoading(false)
                return
            }

            alert('Code verified successfully. Please set your new password.')
            setResetStep(3)
        } catch (err) {
            alert(getDetailedError('Network error'))
        }
        setLoading(false)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long.')
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`https://final-hackathon-me4n.onrender.com/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, code: resetCode, newPassword })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(getDetailedError(data.message || 'Password reset failed'))
                setLoading(false)
                return
            }

            alert('Password reset successfully! You can now sign in with your new password.')
            setResetMode(false)
            setResetStep(1)
        } catch (err) {
            alert(getDetailedError('Network error'))
        }
        setLoading(false)
    }

    async function handle(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`https://final-hackathon-me4n.onrender.com/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(getDetailedError(data.message || 'Login failed'))
                setLoading(false)
                return
            }

            localStorage.setItem('token', data.token)
            alert('Welcome back! Redirecting to your dashboard...')

            // Slight delay for better UX
            setTimeout(() => {
                navigate('/profile')
            }, 500)
        } catch (err) {
            alert(getDetailedError('Network error'))
            setLoading(false)
        }
    }

    if (resetMode) {
        return (
            <div className="auth-shell">
                <form className="auth-card" onSubmit={
                    resetStep === 1 ? handleResetRequest :
                    resetStep === 2 ? handleResetVerify :
                    handleResetPassword
                }>
                    <MapPin className="auth-card-icon" size={40} />

                    <h2 className="title">
                        {resetStep === 1 ? 'Reset Password' :
                         resetStep === 2 ? 'Verify Code' :
                         'Set New Password'}
                    </h2>
                    <p className="subtitle">
                        {resetStep === 1 ? 'Enter your email to receive a reset code' :
                         resetStep === 2 ? 'Enter the 6-digit code sent to your email' :
                         'Create a new secure password'}
                    </p>

                    {resetStep === 1 && (
                        <div className="field">
                            <label htmlFor="reset-email" className="field-label">Email</label>
                            <div className="field-input-wrapper">
                                <Mail size={18} className="field-icon" />
                                <input
                                    id="reset-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={e => setResetEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}

                    {resetStep === 2 && (
                        <div className="field">
                            <label htmlFor="reset-code" className="field-label">Reset Code</label>
                            <div className="field-input-wrapper">
                                <Lock size={18} className="field-icon" />
                                <input
                                    id="reset-code"
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    value={resetCode}
                                    onChange={e => setResetCode(e.target.value)}
                                    required
                                    disabled={loading}
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    )}

                    {resetStep === 3 && (
                        <div className="field">
                            <label htmlFor="new-password" className="field-label">New Password</label>
                            <div className="field-input-wrapper">
                                <Lock size={18} className="field-icon" />
                                <input
                                    id="new-password"
                                    type="password"
                                    placeholder="Enter new password (min. 6 characters)"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    minLength={6}
                                />
                            </div>
                        </div>
                    )}

                    <button className="submit" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                {resetStep === 1 ? 'Sending...' :
                                 resetStep === 2 ? 'Verifying...' :
                                 'Resetting...'}
                            </>
                        ) : (
                            resetStep === 1 ? 'Send Reset Code' :
                            resetStep === 2 ? 'Verify Code' :
                            'Reset Password'
                        )}
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <button
                            type="button"
                            onClick={handleResetBack}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textDecoration: 'underline'
                            }}
                            disabled={loading}
                        >
                            ← Back to Sign In
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="auth-shell">
            <form className="auth-card" onSubmit={handle}>
                <MapPin className="auth-card-icon" size={40} />

                <h2 className="title">Welcome Back</h2>
                <p className="subtitle">Continue your learning journey with EduWay</p>

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
                    <label htmlFor="password" className="field-label">Password</label>
                    <div className="field-input-wrapper">
                        <Lock size={18} className="field-icon" />
                        <input
                            id="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
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
                            Signing in...
                        </>
                    ) : (
                        'Sign in'
                    )}
                </button>

                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--primary-blue)',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            textDecoration: 'underline'
                        }}
                        disabled={loading}
                    >
                        Forgot Password?
                    </button>
                </div>

                <div className="auth-footer">
                    Don't have an account? <Link to="/signup" className="auth-link">Create one</Link>
                </div>
            </form>
        </div>
    )
}
