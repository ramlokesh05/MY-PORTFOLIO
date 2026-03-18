import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // Use Framer Motion values instead of React state for extreme performance (0 re-renders on hover)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the fast center dot
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });
  
  // Springs for the slightly heavier reticle ring
  const reticleX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.8 });
  const reticleY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.8 });

  // Springs for the ambient glow
  const glowX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const glowY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Don't show custom cursor on mobile
    if (window.matchMedia('(max-width: 768px)').matches) return

    const handleMouseMove = (e) => {
      // Direct DOM update via framer-motion, completely bypasses React render tree
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, .cursor-hover')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, .cursor-hover')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* ── Center Dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
        animate={{
          scale: isHovering ? 0 : 1, // Shrinks away completely on hover to let reticle focus
        }}
        style={{
          x: dotX,
          y: dotY,
          marginLeft: -2,
          marginTop: -2,
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#ff2b2b',
          boxShadow: '0 0 10px rgba(255, 43, 43, 0.8)', // Add simple glow instead of blend mode
        }}
      />

      {/* ── Targeting Reticle (Outer Ring / Crosshairs) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
        animate={{
          scale: isHovering ? 0.8 : 1,
          rotate: isHovering ? 45 : 0, // Locks into an X on hover
          opacity: isHovering ? 1 : 0.6,
        }}
        style={{
          x: reticleX,
          y: reticleY,
          marginLeft: -20,
          marginTop: -20,
          width: 40,
          height: 40,
        }}
      >
        {/* Reticle brackets / ticks */}
        <div className="absolute inset-0 rounded-full border border-noir-red/30" />
        
        {/* Top tick */}
        <div className="absolute top-0 w-[2px] h-[6px] bg-noir-red shadow-[0_0_8px_#ff2b2b]" />
        {/* Bottom tick */}
        <div className="absolute bottom-0 w-[2px] h-[6px] bg-noir-red shadow-[0_0_8px_#ff2b2b]" />
        {/* Left tick */}
        <div className="absolute left-0 w-[6px] h-[2px] bg-noir-red shadow-[0_0_8px_#ff2b2b]" />
        {/* Right tick */}
        <div className="absolute right-0 w-[6px] h-[2px] bg-noir-red shadow-[0_0_8px_#ff2b2b]" />

        {/* Inner lock-on dot (only appears on hover) */}
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-noir-red shadow-[0_0_10px_#ff2b2b]"
          initial={{ scale: 0 }}
          animate={{ scale: isHovering ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        />
      </motion.div>

      {/* ── Light Reveal Ambient Glow ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995]"
        style={{
          x: glowX,
          y: glowY,
          marginLeft: -150,
          marginTop: -150,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,43,43,0.03) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
