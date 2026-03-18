import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionReveal from '../components/SectionReveal'

const skillCategories = [
  {
    title: 'CLOUD PLATFORMS',
    icon: '☁',
    skills: [
      { name: 'AWS (EC2, S3, Lambda, ECS, EKS)', level: 92 },
      { name: 'Microsoft Azure', level: 80 },
      { name: 'Google Cloud Platform', level: 75 },
      { name: 'DigitalOcean', level: 70 },
    ],
  },
  {
    title: 'DEVOPS & CI/CD',
    icon: '⚙',
    skills: [
      { name: 'Docker & Containers', level: 95 },
      { name: 'Kubernetes & Helm', level: 90 },
      { name: 'Jenkins / GitHub Actions', level: 88 },
      { name: 'Terraform / IaC', level: 85 },
      { name: 'Ansible', level: 78 },
    ],
  },
  {
    title: 'PROGRAMMING',
    icon: '◈',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Go', level: 75 },
      { name: 'C/C++', level: 80 },
      { name: 'Bash / Shell Scripting', level: 88 },
      { name: 'JavaScript / Node.js', level: 72 },
    ],
  },
  {
    title: 'MONITORING & SECURITY',
    icon: '◉',
    skills: [
      { name: 'Prometheus & Grafana', level: 85 },
      { name: 'ELK Stack', level: 78 },
      { name: 'Datadog / New Relic', level: 72 },
      { name: 'Vault / Secrets Management', level: 70 },
    ],
  },
]

function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="group cursor-hover">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-noir-text group-hover:text-noir-red transition-colors duration-300">
          {name}
        </span>
        <span className="font-mono text-[10px] text-noir-muted">{level}%</span>
      </div>
      <div className="h-[3px] bg-noir-gray/50 overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #ff2b2b 0%, #cc0000 100%)',
            boxShadow: '0 0 10px rgba(255,43,43,0.3)',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">03</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Skills</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <SectionReveal key={cat.title} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.15}>
              <motion.div
                className="glass p-6 paper-texture hover:border-noir-red/20 transition-colors duration-500 cursor-hover h-full"
                whileHover={{ boxShadow: '0 0 20px rgba(255,43,43,0.08)' }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl text-noir-red group-hover:drop-shadow-[0_0_8px_rgba(255,43,43,0.5)]">
                    {cat.icon}
                  </span>
                  <h3 className="font-mono text-xs tracking-[0.3em] text-noir-red">
                    {cat.title}
                  </h3>
                  <div className="flex-1 h-[1px] bg-noir-gray/30" />
                </div>

                {/* Skill bars */}
                <div className="space-y-4">
                  {cat.skills.map((skill, j) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.1 + j * 0.15}
                    />
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
