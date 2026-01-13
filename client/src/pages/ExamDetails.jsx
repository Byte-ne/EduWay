import React, { useState, useEffect } from 'react'
import { Search, Calendar, BookOpen, Target, Clock } from 'lucide-react'

export default function ExamDetails() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedExam, setSelectedExam] = useState(null)
    const [exams, setExams] = useState([])

    const examsData = [
        {
            id: 'upsc',
            name: 'UPSC - Civil Services (CSE)',
            type: 'National',
            difficulty: 'Very High',
            syllabus: [
                'Indian Polity & Constitution',
                'History & Culture',
                'Geography',
                'Economics',
                'Environment & Ecology',
                'Science & Technology',
                'Current Affairs',
                'Optional subject (varies)'
            ],
            outcomes: [
                'IAS, IPS, IFS, IRS & other central services',
                'Policy roles & State services'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-02-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-05-16'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-07-15'), note: 'Provisional' }
            ]
        },
        {
            id: 'jee',
            name: 'JEE (Main + Advanced)',
            type: 'National',
            difficulty: 'High',
            syllabus: [
                'Physics (Mechanics, Electrodynamics, Optics)',
                'Chemistry (Physical, Organic, Inorganic)',
                'Mathematics (Algebra, Calculus, Coordinate Geometry)'
            ],
            outcomes: [
                'Admission to IITs, NITs, and engineering colleges',
                'Engineering jobs & research paths'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-01-15'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-04-10'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-05-10'), note: 'Provisional' }
            ]
        },
        {
            id: 'neet',
            name: 'NEET UG',
            type: 'National',
            difficulty: 'High',
            syllabus: [
                'Physics',
                'Chemistry',
                'Biology (Botany & Zoology)'
            ],
            outcomes: [
                'MBBS, BDS and other medical/paramedical colleges'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-01-20'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-05-05'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-06-10'), note: 'Provisional' }
            ]
        },
        {
            id: 'ssc',
            name: 'SSC CGL',
            type: 'National',
            difficulty: 'Medium',
            syllabus: [
                'General Intelligence & Reasoning',
                'General Awareness',
                'Quantitative Aptitude',
                'English Comprehension'
            ],
            outcomes: [
                'Group B & C posts in Central Govt departments'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-03-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-06-15'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-08-15'), note: 'Provisional' }
            ]
        },
        {
            id: 'gate',
            name: 'GATE',
            type: 'National',
            difficulty: 'High',
            syllabus: [
                'Core engineering subjects (discipline specific)',
                'Engineering Mathematics',
                'General Aptitude'
            ],
            outcomes: [
                'Postgraduate admissions (MTech), PSU jobs, Research'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-08-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-02-01'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-03-15'), note: 'Provisional' }
            ]
        },
        {
            id: 'cat',
            name: 'CAT',
            type: 'National',
            difficulty: 'High',
            syllabus: [
                'Verbal Ability & Reading Comprehension',
                'Data Interpretation & Logical Reasoning',
                'Quantitative Ability'
            ],
            outcomes: [
                'Admission to IIMs and top B-schools, corporate roles'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-07-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-11-29'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-12-31'), note: 'Provisional' }
            ]
        },
        {
            id: 'clat',
            name: 'CLAT',
            type: 'National',
            difficulty: 'Medium',
            syllabus: [
                'English including comprehension',
                'Current affairs & GK',
                'Legal reasoning',
                'Logical reasoning',
                'Quantitative techniques'
            ],
            outcomes: [
                'Undergraduate & Postgraduate law programs (NLUs) and legal careers'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-07-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-12-03'), note: 'Tentative' },
                { label: 'Result', date: new Date('2027-01-15'), note: 'Provisional' }
            ]
        },
        {
            id: 'bankpo',
            name: 'Bank PO (IBPS/State)',
            type: 'National',
            difficulty: 'Medium',
            syllabus: [
                'Reasoning',
                'English Language',
                'Quantitative Aptitude',
                'General Awareness'
            ],
            outcomes: [
                'Bank probationary officer roles and clerk posts'
            ],
            dates: [
                { label: 'Application opens', date: new Date('2026-06-01'), note: 'Apply online' },
                { label: 'Exam date', date: new Date('2026-09-15'), note: 'Tentative' },
                { label: 'Result', date: new Date('2026-11-15'), note: 'Provisional' }
            ]
        }
    ]

    useEffect(() => {
        setExams(examsData)
    }, [])

    const filteredExams = exams.filter(exam =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const addToCalendar = () => {
        if (!selectedExam) return
        const examDate = selectedExam.dates.find(d => d.label.toLowerCase().includes('exam')) || selectedExam.dates[0]
        if (!examDate) return

        const title = encodeURIComponent(selectedExam.name)
        const startDate = examDate.date.toISOString().replace(/[-:]/g, '').split('.')[0]
        const endDate = new Date(examDate.date.getTime() + 3 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=Exam%20Date%20for%20${encodeURIComponent(selectedExam.name)}`
        window.open(calendarUrl, '_blank')
    }

    return (
        <div className="exam-layout" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'var(--space-8) var(--space-6)',
            display: 'grid',
            gridTemplateColumns: '420px 1fr',
            gap: 'var(--space-8)',
            minHeight: 'calc(100vh - 72px)'
        }}>
            {/* Sidebar */}
            <aside className="exam-sidebar" style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-6)',
                border: '2px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                height: 'fit-content',
                position: 'sticky',
                top: '88px'
            }}>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>Search Exams</h3>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                        <input
                            type="search"
                            placeholder="Search exams..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="exam-search"
                            style={{
                                width: '100%',
                                padding: 'var(--space-3) var(--space-3) var(--space-3) 48px',
                                border: '2px solid var(--border-medium)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                fontWeight: '500',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {filteredExams.map((exam) => (
                        <button
                            key={exam.id}
                            onClick={() => setSelectedExam(exam)}
                            className="exam-tab"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: 'var(--space-4)',
                                background: selectedExam?.id === exam.id ? 'var(--primary)' : 'var(--bg-secondary)',
                                color: selectedExam?.id === exam.id ? 'var(--white)' : 'var(--text-primary)',
                                border: `2px solid ${selectedExam?.id === exam.id ? 'var(--primary)' : 'var(--border-light)'}`,
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)',
                                textAlign: 'left',
                                fontFamily: 'inherit'
                            }}
                        >
                            <div style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                marginBottom: 'var(--space-1)'
                            }}>
                                {exam.name}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                opacity: 0.8
                            }}>
                                {exam.type} • {exam.difficulty}
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Exam Details */}
            <main className="exam-main">
                {selectedExam ? (
                    <article style={{
                        background: 'var(--white)',
                        borderRadius: 'var(--radius-2xl)',
                        padding: 'var(--space-8)',
                        border: '2px solid var(--border-light)',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        {/* Header */}
                        <header style={{
                            marginBottom: 'var(--space-8)',
                            paddingBottom: 'var(--space-6)',
                            borderBottom: '2px solid var(--border-light)'
                        }}>
                            <h1 style={{
                                fontSize: '40px',
                                fontWeight: '800',
                                color: 'var(--text-primary)',
                                marginBottom: 'var(--space-4)',
                                letterSpacing: '-0.02em'
                            }}>
                                {selectedExam.name}
                            </h1>
                            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                                <span style={{
                                    padding: 'var(--space-2) var(--space-4)',
                                    background: 'var(--primary)',
                                    color: 'var(--white)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '14px',
                                    fontWeight: '700'
                                }}>
                                    {selectedExam.type}
                                </span>
                                <span style={{
                                    padding: 'var(--space-2) var(--space-4)',
                                    background: selectedExam.difficulty === 'Very High' ? 'var(--error)' :
                                               selectedExam.difficulty === 'High' ? 'var(--warning)' :
                                               selectedExam.difficulty === 'Medium' ? 'var(--accent)' : 'var(--success)',
                                    color: 'var(--white)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '14px',
                                    fontWeight: '700'
                                }}>
                                    {selectedExam.difficulty}
                                </span>
                            </div>
                        </header>

                        {/* Content Grid */}
                        <div className="exam-content" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '32px',
                            marginBottom: '32px'
                        }}>
                            {/* Syllabus */}
                            <div className="exam-section">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <BookOpen size={20} style={{ color: 'var(--primary-blue)' }} />
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        margin: 0
                                    }}>
                                        Syllabus
                                    </h3>
                                </div>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}>
                                    {selectedExam.syllabus.map((item, index) => (
                                        <li key={index} style={{
                                            padding: '12px',
                                            background: 'var(--off-white)',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '14px',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Outcomes & Dates */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Outcomes */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '16px'
                                    }}>
                                        <Target size={20} style={{ color: 'var(--accent-green)' }} />
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)',
                                            margin: 0
                                        }}>
                                            Leads to
                                        </h3>
                                    </div>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        {selectedExam.outcomes.map((outcome, index) => (
                                            <li key={index} style={{
                                                padding: '12px',
                                                background: 'var(--off-white)',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '14px',
                                                color: 'var(--text-primary)'
                                            }}>
                                                {outcome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Dates */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '16px'
                                    }}>
                                        <Clock size={20} style={{ color: 'var(--warning)' }} />
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)',
                                            margin: 0
                                        }}>
                                            Upcoming Dates
                                        </h3>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px'
                                    }}>
                                        {selectedExam.dates.map((dateItem, index) => (
                                            <div key={index} style={{
                                                padding: '16px',
                                                background: 'var(--off-white)',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div>
                                                    <div style={{
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        color: 'var(--text-primary)',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {formatDate(dateItem.date)}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '14px',
                                                        color: 'var(--text-secondary)'
                                                    }}>
                                                        {dateItem.label} • {dateItem.note}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`${selectedExam.name} • ${dateItem.label} • ${formatDate(dateItem.date)}`)}
                                                    style={{
                                                        padding: '8px',
                                                        background: 'var(--primary-blue)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius-md)',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingTop: '24px',
                            borderTop: '1px solid var(--border-light)'
                        }}>
                            <button
                                onClick={addToCalendar}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    background: 'var(--primary-blue)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <Calendar size={16} />
                                Add to Calendar
                            </button>
                        </footer>
                    </article>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '60vh',
                        textAlign: 'center',
                        background: 'var(--white)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '48px',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <Search size={64} style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '24px',
                            opacity: 0.5
                        }} />
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '8px'
                        }}>
                            Pick an exam
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: 'var(--text-secondary)',
                            maxWidth: '400px'
                        }}>
                            Choose an exam from the left to see syllabus, career paths and upcoming dates.
                        </p>
                    </div>
                )}

                {/* Tips Section */}
                <section style={{
                    marginTop: '32px',
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '16px'
                    }}>
                        Tips
                    </h3>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <li style={{ color: 'var(--text-secondary)' }}>• Use the search to quickly find an exam.</li>
                        <li style={{ color: 'var(--text-secondary)' }}>• Click dates to copy to clipboard or add to your calendar.</li>
                        <li style={{ color: 'var(--text-secondary)' }}>• Use keyboard arrows to navigate cards and press Enter to open.</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}
