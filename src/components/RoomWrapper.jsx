import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RoomWrapper({ id, roomNumber, roomName, children }) {
  const wrapperRef = useRef(null)   // declared first to fix the reference bug
  const contentRef = useRef(null)
  const nameplateRef = useRef(null)
  const laserScannerRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const content   = contentRef.current
    const nameplate = nameplateRef.current
    const scanner   = laserScannerRef.current

    const playReveal = () => {
      const tl = gsap.timeline({ overwrite: 'auto' })
      tlRef.current = tl

      gsap.set(nameplate, { opacity: 0, y: -10, scale: 0.9 })
      gsap.set(scanner, { top: '0px', opacity: 0, scaleY: 1 })
      gsap.set(content, {
        filter: 'blur(0px) brightness(1) grayscale(0%)',
        scale: 1,
        y: 0,
        transformPerspective: 1000,
        opacity: 0,
      })

      tl.to(content, { opacity: 1, duration: 0.3 })
      tl.to(scanner, { opacity: 1, duration: 0.3 }, '<')

      const isNavClick = window.__navClickedTarget === id

      if (isNavClick) {
        window.__navClickedTarget = null

        tl.to(scanner, { top: '100%', duration: 1.2, ease: 'power2.inOut' })
        tl.to(content, {
          filter: 'blur(5px) brightness(0.4) grayscale(100%)',
          scale: 0.96,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '<')

        tl.to(scanner, { top: '0px', duration: 1.2, ease: 'power2.inOut' })
        tl.to(content, {
          filter: 'blur(0px) brightness(1) grayscale(0%)',
          scale: 1,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '<')
      } else {
        tl.to(content, {
          filter: 'blur(0px) brightness(1) grayscale(0%)',
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        }, '<0.2')
      }

      tl.to(nameplate, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, isNavClick ? '-=0.3' : '-=0.8')
    }

    const trigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 85%',
      end: 'bottom 15%',
      onEnter: playReveal,
      onEnterBack: playReveal,
      onLeave: () => tlRef.current && tlRef.current.pause(),
      onLeaveBack: () => tlRef.current && tlRef.current.pause(),
    })

    return () => trigger.kill()
  }, [id])

  return (
    <div id={id} ref={wrapperRef} className="relative pt-32">

      {/* ── Laser Scanner ── */}
      <div
        ref={laserScannerRef}
        className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none opacity-0"
        style={{
          top: '0px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,43,43,0.8) 15%, #ffffff 50%, rgba(255,43,43,0.8) 85%, transparent 100%)',
          boxShadow: '0 0 15px rgba(255,43,43,0.8), 0 0 30px rgba(255,43,43,0.4)',
        }}
      />

      {/* ── Skeuomorphic Nameplate ── */}
      <div className="relative mb-0 flex items-center justify-center">
        <div
          ref={nameplateRef}
          className="nameplate relative z-10 opacity-0 flex items-center gap-4 px-8 py-3"
        >
          {/* Rivet left */}
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255,120,80,0.9), rgba(180,0,0,0.6))',
              boxShadow: '0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,150,0.3)',
            }}
          />
          <span className="font-mono text-[8px] tracking-[0.5em] text-noir-white"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(255,43,43,0.2)' }}
          >
            ROOM {roomNumber}
          </span>
          <div className="w-[1px] h-3 bg-gradient-to-b from-transparent via-noir-red/40 to-transparent" />
          <span className="font-serif text-sm tracking-[0.15em] text-noir-white uppercase italic"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
          >
            {roomName}
          </span>
          <div className="w-[1px] h-3 bg-gradient-to-b from-transparent via-noir-red/40 to-transparent" />
          {/* Rivet right — pulsing */}
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255,80,43,1), rgba(200,0,0,0.8))',
              boxShadow: '0 0 6px rgba(255,43,43,0.7), 0 1px 3px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,150,0.3)',
            }}
          />
        </div>
      </div>

      {/* Glow divider below nameplate */}
      <div className="section-glow-divider mx-8 mb-0 opacity-30" />

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  )
}
