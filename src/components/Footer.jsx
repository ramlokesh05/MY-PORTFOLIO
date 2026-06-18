import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useSoundEngine } from './SoundEngine'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ramlokesh05', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramlokesh05/', icon: '◆' },
  { label: 'Email', href: 'mailto:karrilokesh2006@gmail.com', icon: '◉' },
]

export default function Footer() {
  const { sound } = useSoundEngine()

  return (
    <footer
      className="relative paper-texture"
      style={{
        background: 'linear-gradient(180deg, rgba(10,5,5,0.97) 0%, rgba(6,3,3,1) 100%)',
        borderTop: '1px solid rgba(255,43,43,0.12)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top glow edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,43,43,0.25) 30%, rgba(255,43,43,0.5) 50%, rgba(255,43,43,0.25) 70%, transparent 100%)', boxShadow: '0 0 12px rgba(255,43,43,0.15)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionReveal variant="fadeUp">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Left — Branding */}
            <div>
              <h3 className="text-xl mb-2 flex items-center">
                <span className="font-serif tracking-[0.08em] text-noir-white uppercase"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >Ram</span>
                <span
                  className="w-[1px] h-4 mx-2 block"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(255,43,43,0.7), transparent)' }}
                />
                <span className="font-serif tracking-[0.08em] text-noir-white uppercase"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >Lokesh</span>
              </h3>
              <p className="font-mono text-[10px] tracking-[0.3em] text-noir-muted">
                CLOUD &amp; DEVOPS ENGINEER
              </p>
            </div>

            {/* Center — Social Buttons — skeuomorphic */}
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound?.('hover')}
                  onClick={() => sound?.('click')}
                  className="flex items-center gap-2 px-4 py-2 text-noir-muted hover:text-noir-red transition-all duration-300 cursor-hover group font-mono text-[10px] tracking-[0.2em]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(28,15,15,0.95) 0%, rgba(12,6,6,0.98) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                    borderBottom: '1px solid rgba(0,0,0,0.5)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: '0 0 16px rgba(255,43,43,0.2), 0 4px 20px rgba(0,0,0,0.7)',
                    borderColor: 'rgba(255,43,43,0.35)',
                  }}
                  whileTap={{ scale: 0.95, boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)' }}
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
                <span className="w-2 h-2 rounded-full bg-noir-red animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(255,43,43,0.7)' }}
                />
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
          <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <p className="font-mono text-[10px] tracking-widest text-noir-muted">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
            <p className="font-mono text-[10px] tracking-widest text-noir-muted">
              DESIGNED &amp; DEVELOPED WITH <span className="text-noir-red" style={{ textShadow: '0 0 6px rgba(255,43,43,0.6)' }}>♦</span> PRECISION
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  )
}
