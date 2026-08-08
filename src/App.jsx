import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Line,
  Legend
} from 'recharts'
import techAvatar from './tech_avatar.png'

const navItems = ['Hero', 'About', 'Skills', 'Playground', 'Projects', 'Experience', 'Education', 'Contact']

const stats = [
  { label: 'Academic GPA', value: '3.9 / 4.0', sub: 'Pace University MS' },
  { label: 'Major Projects Delivered', value: '10+', sub: 'ETL, ML, and Analytics' },
  { label: 'Data Volumes Managed', value: '1M+ Records', sub: 'Snowflake & SQL pipelines' }
]

const skillCategories = {
  languages: [
    { name: 'Python', level: 95 },
    { name: 'SQL', level: 92 },
    { name: 'Java', level: 80 },
    { name: 'JavaScript', level: 85 }
  ],
  dataEng: [
    { name: 'Snowflake', level: 90 },
    { name: 'ETL Pipelines', level: 92 },
    { name: 'AWS Cloud Services', level: 82 },
    { name: 'MongoDB / NoSQL', level: 84 }
  ],
  mlAi: [
    { name: 'GenAI & NLP Systems', level: 88 },
    { name: 'Machine Learning Models', level: 90 },
    { name: 'Scikit-learn / Pandas', level: 92 },
    { name: 'AI Model Evaluation', level: 85 }
  ],
  visualizations: [
    { name: 'Tableau', level: 90 },
    { name: 'Power BI', level: 86 },
    { name: 'Recharts / Chart.js', level: 88 },
    { name: 'Dashboard Design', level: 92 }
  ]
}

const radarData = [
  { skill: 'Data Eng', value: 92, fullMark: 100 },
  { skill: 'ML Modeling', value: 90, fullMark: 100 },
  { skill: 'NLP Systems', value: 85, fullMark: 100 },
  { skill: 'Cloud Infra', value: 82, fullMark: 100 },
  { skill: 'BI & Viz', value: 90, fullMark: 100 },
  { skill: 'GenAI Integration', value: 88, fullMark: 100 }
]

const barData = [
  { tool: 'Python', score: 95 },
  { tool: 'SQL', score: 92 },
  { tool: 'Snowflake', score: 90 },
  { tool: 'Tableau', score: 90 },
  { tool: 'MongoDB', score: 84 },
  { tool: 'AWS', score: 82 }
]

const projects = [
  {
    title: 'Cloud ETL Migration & Validation Framework',
    tag: 'Data Engineering',
    tech: ['Python', 'SQL', 'AWS', 'Snowflake', 'ETL'],
    impact: 'Built scalable ingestion and validation pipelines with synthetic test datasets, reducing model defects by 25% and improving pipeline delivery reliability.',
    details: [
      'Designed structured ETL data paths mapping JSON/NoSQL sources to structured relational schemas.',
      'Developed automated validation scripts checking schema conformity, null counts, and column types.',
      'Deployed AWS-based notifications and alerts for pipeline execution failures.'
    ],
    repo: 'https://github.com/Manishchowdary/cloud-etl-migration-validation'
  },
  {
    title: 'Flood Prediction using Machine Learning',
    tag: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'ML'],
    impact: 'Improved predictive classification using environmental datasets with careful feature engineering and ensemble model tuning.',
    details: [
      'Processed historical climate, rainfall, and terrain elevation datasets using Pandas.',
      'Optimized hyperparameters using Random Forests and Gradient Boosted Trees, raising accuracy by 14%.',
      'Created diagnostic visualizations illustrating feature importance and ROC-AUC curves.'
    ],
    repo: 'https://github.com/Manishchowdary/flood-prediction-ml'
  },
  {
    title: 'Health Record Portal Analytics',
    tag: 'Analytics',
    tech: ['Tableau', 'Power BI', 'SQL', 'Python', 'BI'],
    impact: 'Delivered role-based dashboards and operational views that improved hospital support visibility and user interaction.',
    details: [
      'Designed executive summaries and operational views showing active user engagement and patient participation.',
      'Constructed complex SQL queries optimizing data retrieval for Tableau dashboards.',
      'Collaborated with medical outreach teams to define key performance indicators and engagement goals.'
    ],
    repo: 'https://github.com/Manishchowdary/healthcare-record-analytics'
  }
]

