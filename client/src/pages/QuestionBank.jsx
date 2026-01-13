import React, { useState } from 'react'
import { BookOpen, FileText, Download, ExternalLink, Search, Calendar, Award } from 'lucide-react'

export default function QuestionBank() {
    const [activeExam, setActiveExam] = useState('upsc')

    const examData = {
        upsc: {
            title: "UPSC Previous Year Papers",
            description: "Civil Services Examination - Comprehensive collection of past papers",
            icon: "🏛️",
            color: "#4285F4",
            papers: [
                {
                    year: "2024", links: [
                        { name: "CSE Prelims 2024 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2024 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "CSE Prelims 2023 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2023 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "CSE Prelims 2022 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2022 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "CSE Prelims 2021 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2021 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "CSE Prelims 2020 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2020 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "CSE Prelims 2019 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2019 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "CSE Prelims 2018 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2018 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "CSE Prelims 2017 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2017 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "CSE Prelims 2016 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2016 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "CSE Prelims 2015 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-preliminary" },
                        { name: "CSE Mains 2015 Papers", url: "https://www.upsc.gov.in/examinations/civil-services-examination-mains" }
                    ]
                }
            ]
        },
        neet: {
            title: "NEET UG Previous Year Papers",
            description: "National Eligibility cum Entrance Test - Medical entrance examination",
            icon: "⚕️",
            color: "#34A853",
            papers: [
                {
                    year: "2024", links: [
                        { name: "NEET UG 2024 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2024" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "NEET UG 2023 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2023" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "NEET UG 2022 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2022" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "NEET UG 2021 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2021" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "NEET UG 2020 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2020" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "NEET UG 2019 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2019" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "NEET UG 2018 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2018" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "NEET UG 2017 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2017" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "NEET UG 2016 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2016" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "NEET UG 2015 Papers", url: "https://neet.nta.nic.in/StudentPanel/Result/NeetUg2015" }
                    ]
                }
            ]
        },
        jee: {
            title: "JEE Main Previous Year Papers",
            description: "Joint Entrance Examination - Mathematics, Physics, Chemistry papers",
            icon: "⚡",
            color: "#EA4335",
            papers: [
                {
                    year: "2024", links: [
                        { name: "JEE Main 2024 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "JEE Main 2023 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "JEE Main 2022 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "JEE Main 2021 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "JEE Main 2020 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "JEE Main 2019 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "JEE Main 2018 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "JEE Main 2017 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "JEE Main 2016 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "JEE Main 2015 Papers", url: "https://jeemain.nta.nic.in/" }
                    ]
                }
            ]
        },
        gate: {
            title: "GATE Previous Year Papers",
            description: "Graduate Aptitude Test in Engineering - Subject-wise papers",
            icon: "🎓",
            color: "#FBBC05",
            papers: [
                {
                    year: "2024", links: [
                        { name: "GATE 2024 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "GATE 2023 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "GATE 2022 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "GATE 2021 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "GATE 2020 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "GATE 2019 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "GATE 2018 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "GATE 2017 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "GATE 2016 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "GATE 2015 Papers", url: "https://www.gate.iitb.ac.in/" }
                    ]
                }
            ]
        }
    }



    return (
        <div className="question-bank-page" style={{
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: 'var(--space-8) var(--space-6)'
        }}>
            {/* Header */}
            <div className="question-bank-header" style={{
                textAlign: 'center',
                marginBottom: 'var(--space-12)',
                maxWidth: '800px',
                margin: '0 auto var(--space-12)'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-6)',
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-2xl)',
                    marginBottom: 'var(--space-6)',
                    border: '2px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ padding: 'var(--space-3)', background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)' }}>
                        <BookOpen size={40} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h1 className="question-bank-title" style={{
                            fontSize: '42px',
                            fontWeight: '800',
                            color: 'var(--text-primary)',
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}>
                            Question Bank
                        </h1>
                        <p className="question-bank-subtitle" style={{
                            color: 'var(--text-secondary)',
                            margin: 'var(--space-2) 0 0 0',
                            fontSize: '16px',
                            lineHeight: '1.5'
                        }}>
                            100+ past papers from all major exams
                        </p>
                    </div>
                </div>
            </div>

            {/* Exam Tabs */}
            <div className="exam-tabs" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-10)',
                flexWrap: 'wrap',
                maxWidth: '1000px',
                margin: '0 auto var(--space-10)'
            }}>
                {Object.keys(examData).map(exam => (
                    <button
                        key={exam}
                        onClick={() => setActiveExam(exam)}
                        style={{
                            padding: 'var(--space-4) var(--space-6)',
                            borderRadius: 'var(--radius-lg)',
                            background: activeExam === exam ? 'var(--primary)' : 'var(--white)',
                            color: activeExam === exam ? 'var(--white)' : 'var(--text-primary)',
                            border: `2px solid ${activeExam === exam ? 'var(--primary)' : 'var(--border-light)'}`,
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '15px',
                            fontFamily: 'inherit',
                            transition: 'all var(--transition-base)',
                            boxShadow: activeExam === exam ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>{examData[exam].icon}</span>
                        {exam.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Exam Info */}
            <div className="exam-info" style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-8)',
                border: '2px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto var(--space-8)'
            }}>
                <div className="exam-info-icon" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    height: '100px',
                    background: 'var(--primary-light)',
                    borderRadius: '50%',
                    marginBottom: 'var(--space-5)',
                    border: '3px solid var(--primary)'
                }}>
                    <span style={{ fontSize: '48px' }}>{examData[activeExam].icon}</span>
                </div>
                <h2 className="exam-info-title" style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-3)',
                    letterSpacing: '-0.02em'
                }}>
                    {examData[activeExam].title}
                </h2>
                <p className="exam-info-subtitle" style={{
                    color: 'var(--text-secondary)',
                    fontSize: '17px',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                }}>
                    {examData[activeExam].description}
                </p>
            </div>

            {/* Papers Grid */}
            <div className="papers-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'var(--space-6)',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {examData[activeExam].papers.map((paper, index) => (
                    <div
                        key={index}
                        className="paper-card"
                        style={{
                            background: 'var(--white)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-6)',
                            border: '2px solid var(--border-light)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        {/* Year */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            marginBottom: 'var(--space-5)',
                            paddingBottom: 'var(--space-4)',
                            borderBottom: '2px solid var(--border-light)'
                        }}>
                            <div className="paper-year-icon" style={{
                                width: '60px',
                                height: '60px',
                                background: 'var(--primary)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--white)',
                                fontSize: '22px',
                                fontWeight: '800'
                            }}>
                                {paper.year.slice(-2)}
                            </div>
                            <div>
                                <h3 className="paper-year-title" style={{
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    color: 'var(--text-primary)',
                                    margin: 0,
                                    letterSpacing: '-0.01em'
                                }}>
                                    {paper.year}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    margin: 'var(--space-1) 0 0 0',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Papers & Solutions
                                </p>
                            </div>
                        </div>

                        {/* Papers */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-3)'
                        }}>
                            {paper.links.map((link, linkIndex) => (
                                <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="paper-link"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: 'var(--space-4)',
                                        background: 'var(--bg-secondary)',
                                        border: '2px solid var(--border-light)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-base)',
                                        textDecoration: 'none',
                                        textAlign: 'left',
                                        width: '100%',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-3)'
                                    }}>
                                        <FileText className="paper-link-icon" size={22} style={{ color: 'var(--primary)' }} />
                                        <div>
                                            <div className="paper-link-title" style={{
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                color: 'var(--text-primary)'
                                            }}>
                                                {link.name}
                                            </div>
                                            <div className="paper-link-subtitle" style={{
                                                fontSize: '13px',
                                                color: 'var(--text-secondary)',
                                                fontWeight: '500'
                                            }}>
                                                Official Website
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink size={20} style={{ color: 'var(--text-tertiary)' }} />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Section */}
            <div className="info-section" style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                marginTop: '48px',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                }}>
                    <Award size={32} style={{ color: 'var(--primary-blue)' }} />
                    <h3 className="info-title" style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        margin: 0
                    }}>
                        Practice Makes Perfect
                    </h3>
                </div>
                <p className="info-text" style={{
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    maxWidth: '600px',
                    margin: '0 auto 24px'
                }}>
                    Regular practice with previous year question papers is the key to exam success.
                    Download, solve, and analyze your performance to improve continuously.
                </p>
                <div className="info-badges" style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <div className="info-badge" style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #4285F4, #34A853)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        📚 10 Years of Papers
                    </div>
                    <div className="info-badge" style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #EA4335, #FBBC05)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        🎯 Exam-Ready Practice
                    </div>
                    <div className="info-badge" style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #34A853, #4285F4)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        📊 Performance Analysis
                    </div>
                </div>
            </div>


        </div>
    )
}
