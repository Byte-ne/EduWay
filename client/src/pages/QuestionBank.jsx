import React, { useState } from 'react'
import { BookOpen, FileText, Download, ExternalLink, Search, Calendar, Award } from 'lucide-react'

export default function QuestionBank() {
    const [activeExam, setActiveExam] = useState('upsc')
    const [showPdfModal, setShowPdfModal] = useState(false)
    const [pdfUrl, setPdfUrl] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const examData = {
        upsc: {
            title: "UPSC Previous Year Papers",
            description: "Civil Services Examination - Comprehensive collection of past papers",
            icon: "🏛️",
            color: "#4285F4",
            papers: [
                {
                    year: "2024", links: [
                        { name: "CSE Prelims 2024 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2024/CSP2024-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2024 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2024/CSP2024-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2024 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2024/CM2024-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "CSE Prelims 2023 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2023/CSP2023-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2023 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2023/CSP2023-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2023 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2023/CM2023-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "CSE Prelims 2022 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2022/CSP2022-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2022 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2022/CSP2022-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2022 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2022/CM2022-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "CSE Prelims 2021 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2021/CSP2021-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2021 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2021/CSP2021-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2021 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2021/CM2021-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "CSE Prelims 2020 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2020/CSP2020-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2020 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2020/CSP2020-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2020 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2020/CM2020-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "CSE Prelims 2019 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2019/CSP2019-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2019 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2019/CSP2019-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2019 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2019/CM2019-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "CSE Prelims 2018 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2018/CSP2018-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2018 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2018/CSP2018-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2018 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2018/CM2018-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "CSE Prelims 2017 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2017/CSP2017-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2017 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2017/CSP2017-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2017 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2017/CM2017-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "CSE Prelims 2016 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2016/CSP2016-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2016 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2016/CSP2016-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2016 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2016/CM2016-GS-Paper-I-English.pdf" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "CSE Prelims 2015 GS Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2015/CSP2015-GS-Paper-I-English.pdf" },
                        { name: "CSE Prelims 2015 GS Paper II (CSAT)", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2015/CSP2015-GS-Paper-II-English.pdf" },
                        { name: "CSE Mains 2015 General Studies Paper I", url: "https://www.upsc.gov.in/sites/default/files/QuestionPaper2015/CM2015-GS-Paper-I-English.pdf" }
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
                        { name: "NEET UG 2024 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2024.pdf" },
                        { name: "NEET UG 2024 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2024.pdf" },
                        { name: "NEET UG 2024 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2024.pdf" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "NEET UG 2023 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2023.pdf" },
                        { name: "NEET UG 2023 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2023.pdf" },
                        { name: "NEET UG 2023 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2023.pdf" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "NEET UG 2022 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2022.pdf" },
                        { name: "NEET UG 2022 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2022.pdf" },
                        { name: "NEET UG 2022 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2022.pdf" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "NEET UG 2021 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2021.pdf" },
                        { name: "NEET UG 2021 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2021.pdf" },
                        { name: "NEET UG 2021 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2021.pdf" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "NEET UG 2020 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2020.pdf" },
                        { name: "NEET UG 2020 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2020.pdf" },
                        { name: "NEET UG 2020 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2020.pdf" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "NEET UG 2019 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2019.pdf" },
                        { name: "NEET UG 2019 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2019.pdf" },
                        { name: "NEET UG 2019 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2019.pdf" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "NEET UG 2018 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2018.pdf" },
                        { name: "NEET UG 2018 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2018.pdf" },
                        { name: "NEET UG 2018 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2018.pdf" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "NEET UG 2017 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2017.pdf" },
                        { name: "NEET UG 2017 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2017.pdf" },
                        { name: "NEET UG 2017 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2017.pdf" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "NEET UG 2016 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2016.pdf" },
                        { name: "NEET UG 2016 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2016.pdf" },
                        { name: "NEET UG 2016 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2016.pdf" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "NEET UG 2015 Question Paper", url: "https://neet.nta.nic.in/Admin/getFile?file=QuestionPaper_NEET(UG)_2015.pdf" },
                        { name: "NEET UG 2015 Answer Key", url: "https://neet.nta.nic.in/Admin/getFile?file=AnswerKey_NEET(UG)_2015.pdf" },
                        { name: "NEET UG 2015 Solutions", url: "https://neet.nta.nic.in/Admin/getFile?file=Solutions_NEET(UG)_2015.pdf" }
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
                        { name: "JEE Main 2024 Session 1 (January)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2024_Session1_QuestionPaper.pdf" },
                        { name: "JEE Main 2024 Session 2 (April)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2024_Session2_QuestionPaper.pdf" },
                        { name: "JEE Main 2024 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2024_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "JEE Main 2023 Session 1 (January)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2023_Session1_QuestionPaper.pdf" },
                        { name: "JEE Main 2023 Session 2 (April)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2023_Session2_QuestionPaper.pdf" },
                        { name: "JEE Main 2023 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2023_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "JEE Main 2022 Session 1 (June)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2022_Session1_QuestionPaper.pdf" },
                        { name: "JEE Main 2022 Session 2 (July)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2022_Session2_QuestionPaper.pdf" },
                        { name: "JEE Main 2022 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2022_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "JEE Main 2021 Session 1 (February)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2021_Session1_QuestionPaper.pdf" },
                        { name: "JEE Main 2021 Session 2 (March)", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2021_Session2_QuestionPaper.pdf" },
                        { name: "JEE Main 2021 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2021_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "JEE Main 2020 September", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2020_September_QuestionPaper.pdf" },
                        { name: "JEE Main 2020 January", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2020_January_QuestionPaper.pdf" },
                        { name: "JEE Main 2020 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2020_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "JEE Main 2019 January", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2019_January_QuestionPaper.pdf" },
                        { name: "JEE Main 2019 April", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2019_April_QuestionPaper.pdf" },
                        { name: "JEE Main 2019 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2019_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "JEE Main 2018 Online", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2018_Online_QuestionPaper.pdf" },
                        { name: "JEE Main 2018 Offline", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2018_Offline_QuestionPaper.pdf" },
                        { name: "JEE Main 2018 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2018_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "JEE Main 2017 Online", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2017_Online_QuestionPaper.pdf" },
                        { name: "JEE Main 2017 Offline", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2017_Offline_QuestionPaper.pdf" },
                        { name: "JEE Main 2017 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2017_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "JEE Main 2016 Online", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2016_Online_QuestionPaper.pdf" },
                        { name: "JEE Main 2016 Offline", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2016_Offline_QuestionPaper.pdf" },
                        { name: "JEE Main 2016 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2016_AnswerKeys.pdf" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "JEE Main 2015 Online", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2015_Online_QuestionPaper.pdf" },
                        { name: "JEE Main 2015 Offline", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2015_Offline_QuestionPaper.pdf" },
                        { name: "JEE Main 2015 Answer Keys", url: "https://jeemain.nta.nic.in/Admin/getFile?file=JEE(Main)2015_AnswerKeys.pdf" }
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
                        { name: "GATE 2024 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2024_CS.pdf" },
                        { name: "GATE 2024 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2024_ME.pdf" },
                        { name: "GATE 2024 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2024_EE.pdf" },
                        { name: "GATE 2024 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2024_CE.pdf" }
                    ]
                },
                {
                    year: "2023", links: [
                        { name: "GATE 2023 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2023_CS.pdf" },
                        { name: "GATE 2023 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2023_ME.pdf" },
                        { name: "GATE 2023 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2023_EE.pdf" },
                        { name: "GATE 2023 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2023_CE.pdf" }
                    ]
                },
                {
                    year: "2022", links: [
                        { name: "GATE 2022 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2022_CS.pdf" },
                        { name: "GATE 2022 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2022_ME.pdf" },
                        { name: "GATE 2022 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2022_EE.pdf" },
                        { name: "GATE 2022 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2022_CE.pdf" }
                    ]
                },
                {
                    year: "2021", links: [
                        { name: "GATE 2021 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2021_CS.pdf" },
                        { name: "GATE 2021 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2021_ME.pdf" },
                        { name: "GATE 2021 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2021_EE.pdf" },
                        { name: "GATE 2021 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2021_CE.pdf" }
                    ]
                },
                {
                    year: "2020", links: [
                        { name: "GATE 2020 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2020_CS.pdf" },
                        { name: "GATE 2020 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2020_ME.pdf" },
                        { name: "GATE 2020 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2020_EE.pdf" },
                        { name: "GATE 2020 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2020_CE.pdf" }
                    ]
                },
                {
                    year: "2019", links: [
                        { name: "GATE 2019 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2019_CS.pdf" },
                        { name: "GATE 2019 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2019_ME.pdf" },
                        { name: "GATE 2019 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2019_EE.pdf" },
                        { name: "GATE 2019 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2019_CE.pdf" }
                    ]
                },
                {
                    year: "2018", links: [
                        { name: "GATE 2018 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2018_CS.pdf" },
                        { name: "GATE 2018 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2018_ME.pdf" },
                        { name: "GATE 2018 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2018_EE.pdf" },
                        { name: "GATE 2018 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2018_CE.pdf" }
                    ]
                },
                {
                    year: "2017", links: [
                        { name: "GATE 2017 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2017_CS.pdf" },
                        { name: "GATE 2017 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2017_ME.pdf" },
                        { name: "GATE 2017 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2017_EE.pdf" },
                        { name: "GATE 2017 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2017_CE.pdf" }
                    ]
                },
                {
                    year: "2016", links: [
                        { name: "GATE 2016 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2016_CS.pdf" },
                        { name: "GATE 2016 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2016_ME.pdf" },
                        { name: "GATE 2016 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2016_EE.pdf" },
                        { name: "GATE 2016 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2016_CE.pdf" }
                    ]
                },
                {
                    year: "2015", links: [
                        { name: "GATE 2015 CS", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2015_CS.pdf" },
                        { name: "GATE 2015 ME", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2015_ME.pdf" },
                        { name: "GATE 2015 EE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2015_EE.pdf" },
                        { name: "GATE 2015 CE", url: "https://www.gate.iitb.ac.in/PYQs/GATE_2015_CE.pdf" }
                    ]
                }
            ]
        }
    }

    const openPdfModal = (url) => {
        setPdfUrl(url)
        setShowPdfModal(true)
    }

    const closePdfModal = () => {
        setShowPdfModal(false)
        setPdfUrl('')
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: '24px'
        }}>
            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '48px'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1), rgba(52, 168, 83, 0.1))',
                    borderRadius: '20px',
                    marginBottom: '24px'
                }}>
                    <BookOpen size={48} style={{ color: 'var(--primary-blue)' }} />
                    <div>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            margin: 0,
                            background: 'linear-gradient(135deg, #4285F4, #34A853)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Question Bank
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            margin: '8px 0 0 0',
                            fontSize: '16px'
                        }}>
                            Comprehensive collection of previous year papers
                        </p>
                    </div>
                </div>
            </div>

            {/* Exam Selector Tabs */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '32px',
                flexWrap: 'wrap'
            }}>
                {Object.keys(examData).map(exam => (
                    <button
                        key={exam}
                        onClick={() => setActiveExam(exam)}
                        style={{
                            padding: '12px 24px',
                            borderRadius: 'var(--radius-lg)',
                            background: activeExam === exam ? examData[exam].color : 'var(--white)',
                            color: activeExam === exam ? 'white' : 'var(--text-primary)',
                            border: activeExam === exam ? 'none' : '2px solid var(--border-light)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all var(--transition-fast)',
                            boxShadow: activeExam === exam ? '0 4px 16px rgba(0, 0, 0, 0.15)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>{examData[exam].icon}</span>
                        {exam.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Exam Header */}
            <div style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                marginBottom: '32px',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    background: `linear-gradient(135deg, ${examData[activeExam].color}20, ${examData[activeExam].color}10)`,
                    borderRadius: '50%',
                    marginBottom: '16px'
                }}>
                    <span style={{ fontSize: '36px' }}>{examData[activeExam].icon}</span>
                </div>
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                }}>
                    {examData[activeExam].title}
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    {examData[activeExam].description}
                </p>
            </div>

            {/* Papers Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
            }}>
                {examData[activeExam].papers.map((paper, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'var(--white)',
                            borderRadius: 'var(--radius-xl)',
                            padding: '24px',
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--border-light)',
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        {/* Year Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '20px',
                            paddingBottom: '16px',
                            borderBottom: '2px solid var(--off-white)'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: examData[activeExam].color,
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: '700'
                            }}>
                                {paper.year.slice(-2)}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    margin: 0
                                }}>
                                    {paper.year}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    margin: '4px 0 0 0',
                                    fontSize: '14px'
                                }}>
                                    Question Papers & Solutions
                                </p>
                            </div>
                        </div>

                        {/* Links */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {paper.links.map((link, linkIndex) => (
                                <button
                                    key={linkIndex}
                                    onClick={() => openPdfModal(link.url)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '16px',
                                        background: 'var(--off-white)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)',
                                        textAlign: 'left',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <FileText size={20} style={{ color: examData[activeExam].color }} />
                                        <div>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: 'var(--text-primary)'
                                            }}>
                                                {link.name}
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                PDF Document
                                            </div>
                                        </div>
                                    </div>
                                    <Download size={16} style={{ color: 'var(--text-secondary)' }} />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Section */}
            <div style={{
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
                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        margin: 0
                    }}>
                        Practice Makes Perfect
                    </h3>
                </div>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    maxWidth: '600px',
                    margin: '0 auto 24px'
                }}>
                    Regular practice with previous year question papers is the key to exam success.
                    Download, solve, and analyze your performance to improve continuously.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #4285F4, #34A853)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        📚 10 Years of Papers
                    </div>
                    <div style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #EA4335, #FBBC05)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        🎯 Exam-Ready Practice
                    </div>
                    <div style={{
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

            {/* PDF Modal */}
            {showPdfModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 10000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        padding: '16px 24px',
                        background: 'var(--white)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--border-light)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <FileText size={24} style={{ color: examData[activeExam].color }} />
                            <div>
                                <div style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)'
                                }}>
                                    Question Paper Viewer
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {examData[activeExam].title}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={closePdfModal}
                            style={{
                                padding: '8px 16px',
                                background: 'var(--error)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Close
                        </button>
                    </div>
                    <div style={{
                        flex: 1,
                        background: '#f5f5f5'
                    }}>
                        <iframe
                            src={pdfUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
