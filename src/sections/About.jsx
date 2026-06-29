import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltedCard from '../components/TiltedCard'
import BlurText from '../components/BlurText'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [grayscaleVal, setGrayscaleVal] = useState(100)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const scrollParent = sectionRef.current?.closest('.overflow-y-auto')
    if (!scrollParent) return

    const handleScroll = () => {
      if (!sectionRef.current) return
      const parentRect = scrollParent.getBoundingClientRect()
      const elementRect = sectionRef.current.getBoundingClientRect()

      const relativeTop = elementRect.top - parentRect.top
      const containerHeight = parentRect.height
      const elementHeight = elementRect.height

      const elementCenter = relativeTop + elementHeight / 2
      const containerCenter = containerHeight / 2

      const distanceFromCenter = Math.abs(elementCenter - containerCenter)
      const halfContainer = containerHeight / 2.5

      let progress = 1 - (distanceFromCenter / halfContainer)
      progress = Math.max(0, Math.min(1, progress))

      setGrayscaleVal((1 - progress) * 100)
    }

    scrollParent.addEventListener('scroll', handleScroll)
    // Initial run to set the state based on current scroll
    handleScroll()

    window.addEventListener('resize', handleScroll)

    return () => {
      scrollParent.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center">

      {/* Title (Blur-in Animation) */}
      <div className="mb-10 w-full flex justify-center">
        <BlurText
          text="Who Am I Anyway?"
          delay={120}
          animateBy="words"
          direction="top"
          stepDuration={0.4}
          className="font-wide font-black text-[7vw] md:text-[5vw] leading-none tracking-tighter text-[var(--color-fg)] uppercase justify-center"
        />
      </div>

      {/* Bio and Photo Grid */}
      <div className="grid md:grid-cols-5 gap-12 items-center w-full mt-6 text-left">
        {/* Left: Tilted Card Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-2 flex justify-center w-full"
        >
          <TiltedCard
            imageSrc="/profile.jpg"
            altText="Ram Lokesh"
            captionText="Ram Lokesh | Engineer"
            containerHeight={isMobile ? "300px" : "380px"}
            containerWidth={isMobile ? "220px" : "280px"}
            imageHeight={isMobile ? "300px" : "380px"}
            imageWidth={isMobile ? "220px" : "280px"}
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            imageStyle={{ filter: `grayscale(${grayscaleVal}%)` }}
          />
        </motion.div>

        {/* Right: Bio and Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <p className="font-body text-base md:text-lg text-[var(--color-fg)] leading-relaxed mb-8 opacity-90">
            I am a Computer Science Engineering student specializing in{" "}
            <span className="text-[var(--color-red)] font-bold tracking-wide whitespace-nowrap">Cloud Computing</span>{" "}
            and{" "}
            <span className="text-[var(--color-red)] font-bold tracking-wide">DevOps</span>{" "}
            orchestration. My focus lies in building scalable architectures, automating CI/CD pipelines, and writing robust infrastructure as code.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 w-full mt-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-fg)]">2027</span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Graduation</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-fg)]">6+</span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Months of Experience</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-fg)]">5</span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Shiny Badges</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience & Achievements Row */}
      <div className="grid md:grid-cols-2 gap-12 w-full mt-16 text-left border-t border-white/10 pt-12">
        {/* Experience Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <h3 className="font-wide text-lg font-bold text-[var(--color-red)] uppercase tracking-wider mb-6">
            Work Experience
          </h3>
          <div className="relative border-l border-white/10 pl-6 ml-2 space-y-8">
            <div className="relative">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-red)] shadow-[0_0_8px_rgba(255,16,42,0.8)]" />
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-wide font-bold text-white text-base leading-snug">Software Engineer</h4>
                  <p className="font-mono text-xs text-white/50">Syncgaze</p>
                </div>
                <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/60">
                  Oct'25 — Mar'26
                </span>
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs text-white/70 font-body leading-relaxed">
                <li>Managed and optimized backend APIs using Node.js and Express.js, ensuring secure data processing and server performance.</li>
                <li>Worked with the frontend team to connect APIs, improving response time and reliability.</li>
                <li>Contributed to the successful delivery of a client-focused car rental management platform within a startup environment.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Achievements & Training Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <h3 className="font-wide text-lg font-bold text-[var(--color-red)] uppercase tracking-wider mb-6">
            Achievements & Training
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-wide font-bold text-white text-sm">Cipher Schools — Data Structures & Algorithms</h4>
              <p className="font-mono text-[10px] text-white/40 mb-1.5">Training | Jun'25 — Jul'25</p>
              <p className="text-xs text-white/70 pl-2 border-l border-[var(--color-red)]/30">
                Built a foundation in C++ DSA, solving 100+ algorithmic problems to boost time & space complexity by up to 40%.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-white/75">
                <span className="text-[var(--color-red)] mt-0.5">🏆</span>
                <span>Secured 6th place in the Nationwide IIT Ai Imagen Hackathon finals among 800 teams.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/75">
                <span className="text-[var(--color-red)] mt-0.5">🏆</span>
                <span>Achieved 4th place among 600 contestants in the Zerodha Varsity Finance Quiz.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/75">
                <span className="text-[var(--color-red)] mt-0.5">🛡️</span>
                <span>Successfully coordinated the cybersecurity workshop "HACKETHICS" at Lovely Professional University.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
