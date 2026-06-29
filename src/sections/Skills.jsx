import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import ScrollFloat from '../components/ScrollFloat'
import Shuffle from '../components/Shuffle'

export default function Skills() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const skillGroups = [
    {
      id: 'programming',
      title: 'Languages I Actually Code In',
      subtitle: 'Code I Write That (Mostly) Compiles',
      skills: ['C', 'C++', 'Python', 'Java']
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      subtitle: 'Infrastructure, Databases, and Deployment Platforms',
      skills: ['MongoDB', 'AWS', 'Docker', 'Azure', 'GCP', 'Kubernetes', 'Jenkins', 'GIT', 'Linux']
    },
    {
      id: 'softskills',
      title: 'Soft Skills & Powers',
      subtitle: 'Qualities That Make Me A Great Team Member',
      skills: ['Problem-Solving', 'Time Management', 'Leadership Abilities', 'Adaptability']
    }
  ]

  const [selectedGroup, setSelectedGroup] = useState(skillGroups[0])

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center min-h-[80vh]">
      
      {/* Title (Shuffle Animation) */}
      <div className="mb-12 w-full flex justify-center">
        <Shuffle
          text="Things I Pretend to Understand"
          shuffleDirection="right"
          duration={0.38}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.025}
          threshold={0.1}
          triggerOnce
          triggerOnHover
          respectReducedMotion
          loop={false}
          className="font-wide font-black text-[5vw] md:text-[3vw] leading-none tracking-tighter text-[var(--color-fg)] uppercase text-center"
        />
      </div>

      {/* Dual Panel Layout */}
      <div className="grid lg:grid-cols-5 gap-8 items-stretch w-full text-left">
        
        {/* Left Column: Categories List (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="font-mono text-[10px] mb-2 px-1 text-[var(--color-fg)] opacity-70 uppercase tracking-widest select-none">
            Select Category
          </div>
          
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-4 pb-4 lg:pb-0 scrollbar-none no-scrollbar w-full">
            {skillGroups.map((group, idx) => {
              const isSelected = selectedGroup?.id === group.id
              return (
                <motion.div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  style={{
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(255,80,5,0.08)' : 'rgba(10,4,6,0.52)',
                    borderColor: isSelected ? 'var(--color-red)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                  className={`border p-4 lg:p-5 cursor-pointer transition-all duration-300 group flex-shrink-0 w-[260px] lg:w-auto ${
                    isSelected ? 'border-[var(--color-red)] scale-[1.02]' : 'hover:border-[rgba(255,80,5,0.5)]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-wide text-base lg:text-lg font-bold tracking-wide transition-colors duration-300 ${
                      isSelected ? 'text-[var(--color-red)]' : 'text-[var(--color-fg)] group-hover:text-[var(--color-red)]'
                    }`}>
                      {group.title}
                    </h3>
                    {isSelected && (
                      <motion.div layoutId="indicator" className="w-2 h-2 rounded-full bg-[var(--color-red)] flex-shrink-0" />
                    )}
                  </div>
                  <p className="font-mono text-[9px] lg:text-[10px] text-[var(--color-fg)] opacity-60 uppercase tracking-wider">
                    {group.subtitle}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Skills Showcase (3 cols) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="font-mono text-[10px] mb-2 px-1 text-[var(--color-fg)] opacity-70 uppercase tracking-widest text-right">
            Technologies Overview
          </div>

          <div 
            className="flex-1 border border-[var(--color-border)] p-8 relative overflow-hidden"
            style={{ borderRadius: '14px', background: 'rgba(10,4,6,0.52)', backdropFilter: 'blur(20px)' }}
          >
            <AnimatePresence mode="wait">
              {selectedGroup && (
                <motion.div
                  key={selectedGroup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full flex flex-col"
                >
                  <h4 className="font-wide text-2xl text-[var(--color-fg)] font-black mb-8 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                    {selectedGroup.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-4">
                    {selectedGroup.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: sIdx * 0.04 }}
                        className="px-5 py-3 border border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.3)] hover:border-[var(--color-red)] hover:bg-[rgba(255,80,5,0.05)] transition-colors duration-300 cursor-default"
                        style={{ borderRadius: '8px' }}
                      >
                        <span className="font-mono text-[13px] text-[var(--color-fg)] tracking-wide font-bold">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Humorous footnote */}
      <div className="w-full text-right mt-6 opacity-40 hover:opacity-100 transition-opacity duration-300">
        <span className="font-mono text-[10px] tracking-wider italic text-[var(--color-fg)]">
          * (Just kidding, I actually know this stuff... mostly.)
        </span>
      </div>

    </div>
  )
}
