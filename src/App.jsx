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
  CartesianGrid
} from 'recharts'

const navItems = ['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']

const stats = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Projects Delivered', value: '25+' },
  { label: 'Tools & Technologies', value: '20+' }
]

const skillBars = [
  { name: 'Python', level: 92 },
  { name: 'SQL', level: 90 },
  { name: 'Apache Spark', level: 84 },
  { name: 'Airflow', level: 82 },
  { name: 'AWS', level: 80 },
  { name: 'Tableau / Power BI', level: 78 }
]

const radarData = [
  { skill: 'Data Eng', value: 92 },
  { skill: 'Analytics', value: 88 },
  { skill: 'ML', value: 78 },
  { skill: 'Cloud', value: 82 },
  { skill: 'Viz', value: 85 },
  { skill: 'ETL', value: 91 }
]

const barData = [
  { tool: 'Python', score: 92 },
  { tool: 'SQL', score: 90 },
  { tool: 'Spark', score: 84 },
  { tool: 'Airflow', score: 82 },
  { tool: 'AWS', score: 80 },
  { tool: 'dbt', score: 76 }
]

const projects = [
  {
    title: 'Cloud ETL Migration & Validation Framework',
    tag: 'Data Engineering',
    tech: ['Python', 'SQL', 'AWS Glue', 'Great Expectations'],
    impact: 'Reduced release defects by 37% with automated reconciliation checks.',
    repo: 'https://github.com/Manishchowdary/cloud-etl-migration-validation'
  },
  {
    title: 'Flood Prediction using Machine Learning',
    tag: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    impact: 'Improved flood-risk classification quality with feature-engineered training pipelines.',
    repo: 'https://github.com/Manishchowdary/flood-prediction-ml'
  },
  {
    title: 'Healthcare Record Portal Analytics',
    tag: 'Analytics',
    tech: ['Tableau', 'SQL', 'Excel', 'Python'],
    impact: 'Created adoption dashboards used by providers to improve patient engagement.',
    repo: 'https://github.com/Manishchowdary/healthcare-record-analytics'
  },
  {
    title: 'Streaming Data Lakehouse',
    tag: 'Data Engineering',
    tech: ['Kafka', 'Spark', 'Delta Lake'],
    impact: 'Enabled near real-time reporting with reliable CDC ingestion.',
    repo: 'https://github.com/Manishchowdary/streaming-data-lakehouse'
  },
  {
    title: 'Customer 360 Dashboard',
    tag: 'Frontend + Analytics',
    tech: ['React', 'Recharts', 'REST API'],
    impact: 'Unified metrics from multiple systems into a single customer health view.',
    repo: 'https://github.com/Manishchowdary/customer-360-dashboard'
  },
  {
    title: 'Workflow Automation Platform',
    tag: 'Data Engineering',
    tech: ['Node.js', 'Airflow', 'PostgreSQL'],
    impact: 'Automated recurring workflows and cut manual task time by 60%.',
    repo: 'https://github.com/Manishchowdary/workflow-automation-platform'
  },
  {
    title: 'Forecasting & Anomaly Detection',
    tag: 'Machine Learning',
    tech: ['Python', 'Prophet', 'Scikit-learn'],
    impact: 'Shipped anomaly alerts for operational KPIs with daily retraining.',
    repo: 'https://github.com/Manishchowdary/forecasting-anomaly-detection'
  },
  {
    title: 'Portfolio Web App',
    tag: 'Frontend + Analytics',
    tech: ['React', 'Framer Motion', 'Tailwind'],
    impact: 'Built a high-performance portfolio with interactive data visuals.',
    repo: 'https://github.com/Manishchowdary/my-portfolio'
  }
]

const experience = [
  { role: 'Senior Data Engineer', company: 'Tech Company', period: '2024 — Present', details: 'Designed resilient ETL pipelines and improved reporting latency by 45%.' },
  { role: 'Data Engineer', company: 'Analytics Firm', period: '2022 — 2024', details: 'Built data models and orchestration workflows across AWS and Airflow.' },
  { role: 'Data Analyst', company: 'Consulting', period: '2020 — 2022', details: 'Developed KPI dashboards and automated decision-ready insights.' }
]

const education = [
  { title: 'B.Tech / Related Degree', meta: 'University Name', text: 'Strong foundation in data systems, programming, and applied analytics.' },
  { title: 'Professional Certifications', meta: 'Cloud + Data Certifications', text: 'Hands-on certifications in cloud data engineering and analytics tooling.' }
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
          <h1 className="text-4xl md:text-6xl font-bold">Data Engineer & Analytics Builder</h1>
          <p className="mt-4 text-gray-300 max-w-2xl">I build scalable data products, analytics platforms, and insightful dashboards.</p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="#Projects" className="rounded bg-[#6c63ff] px-5 py-2">View Projects</a>
            <a href="#Contact" className="rounded border border-[#6c63ff] px-5 py-2">Contact</a>
          </div>
        </motion.div>
      </Section>

      <Section id="About">
        <h2 className="mb-4 text-3xl font-semibold">About</h2>
        <p className="mb-8 max-w-3xl text-gray-300">I focus on end-to-end data workflows—from ingestion and transformation to visualization and business impact. My work combines engineering rigor with product thinking.</p>
        <div className="grid gap-4 md:grid-cols-3">{stats.map((s) => <Card key={s.label}><p className="text-3xl font-bold text-[#8f88ff]">{s.value}</p><p className="text-gray-300">{s.label}</p></Card>)}</div>
      </Section>

      <Section id="Skills">
        <h2 className="mb-6 text-3xl font-semibold">Skills</h2>
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
        <div className="timeline relative mx-auto max-w-5xl">
          {experience.map((e, i) => (
            <div key={e.role} className={`mb-8 w-full md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-8' : 'md:pr-8'} pl-8 md:pl-0`}><Card><h3 className="font-semibold">{e.role}</h3><p className="text-[#6c63ff] text-sm">{e.company} • {e.period}</p><p className="text-gray-300 mt-2">{e.details}</p></Card></div>
          ))}
        </div>
      </Section>

      <Section id="Education">
        <h2 className="mb-6 text-3xl font-semibold">Education</h2>
        <div className="grid gap-4 md:grid-cols-2">{education.map((e) => <Card key={e.title}><h3 className="font-semibold">{e.title}</h3><p className="text-sm text-[#6c63ff]">{e.meta}</p><p className="mt-2 text-gray-300">{e.text}</p></Card>)}</div>
      </Section>

      <Section id="Contact">
        <h2 className="mb-6 text-3xl font-semibold">Contact</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <form className="space-y-3">
              <input className="w-full rounded bg-gray-900 p-3" placeholder="Your Name" />
              <input className="w-full rounded bg-gray-900 p-3" placeholder="Your Email" />
              <textarea className="w-full rounded bg-gray-900 p-3" rows="4" placeholder="Message" />
              <button type="button" className="rounded bg-[#6c63ff] px-4 py-2">Send Message</button>
            </form>
          </Card>
          <Card>
            <p className="mb-2">Email: <a className="text-[#6c63ff]" href="mailto:manish@example.com">manish@example.com</a></p>
            <p className="mb-2">GitHub: <a className="text-[#6c63ff]" href="https://github.com/Manishchowdary" target="_blank" rel="noreferrer">github.com/Manishchowdary</a></p>
            <p>LinkedIn: <a className="text-[#6c63ff]" href="https://www.linkedin.com/in/manishchowdary" target="_blank" rel="noreferrer">linkedin.com/in/manishchowdary</a></p>
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
