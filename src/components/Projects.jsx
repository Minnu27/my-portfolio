import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

const filters = ['All', 'React', 'Python', 'Node.js'];

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
          >
            My <span style={{ color: '#6c63ff' }}>Projects</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded mb-8" style={{ background: '#6c63ff' }} />

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: filter === f ? '#6c63ff' : 'rgba(108,99,255,0.1)',
                  color: filter === f ? '#fff' : '#aaa',
                  border: `1px solid ${filter === f ? '#6c63ff' : 'rgba(108,99,255,0.3)'}`,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.05 * i }}
                className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  border: '1px solid rgba(108,99,255,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
                whileHover={{
                  borderColor: 'rgba(108,99,255,0.6)',
                  boxShadow: '0 8px 40px rgba(108,99,255,0.2)',
                  y: -4,
                }}
              >
                <div className="flex items-start justify-between">
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors"
                      style={{ color: '#888' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#6c63ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors"
                      style={{ color: '#888' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                    >
                      <ExternalIcon />
                    </a>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(108,99,255,0.12)',
                        border: '1px solid rgba(108,99,255,0.3)',
                        color: '#a78bfa',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
