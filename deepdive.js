// Deep Dive interactive script
// Year in footer
document.getElementById('year2').textContent = new Date().getFullYear();

const examsData = [
  {
    id: 'upsc', name: 'UPSC - Civil Services (CSE)', type: 'National', difficulty: 'Very High',
    syllabus: ['Indian Polity & Constitution', 'History & Culture', 'Geography', 'Economics', 'Environment & Ecology', 'Science & Technology', 'Current Affairs', 'Optional subject (varies)'],
    outcomes: ['IAS, IPS, IFS, IRS & other central services', 'Policy roles & State services'],
    typicalCycleMonths: {apply: 1, exam: 4, result: 6}
  },
  {
    id: 'jee', name: 'JEE (Main + Advanced)', type: 'National', difficulty: 'High',
    syllabus: ['Physics (Mechanics, Electrodynamics, Optics)', 'Chemistry (Physical, Organic, Inorganic)', 'Mathematics (Algebra, Calculus, Coordinate Geometry)'],
    outcomes: ['Admission to IITs, NITs, and engineering colleges', 'Engineering jobs & research paths'],
    typicalCycleMonths: {apply: 2, exam: 4, result: 5}
  },
  {
    id: 'neet', name: 'NEET UG', type: 'National', difficulty: 'High',
    syllabus: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
    outcomes: ['MBBS, BDS and other medical/paramedical colleges'],
    typicalCycleMonths: {apply: 2, exam: 4, result: 5}
  },
  {
    id: 'ssc', name: 'SSC CGL', type: 'National', difficulty: 'Medium',
    syllabus: ['General Intelligence & Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English Comprehension'],
    outcomes: ['Group B & C posts in Central Govt departments'],
    typicalCycleMonths: {apply: 2, exam: 5, result: 6}
  },
  {
    id: 'gate', name: 'GATE', type: 'National', difficulty: 'High',
    syllabus: ['Core engineering subjects (discipline specific)', 'Engineering Mathematics', 'General Aptitude'],
    outcomes: ['Postgraduate admissions (MTech), PSU jobs, Research'],
    typicalCycleMonths: {apply: 1, exam: 2, result: 4}
  },
  {
    id: 'cat', name: 'CAT', type: 'National', difficulty: 'High',
    syllabus: ['Verbal Ability & Reading Comprehension', 'Data Interpretation & Logical Reasoning', 'Quantitative Ability'],
    outcomes: ['Admission to IIMs and top B-schools, corporate roles'],
    typicalCycleMonths: {apply: 7, exam: 11, result: 12}
  },
  {
    id: 'clat', name: 'CLAT', type: 'National', difficulty: 'Medium',
    syllabus: ['English including comprehension', 'Current affairs & GK', 'Legal reasoning', 'Logical reasoning', 'Quantitative techniques'],
    outcomes: ['Undergraduate & Postgraduate law programs (NLUs) and legal careers'],
    typicalCycleMonths: {apply: 2, exam: 5, result: 7}
  },
  {
    id: 'bankpo', name: 'Bank PO (IBPS/State)', type: 'National', difficulty: 'Medium',
    syllabus: ['Reasoning', 'English Language', 'Quantitative Aptitude', 'General Awareness'],
    outcomes: ['Bank probationary officer roles and clerk posts'],
    typicalCycleMonths: {apply: 1, exam: 3, result: 4}
  }
];

const examsContainer = document.getElementById('exams');
const examSearch = document.getElementById('examSearch');
const detailsCard = document.getElementById('detailsCard');
const examTitle = document.getElementById('examTitle');
const examType = document.getElementById('examType');
const examDifficulty = document.getElementById('examDifficulty');
const syllabusList = document.getElementById('syllabusList');
const outcomesList = document.getElementById('outcomesList');
const datesList = document.getElementById('datesList');

// render exam cards
function renderExamCards(list) {
  examsContainer.innerHTML = '';
  list.forEach((ex, idx) => {
    const card = document.createElement('button');
    card.className = 'exam-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-id', ex.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', ex.name);
    card.innerHTML = `
      <div class="info">
        <div class="title">${ex.name}</div>
        <div class="meta">${ex.type} • ${ex.difficulty}</div>
      </div>`;

    card.addEventListener('click', () => selectExam(ex.id, card));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') selectExam(ex.id, card); });

    examsContainer.appendChild(card);

    // small entrance animation
    card.style.opacity = 0; card.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
      setTimeout(() => { card.style.transition = 'all 320ms ease'; card.style.opacity = 1; card.style.transform = 'none'; }, idx * 60);
    });
  });
}

// selection handler
let currentSelected = null;

