import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { skills, radarData } from '../data/portfolioData';

const barData = skills.map((s) => ({ name: s.name, Proficiency: s.level }));

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: '#0d0d1a' }}>
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
            My <span style={{ color: '#6c63ff' }}>Skills</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded" style={{ background: '#6c63ff' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="text-xl font-bold mb-8"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#e0e0e0' }}
            >
              Proficiency Levels
            </h3>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: '#6c63ff', fontFamily: 'Inter, sans-serif' }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(108,99,255,0.15)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * i, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #6c63ff, #ff6b6b)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              border: '1px solid rgba(108,99,255,0.2)',
            }}
          >
            <h3
              className="text-xl font-bold mb-6 text-center"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#e0e0e0' }}
            >
              Skill Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(108,99,255,0.3)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#aaa', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#6c63ff"
                  fill="#6c63ff"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <h3
            className="text-xl font-bold mb-6 text-center"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#e0e0e0' }}
          >
            Proficiency Overview
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,99,255,0.15)" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#aaa', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#aaa', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              />
              <Tooltip
                contentStyle={{
                  background: '#1a1a2e',
                  border: '1px solid #6c63ff',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="Proficiency" fill="#6c63ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
