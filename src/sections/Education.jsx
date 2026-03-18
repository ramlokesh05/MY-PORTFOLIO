import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

const educationData = [
  {
    degree: 'Bachelor of Technology',
    field: 'Undergraduate Degree',
    school: 'Lovely Professional University, Phagwara',
    year: 'Expected 2027',
    gpa: '6.6 / 10',
    highlights: [
      'Pursuing comprehensive B.Tech coursework',
      'Specializing in Cloud Computing & DevOps principles',
      'Building scalable infrastructure projects'
    ],
  },
  {
    degree: 'Higher Secondary Education (12th)',
    field: 'Science Stream',
    school: 'Aditya Jr College, Kakinada',
    year: '2021 — 2023',
    gpa: '7.0 GPA',
    highlights: [
      'Core focus on Mathematics, Physics, and Chemistry',
      'Developed strong analytical and problem-solving skills'
    ],
  },
  {
    degree: 'Secondary Education (10th)',
    field: 'General Academics',
    school: 'Ashram Public School, Kakinada',
    year: 'Completed 2021',
    gpa: '8.0 CGPA',
    highlights: [
      'Graduated with strong academic standing',
      'Solidified foundational logic and mathematical abilities'
    ],
  },
]

export default function Education() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">02</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Education</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-noir-red/40 via-noir-gray to-noir-gray/20 md:-translate-x-[0.5px]" />

          {educationData.map((edu, i) => (
            <SectionReveal
              key={i}
              variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'}
              delay={i * 0.2}
              className="relative mb-16 last:mb-0"
            >
              <div className={`flex items-start gap-8 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-[5px] md:-translate-x-[6px] mt-6 z-10">
                  <motion.div
                    className="w-full h-full rounded-full bg-noir-red"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                  <div className="absolute inset-0 rounded-full bg-noir-red animate-ping opacity-20" />
                </div>

                {/* Content card */}
                <motion.div
                  className={`ml-12 md:ml-0 md:w-[45%] glass p-6 paper-texture group cursor-hover hover:border-noir-red/20 transition-all duration-500 ${
                    i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                  whileHover={{ boxShadow: '0 0 20px rgba(255,43,43,0.1)' }}
                >
                  {/* Year badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-noir-red border border-noir-red/30 px-2 py-0.5">
                      {edu.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-noir-white group-hover:text-noir-red transition-colors mb-1">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-noir-muted tracking-wider mb-1">
                    {edu.field}
                  </p>
                  <p className="text-sm text-noir-text mb-3">{edu.school}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] tracking-wider text-noir-muted">GPA:</span>
                    <span className="font-mono text-sm text-noir-red">{edu.gpa}</span>
                  </div>

                  <div className="border-t border-noir-gray/30 pt-3">
                    <ul className="space-y-1.5">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-noir-muted">
                          <span className="text-noir-red mt-0.5">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
