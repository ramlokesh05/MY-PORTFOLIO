import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import ProjectModal from '../components/ProjectModal'

const projects = [
  {
    id: '001',
    image: 'student-management.jpg',
    title: 'University Management System',
    subtitle: 'Role-Based Academic Administration Platform',
    description: 'A full-stack student management platform with role-based login for students, teachers, and admins. Built with a secure backend and database integration to manage profiles, attendance, marks, and academic workflows efficiently.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'RBAC'],
    features: [
      'Role-based authentication and protected dashboards',
      'Backend APIs for student, class, and marks management',
      'Database-driven attendance and academic record tracking',
      'Admin controls for user and course operations',
    ],
    github: 'https://github.com',
    live: null,
  },
  {
    id: '002',
    image: 'expense-tracker.jpg',
    title: 'PErsonal expense tracker',
    subtitle: 'Smart Daily Finance Monitor',
    description: 'A personal finance web app for tracking daily income and expenses, categorizing transactions, and analyzing spending behavior. Designed to help users monitor budgets and build healthy financial habits.',
    tags: ['React', 'JavaScript', 'Chart.js', 'CSS', 'Local Storage'],
    features: [
      'Quick add, edit, and delete for expense entries',
      'Category-wise and monthly spending analytics',
      'Visual dashboards with charts and summaries',
      'Persistent storage for transaction history',
    ],
    github: 'https://github.com',
    live: null,
  },
  {
    id: '003',
    image: 'car-rental.jpg',
    title: 'Car Rental Platfrom',
    subtitle: 'Customer-Focused Vehicle Booking System',
    description: 'A client project for a car rental business featuring vehicle listings, booking workflow, availability management, and customer-friendly UI. Built to streamline rental operations and improve online reservations.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    features: [
      'Browse and filter available rental cars',
      'Booking flow with date and availability checks',
      'Backend integration for reservations and user records',
      'Responsive interface tailored for customer conversion',
    ],
    github: 'https://github.com',
    live: null,
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">05</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Projects</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

          {/* Projects Horizontal Scroll Tiles */}
          <div className="flex overflow-x-auto gap-8 py-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-noir-red/30 scrollbar-track-noir-gray/10">
            {projects.map((project, i) => (
              <SectionReveal key={project.id} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={i * 0.1}>
                <motion.div
                  onClick={() => setSelectedProject(project)}
                  className="glass p-6 paper-texture h-full flex flex-col cursor-hover group hover:border-noir-red/20 transition-all duration-500 relative overflow-hidden min-w-[300px] snap-start"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 25px rgba(255,43,43,0.15)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-noir-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Light sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* File number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-noir-red border border-noir-red/30 px-2 py-0.5">
                      CASE #{project.id}
                    </span>
                    <span className="font-mono text-[9px] text-noir-gray group-hover:text-noir-muted transition-colors">
                      ◈
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-noir-white group-hover:text-noir-red transition-colors duration-300 mb-2">RAM LOKESH</h3>

                  <p className="font-mono text-[10px] text-noir-muted tracking-wider mb-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                  {/* Summary */}
                  <p className="font-mono text-[9px] text-noir-muted tracking-wider mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Image */}
                  <img src={`/images/${project.image || `${project.id}_image.png`}`} alt={project.title} className="w-full h-48 object-cover rounded mb-4 grayscale group-hover:grayscale-0 transition duration-500" />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-noir-gray/20">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] tracking-wider px-2 py-0.5 border border-noir-gray/30 text-noir-muted group-hover:border-noir-red/20 group-hover:text-noir-text transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="font-mono text-[8px] text-noir-muted">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Click hint */}
                  <div className="absolute bottom-2 right-2 font-mono text-[7px] text-noir-gray opacity-0 group-hover:opacity-100 transition-opacity">
                    CLICK TO OPEN ↗
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