// Fetch exam details from backend API with local fallback (returns { syllabus: [], outcomes: [], dates: [{label, date, note}] })
let localExamData = null;

async function loadLocalExamData() {
  try {
    const res = await fetch('data/exams.json');
    if (res.ok) {
      const all = await res.json();
      // normalize dates to Date objects
      Object.keys(all).forEach(k => {
        const item = all[k];
        if (Array.isArray(item.dates)) {
          item.dates = item.dates.map(d => ({ label: d.label, date: new Date(d.date), note: d.note || '' }));
        }
      });
      localExamData = all;
      return all;
    }
  } catch (err) {
    console.warn('Could not load local exam data', err);
    localExamData = null;
  }
  return null;
}
// begin background load
loadLocalExamData();

async function fetchExamDetails(id) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    // try primary API endpoint
    try {
      const res = await fetch(`/api/exams/${id}`, { signal: controller.signal });
      if (res.ok) {
        const data = await res.json();
        clearTimeout(timeout);
        if (Array.isArray(data.dates)) data.dates = data.dates.map(d => ({ label: d.label, date: new Date(d.date), note: d.note || '' }));
        return data;
      }
    } catch (e) {
      // swallow and continue to local fallback
    }

    // if local data already loaded, use it
    if (!localExamData) {
      await loadLocalExamData();
    }
    if (localExamData && localExamData[id]) {
      return localExamData[id];
    }

    clearTimeout(timeout);
    return null;
  } catch (err) {
    clearTimeout(timeout);
    return null;
  }
}

async function selectExam(id, cardEl) {
  const exam = examsData.find(e => e.id === id);
  if (!exam) return;

  // toggle selected classes
  document.querySelectorAll('.exam-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');

  // set basic info immediately
  currentSelected = Object.assign({}, exam);
  examTitle.textContent = exam.name;
  examType.textContent = exam.type;
  examDifficulty.textContent = exam.difficulty;

  // show details card and loading skeleton
  detailsCard.classList.remove('hidden'); detailsCard.classList.add('show');
  syllabusList.innerHTML = '<li>Loading syllabus…</li>';
  outcomesList.innerHTML = '<li>Loading outcomes…</li>';
  datesList.innerHTML = '<div class="date-chip">Loading dates…</div>';

  const data = await fetchExamDetails(exam.id);
  if (data) {
    currentSelected.syllabus = data.syllabus || exam.syllabus;
    currentSelected.outcomes = data.outcomes || exam.outcomes;
    currentSelected.dates = data.dates || (function(){ const now = new Date(); return [
      {label:'Application opens', date: addMonthsToDate(now, exam.typicalCycleMonths.apply), note:'Apply online'},
      {label:'Exam date', date: addMonthsToDate(now, exam.typicalCycleMonths.exam), note:'Tentative'},
      {label:'Result', date: addMonthsToDate(now, exam.typicalCycleMonths.result), note:'Provisional'}
    ]; })();
  } else if (typeof localExamData === 'object' && localExamData[exam.id]) {
    // use data from local exams.json as the default when API fails
    const local = localExamData[exam.id];
    currentSelected.syllabus = local.syllabus || exam.syllabus;
    currentSelected.outcomes = local.outcomes || exam.outcomes;
    currentSelected.dates = local.dates || (function(){ const now = new Date(); return [
      {label:'Application opens', date: addMonthsToDate(now, exam.typicalCycleMonths.apply), note:'Apply online'},
      {label:'Exam date', date: addMonthsToDate(now, exam.typicalCycleMonths.exam), note:'Tentative'},
      {label:'Result', date: addMonthsToDate(now, exam.typicalCycleMonths.result), note:'Provisional'}
    ]; })();
    flashToast('Using local exam dates from exams.json');
  } else {
    // fallback to built-in
    currentSelected.syllabus = exam.syllabus;
    currentSelected.outcomes = exam.outcomes;
    const now = new Date();
    currentSelected.dates = [
      {label: 'Application opens', date: addMonthsToDate(now, exam.typicalCycleMonths.apply), note: 'Apply online'},
      {label: 'Exam date', date: addMonthsToDate(now, exam.typicalCycleMonths.exam), note: 'Tentative'},
      {label: 'Result', date: addMonthsToDate(now, exam.typicalCycleMonths.result), note: 'Provisional'}
    ];
    flashToast('Live and local exam details not available — showing defaults');
  }

  // render syllabus
  syllabusList.innerHTML = '';
  (currentSelected.syllabus || []).forEach(s => { const li = document.createElement('li'); li.textContent = s; syllabusList.appendChild(li); });

  // render outcomes
  outcomesList.innerHTML = '';
  (currentSelected.outcomes || []).forEach(o => { const li = document.createElement('li'); li.textContent = o; outcomesList.appendChild(li); });

  // render dates
  datesList.innerHTML = '';
  (currentSelected.dates || []).forEach((d, i) => {
    const chip = document.createElement('button');
    chip.className = 'date-chip';
    const dateObj = (typeof d.date === 'string') ? new Date(d.date) : d.date;
    chip.innerHTML = `<strong>${formatDateShort(dateObj)}</strong> <small style="opacity:.8">— ${d.label}</small>`;
    chip.addEventListener('click', () => {
      copyToClipboard(`${exam.name} • ${d.label} • ${formatDateLong(dateObj)}`);
      chip.animate([{transform:'translateX(0)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}], {duration:420});
    });
    datesList.appendChild(chip);
    chip.style.opacity = 0; chip.style.transform = 'translateX(-8px)';
    setTimeout(() => { chip.style.transition='all 320ms ease'; chip.style.opacity=1; chip.style.transform='none'; }, i*120);
  });
}

// helper - add months but keep day in range
function addMonthsToDate(src, months) {
  const d = new Date(src.getTime());
  d.setMonth(d.getMonth() + months);
  // normalize to middle of month to avoid timezone/day issues
  d.setDate(Math.min(d.getDate(), 25));
  return d;
}

function formatDateShort(d) {
  return d.toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'});
}
function formatDateLong(d) {
  return d.toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric', year:'numeric'});
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      flashToast('Copied to clipboard');
    });
  } else {
    // fallback
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    flashToast('Copied to clipboard');
  }
}

