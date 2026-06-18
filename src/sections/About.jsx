import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltedCard from '../components/TiltedCard'
import BlurText from '../components/BlurText'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [grayscaleVal, setGrayscaleVal] = useState(100)

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
            containerHeight="380px"
            containerWidth="280px"
            imageHeight="380px"
            imageWidth="280px"
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
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Graduation (Hopefully)</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-fg)]">3+</span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Months of Survival</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-fg)]">6</span>
              <span className="font-mono text-[9px] tracking-widest text-[var(--color-red)] uppercase mt-2">Shiny Badges</span>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