const experience = [
  {
    role: 'Data Science Intern',
    company: 'Data Science Center',
    period: 'Jul 2024 — Nov 2024',
    details: [
      'Built an R&D GenAI and NLP-driven assistant to support team operations, accelerating internal query responses.',
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
    text: 'Focusing on advanced graduate coursework in machine learning systems, big data analytics, pipeline orchestration, and statistical modeling.'
  },
  {
    title: 'B.Tech in Computer Science & Engineering',
    meta: 'Guru Nanak Institute of Technology • Aug 2024 • GPA 8.5/10',
    text: 'Acquired strong foundations in algorithms, software systems, database management systems, and data-driven problem solving.'
  }
]

// Typewriter Roles for Hero Section
const roles = [
  'Data Scientist',
  'Analytics Engineer',
  'Data Pipeline Architect',
  'Pace University Grad Student'
]

export default function App() {
  const [active, setActive] = useState('Hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('All')
  const [selectedSkillTab, setSelectedSkillTab] = useState('languages')

  // Typewriter effect states
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Model Tuning Playground States
  const [modelType, setModelType] = useState('XGBoost')
  const [learningRate, setLearningRate] = useState(0.01)
  const [datasetSize, setDatasetSize] = useState(100) // in thousands
  const [epochs, setEpochs] = useState(20)
  const [playgroundLogs, setPlaygroundLogs] = useState({ accuracy: 85, time: 2.4, loss: 0.18 })
  const [simulationData, setSimulationData] = useState([])

  // Contact Form states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle, loading, success

  // Intersection Observer to highlight active link
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' }
    )
    navItems.forEach((item) => {
      const el = document.getElementById(item)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Typewriter Effect logic
  useEffect(() => {
    let timer
    const handleType = () => {
      const fullText = roles[roleIndex]
      const speed = isDeleting ? 40 : 80

      if (!isDeleting && currentText === fullText) {
        // Pause at completion
        timer = setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        )
      }
    }

    timer = setTimeout(handleType, isDeleting ? 30 : 80)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex])

  // Run simulation on Playground State changes
  useEffect(() => {
    // Generate organic learning curves based on inputs
    const data = []
    let baseAccuracy = 0
    let finalAccuracyLimit = 0
    let learningMultiplier = 1

    if (modelType === 'Decision Tree') {
      baseAccuracy = 55
      finalAccuracyLimit = 78 + (datasetSize > 200 ? 4 : 0)
      learningMultiplier = 0.5
    } else if (modelType === 'XGBoost') {
      baseAccuracy = 60
      finalAccuracyLimit = 91 + (datasetSize > 150 ? 3 : 0) + (learningRate > 0.005 && learningRate < 0.05 ? 2 : -2)
      learningMultiplier = 0.85
    } else {
      // Neural Net
      baseAccuracy = 45
      finalAccuracyLimit = 94 + (datasetSize > 250 ? 3 : 0) + (learningRate >= 0.01 && learningRate <= 0.03 ? 2 : -5)
      learningMultiplier = 0.6
    }

    const calculatedTime = parseFloat(
      ((epochs * 0.15 + (datasetSize / 100) * 0.8) * (modelType === 'Neural Network' ? 2.5 : modelType === 'XGBoost' ? 1.2 : 0.4)).toFixed(2)
    )

    let currentAcc = baseAccuracy
    let currentLoss = 0.95

    for (let i = 1; i <= epochs; i++) {
      // Accuracy increases asymptotically
      const progress = i / epochs
      const factor = 1 - Math.exp(-progress * 4 * learningMultiplier)
      
      // Calculate epoch accuracy with some minor fluctuation
      const noise = (Math.sin(i * 1.5) * 1.2) / (i * 0.3 + 1)
      let epochAcc = baseAccuracy + (finalAccuracyLimit - baseAccuracy) * factor + noise
      if (epochAcc > 99) epochAcc = 99
      if (epochAcc < 20) epochAcc = 20

      // Learning rate decay impact (too high learning rate oscillates accuracy)
      if (learningRate > 0.05 && i % 3 === 0) {
        epochAcc -= 4 + Math.random() * 3
      }

      // Loss decreases
      let epochLoss = (0.95 - (0.95 - (1 - finalAccuracyLimit / 100)) * factor + (noise / -100))
      if (epochLoss < 0.02) epochLoss = 0.02

      data.push({
        epoch: `Ep ${i}`,
        'Val Accuracy': parseFloat(epochAcc.toFixed(1)),
        'Training Loss': parseFloat(epochLoss.toFixed(3))
      })

      currentAcc = epochAcc
      currentLoss = epochLoss
    }

    setSimulationData(data)
    setPlaygroundLogs({
      accuracy: parseFloat(currentAcc.toFixed(1)),
      time: calculatedTime,
      loss: parseFloat(currentLoss.toFixed(3))
    })
  }, [modelType, learningRate, datasetSize, epochs])

  // Filter projects list
  const projectTags = useMemo(() => ['All', ...new Set(projects.map((p) => p.tag))], [])
  const filteredProjects = useMemo(
    () => (projectFilter === 'All' ? projects : projects.filter((p) => p.tag === projectFilter)),
    [projectFilter]
  )

  // Handle contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setFormStatus('loading')
    setTimeout(() => {
      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })
    }, 1800)
  }

  return (
    <div className="bg-[#030014] text-gray-100 aurora-bg min-h-screen">
      {/* Radial glows in the background */}
      <div className="radial-glow glow-purple top-[20%] left-[10%]" />
      <div className="radial-glow glow-cyan top-[60%] right-[5%]" />

      {/* Floating Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#Hero" 
            className="font-display font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400"
          >
            M. C. GORANTLA
          </motion.a>

          {/* Desktop Navbar */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    active === item
                      ? 'text-[#06b6d4] bg-[#06b6d4]/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-[#06b6d4]/20'
                      : 'text-gray-400 hover:text-white border border-transparent'
                  }`}
                >
                  {item === 'Hero' ? 'Home' : item}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-b border-white/10"
            >
              <ul className="px-6 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 text-base font-semibold ${
                        active === item ? 'text-[#8b5cf6]' : 'text-gray-300'
                      }`}
                    >
                      {item === 'Hero' ? 'Home' : item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="Hero" className="min-h-screen flex items-center justify-center pt-24 px-6 relative">
        <div className="max-w-4xl text-center z-10 flex flex-col items-center">
          
          {/* Avatar Ring */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="profile-ring h-32 w-32 rounded-full flex items-center justify-center p-1.5">
              <img 
                src={techAvatar} 
                alt="Manish Chowdary Gorantla" 
                className="h-full w-full object-cover rounded-full bg-slate-900 border border-white/15" 
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-[#06b6d4] font-mono bg-[#06b6d4]/10 px-3 py-1 rounded-full border border-[#06b6d4]/20 mb-4 inline-block">
              Welcome to my Portfolio
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight leading-none">
              Manish Chowdary <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
                Gorantla
              </span>
            </h1>

            {/* Typewriter role */}
            <p className="mt-6 text-xl md:text-2xl text-gray-300 font-medium min-h-[36px]">
              I am a <span className="text-[#06b6d4] font-mono typing-cursor">{currentText}</span>
            </p>

            <p className="mt-4 text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed mx-auto">
              Master of Science in Data Science Candidate at Pace University (GPA 3.9). Specializing in production data engineering, automated ML pipelines, NLP design, and interactive decision dashboards.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <a 
                href="#Projects" 
                className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-8 py-3.5 shadow-lg shadow-violet-600/35 transition-all duration-300 hover:scale-105"
              >
                Explore Projects
              </a>
              <a 
                href="#Contact" 
                className="rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 transition-all duration-300 hover:scale-105"
              >
                Contact Me
              </a>
            </div>

            {/* Quick Tech Badge Badges */}
            <div className="mt-12 flex justify-center gap-6 items-center flex-wrap opacity-60 hover:opacity-90 transition-opacity duration-300">
              <span className="text-xs font-mono">⚡ Python</span>
              <span className="text-xs font-mono">⚡ SQL</span>
              <span className="text-xs font-mono">⚡ Snowflake</span>
              <span className="text-xs font-mono">⚡ AWS</span>
              <span className="text-xs font-mono">⚡ ML/NLP</span>
              <span className="text-xs font-mono">⚡ Tableau</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="About" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3">
            <span className="text-xs uppercase tracking-widest text-[#8b5cf6] font-mono mb-2 block">01 / BACKGROUND</span>
            <h2 className="font-display font-extrabold text-4xl text-white">About Me</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3 mb-6" />
            <p className="text-gray-400 leading-relaxed text-sm">
              My engineering approach prioritizes efficiency, pipeline reproducibility, and architectural clarity. I enjoy bridging the gap between raw unstructured data and downstream models that produce direct business impact.
            </p>
          </div>
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
              "I design robust pipelines, build automated ML systems, and build clean dashboards that team leads and stakeholders can rely on for daily decision making."
            </p>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((s, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[#8b5cf6] text-xs font-semibold uppercase tracking-wider block mb-2">{s.label}</span>
                    <h3 className="font-display font-black text-3xl text-white">{s.value}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 font-mono">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="Skills" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#06b6d4] font-mono mb-2 block">02 / CORE STACK</span>
          <h2 className="font-display font-extrabold text-4xl text-white">Skills & Competencies</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Skill Navigator & Bars */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex border-b border-white/10 flex-wrap gap-2">
              {Object.keys(skillCategories).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedSkillTab(key)}
                  className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 capitalize -mb-px ${
                    selectedSkillTab === key
                      ? 'border-[#8b5cf6] text-[#8b5cf6]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {key === 'dataEng' ? 'Data Eng' : key === 'mlAi' ? 'ML & AI' : key}
                </button>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/5 min-h-[300px] flex flex-col justify-center">
              {skillCategories[selectedSkillTab].map((skill, index) => (
                <div key={skill.name} className="mb-5 last:mb-0">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-gray-200">{skill.name}</span>
                    <span className="font-mono text-[#06b6d4]">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual competency metrics */}
          <div className="lg:col-span-6 grid gap-6 md:grid-cols-2">
            {/* Radar competence representation */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 h-80 flex flex-col justify-between">
              <h4 className="text-xs font-mono uppercase text-gray-400 px-2">Skill Density (Radar)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Space Grotesk' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} axisLine={false} />
                    <Radar
                      name="Proficiency"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tool scoring representing absolute values */}
            <div className="glass-card rounded-2xl p-4 border border-white/5 h-80 flex flex-col justify-between">
              <h4 className="text-xs font-mono uppercase text-gray-400 px-2">Primary Tool Scores</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="tool" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <Tooltip 
                      contentStyle={{ background: 'rgba(10, 10, 20, 0.9)', borderColor: 'rgba(139, 92, 246, 0.3)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      itemStyle={{ color: '#8b5cf6' }}
                    />
                    <Bar dataKey="score" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODEL TUNING INTERACTIVE PLAYGROUND */}
      <section id="Playground" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#ec4899] font-mono mb-2 block">03 / INTERACTIVE SIMULATION</span>
          <h2 className="font-display font-extrabold text-4xl text-white">Model Tuning Playground</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
          <p className="text-gray-400 mt-4 max-w-3xl text-sm leading-relaxed">
            Tune the hyperparameters below and witness the model convergence rate and accuracy change dynamically. This interactive simulator illustrates machine learning training dynamics.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Parameters Inputs Dashboard */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ec4899] animate-ping" />
              Hyperparameter Panel
            </h3>

            <div className="space-y-6">
              {/* Model Choice */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 font-mono block mb-2">Model Architecture</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Decision Tree', 'XGBoost', 'Neural Network'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setModelType(type)}
                      className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all ${
                        modelType === type
                          ? 'bg-[#ec4899]/15 text-[#ec4899] border-[#ec4899]/40'
                          : 'border-white/5 text-gray-400 bg-white/5 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning rate */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Learning Rate (α)</span>
                  <span className="text-[#ec4899] font-bold">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.005"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#ec4899]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>0.001 (Slow)</span>
                  <span>0.1 (Unstable)</span>
                </div>
              </div>

              {/* Dataset Size */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Dataset Volume</span>
                  <span className="text-[#ec4899] font-bold">{datasetSize}K Records</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={datasetSize}
                  onChange={(e) => setDatasetSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#ec4899]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>10K records</span>
                  <span>500K records</span>
                </div>
              </div>

              {/* Epochs */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Training Epochs</span>
                  <span className="text-[#ec4899] font-bold">{epochs}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#ec4899]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>5 epochs</span>
                  <span>40 epochs</span>
                </div>
              </div>
            </div>

            {/* Results summaries */}
            <div className="mt-8 border-t border-white/5 pt-6 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-500 block">Accuracy</span>
                <span className="text-lg font-bold text-white">{playgroundLogs.accuracy}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-500 block">Train Loss</span>
                <span className="text-lg font-bold text-red-400">{playgroundLogs.loss}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-500 block">Train Time</span>
                <span className="text-lg font-bold text-cyan-400">{playgroundLogs.time}s</span>
              </div>
            </div>
          </div>

          {/* Training Curve Plots Dashboard */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Model Convergence Logs</h3>
              <p className="text-xs text-gray-400 font-mono mb-4">Epoch vs Loss (left) & Validation Accuracy (right)</p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="epoch" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fill: '#f87171', fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" domain={[20, 100]} tick={{ fill: '#34d399', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(10, 10, 20, 0.9)', borderColor: 'rgba(236, 72, 153, 0.3)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="Val Accuracy" 
                    stroke="#34d399" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="Training Loss" 
                    stroke="#f87171" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="Projects" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8b5cf6] font-mono mb-2 block">04 / SELECTED WORK</span>
            <h2 className="font-display font-extrabold text-4xl text-white">Project Portfolios</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
          </div>

          {/* Filter badges */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-white/5 border border-white/5 p-1 rounded-full">
            {projectTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setProjectFilter(tag)}
                className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  projectFilter === tag
                    ? 'bg-[#8b5cf6] text-white shadow-md shadow-[#8b5cf6]/35'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid layouts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-full relative group overflow-hidden"
              >
                {/* Accent border glow top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#8b5cf6]/10 text-[#c7c3ff] border border-[#8b5cf6]/20 mb-4 uppercase">
                    {p.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#06b6d4] transition-colors duration-300 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed font-light">
                    {p.impact}
                  </p>
                  
                  {/* Detailed Accomplishments */}
                  <ul className="mt-4 border-t border-white/5 pt-4 space-y-2">
                    {p.details.map((item, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#8b5cf6] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 border border-white/5 rounded text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#06b6d4] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Repo
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. EXPERIENCE SECTION */}
      <section id="Experience" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#06b6d4] font-mono mb-2 block">05 / TIMELINE</span>
          <h2 className="font-display font-extrabold text-4xl text-white">Work Experience</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-4 space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-[#030014] border-2 border-[#8b5cf6] shadow-[0_0_10px_#8b5cf6]" />

              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <span className="text-xs text-[#06b6d4] font-mono font-bold block mb-1">{exp.period}</span>
                <h3 className="font-display font-bold text-2xl text-white">{exp.role}</h3>
                <span className="text-sm font-semibold text-[#8b5cf6] block mt-0.5 mb-4">{exp.company}</span>
                
                <ul className="space-y-3">
                  {exp.details.map((detail, keyIdx) => (
                    <li key={keyIdx} className="text-sm text-gray-400 flex items-start gap-2 leading-relaxed">
                      <span className="text-[#06b6d4] mt-1.5 h-1.5 w-1.5 rounded-full bg-[#06b6d4] shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. EDUCATION SECTION */}
      <section id="Education" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8b5cf6] font-mono mb-2 block">06 / ACADEMICS</span>
          <h2 className="font-display font-extrabold text-4xl text-white">Education History</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu) => (
            <div key={edu.title} className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase text-[#06b6d4] font-mono font-bold block mb-1">
                  {edu.meta.split(' • ')[1] || 'Degree'}
                </span>
                <h3 className="font-display font-bold text-xl text-white leading-snug">
                  {edu.title}
                </h3>
                <p className="text-xs font-mono text-gray-500 mt-2">{edu.meta}</p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light">
                  {edu.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="Contact" className="py-24 max-w-6xl mx-auto px-6 relative">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#ec4899] font-mono mb-2 block">07 / CONNECT</span>
          <h2 className="font-display font-extrabold text-4xl text-white">Get In Touch</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mt-3" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Direct channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Looking to collaborate on data-driven projects, machine learning infrastructure, or pipeline designs? Shoot me a message or connect through my handles.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-sm">✉</span>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-mono block">Email</span>
                    <a className="text-sm font-semibold text-[#06b6d4] hover:underline" href="mailto:manishchowdary@gmail.com">
                      manishchowdary@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-sm">📞</span>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-mono block">Phone</span>
                    <a className="text-sm font-semibold text-[#06b6d4] hover:underline" href="tel:+16466300665">
                      +1 (646) 630-0665
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-sm">📍</span>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-mono block">Location</span>
                    <span className="text-sm text-gray-300 font-semibold">New York, NY (Hybrid / Remote)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <span className="text-xs uppercase text-gray-500 font-mono block mb-2">Preferred Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'SQL', 'Snowflake', 'AWS', 'Tableau', 'Power BI', 'NoSQL', 'ETL', 'Docker', 'NLP'].map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1 bg-slate-950 border border-white/5 rounded-full text-[#c7c3ff]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive contact form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 border border-white/5 h-full">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[300px] space-y-4"
                  >
                    <div className="h-16 w-16 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                      ✓
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">Message Logged!</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                      Thank you for reaching out. Your message has been simulated and stored locally. I will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="mt-4 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs text-gray-300"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-xs uppercase font-mono text-gray-400 block mb-2">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-[#8b5cf6] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-mono text-gray-400 block mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-[#8b5cf6] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-mono text-gray-400 block mb-2">Message</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Tell me about your project..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-slate-950/50 border border-white/5 focus:border-[#8b5cf6] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-violet-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-500 mt-12 bg-slate-950/30">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Manish Chowdary Gorantla. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://github.com/Manishchowdary" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/manishchowdary" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
