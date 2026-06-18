import { useEffect, useRef } from 'react'

function AnimatedGrain() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const FPS_LIMIT = 24
    let lastTime = 0

    const draw = (ts) => {
      rafRef.current = requestAnimationFrame(draw)
      const elapsed = ts - lastTime
      if (elapsed < 1000 / FPS_LIMIT) return
      lastTime = ts

      frame++
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      const seed = frame * 6791

      for (let i = 0; i < data.length; i += 4) {
        // Fast pseudo-random using seed variation per frame
        const r = Math.random()
        const v = r < 0.5 ? 0 : (r < 0.8 ? 128 : 255)
        data[i] = v       // R
        data[i+1] = v     // G
        data[i+2] = v     // B
        data[i+3] = r < 0.6 ? 0 : Math.floor(r * 60) // Alpha — sparse
      }
      ctx.putImageData(imageData, 0, 0)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Animated canvas grain */}
      <canvas
        ref={canvasRef}
        id="grain-canvas"
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, opacity: 0.045, mixBlendMode: 'overlay' }}
      />
      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.72) 100%)',
        }}
      />
    </>
  )
}

export default AnimatedGrain
