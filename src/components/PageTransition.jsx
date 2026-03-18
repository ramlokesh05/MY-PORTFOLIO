import { createContext, useContext, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

const TransitionContext = createContext(null)

export function useTransition() {
  return useContext(TransitionContext)
}

/**
 * Void-collapse transition inspired by Batman vanishing into darkness.
 *
 * Phase 1 (exit):
 *   - A black circle expands from center like a void consuming the screen
 *   - Red cracks/scan lines sweep across while it fills
 *   - Page navigates during blackout
 *
 * Phase 2 (enter):
 *   - Red pulse flash
 *   - The void retracts — circle shrinks back to nothing from center
 *   - New page revealed
 */
export function TransitionProvider({ children, navigate }) {
  const overlayRef = useRef(null)
  const scanRef = useRef(null)
  const redFlashRef = useRef(null)
  const circleRef = useRef(null)

  const trigger = useCallback((to) => {
    const overlay = overlayRef.current
    const scan = scanRef.current
    const flash = redFlashRef.current
    const circle = circleRef.current
    if (!overlay || !circle) return

    const tl = gsap.timeline()

    // Show overlay
    tl.set(overlay, { display: 'block' })

    // Circle void expands from center (clip-path circle)
    tl.fromTo(circle,
      { clipPath: 'circle(0% at 50% 50%)', opacity: 1 },
      {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 0.55,
        ease: 'power3.in',
      }
    )

    // Scan line sweeps during expansion
    tl.fromTo(scan,
      { top: '0%', opacity: 1 },
      { top: '100%', opacity: 0, duration: 0.5, ease: 'power2.in' },
      '<0.05'
    )

    // Red flash at peak blackout
    tl.fromTo(flash,
      { opacity: 0.35 },
      { opacity: 0, duration: 0.35, ease: 'power2.out' },
      '-=0.1'
    )

    // Navigate during blackout
    tl.call(() => navigate(to))

    // Brief hold
    tl.to({}, { duration: 0.05 })

    // Void retracts — circle shrinks back to nothing
    tl.fromTo(circle,
      { clipPath: 'circle(150% at 50% 50%)', opacity: 1 },
      {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.6,
        ease: 'power3.out',
      }
    )

    // Hide overlay
    tl.set(overlay, { display: 'none' })
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ trigger }}>
      {children}

      {/* Portal overlay — rendered outside normal DOM flow */}
      {createPortal(
        <div
          ref={overlayRef}
          style={{ display: 'none' }}
          className="fixed inset-0 z-[600] pointer-events-none"
        >
          {/* Main void circle */}
          <div
            ref={circleRef}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at center, #1a0000 0%, #0a0a0a 60%, #000000 100%)
              `,
              clipPath: 'circle(0% at 50% 50%)',
            }}
          >
            {/* Batcave ridged texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 5px),
                  repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px)
                `,
              }}
            />

            {/* Center red bat-sigil glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255,43,43,0.12) 0%, transparent 70%)',
                boxShadow: '0 0 80px rgba(255,43,43,0.08)',
              }}
            />

            {/* Horizontal crack lines */}
            {[15, 35, 50, 65, 82].map((top) => (
              <div
                key={top}
                className="absolute left-0 right-0"
                style={{
                  top: `${top}%`,
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, rgba(255,43,43,${0.05 + Math.random() * 0.1}), rgba(255,43,43,${0.05 + Math.random() * 0.15}), transparent)`,
                }}
              />
            ))}

            {/* Corner glyphs */}
            <span className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.4em] text-noir-red/30">SYS://VOID</span>
            <span className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.4em] text-noir-red/30">████████</span>
            <span className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.4em] text-noir-red/30">ACCESS::GRANTED</span>
            <span className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.4em] text-noir-red/30">ENCRYPTED</span>
          </div>

          {/* Red scan line */}
          <div
            ref={scanRef}
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: '0%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, #ff2b2b 25%, #ff6060 50%, #ff2b2b 75%, transparent 100%)',
              boxShadow: '0 0 25px rgba(255,43,43,0.7), 0 0 60px rgba(255,43,43,0.3)',
              opacity: 1,
            }}
          />

          {/* Red flash */}
          <div
            ref={redFlashRef}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,43,43,0.25) 0%, rgba(180,0,0,0.15) 50%, transparent 80%)',
              opacity: 0,
            }}
          />
        </div>,
        document.body
      )}
    </TransitionContext.Provider>
  )
}
