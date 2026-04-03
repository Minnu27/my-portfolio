import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(108,99,255,0.15)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p
          className="text-sm"
          style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}
        >
          Designed & Built by{' '}
          <span style={{ color: '#6c63ff', fontWeight: 600 }}>Minnu (Minakshi)</span>
          {' '}— {new Date().getFullYear()}
        </p>
        <p
          className="text-xs mt-2"
          style={{ color: '#444', fontFamily: 'Inter, sans-serif' }}
        >
          Built with React, Vite, Framer Motion & Recharts
        </p>
      </motion.div>
    </footer>
  );
}
