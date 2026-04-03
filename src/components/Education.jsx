import { motion } from 'framer-motion';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6" style={{ background: '#0a0a0a' }}>
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
            <span style={{ color: '#6c63ff' }}>Education</span> & Certifications
          </h2>
          <div className="w-20 h-1 mx-auto rounded" style={{ background: '#6c63ff' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                border: '1px solid rgba(108,99,255,0.2)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: item.type === 'degree' ? '#6c63ff' : '#ff6b6b' }}
              />
              <div className="pl-4">
                <div className="text-3xl mb-4">
                  {item.type === 'degree' ? '🎓' : '📜'}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
                >
                  {item.degree}
                </h3>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: '#6c63ff', fontFamily: 'Inter, sans-serif' }}
                >
                  {item.institution}
                </p>
                <p
                  className="text-sm"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {item.period}
                </p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(108,99,255,0.12)',
                    border: '1px solid rgba(108,99,255,0.3)',
                    color: '#a78bfa',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
