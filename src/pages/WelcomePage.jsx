import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useTransition } from '../components/PageTransition'

const loadingMessages = [
  'INITIALIZING SYSTEM...',
  'LOADING ENCRYPTED FILES...',
  'DECRYPTING PORTFOLIO DATA...',
  'VERIFYING CLEARANCE LEVEL...',
  'ACCESS GRANTED',
]

export default function WelcomePage() {
  const { trigger } = useTransition()
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [loadingDone, setLoadingDone] = useState(false)
  const [showEnter, setShowEnter] = useState(false)

  useEffect(() => {
    // Loading sequence
    const timers = loadingMessages.map((_, i) =>
      setTimeout(() => {
        setLoadingPhase(i)
        if (i === loadingMessages.length - 1) {
          setTimeout(() => {
            setLoadingDone(true)
            setTimeout(() => setShowEnter(true), 800)
          }, 600)
        }
      }, i * 700)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (loadingDone && titleRef.current) {
      // GSAP cinematic title animation
      const el = titleRef.current
      gsap.fromTo(el,
        { opacity: 0, scale: 1.2, filter: 'blur(20px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
        }
      )
    }
  }, [loadingDone])

  const handleEnter = () => {
    trigger('/home')
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-noir-black z-[300] flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: 'inset(0 0 0 0)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Moving scanline */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-noir-red/30 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Loading Phase */}
      {!loadingDone ? (
        <div className="relative z-10 text-center">
          {/* Loading bars */}
          <div className="flex gap-1 justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-noir-red"
                animate={{
                  height: [12, 28, 12],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Loading messages */}
          <div className="h-20 flex flex-col items-center justify-center">
            {loadingMessages.map((msg, i) => (
              <motion.p
                key={i}
                className={`font-mono text-xs tracking-[0.3em] absolute ${
                  i === loadingPhase ? 'text-noir-red' : 'text-noir-muted'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={i === loadingPhase ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {msg}
              </motion.p>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-noir-gray mx-auto mt-4">
            <motion.div
              className="h-full bg-noir-red"
              initial={{ width: '0%' }}
              animate={{ width: `${(loadingPhase + 1) * 20}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center px-6">
          {/* Main Title with glitch */}
          <div ref={titleRef} className="mb-4 opacity-0">
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red block mb-4">
                ◈ CLEARANCE : VERIFIED ◈
              </span>
            </div>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-noir-white mb-6 glitch-text"
              data-text="RAM LOKESH"
            >
              RAM LOKESH
            </h1>

            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-noir-red" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-noir-muted">
                CLOUD & DEVOPS ENGINEER
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-noir-red" />
            </div>
          </div>

          {/* Enter Button */}
          {showEnter && (
            <motion.button
              onClick={handleEnter}
              className="magnetic-btn mt-12 font-mono text-sm tracking-[0.3em] px-10 py-4 border border-noir-red/40 text-noir-red hover:bg-noir-red/10 transition-all duration-500 cursor-hover relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                boxShadow: '0 0 30px rgba(255,43,43,0.3)',
                borderColor: '#ff2b2b',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">ENTER PORTFOLIO</span>
              {/* Sweep effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-noir-red/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>
          )}
        </div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">
        SYS://INIT
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">
        v2.0.26
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">
        ENCRYPTED
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">
        ████████
      </div>
    </motion.div>
  )
}
