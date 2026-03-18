import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    window.__navClickedTarget = href.replace('#', '')
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'glass-heavy shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      {/* Paper texture + pin effect */}
      <div className="paper-texture relative">
        {/* Top edge — notice board strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-noir-gray to-transparent" />

        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="cursor-hover group flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-serif text-xl tracking-[0.08em] text-noir-white group-hover:text-noir-red transition-colors duration-300 uppercase">
              Ram
            </span>
            <span className="w-[1px] h-4 bg-noir-red/60 mx-2" />
            <span className="font-serif text-xl tracking-[0.08em] text-noir-white group-hover:text-noir-red transition-colors duration-300 uppercase">
              Lokesh
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover-underline font-mono text-xs tracking-[0.2em] text-noir-muted hover:text-noir-red transition-colors duration-300 cursor-hover"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-hover group"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-noir-muted group-hover:bg-noir-red transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-noir-muted group-hover:bg-noir-red transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-noir-muted group-hover:bg-noir-red transition-colors"
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden glass-heavy"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-sm tracking-widest text-noir-muted hover:text-noir-red transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-noir-gray/50 to-transparent" />
      </div>
    </motion.header>
  )
}
