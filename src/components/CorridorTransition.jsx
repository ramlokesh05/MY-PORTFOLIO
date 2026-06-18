import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useSoundEngine } from './SoundEngine'

export default function CorridorTransition({ id, nextRoomName, reliefType }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const { sound } = useSoundEngine()

  // Track scroll position inside this corridor section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['top bottom', 'bottom top'],
  })

  // Fade and scale overlay values
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = 450 // fixed height for transition segments
    }
    resize()
    window.addEventListener('resize', resize)

    // Corridor State Variables
    let scrollPos = 0
    let lastScrollPos = 0
    let footstepAccumulator = 0
    const FOOTSTEP_INTERVAL = 40 // Scroll delta units required to trigger step

    // 3D Corridor projection settings
    const NUM_ARCHES = 6
    const ARCH_SPACING = 150
    const FOCAL_LENGTH = 300

    // Torch flickering flame particles
    const torchParticles = []
    const createTorch = (x, y, z) => ({
      x, y, z,
      life: 1.0,
      size: Math.random() * 3 + 3,
      decay: Math.random() * 0.03 + 0.02
    })

    // Listen to scroll progress updates from framer-motion
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      scrollPos = latest * 900 // Scale progress to vertical motion units
    })

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const centerX = W / 2
      const centerY = H / 2

      ctx.fillStyle = '#050508'
      ctx.fillRect(0, 0, W, H)

      // Step 1: Detect scroll speed and trigger footstep sounds
      const scrollDelta = Math.abs(scrollPos - lastScrollPos)
      if (scrollDelta > 0.1) {
        footstepAccumulator += scrollDelta
        if (footstepAccumulator >= FOOTSTEP_INTERVAL) {
          sound?.('footstep')
          footstepAccumulator = 0
        }
      }
      lastScrollPos = scrollPos

      // Step 2: Draw the 3D stone archways
      // We sort arches back-to-front (depth buffer)
      const arches = []
      for (let i = 0; i < NUM_ARCHES; i++) {
        // Calculate z position of this arch
        // Subtracting scrollPos moves the archways CLOSER to camera (smaller Z)
        let z = (i * ARCH_SPACING - (scrollPos * 1.5)) % (NUM_ARCHES * ARCH_SPACING)
        if (z < 0) z += (NUM_ARCHES * ARCH_SPACING)
        arches.push({ index: i, z })
      }
      arches.sort((a, b) => b.z - a.z)

      arches.forEach((arch) => {
        const z = arch.z
        if (z <= 10) return // behind camera

        // Perspective scaling factor
        const scale = FOCAL_LENGTH / z
        const archW = 220 * scale
        const archH = 260 * scale

        const x1 = centerX - archW / 2
        const y1 = centerY - archH / 2 + 30
        const x2 = centerX + archW / 2
        const y2 = centerY + archH / 2

        // Draw Stone Arch outlines
        ctx.strokeStyle = `rgba(50, 45, 60, ${Math.min(1, scale * 0.4)})`
        ctx.lineWidth = Math.max(1, 4 * scale)
        
        // Arch curvature at top
        ctx.beginPath()
        ctx.arc(centerX, y1 + archH * 0.2, archW / 2, Math.PI, 0)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x1, y2)
        ctx.closePath()
        ctx.stroke()

        // Draw side walls depth guidelines
        ctx.strokeStyle = `rgba(30, 25, 40, ${Math.min(0.5, scale * 0.25)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x1, y2)
        ctx.lineTo(centerX - (220 * FOCAL_LENGTH / (z + ARCH_SPACING)) / 2, centerY + 260 * FOCAL_LENGTH / (z + ARCH_SPACING) / 2)
        ctx.stroke()

        // Draw Torch holders on side walls of every second archway
        if (arch.index % 2 === 0 && z > 50) {
          const torchLX = x1 - 10 * scale
          const torchRX = x2 + 10 * scale
          const torchY = y1 + archH * 0.35

          // Draw left and right wall torch glows
          const glowSize = Math.max(10, 80 * scale)
          const leftGlow = ctx.createRadialGradient(torchLX, torchY, 2, torchLX, torchY, glowSize)
          leftGlow.addColorStop(0, 'rgba(255, 120, 30, 0.15)')
          leftGlow.addColorStop(0.5, 'rgba(255, 60, 0, 0.03)')
          leftGlow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = leftGlow
          ctx.beginPath(); ctx.arc(torchLX, torchY, glowSize, 0, Math.PI*2); ctx.fill()

          const rightGlow = ctx.createRadialGradient(torchRX, torchY, 2, torchRX, torchY, glowSize)
          rightGlow.addColorStop(0, 'rgba(255, 120, 30, 0.15)')
          rightGlow.addColorStop(0.5, 'rgba(255, 60, 0, 0.03)')
          rightGlow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = rightGlow
          ctx.beginPath(); ctx.arc(torchRX, torchY, glowSize, 0, Math.PI*2); ctx.fill()

          // Draw torch bracket lines
          ctx.strokeStyle = `rgba(15, 15, 20, ${Math.min(1, scale)})`
          ctx.lineWidth = Math.max(1, 3 * scale)
          ctx.beginPath()
          ctx.moveTo(torchLX, torchY); ctx.lineTo(torchLX - 5 * scale, torchY + 12 * scale)
          ctx.moveTo(torchRX, torchY); ctx.lineTo(torchRX + 5 * scale, torchY + 12 * scale)
          ctx.stroke()
        }

        // Draw Carved Wall Reliefs (Fade in as they approach scale ~ 0.8-1.5)
        // Draw on the walls of the middle arches
        if (arch.index === 3 && z > 100 && z < 400) {
          const rAlpha = Math.sin((z - 100) / 300 * Math.PI) * 0.45
          ctx.strokeStyle = `rgba(255, 60, 43, ${rAlpha})`
          ctx.lineWidth = Math.max(1, 2 * scale)
          ctx.shadowColor = 'rgba(255, 43, 43, 0.5)'
          ctx.shadowBlur = 10 * scale

          // Render relief drawings based on upcoming room
          const reliefLX = x1 + 25 * scale
          const reliefRX = x2 - 25 * scale
          const reliefY = centerY

          ctx.beginPath()
          if (reliefType === 'armoury') {
            // Draw a carved sword outline on walls
            // Left wall sword pointing down
            ctx.moveTo(reliefLX, reliefY - 30 * scale)
            ctx.lineTo(reliefLX, reliefY + 10 * scale)
            ctx.moveTo(reliefLX - 8 * scale, reliefY - 18 * scale)
            ctx.lineTo(reliefLX + 8 * scale, reliefY - 18 * scale)
            // Right wall shield outline
            ctx.moveTo(reliefRX - 12 * scale, reliefY - 15 * scale)
            ctx.lineTo(reliefRX + 12 * scale, reliefY - 15 * scale)
            ctx.lineTo(reliefRX + 10 * scale, reliefY + 10 * scale)
            ctx.quadraticCurveTo(reliefRX, reliefY + 25 * scale, reliefRX - 10 * scale, reliefY + 10 * scale)
            ctx.closePath()
          } else if (reliefType === 'warroom') {
            // Draw a carved war flag outline
            // Left wall flag
            ctx.moveTo(reliefLX - 5 * scale, reliefY + 25 * scale)
            ctx.lineTo(reliefLX - 5 * scale, reliefY - 25 * scale)
            ctx.lineTo(reliefLX + 15 * scale, reliefY - 12 * scale)
            ctx.lineTo(reliefLX - 5 * scale, reliefY)
            // Right wall flag
            ctx.moveTo(reliefRX - 5 * scale, reliefY + 25 * scale)
            ctx.lineTo(reliefRX - 5 * scale, reliefY - 25 * scale)
            ctx.lineTo(reliefRX + 15 * scale, reliefY - 12 * scale)
            ctx.lineTo(reliefRX - 5 * scale, reliefY)
          } else if (reliefType === 'observatory') {
            // Draw a carved star / constellation outline
            // Left wall star
            ctx.moveTo(reliefLX, reliefY - 18 * scale)
            ctx.lineTo(reliefLX + 5 * scale, reliefY - 5 * scale)
            ctx.lineTo(reliefLX + 18 * scale, reliefY)
            ctx.lineTo(reliefLX + 5 * scale, reliefY + 5 * scale)
            ctx.lineTo(reliefLX, reliefY + 18 * scale)
            ctx.lineTo(reliefLX - 5 * scale, reliefY + 5 * scale)
            ctx.lineTo(reliefLX - 18 * scale, reliefY)
            ctx.lineTo(reliefLX - 5 * scale, reliefY - 5 * scale)
            ctx.closePath()
            // Right wall crescent moon
            ctx.arc(reliefRX, reliefY, 15 * scale, -Math.PI/2, Math.PI/2)
            ctx.quadraticCurveTo(reliefRX + 6 * scale, reliefY, reliefRX, reliefY - 15 * scale)
          } else if (reliefType === 'throneroom') {
            // Draw a carved crown / raven outline
            // Left wall crown
            ctx.moveTo(reliefLX - 15 * scale, reliefY + 10 * scale)
            ctx.lineTo(reliefLX - 15 * scale, reliefY - 10 * scale)
            ctx.lineTo(reliefLX - 7 * scale, reliefY - 2 * scale)
            ctx.lineTo(reliefLX, reliefY - 12 * scale)
            ctx.lineTo(reliefLX + 7 * scale, reliefY - 2 * scale)
            ctx.lineTo(reliefLX + 15 * scale, reliefY - 10 * scale)
            ctx.lineTo(reliefLX + 15 * scale, reliefY + 10 * scale)
            ctx.closePath()
            // Right wall heraldic crest
            ctx.moveTo(reliefRX, reliefY - 18 * scale)
            ctx.lineTo(reliefRX + 15 * scale, reliefY - 10 * scale)
            ctx.lineTo(reliefRX + 10 * scale, reliefY + 15 * scale)
            ctx.lineTo(reliefRX, reliefY + 22 * scale)
            ctx.lineTo(reliefRX - 10 * scale, reliefY + 15 * scale)
            ctx.lineTo(reliefRX - 15 * scale, reliefY - 10 * scale)
            ctx.closePath()
          }
          ctx.stroke()
          ctx.shadowBlur = 0 // reset shadow
        }
      })

      // 3. Draw a focal point vignette (pitch black at center/far-end corridor depth)
      const vignette = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, W * 0.45)
      vignette.addColorStop(0, 'rgba(0,0,0,0.95)')
      vignette.addColorStop(0.3, 'rgba(0,0,0,0.65)')
      vignette.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      // Draw subtle ground level haze/fog in corridor
      ctx.fillStyle = 'rgba(255, 43, 43, 0.008)'
      ctx.fillRect(0, H - 100, W, 100)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      unsubscribe()
      window.removeEventListener('resize', resize)
    }
  }, [scrollYProgress, reliefType, sound])

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative w-full h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-[#030305] border-t border-b border-noir-gray/30"
    >
      {/* 3D Hallway Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Corridor HUD Text Overlay */}
      <div className="relative z-10 text-center pointer-events-none px-6">
        <div className="mb-2">
          <span className="font-mono text-[8px] tracking-[0.6em] text-noir-red/70 animate-pulse block">
            ◈ MOVING DEEPER INTO INFRASTRUCTURE ◈
          </span>
        </div>
        
        <h3 className="font-serif text-lg tracking-[0.25em] text-noir-white uppercase italic">
          Walking to: {nextRoomName}
        </h3>
        
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-noir-red/40 to-transparent mx-auto mt-3" />
      </div>

      {/* Left/Right structural stone pillars borders */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black via-[#08080c] to-transparent border-r border-noir-gray/10" />
      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black via-[#08080c] to-transparent border-l border-noir-gray/10" />
    </motion.section>
  )
}
