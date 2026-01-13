import React, { useState } from 'react'
import { BookOpen, MessageSquare, Zap, Send, Lightbulb, RefreshCw } from 'lucide-react'

export default function Study() {
    const [aiQuery, setAiQuery] = useState('')
    const [aiResponse, setAiResponse] = useState('')
    const [loadingAi, setLoadingAi] = useState(false)
    const [questionType, setQuestionType] = useState('jee')
    const [generatedQuestions, setGeneratedQuestions] = useState([])
    const [loadingQuestions, setLoadingQuestions] = useState(false)

    async function askAi() {
        if (!aiQuery.trim()) return
        setLoadingAi(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('https://final-hackathon-me4n.onrender.com/api/study/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ query: aiQuery })
            })
            const data = await res.json()
            if (res.ok) {
                setAiResponse(data.response)
            } else {
                alert(data.message || 'Failed')
            }
        } catch (e) {
            alert('Network error')
        }
        setLoadingAi(false)
    }

    async function generateQuestions() {
        setLoadingQuestions(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('https://final-hackathon-me4n.onrender.com/api/study/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type: questionType })
            })
            const data = await res.json()
            if (res.ok) {
                setGeneratedQuestions(data.questions || [])
            } else {
                alert(data.message || 'Failed')
            }
        } catch (e) {
            alert('Network error')
        }
        setLoadingQuestions(false)
    }

    return (
        <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'var(--space-8) var(--space-6)',
            minHeight: 'calc(100vh - 72px)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                <h1 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-3)',
                    letterSpacing: '-0.02em'
                }}>
                    AI Study Assistant
                </h1>
                <p style={{
                    fontSize: '18px',
                    color: 'var(--text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                }}>
                    Get instant AI-powered help and generate custom practice questions
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)' }}>
                {/* AI Helper */}
                <div style={{
                    background: 'var(--white)',
                    padding: 'var(--space-8)',
                    borderRadius: 'var(--radius-2xl)',
                    border: '2px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        <div style={{ padding: 'var(--space-3)', background: 'var(--accent-light)', borderRadius: 'var(--radius-lg)' }}>
                            <Lightbulb size={28} style={{ color: 'var(--accent)' }} />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                            Ask AI
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 var(--space-6) 0', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                        Ask any question about your studies, concepts, or exam preparation
                    </p>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <textarea
                            value={aiQuery}
                            onChange={e => setAiQuery(e.target.value)}
                            placeholder="e.g., Explain Newton's laws of motion..."
                            style={{
                                width: '100%',
                                padding: 'var(--space-4)',
                                border: '2px solid var(--border-medium)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                fontWeight: '500',
                                minHeight: '120px',
                                outline: 'none',
                                resize: 'vertical',
                                transition: 'all var(--transition-base)'
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={askAi}
                        disabled={loadingAi || !aiQuery.trim()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)',
                            padding: 'var(--space-4) var(--space-6)',
                            background: 'var(--primary)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '16px',
                            fontWeight: '700',
                            fontFamily: 'inherit',
                            cursor: loadingAi ? 'not-allowed' : 'pointer',
                            opacity: loadingAi ? 0.6 : 1,
                            boxShadow: 'var(--shadow-md)',
                            transition: 'all var(--transition-base)',
                            width: '100%'
                        }}
                    >
                        {loadingAi ? <RefreshCw size={18} /> : <Send size={18} />}
                        {loadingAi ? 'Thinking...' : 'Ask AI'}
                    </button>

                    {aiResponse && (
                        <div style={{
                            marginTop: 'var(--space-5)',
                            padding: 'var(--space-5)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '2px solid var(--border-light)'
                        }}>
                            <h4 style={{ margin: '0 0 var(--space-3) 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                AI Response:
                            </h4>
                            <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontSize: '15px' }}>
                                {aiResponse}
                            </p>
                        </div>
                    )}
                </div>

                {/* Question Generator */}
                <div style={{
                    background: 'var(--white)',
                    padding: 'var(--space-8)',
                    borderRadius: 'var(--radius-2xl)',
                    border: '2px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        <div style={{ padding: 'var(--space-3)', background: 'var(--success-light)', borderRadius: 'var(--radius-lg)' }}>
                            <BookOpen size={28} style={{ color: 'var(--success)' }} />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                            Question Generator
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 var(--space-6) 0', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                        Generate fresh practice questions for your exam preparation
                    </p>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Exam Type:
                        </label>
                        <select
                            value={questionType}
                            onChange={e => setQuestionType(e.target.value)}
                            style={{
                                width: '100%',
                                padding: 'var(--space-4)',
                                border: '2px solid var(--border-medium)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                fontWeight: '500',
                                outline: 'none',
                                background: 'var(--white)',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="jee">JEE</option>
                            <option value="neet">NEET</option>
                            <option value="upsc">UPSC</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={generateQuestions}
                        disabled={loadingQuestions}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)',
                            padding: 'var(--space-4) var(--space-6)',
                            background: 'var(--success)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '16px',
                            fontWeight: '700',
                            fontFamily: 'inherit',
                            cursor: loadingQuestions ? 'not-allowed' : 'pointer',
                            opacity: loadingQuestions ? 0.6 : 1,
                            boxShadow: 'var(--shadow-md)',
                            transition: 'all var(--transition-base)',
                            width: '100%'
                        }}
                    >
                        {loadingQuestions ? <RefreshCw size={18} /> : <Zap size={18} />}
                        {loadingQuestions ? 'Generating...' : 'Generate Questions'}
                    </button>

                    {generatedQuestions.length > 0 && (
                        <div style={{ marginTop: 'var(--space-6)' }}>
                            <h4 style={{ margin: '0 0 var(--space-4) 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                Generated Questions:
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {generatedQuestions.map((q, i) => (
                                    <div key={i} style={{
                                        padding: 'var(--space-5)',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-lg)',
                                        border: '2px solid var(--border-light)'
                                    }}>
                                        <div style={{ fontWeight: '700', marginBottom: 'var(--space-3)', color: 'var(--text-primary)', fontSize: '16px' }}>
                                            {i + 1}. {q.question}
                                        </div>
                                        {q.options && (
                                            <div style={{ marginLeft: 'var(--space-4)' }}>
                                                {q.options.map((opt, j) => (
                                                    <div key={j} style={{ marginBottom: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: '15px' }}>
                                                        <strong>{String.fromCharCode(97 + j)})</strong> {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {q.answer && (
                                            <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '2px solid var(--border-light)', fontSize: '15px', color: 'var(--success)', fontWeight: '700' }}>
                                                Answer: {q.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
