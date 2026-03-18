import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ramlokesh05', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramlokesh05/', icon: '◆' },
  { label: 'Email', href: 'mailto:karrilokesh2006@gmail.com', icon: '◉' },
]

export default function Footer() {
  return (
    <footer className="relative bg-noir-dark border-t border-noir-gray/30 paper-texture">

      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionReveal variant="fadeUp">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Left — Branding */}
            <div>
              <h3 className="text-xl mb-2 flex items-center">
                <span className="font-serif tracking-[0.08em] text-noir-white uppercase">Ram</span>
                <span className="w-[1px] h-4 bg-noir-red/60 mx-2" />
                <span className="font-serif tracking-[0.08em] text-noir-white uppercase">Lokesh</span>
              </h3>
              <p className="font-mono text-[10px] tracking-[0.3em] text-noir-muted">
                CLOUD & DEVOPS ENGINEER
              </p>
            </div>

            {/* Center — Social Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-noir-gray text-noir-muted hover:text-noir-red hover:border-noir-red transition-all duration-300 cursor-hover group font-mono text-[10px] tracking-[0.2em]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 12px rgba(255,43,43,0.25)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <span className="text-noir-red text-xs group-hover:drop-shadow-[0_0_6px_rgba(255,43,43,0.5)]">
                    {link.icon}
                  </span>
                  {link.label.toUpperCase()}
                </motion.a>
              ))}
            </div>

            {/* Right — Status */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-noir-red animate-pulse" />
                <span className="font-mono text-[10px] tracking-wider text-noir-muted">
                  SYSTEM ONLINE
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-widest text-noir-muted">
                AVAILABLE FOR HIRE
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-noir-gray/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] tracking-widest text-noir-muted">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
            <p className="font-mono text-[10px] tracking-widest text-noir-muted">
              DESIGNED & DEVELOPED WITH <span className="text-noir-red">♦</span> PRECISION
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  )
}
