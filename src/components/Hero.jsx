import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0d1a 50%, #0a0a0a 100%)' }}
    >
      <div
        className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: '#6c63ff' }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: '#ff6b6b' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium mb-4 tracking-widest uppercase"
            style={{ color: '#6c63ff', fontFamily: 'Inter, sans-serif' }}
          >
            👋 Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
          >
            Minnu
            <br />
            <span style={{ color: '#6c63ff' }}>Minakshi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-8"
            style={{ color: '#ff6b6b', fontFamily: 'Inter, sans-serif' }}
          >
            {personalInfo.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base leading-relaxed mb-10 max-w-lg"
            style={{ color: '#aaa', fontFamily: 'Inter, sans-serif' }}
          >
            {personalInfo.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', fontFamily: 'Inter, sans-serif' }}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
              style={{
                border: '2px solid #6c63ff',
                color: '#6c63ff',
                background: 'transparent',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          className="flex justify-center"
        >
          <div className="relative">
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center text-8xl select-none"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                border: '4px solid #6c63ff',
                boxShadow: '0 0 60px rgba(108,99,255,0.4)',
              }}
            >
              👩‍💻
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div
                className="absolute top-4 left-1/2 w-4 h-4 rounded-full -translate-x-1/2"
                style={{ background: '#ff6b6b', boxShadow: '0 0 12px #ff6b6b' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: '#555' }}
      >
        <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}
