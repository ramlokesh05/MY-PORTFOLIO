import { useEffect, useState } from 'react'

function AnimatedGrain() {
  const [noiseUrl, setNoiseUrl] = useState('')

  useEffect(() => {
    // Generate a single 128x128 noise pattern once on mount
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    const imageData = ctx.createImageData(128, 128)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const r = Math.random()
      const v = r < 0.5 ? 0 : (r < 0.8 ? 128 : 255)
      data[i] = v       // R
      data[i+1] = v     // G
      data[i+2] = v     // B
      data[i+3] = r < 0.5 ? 0 : Math.floor(r * 45) // Alpha — sparse
    }
    ctx.putImageData(imageData, 0, 0)
    setNoiseUrl(canvas.toDataURL())
  }, [])

  if (!noiseUrl) return null

  return (
    <>
      {/* GPU-animated repeating noise overlay */}
      <div
        id="grain-overlay"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          width: '200%',
          height: '200%',
          background: `url(${noiseUrl}) repeat`,
          opacity: 0.05,
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          animation: 'noise-animation 0.2s steps(4) infinite',
          willChange: 'transform'
        }}
      />
      {/* Inject styling for GPU acceleration keyframes */}
      <style>{`
        @keyframes noise-animation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -2%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 3%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(3%, 0); }
          70% { transform: translate(0, 2%); }
          80% { transform: translate(2%, 1%); }
          90% { transform: translate(-1%, 1%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
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
