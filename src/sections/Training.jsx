import SectionReveal from '../components/SectionReveal'
import { motion } from 'framer-motion'

const trainings = [
  {
    id: 't01',
    title: 'Cipher Schools – C++',
    description: 'Advanced C++ programming with a focus on performance‑critical data structures and algorithms.',
  },
  {
    id: 't02',
    title: 'Cipher Schools – DSA',
    description: 'Comprehensive coverage of data structures and algorithms, applied to real‑world problem solving.',
  },
]

export default function Training() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">07</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Training</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

        {/* Training Tiles */}
        <div className="flex flex-col gap-8">
          {trainings.map((train, i) => (
            <SectionReveal key={train.id} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
              <motion.div
                className="glass p-6 paper-texture flex flex-col group hover:border-noir-red/20 transition-all duration-500"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,43,43,0.12)' }}
                whileTap={{ scale: 0.97 }}
              >
                <h3 className="font-serif text-lg text-noir-white mb-2">{train.title}</h3>
                <p className="font-mono text-[10px] text-noir-muted leading-relaxed">{train.description}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
