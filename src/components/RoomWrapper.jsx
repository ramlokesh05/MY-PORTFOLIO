import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



export default function RoomWrapper({ id, roomNumber, roomName, children }) {
  const contentRef   = useRef(null)
  const nameplateRef = useRef(null)
  const laserScannerRef = useRef(null)
  // Store timeline so we can kill it on reset
  const tlRef = useRef(null)

  useEffect(() => {
    const content   = contentRef.current
    const nameplate = nameplateRef.current
    const scanner   = laserScannerRef.current

    const playReveal = () => {
      const tl = gsap.timeline({ overwrite: 'auto' })
      tlRef.current = tl

      // Reset states
      gsap.set(nameplate, { opacity: 0, y: -10, scale: 0.9 })
      gsap.set(scanner, { top: '0px', opacity: 0, scaleY: 1 })
      gsap.set(content, {
        filter: 'blur(0px) brightness(1) grayscale(0%)', // Initial clear state
        scale: 1,
        y: 0,
        transformPerspective: 1000,
        opacity: 0, // Start invisible to avoid harsh pop-in
      })

      // 0. Fade the content and laser in before scanning
      tl.to(content, { opacity: 1, duration: 0.3 })
      tl.to(scanner, { opacity: 1, duration: 0.3 }, '<')

      const isNavClick = window.__navClickedTarget === id;

      if (isNavClick) {
        // Consume flag so future manual scrolls don't trigger the scan again
        window.__navClickedTarget = null

        // 1. Scan DOWN: focus OUT into blur and black & white
        tl.to(scanner, { top: '100%', duration: 1.2, ease: 'power2.inOut' })
        tl.to(content, {
          filter: 'blur(5px) brightness(0.4) grayscale(100%)',
          scale: 0.96, // Physically push back
          duration: 1.2,
          ease: 'power2.inOut',
        }, '<') // Sync with scan down

        // 2. Scan UP: focus IN to clear and colored
        tl.to(scanner, { top: '0px', duration: 1.2, ease: 'power2.inOut' })
        tl.to(content, {
          filter: 'blur(0px) brightness(1) grayscale(0%)',
          scale: 1, // Pull forward
          duration: 1.2,
          ease: 'power2.inOut',
        }, '<') // Sync with scan up
      } else {
        // Fast cinematic scroll reveal (no scanning sweep)
        tl.to(content, {
          filter: 'blur(0px) brightness(1) grayscale(0%)',
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        }, '<0.2') // Slight delay after fade-in
      }

      // 3. Nameplate locks in exactly as the upward focus completes
      tl.to(nameplate, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        ease: 'back.out(1.5)' 
      }, isNavClick ? '-=0.3' : '-=0.8')
    }

    const trigger = ScrollTrigger.create({
      trigger: id === 'about' ? wrapperRef.current : content, // better trigger area
      start: 'top 85%',
      end: 'bottom 15%',
      // Trigger every time it enters the viewport
      onEnter: playReveal,
      onEnterBack: playReveal,
      // Minimal reset logic that doesn't trigger layout thrashing when offscreen
      onLeave: () => tlRef.current && tlRef.current.pause(),
      onLeaveBack: () => tlRef.current && tlRef.current.pause(),
    })

    return () => trigger.kill()
  }, [id])

  const wrapperRef = useRef(null)

  return (
    <div id={id} ref={wrapperRef} className="relative pt-32">

      {/* ── Single Unified Laser Scanner & Boundary ── */}
      <div 
        ref={laserScannerRef}
        className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none opacity-0"
        style={{
          top: '0px', // Rests at the absolute top boundary of the section
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,43,43,0.8) 15%, #ffffff 50%, rgba(255,43,43,0.8) 85%, transparent 100%)',
          boxShadow: '0 0 15px rgba(255,43,43,0.8), 0 0 30px rgba(255,43,43,0.4)',
        }}
      />

      {/* ── Nameplate ── */}
      <div className="relative mb-0 flex items-center justify-center">
        {/* Room Label Box */}
        <div
          ref={nameplateRef}
          className="relative z-10 opacity-0 flex items-center gap-4 px-6 py-2 shadow-[0_0_20px_rgba(255,43,43,0.15)]"
          style={{
            background: 'rgba(10,6,6,0.95)',
            border: '1px solid rgba(255,43,43,0.3)',
            borderBottom: '1px solid rgba(255,43,43,0.4)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-noir-red/80 animate-pulse block" />
          <span className="font-mono text-[8px] tracking-[0.5em] text-noir-white">
            ROOM {roomNumber}
          </span>
          <div className="w-[1px] h-3 bg-noir-red/40" />
          <span className="font-serif text-sm tracking-[0.15em] text-noir-white uppercase italic">
            {roomName}
          </span>
          <div className="w-[1px] h-3 bg-noir-red/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-noir-red/80 animate-pulse block" />
        </div>
      </div>

      {/* ── Content (Animated via GSAP) ── */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  )
}
