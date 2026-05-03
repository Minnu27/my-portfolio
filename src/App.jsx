import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts'

const navItems = ['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']

const stats = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Major Projects', value: '10+' },
  { label: 'Dashboards & Data Products', value: '20+' }
]

const coreCompetencies = [
  'GenAI', 'Data Science', 'Jenkins', 'Docker', 'NLP', 'Python', 'JavaScript', 'React', 'JSON Data Structuring', 'SQL',
  'Snowflake', 'NoSQL (MongoDB)', 'Data Engineering', 'Incident Data Analysis', 'Knowledge Library Development',
  'Dashboard Development', 'Tableau', 'AWS', 'Data Visualization', 'AI Model Evaluation'
]

const skillBars = [
  { name: 'Python', level: 92 },
  { name: 'SQL', level: 90 },
  { name: 'Snowflake', level: 88 },
  { name: 'Tableau / Power BI', level: 86 },
  { name: 'AWS', level: 82 },
  { name: 'MongoDB / NoSQL', level: 84 }
]

const radarData = [
  { skill: 'Data Eng', value: 92 },
  { skill: 'Analytics', value: 90 },
  { skill: 'NLP', value: 85 },
  { skill: 'Cloud', value: 82 },
  { skill: 'Viz', value: 88 },
  { skill: 'AI Eval', value: 84 }
]

const barData = [
  { tool: 'Python', score: 92 },
  { tool: 'SQL', score: 90 },
  { tool: 'Snowflake', score: 88 },
  { tool: 'Tableau', score: 86 },
  { tool: 'MongoDB', score: 84 },
  { tool: 'AWS', score: 82 }
]

const impactTrend = [
  { quarter: '2023 Q4', score: 74 },
  { quarter: '2024 Q1', score: 81 },
  { quarter: '2024 Q2', score: 86 },
  { quarter: '2024 Q3', score: 90 },
  { quarter: '2024 Q4', score: 94 }
]

const projects = [
  {
    title: 'Cloud ETL Migration & Validation Framework',
    tag: 'Data Engineering',
    tech: ['Python', 'SQL', 'AWS', 'Snowflake'],
    impact: 'Built ingestion and validation pipelines with synthetic test datasets, reducing model defects and improving delivery reliability.',
    repo: 'https://github.com/Manishchowdary/cloud-etl-migration-validation'
  },
  {
    title: 'Flood Prediction using Machine Learning',
    tag: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    impact: 'Improved predictive classification using environmental datasets with careful feature and model tuning.',
    repo: 'https://github.com/Manishchowdary/flood-prediction-ml'
  },
  {
    title: 'Health Record Portal Analytics',
    tag: 'Analytics',
    tech: ['Tableau', 'Power BI', 'SQL', 'Python'],
    impact: 'Delivered role-based dashboards and operational views that improved hospital support visibility and user interaction.',
    repo: 'https://github.com/Manishchowdary/healthcare-record-analytics'
  }
]

const experience = [
  {
    role: 'Data Science Intern',
    company: 'Data Science Center',
    period: 'Jul 2024 — Nov 2024',
    details: [
      'Built an R&D GenAI and NLP-driven assistant to support operational efficiency.',
      'Constructed and processed 1M+ structured and unstructured records from PDFs, Snowflake, and NoSQL sources.',
      'Trained and evaluated multiple ML models, boosting predictive accuracy by ~20% and reducing false positives by ~10%.',
      'Enhanced NLP pipelines to analyze 10K+ documents, improving sentiment analysis accuracy by ~18%.'
    ]
  },
  {
    role: 'Team Lead (Major Project)',
    company: 'Guru Nanak Institute of Technology',
    period: 'Nov 2023 — Apr 2024',
    details: [
      'Led a team of five developers to design and build a full-stack, data-driven platform.',
      'Defined secure system architecture with compliance-focused design principles.',
      'Developed distributed backend framework and coordinated product + design collaboration.'
    ]
  }
]

