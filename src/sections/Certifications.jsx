import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

const certifications = [
  {
    title: 'DSA with C++',
    subtitle: 'Data Structures & Algorithms',
    issuer: 'Cipher Schools',
    date: '2023',
    id: 'CS-DSA-CPP',
    description: 'Comprehensive study of Data Structures and Algorithms using C++.',
  },
  {
    title: 'Web Development',
    subtitle: 'Full Stack Basics',
    issuer: 'FreeCodeCamp',
    date: '2023',
    id: 'FCC-WEB',
    description: 'Foundations of HTML, CSS, JavaScript, and responsive web design.',
  },
  {
    title: 'Social Networking',
    subtitle: 'Analysis and Concepts',
    issuer: 'NPTEL',
    date: '2023',
    id: 'NPTEL-SN',
    description: 'Study of social network analysis, graph theory, and network dynamics.',
  },
  {
    title: 'LinkedIn Professional',
    subtitle: 'Profile Optimization',
    issuer: 'Udemy',
    date: '2024',
    id: 'UD-LIP',
    description: 'Masterclass on professional networking, personal branding, and career growth on LinkedIn.',
  },
  {
    title: 'GitHub Foundations',
    subtitle: 'Version Control',
    issuer: 'GitHub',
    date: '2024',
    id: 'GH-FND',
    description: 'Core concepts of Git, GitHub workflows, repositories, branches, and collaboration.',
  },
  {
    title: 'MongoDB Associate Developer',
    subtitle: 'NoSQL Databases',
    issuer: 'MongoDB',
    date: '2024',
    id: 'MDB-AD',
    description: 'Document database modeling, CRUD operations, aggregation framework, and indexes.',
  },
]

function CertCard({ cert, index }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <SectionReveal variant="scale" delay={index * 0.1}>
      <div
        className="relative h-64 cursor-hover perspective-1000"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 glass paper-texture p-6 flex flex-col justify-between hover:border-noir-red/20 transition-colors duration-500"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-noir-red/50 to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-noir-red border border-noir-red/30 px-2 py-0.5">
                  VERIFIED
                </span>
                <span className="font-mono text-[9px] tracking-wider text-noir-muted">
                  {cert.date}
                </span>
              </div>

              <h3 className="font-serif text-lg text-noir-white mb-1">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-noir-red tracking-wider">
                {cert.subtitle}
              </p>
            </div>

            <div className="border-t border-noir-gray/30 pt-3">
              <p className="font-mono text-[10px] text-noir-muted tracking-wider">
                {cert.issuer}
              </p>
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-3 right-3 font-mono text-[8px] text-noir-gray animate-pulse">
              HOVER TO REVEAL ↻
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 glass p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'rgba(17, 17, 17, 0.9)',
              border: '1px solid rgba(255, 43, 43, 0.2)',
              boxShadow: '0 0 20px rgba(255, 43, 43, 0.1)',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-noir-red" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-noir-red">
                  DETAILS
                </span>
              </div>

              <p className="text-sm text-noir-text leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>

            <div className="border-t border-noir-red/20 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] tracking-wider text-noir-muted">
                  ID: {cert.id}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-noir-red">
                  ◈ CERTIFIED
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  )
}

export default function Certifications() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">04</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Certifications</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
