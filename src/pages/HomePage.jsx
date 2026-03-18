import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ParticleBackground from '../components/ParticleBackground'
import RoomWrapper from '../components/RoomWrapper'
import About from '../sections/About'
import Education from '../sections/Education'
import Skills from '../sections/Skills'
import Certifications from '../sections/Certifications'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'

export default function HomePage() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const [displayText, setDisplayText] = useState('')
  const fullName = 'RAM LOKESH'
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  // Typing animation
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayText(fullName.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 120)
    return () => clearInterval(timer)
  }, [])

  // GSAP hero intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.6, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-decoration',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5, stagger: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Parallax mouse
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <ParticleBackground />
      <Header />

      {/* ─── HERO SECTION ─── */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Hero ambient red glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-noir-red/[0.04] blur-[150px]" />
        </div>
        {/* Parallax background elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Decorative grid lines */}
          <div className="hero-decoration absolute top-20 left-10 md:left-20 w-40 h-[1px] bg-gradient-to-r from-noir-red/20 to-transparent" />
          <div className="hero-decoration absolute top-32 left-10 md:left-20 w-20 h-[1px] bg-gradient-to-r from-noir-gray/30 to-transparent" />
          <div className="hero-decoration absolute bottom-32 right-10 md:right-20 w-32 h-[1px] bg-gradient-to-l from-noir-red/20 to-transparent" />
          <div className="hero-decoration absolute top-1/4 right-10 md:right-32 font-mono text-[9px] text-noir-gray tracking-[0.5em] rotate-90">
            PORTFOLIO.EXE
          </div>
          <div className="hero-decoration absolute bottom-1/4 left-10 md:left-32 font-mono text-[9px] text-noir-gray tracking-[0.5em] -rotate-90">
            SYS://ACTIVE
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Classification label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red border border-noir-red/20 px-4 py-1">
              DOSSIER #2026
            </span>
          </motion.div>

          {/* Name with typing */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-noir-white mb-4 relative">
            <span ref={nameRef}>{displayText}</span>
            <motion.span
              className="inline-block w-[3px] h-[0.9em] bg-noir-red ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse' }}
            />
          </h1>

          {/* Title */}
          <div className="hero-subtitle opacity-0">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-noir-red/40" />
              <h2 className="font-mono text-sm md:text-base tracking-[0.3em] text-noir-muted uppercase">
                Cloud & DevOps Engineer
              </h2>
              <div className="h-[1px] w-12 bg-noir-red/40" />
            </div>
          </div>

          {/* Description */}
          <p className="hero-desc opacity-0 font-sans text-sm md:text-base text-noir-muted max-w-xl mx-auto leading-relaxed mb-10">
            Architecting resilient cloud infrastructure and automating the impossible.
            Specializing in AWS, Kubernetes, and CI/CD pipelines that never sleep.
          </p>

          {/* CTAs */}
          <div className="hero-cta opacity-0 flex flex-col items-center gap-4">
            {/* Primary actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  window.__navClickedTarget = 'projects'
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="magnetic-btn font-mono text-xs tracking-[0.2em] px-8 py-3 border border-noir-red/40 text-noir-red hover:bg-noir-red/10 transition-all cursor-hover"
                whileHover={{ boxShadow: '0 0 20px rgba(255,43,43,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW PROJECTS
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  window.__navClickedTarget = 'contact'
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="magnetic-btn font-mono text-xs tracking-[0.2em] px-8 py-3 border border-noir-gray text-noir-muted hover:text-noir-red hover:border-noir-red transition-all cursor-hover"
                whileHover={{ boxShadow: '0 0 15px rgba(255,43,43,0.2)' }}
                whileTap={{ scale: 0.97 }}
              >
                CONTACT ME
              </motion.a>
            </div>

            {/* Social + Resume row */}
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <motion.a
                href="https://www.linkedin.com/in/ramlokesh05/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] px-5 py-2 border border-noir-gray/60 text-noir-muted hover:text-noir-red hover:border-noir-red transition-all cursor-hover"
                whileHover={{ boxShadow: '0 0 12px rgba(255,43,43,0.2)', scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-noir-red text-xs">◆</span>
                LINKEDIN
              </motion.a>
              <motion.a
                href="https://github.com/ramlokesh05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] px-5 py-2 border border-noir-gray/60 text-noir-muted hover:text-noir-red hover:border-noir-red transition-all cursor-hover"
                whileHover={{ boxShadow: '0 0 12px rgba(255,43,43,0.2)', scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-noir-red text-xs">⌥</span>
                GITHUB
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] px-5 py-2 border border-noir-red/30 text-noir-red hover:bg-noir-red/10 transition-all cursor-hover group"
                whileHover={{ boxShadow: '0 0 15px rgba(255,43,43,0.25)', scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-xs group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform">↗</span>
                VIEW RESUME
              </motion.a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[8px] tracking-[0.4em] text-noir-muted">SCROLL</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-noir-red to-transparent"
            animate={{ height: [20, 32, 20] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.section>

      {/* ─── SECTIONS ─── */}
      <main className="relative z-10">
        {/* Ambient red glow bleeds — toned down, grainy */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Glow spots at reduced opacity */}
          <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-noir-red/[0.015] blur-[140px]" />
          <div className="absolute top-[25%] right-[-8%] w-[400px] h-[400px] rounded-full bg-noir-red/[0.012] blur-[120px]" />
          <div className="absolute top-[50%] left-[10%] w-[350px] h-[350px] rounded-full bg-noir-red/[0.01] blur-[120px]" />
          <div className="absolute top-[72%] right-[5%] w-[450px] h-[450px] rounded-full bg-noir-red/[0.015] blur-[150px]" />
          <div className="absolute top-[90%] left-[30%] w-[300px] h-[300px] rounded-full bg-noir-red/[0.012] blur-[100px]" />
          {/* Grain texture over the whole ambient layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              opacity: 0.06,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        <RoomWrapper id="about" roomNumber="01" roomName="The Study">
          <About />
        </RoomWrapper>
        <RoomWrapper id="education" roomNumber="02" roomName="The Archive">
          <Education />
        </RoomWrapper>
        <RoomWrapper id="skills" roomNumber="03" roomName="The Armory">
          <Skills />
        </RoomWrapper>
        <RoomWrapper id="certifications" roomNumber="04" roomName="The Vault">
          <Certifications />
        </RoomWrapper>
        <RoomWrapper id="projects" roomNumber="05" roomName="The Workshop">
          <Projects />
        </RoomWrapper>
        <RoomWrapper id="contact" roomNumber="06" roomName="The Parlour">
          <Contact />
        </RoomWrapper>
      </main>

      <Footer />
    </motion.div>
  )
}
