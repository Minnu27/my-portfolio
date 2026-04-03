import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Happy Clients', value: '10+' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
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
            About <span style={{ color: '#6c63ff' }}>Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded" style={{ background: '#6c63ff' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#e0e0e0' }}
            >
              Full Stack Developer & Data Enthusiast
            </h3>
            <p
              className="text-base leading-8 mb-6"
              style={{ color: '#999', fontFamily: 'Inter, sans-serif' }}
            >
              {personalInfo.bio}
            </p>
            <p
              className="text-base leading-8 mb-8"
              style={{ color: '#999', fontFamily: 'Inter, sans-serif' }}
            >
              When I'm not coding, I enjoy exploring new technologies, contributing to open source projects, 
              and sharing knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(108,99,255,0.15)',
                    border: '1px solid rgba(108,99,255,0.4)',
                    color: '#a78bfa',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  border: '1px solid rgba(108,99,255,0.2)',
                  boxShadow: '0 4px 24px rgba(108,99,255,0.08)',
                }}
              >
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ color: '#6c63ff', fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