// small toast
function flashToast(msg) {
  let existing = document.getElementById('dd-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'dd-toast';
  toast.textContent = msg; toast.style.position='fixed'; toast.style.right='20px'; toast.style.bottom='20px'; toast.style.padding='0.6rem 0.9rem'; toast.style.background='rgba(0,0,0,0.8)'; toast.style.color='white'; toast.style.borderRadius='8px'; toast.style.zIndex=10000; document.body.appendChild(toast);
  setTimeout(() => { toast.style.transition='all 400ms ease'; toast.style.opacity=0; }, 1200);
  setTimeout(() => { toast.remove(); }, 1800);
}

// search functionality
examSearch.addEventListener('input', (e) => {
  const q = (e.target.value || '').toLowerCase().trim();
  const filtered = examsData.filter(ex => ex.name.toLowerCase().includes(q));
  renderExamCards(filtered);
});

// initial render
renderExamCards(examsData);

// reveal helper for tips
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// keyboard navigation between cards
document.addEventListener('keydown', (e) => {
  const cards = Array.from(document.querySelectorAll('.exam-card'));
  if (!cards.length) return;
  const idx = cards.findIndex(c => c.classList.contains('selected'));
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const next = (idx < cards.length -1) ? cards[idx+1] : cards[0]; next.focus();
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const prev = (idx > 0) ? cards[idx-1] : cards[cards.length-1]; prev.focus();
  }
});

// small accessibility: allow Add to calendar to create a simple ICS and download
const openCalBtn = document.getElementById('openCal');
openCalBtn.addEventListener('click', () => {
  if (!currentSelected) { flashToast('Select an exam first'); return; }
  const examDateObj = (currentSelected.dates || []).find(d => /exam/i.test(d.label)) || (currentSelected.dates || [])[0];
  if (!examDateObj) { flashToast('No date available'); return; }
  const dateObj = (typeof examDateObj.date === 'string') ? new Date(examDateObj.date) : examDateObj.date;
  const ics = createSimpleICS(currentSelected.name, dateObj);
  downloadFile(ics, `${currentSelected.id || 'event'}-exam.ics`, 'text/calendar');
});

function createSimpleICS(title, dateObj) {
  const start = dateObj.toISOString().replace(/-|:|\.\d+/g,'');
  const end = new Date(dateObj.getTime() + 3*60*60*1000).toISOString().replace(/-|:|\.\d+/g,'');
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${start}\nDTEND:${end}\nEND:VEVENT\nEND:VCALENDAR`;
}
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = filename; document.body.appendChild(link); link.click(); link.remove();
}

// small helper to animate initial placeholder badge
const badge = document.querySelector('.badge-anim'); if (badge) badge.addEventListener('click', () => flashToast('Pick an exam to get started'));

// Register service worker to provide a local /api/exams/:id fallback (helps avoid 404s during development)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.info('ServiceWorker registered for /api/exams/:id shim', reg);
  }).catch(err => {
    console.warn('ServiceWorker registration failed', err);
  });
}

// graceful focus for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) t.scrollIntoView({behavior:'smooth'}); }));
