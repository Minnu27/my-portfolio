import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: '#0d0d1a' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
          >
            Work <span style={{ color: '#6c63ff' }}>Experience</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded" style={{ background: '#6c63ff' }} />
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #6c63ff, rgba(108,99,255,0.1))' }}
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="relative pl-20"
              >
                <div
                  className="absolute left-6 top-6 w-4 h-4 rounded-full -translate-x-1/2"
                  style={{
                    background: '#6c63ff',
                    boxShadow: '0 0 12px rgba(108,99,255,0.8)',
                  }}
                />

                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                    border: '1px solid rgba(108,99,255,0.2)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
                      >
                        {item.role}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: '#6c63ff', fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.company}
                      </p>
                    </div>
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(255,107,107,0.12)',
                        border: '1px solid rgba(255,107,107,0.3)',
                        color: '#ff6b6b',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: '#999', fontFamily: 'Inter, sans-serif' }}
                      >
                        <span style={{ color: '#6c63ff', marginTop: 2 }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
