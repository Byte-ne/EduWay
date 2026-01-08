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
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: '32px',
            minHeight: '100vh'
        }}>
            {/* Exam List Sidebar */}
            <aside style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                boxShadow: 'var(--shadow-md)',
                height: 'fit-content',
                position: 'sticky',
                top: '24px'
            }}>
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        <Search size={20} style={{ color: 'var(--text-secondary)' }} />
                        <input
                            type="search"
                            placeholder="Search exams"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredExams.map((exam) => (
                        <button
                            key={exam.id}
                            onClick={() => setSelectedExam(exam)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '16px',
                                background: selectedExam?.id === exam.id ? 'var(--primary-blue)' : 'var(--off-white)',
                                color: selectedExam?.id === exam.id ? 'white' : 'var(--text-primary)',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '4px'
                            }}>
                                {exam.name}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                opacity: selectedExam?.id === exam.id ? 0.9 : 0.7
                            }}>
                                {exam.type} • {exam.difficulty}
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Exam Details */}
            <main>
                {selectedExam ? (
                    <article style={{
                        background: 'var(--white)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '32px',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        {/* Header */}
                        <header style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '32px'
                        }}>
                            <div>
                                <h1 style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px'
                                }}>
                                    {selectedExam.name}
                                </h1>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <span style={{
                                        padding: '6px 12px',
                                        background: 'var(--primary-blue)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>
                                        {selectedExam.type}
                                    </span>
                                    <span style={{
                                        padding: '6px 12px',
                                        background: selectedExam.difficulty === 'Very High' ? '#dc3545' :
                                                   selectedExam.difficulty === 'High' ? '#fd7e14' :
                                                   selectedExam.difficulty === 'Medium' ? '#ffc107' : '#28a745',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>
                                        {selectedExam.difficulty}
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Content Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '32px',
                            marginBottom: '32px'
                        }}>
                            {/* Syllabus */}
                            <div>
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
