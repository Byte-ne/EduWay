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
            const res = await fetch('http://localhost:5000/api/study/ask-ai', {
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
            const res = await fetch('http://localhost:5000/api/study/generate-questions', {
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
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                }}>
                    Study Assistant
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Get AI-powered help with your studies and generate practice questions
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* AI Helper */}
                <div style={{
                    background: 'var(--white)',
                    padding: '24px',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Lightbulb size={24} style={{ color: 'var(--warning)' }} />
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
                            AI Study Helper
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Ask any question about your studies, concepts, or exam preparation
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                        <textarea
                            value={aiQuery}
                            onChange={e => setAiQuery(e.target.value)}
                            placeholder="e.g., Explain Newton's laws of motion..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                minHeight: '100px',
                                outline: 'none',
                                resize: 'vertical'
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
                            gap: '8px',
                            padding: '12px 20px',
                            background: 'var(--primary-blue)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: loadingAi ? 'not-allowed' : 'pointer',
                            opacity: loadingAi ? 0.6 : 1
                        }}
                    >
                        {loadingAi ? <RefreshCw size={16} /> : <Send size={16} />}
                        {loadingAi ? 'Thinking...' : 'Ask AI'}
                    </button>

                    {aiResponse && (
                        <div style={{
                            marginTop: '20px',
                            padding: '16px',
                            background: 'var(--off-white)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                AI Response:
                            </h4>
                            <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                {aiResponse}
                            </p>
                        </div>
                    )}
                </div>

                {/* Question Generator */}
                <div style={{
                    background: 'var(--white)',
                    padding: '24px',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <BookOpen size={24} style={{ color: 'var(--accent-green)' }} />
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Question Generator
                        </h3>
                    </div>
                    <p style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Generate fresh practice questions for your exam preparation
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                            Exam Type:
                        </label>
                        <select
                            value={questionType}
                            onChange={e => setQuestionType(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                outline: 'none'
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
                            gap: '8px',
                            padding: '12px 20px',
                            background: 'var(--accent-green)',
                            color: 'var(--white)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: loadingQuestions ? 'not-allowed' : 'pointer',
                            opacity: loadingQuestions ? 0.6 : 1
                        }}
                    >
                        {loadingQuestions ? <RefreshCw size={16} /> : <Zap size={16} />}
                        {loadingQuestions ? 'Generating...' : 'Generate Questions'}
                    </button>

                    {generatedQuestions.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                Generated Questions:
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {generatedQuestions.map((q, i) => (
                                    <div key={i} style={{
                                        padding: '16px',
                                        background: 'var(--off-white)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-light)'
                                    }}>
                                        <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                            {i + 1}. {q.question}
                                        </div>
                                        {q.options && (
                                            <div style={{ marginLeft: '16px' }}>
                                                {q.options.map((opt, j) => (
                                                    <div key={j} style={{ marginBottom: '4px', color: 'var(--text-secondary)' }}>
                                                        {String.fromCharCode(97 + j)}) {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {q.answer && (
                                            <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--accent-green)', fontWeight: '500' }}>
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