const education = [
  {
    title: 'Master of Science (MS) in Data Science',
    meta: 'Pace University, New York, NY • Dec 2026 (Expected) • GPA 3.9/4',
    text: 'Advanced graduate coursework in data science, ML systems, analytics engineering, and communication of insights.'
  },
  {
    title: 'Guru Nanak Institute of Technology',
    meta: 'B.Tech, Computer Science & Engineering • Aug 2024 • GPA 8.5/10',
    text: 'Built strong foundations in algorithms, software systems, databases, and data-driven problem solving.'
  }
]

export default function App() {
  const [active, setActive] = useState('Hero')
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { threshold: 0.4 }
    )
    navItems.forEach((item) => {
      const el = document.getElementById(item)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const projectTags = useMemo(() => ['All', ...new Set(projects.map((project) => project.tag))], [])
  const filteredProjects = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.tag === filter)), [filter])

  return (
    <div className="bg-[#07070f] text-white aurora-bg">
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#Hero" className="font-bold text-[#8f88ff]">Manish</a>
          <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
          <ul className={`md:flex gap-4 ${open ? 'block' : 'hidden'} md:block`}>
            {navItems.map((item) => (
              <li key={item}><a href={`#${item}`} onClick={() => setOpen(false)} className={`nav-link ${active === item ? 'text-[#8f88ff]' : 'text-gray-300'}`}>{item}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <Section id="Hero" className="flex items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="profile-ring mx-auto mb-4 h-28 w-28 rounded-full" />
          <h1 className="text-4xl md:text-6xl font-bold">Manish Chowdary Gorantla</h1>
          <p className="mt-4 text-gray-300 max-w-3xl">Data science and analytics engineer focused on scalable pipelines, AI-driven automation, and interactive decision systems.</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <a href="#Projects" className="rounded bg-[#6c63ff] px-5 py-2">Explore Projects</a>
            <a href="https://www.linkedin.com/in/manishchowdary" target="_blank" rel="noreferrer" className="rounded border border-[#6c63ff] px-5 py-2">LinkedIn ↗</a>
          </div>
        </motion.div>
      </Section>

      <Section id="About">
        <h2 className="mb-4 text-3xl font-semibold">About</h2>
        <p className="mb-8 max-w-4xl text-gray-300">I work across data engineering, analytics, and applied AI—from building ETL + validation frameworks to deploying NLP-enabled systems and dashboards that help teams make faster and better decisions.</p>
        <div className="grid gap-4 md:grid-cols-3">{stats.map((s) => <Card key={s.label}><p className="text-3xl font-bold text-[#8f88ff]">{s.value}</p><p className="text-gray-300">{s.label}</p></Card>)}</div>
      </Section>

      <Section id="Skills">
        <h2 className="mb-6 text-3xl font-semibold">Skills</h2>
        <div className="mb-6 flex flex-wrap gap-2">{coreCompetencies.map((c) => <span key={c} className="rounded-full border border-[#6c63ff]/40 bg-[#1a1a2a] px-3 py-1 text-xs text-[#c7c3ff]">{c}</span>)}</div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            {skillBars.map((s) => (
              <div key={s.name} className="mb-4">
                <div className="mb-1 flex justify-between text-sm"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="h-2 w-full rounded bg-gray-800"><motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} className="h-2 rounded bg-[#6c63ff]" /></div>
              </div>
            ))}
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="h-72"><ResponsiveContainer width="100%" height="100%"><RadarChart data={radarData}><PolarGrid stroke="#555" /><PolarAngleAxis dataKey="skill" stroke="#ddd" /><PolarRadiusAxis stroke="#777" /><Radar dataKey="value" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.5} /></RadarChart></ResponsiveContainer></Card>
            <Card className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={barData}><CartesianGrid strokeDasharray="3 3" stroke="#333" /><XAxis dataKey="tool" stroke="#ddd" /><YAxis stroke="#ddd" /><Tooltip /><Bar dataKey="score" fill="#6c63ff" /></BarChart></ResponsiveContainer></Card>
          </div>
        </div>
      </Section>

      <Section id="Projects">
        <h2 className="mb-4 text-3xl font-semibold">Projects</h2>
        <div className="mb-6 flex flex-wrap gap-2">{projectTags.map((t) => <button key={t} onClick={() => setFilter(t)} className={`project-filter rounded px-4 py-2 ${filter === t ? 'bg-[#6c63ff]' : 'bg-gray-800'}`}>{t}</button>)}</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <Card key={p.title} className="project-card h-full">
              <div className="mb-3 inline-flex rounded-full border border-[#6c63ff]/50 px-3 py-1 text-xs text-[#a8a3ff]">{p.tag}</div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="my-3 text-sm text-gray-300">{p.impact}</p>
              <div className="flex flex-wrap gap-2">{p.tech.map((x) => <span key={x} className="rounded bg-gray-800 px-2 py-1 text-xs">{x}</span>)}</div>
              <a className="mt-4 inline-block text-sm font-medium text-[#8f88ff] underline-offset-4 hover:underline" href={p.repo} target="_blank" rel="noreferrer">View Repository ↗</a>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="Experience">
        <h2 className="mb-8 text-3xl font-semibold">Experience</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {experience.map((e) => (
            <Card key={e.role}>
              <h3 className="font-semibold text-lg">{e.role}</h3>
              <p className="text-[#6c63ff] text-sm mb-3">{e.company} • {e.period}</p>
              <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
                {e.details.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Card>
          ))}
        </div>
        <Card className="mt-6 h-72">
          <h3 className="mb-2 text-sm text-gray-300">Operational Impact Growth (Interactive)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={impactTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="quarter" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8f88ff" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Section>

      <Section id="Education">
        <h2 className="mb-6 text-3xl font-semibold">Education</h2>
        <div className="grid gap-4 md:grid-cols-2">{education.map((e) => <Card key={e.title}><h3 className="font-semibold">{e.title}</h3><p className="text-sm text-[#6c63ff]">{e.meta}</p><p className="mt-2 text-gray-300">{e.text}</p></Card>)}</div>
      </Section>

      <Section id="Contact">
        <h2 className="mb-6 text-3xl font-semibold">Contact</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="mb-2">Let&apos;s collaborate on data platforms, analytics, and AI-enabled products.</p>
            <p className="mb-2">Email: <a className="text-[#6c63ff]" href="mailto:manishchowdary@gmail.com">manishchowdary@gmail.com</a></p>
            <p className="mb-2">Phone: <a className="text-[#6c63ff]" href="tel:+16466300665">+1 646-630-0665</a></p>
            <p className="mb-2">GitHub: <a className="text-[#6c63ff]" href="https://github.com/Manishchowdary" target="_blank" rel="noreferrer">github.com/Manishchowdary</a></p>
            <p>LinkedIn: <a className="text-[#6c63ff]" href="https://www.linkedin.com/in/manishchowdary" target="_blank" rel="noreferrer">linkedin.com/in/manishchowdary</a></p>
          </Card>
          <Card>
            <div className="space-y-3 text-sm text-gray-300">
              <p><strong className="text-white">Current focus:</strong> Building robust data + GenAI workflows that scale from experimentation to production.</p>
              <p><strong className="text-white">Preferred stack:</strong> Python, SQL, Snowflake, Tableau, AWS, NoSQL, and modern frontend analytics.</p>
              <p><strong className="text-white">Location:</strong> New York, NY (open to remote/hybrid opportunities).</p>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}

function Section({ id, children, className = '' }) {
  return <section id={id} className={`section mx-auto max-w-6xl ${className}`}>{children}</section>
}

function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass rounded-xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(108,99,255,0.25)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
