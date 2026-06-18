import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
  const [loadingPhase, setLoadingPhase] = useState(0)

  useEffect(() => {
    // Run loading sequence, then auto-trigger batman transition
    const timers = loadingMessages.map((_, i) =>
      setTimeout(() => {
        setLoadingPhase(i)
        if (i === loadingMessages.length - 1) {
          // Brief pause on ACCESS GRANTED, then void-collapse into home
          setTimeout(() => trigger('/home'), 650)
        }
      }, i * 700)
    )
    return () => timers.forEach(clearTimeout)
  }, [trigger])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-noir-black z-[300] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        style={{ top: '0%' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Loading sequence */}
      <div className="relative z-10 text-center">
        {/* Animated bars */}
        <div className="flex gap-1 justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-noir-red"
              animate={{ height: [12, 28, 12], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Cycling messages */}
        <div className="h-20 flex flex-col items-center justify-center relative">
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

      {/* Corner labels */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">SYS://INIT</div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">v2.0.26</div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">ENCRYPTED</div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.3em] text-noir-gray">████████</div>
    </motion.div>
  )
}
