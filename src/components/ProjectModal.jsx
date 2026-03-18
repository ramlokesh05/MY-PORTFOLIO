import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative glass-heavy rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto paper-texture"
          initial={{ scale: 0.8, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-noir-muted hover:text-noir-red transition-colors cursor-hover font-mono"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Top accent */}
          <div className="h-[2px] bg-gradient-to-r from-noir-red via-noir-red/50 to-transparent" />

          <div className="p-8">
            {/* Classification stamp */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-noir-red border border-noir-red/30 px-2 py-0.5">
                CLASSIFIED
              </span>
              <span className="font-mono text-[10px] tracking-widest text-noir-muted">
                FILE #{project.id || '001'}
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-noir-white mb-2">
              {project.title}
            </h2>

            <p className="font-mono text-xs text-noir-muted mb-6 tracking-wider">
              {project.subtitle}
            </p>

            <div className="h-[1px] bg-noir-gray mb-6" />

            <p className="text-noir-text leading-relaxed mb-6 text-sm">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider px-3 py-1 border border-noir-gray text-noir-muted hover:border-noir-red hover:text-noir-red transition-colors duration-300 cursor-hover"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key features */}
            {project.features && (
              <div className="mb-6">
                <h3 className="font-mono text-xs tracking-[0.2em] text-noir-red mb-3">
                  KEY FEATURES
                </h3>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-noir-text">
                      <span className="text-noir-red mt-1 text-xs">▹</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-noir-gray">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn font-mono text-xs tracking-wider px-5 py-2 border border-noir-gray text-noir-muted hover:text-noir-red hover:border-noir-red transition-all cursor-hover"
                >
                  SOURCE CODE
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn font-mono text-xs tracking-wider px-5 py-2 bg-noir-red/10 border border-noir-red/30 text-noir-red hover:bg-noir-red/20 transition-all cursor-hover"
                >
                  LIVE DEMO
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
