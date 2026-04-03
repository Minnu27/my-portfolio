import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(108,99,255,0.3)',
    background: 'rgba(108,99,255,0.07)',
    color: '#e0e0e0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const socials = [
    { icon: <EmailIcon />, label: 'Email', href: `mailto:${personalInfo.email}`, value: personalInfo.email },
    { icon: <GithubIcon />, label: 'GitHub', href: personalInfo.github, value: 'github.com/Minnu27' },
    { icon: <LinkedinIcon />, label: 'LinkedIn', href: personalInfo.linkedin, value: 'linkedin.com/in/minnu27' },
  ];

  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#0d0d1a' }}>
      <div className="max-w-5xl mx-auto">
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
            Get In <span style={{ color: '#6c63ff' }}>Touch</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded mb-4" style={{ background: '#6c63ff' }} />
          <p style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#6c63ff')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.3)')}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#6c63ff')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.3)')}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.target.style.borderColor = '#6c63ff')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(108,99,255,0.3)')}
            />
            <button
              type="submit"
              className="py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {submitted ? '✅ Message Sent!' : 'Send Message →'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: '#999', fontFamily: 'Inter, sans-serif' }}
            >
              I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about tech!
            </p>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  border: '1px solid rgba(108,99,255,0.15)',
                  color: '#ccc',
                  textDecoration: 'none',
                }}
                whileHover={{
                  borderColor: 'rgba(108,99,255,0.6)',
                  x: 4,
                }}
              >
                <span style={{ color: '#6c63ff' }}>{s.icon}</span>
                <div>
                  <div
                    className="text-xs font-medium mb-0.5"
                    style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: '#ddd', fontFamily: 'Inter, sans-serif' }}
                  >
                    {s.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
