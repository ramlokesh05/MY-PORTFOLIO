import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import TrueFocus from '../components/TrueFocus'

export default function Projects() {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const projects = [
    {
      id: 'devops',
      code: 'PRJ-01',
      title: 'DevOps Learning Platform',
      subtitle: 'AI-Integrated Learning Portal',
      fileName: 'DevOpsLearn.json',
      description: 'An AI-integrated interactive learning platform with a markdown note board, customized quizzes, hands-on practicals, and bite-sized modular guides.',
      complexity: 'High',
      tags: ['React', 'AI Integration', 'Interactive Board', 'Quizzes', 'MERN Stack'],
      github: 'https://github.com/ramlokesh05/DevOps-Learning-Portal-.git',
      live: 'https://devopslearn.vercel.app',
      image: '/images/ai_deadlock_detector.png',
      renderCode: () => (
        <div className="flex flex-col font-mono text-[10px] md:text-xs leading-relaxed text-white/80 p-2">
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">1</span><span className="text-slate-500">PRJ-01: DevOps Learning Platform</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">2</span><span className="text-amber-500">{"{"}</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">3</span><span>  <span className="text-sky-400">"status"</span>: <span className="text-emerald-400">"continuous-deployment-success"</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">4</span><span>  <span className="text-sky-400">"ai_integration"</span>: <span className="text-emerald-400">"active-tutor-agent"</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">5</span><span>  <span className="text-sky-400">"notes_board"</span>: <span className="text-emerald-400">"interactive-markdown-canvas"</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">6</span><span>  <span className="text-sky-400">"modules"</span>: <span className="text-amber-500">[</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">7</span><span>    <span className="text-emerald-400">"Interactive Quizzes & Practicals"</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">8</span><span>    <span className="text-emerald-400">"Containers & Orchestration"</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">9</span><span>    <span className="text-emerald-400">"CI/CD Pipeline Simulators"</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">10</span><span>  <span className="text-amber-500">]</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">11</span><span>  <span className="text-sky-400">"prod_crashes"</span>: <span className="text-orange-400">0</span>,</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">12</span><span>  <span className="text-sky-400">"verdict"</span>: <span className="text-emerald-400">"Zero downtime learning engine"</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">13</span><span className="text-amber-500">{"}"}</span></div>
        </div>
      )
    },
    {
      id: 'comingsoon',
      code: 'PRJ-02',
      title: 'Top Secret Project',
      subtitle: 'Classified & Pending Motivation',
      fileName: 'ComingSoon.sh',
      description: 'An over-engineered script to automate my afternoon coffee breaks using Kubernetes and AI. Currently blocked by compilation errors, general laziness, and zero funding.',
      complexity: 'Unknown',
      tags: ['Classified', 'Red Bull Fuel', 'Spaghetti Code', 'GitOps'],
      github: '#',
      live: '#',
      image: '/images/student-management.jpg',
      renderCode: () => (
        <div className="flex flex-col font-mono text-[10px] md:text-xs leading-relaxed text-white/80 p-2">
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">1</span><span className="text-slate-500">PRJ-02: Next Masterpiece (Shell Script)</span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">2</span><span><span className="text-purple-400">while</span> [[ <span className="text-sky-300">"$procrastinating"</span> == <span className="text-emerald-400">"true"</span> ]]; <span className="text-purple-400">do</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">3</span><span>  <span className="text-sky-300">drink_coffee</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">4</span><span>  <span className="text-sky-300">write_bugs</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">5</span><span>  <span className="text-sky-300">echo</span> <span className="text-emerald-400">"Rest of the projects coming soon..."</span></span></div>
          <div className="flex"><span className="w-8 text-white/20 text-right pr-3 mr-3 border-r border-white/5 select-none">6</span><span><span className="text-purple-400">done</span></span></div>
        </div>
      )
    }
  ]

  const [activeProjIdx, setActiveProjIdx] = useState(0)
  const currentProj = projects[activeProjIdx]

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto px-6 py-4 relative flex flex-col justify-center min-h-0 flex-1">

      {/* ─── SECTION TITLE (Humorous Accent) ─── */}
      <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-1px', left: 0, width: '48px', height: '2px', background: 'var(--color-red)', borderRadius: '2px' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-red)', marginBottom: '6px', textTransform: 'uppercase' }}>
          Warning: May contain traces of spaghetti code and panic
        </div>
        <TrueFocus
          sentence="Code Graveyard|(My Masterpieces)"
          separator="|"
          manualMode={false}
          blurAmount={4}
          borderColor="var(--color-red)"
          glowColor="rgba(255,16,42,0.5)"
          animationDuration={0.5}
          pauseBetweenAnimations={1.5}
          loop={false}
          className="font-wide font-extrabold uppercase tracking-tight text-[clamp(1.4rem,2.8vw,2.2rem)] text-white"
        />
      </div>

      {/* ─── REDESIGNED IDE DASHBOARD (Zero Gaps, Contiguous Panel) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border border-white/10 rounded-xl overflow-hidden bg-black/75 backdrop-blur-md flex flex-col w-full shadow-2xl"
      >
        {/* Editor Title Bar (MacOS Style Window Controls) */}
        <div className="bg-[#121215] border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold">
            ram-lokesh-ide - projects explorer
          </span>
          <div className="w-10" />
        </div>

        {/* Outer Split Pane Area */}
        <div className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-white/10 lg:h-[390px]">
          
          {/* LEFT SIDEBAR (File Tree Explorer) */}
          <div className="w-full md:w-56 flex-shrink-0 bg-[#0b0b0d]/50 flex flex-col p-4 lg:h-full overflow-y-auto no-scrollbar">
            <div className="font-mono text-[10px] text-white/30 font-bold tracking-widest uppercase mb-3 select-none">
              Workspace Files
            </div>
            
            {/* File List */}
            <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none no-scrollbar">
              <div className="hidden md:flex items-center gap-1.5 px-2 py-1 text-white/40 font-mono text-[11px] mb-1 select-none">
                📁 projects
              </div>
              
              {projects.map((proj, idx) => {
                const isActive = idx === activeProjIdx
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjIdx(idx)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-[11px] border-0 transition-all text-left cursor-pointer whitespace-nowrap md:w-full select-none ${
                      isActive 
                        ? 'bg-[var(--color-red)]/15 text-[var(--color-red)] font-bold shadow-inner' 
                        : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] opacity-75">{isActive ? '📝' : '📄'}</span>
                      <span>{proj.fileName}</span>
                    </div>
                    {proj.live && proj.live !== '#' && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-serif italic select-none ml-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        <span>live</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT PANELS (Editor Workspace & App Live Preview) */}
          <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10 bg-black/10 lg:h-full">
            
            {/* COLUMN 1: Code editor editor area */}
            <div className="flex-1 flex flex-col min-w-0 lg:h-full">
              {/* Tab Header bar */}
              <div className="bg-[#121215]/60 border-b border-white/5 flex">
                <div className="bg-[#16161a] border-r border-white/10 px-4 py-2 flex items-center gap-2 border-t border-t-[var(--color-red)]">
                  <span className="font-mono text-[10px] text-[var(--color-red)] font-bold">📄</span>
                  <span className="font-mono text-[10px] text-white font-bold">{currentProj.fileName}</span>
                </div>
                <div className="flex-1" />
              </div>

              {/* Monospace Code Display */}
              <div className="p-4 overflow-y-auto flex-1 h-[260px] md:h-auto no-scrollbar">
                {currentProj.renderCode()}
              </div>
            </div>

            {/* COLUMN 2: App Preview & Deployment Metrics */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col p-4 md:p-3.5 bg-black/40 lg:h-full overflow-hidden">
              
              <span className="font-mono text-[9px] text-[var(--color-red)] tracking-[0.25em] block mb-1.5 uppercase font-bold">
                Deployed Preview
              </span>
              
              <h3 className="font-wide text-lg font-bold text-white mb-0.5 flex items-center gap-2">
                <span>{currentProj.title}</span>
                {currentProj.live && currentProj.live !== '#' && (
                  <span className="relative flex h-2 w-2 select-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </h3>
              <p className="font-mono text-[9px] text-white/40 mb-2 md:mb-3 uppercase tracking-wider">
                {currentProj.subtitle}
              </p>

              {/* Grayscale hoverable Image container */}
              <div className="relative h-20 md:h-24 w-full rounded-lg overflow-hidden border border-white/10 bg-black mb-3 group flex-shrink-0">
                <img
                  src={currentProj.image}
                  alt={currentProj.title}
                  className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-black/80 border border-white/15 px-2 py-0.5 rounded font-mono text-[8px] text-[var(--color-red)] font-bold">
                  {currentProj.code}
                </div>
                <div className="absolute top-2 right-2 bg-black/80 border border-white/15 px-2 py-0.5 rounded font-mono text-[8px] text-white/60">
                  {currentProj.complexity} Scope
                </div>
              </div>

              <p className="font-body text-xs text-white/80 leading-relaxed mb-3 md:mb-4">
                {currentProj.description}
              </p>

              {/* Tech Tags & Launch Buttons Row */}
              <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-white/5">
                <div className="flex flex-wrap gap-1">
                  {currentProj.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[8px] border border-white/5 px-2 py-0.5 rounded bg-white/[0.02] text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Launch Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={currentProj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (currentProj.github === '#') {
                        e.preventDefault();
                      }
                    }}
                    className={`flex items-center justify-center w-8 h-8 border rounded-lg transition-all ${
                      currentProj.github === '#'
                        ? 'border-white/5 text-white/20 cursor-not-allowed pointer-events-none'
                        : 'border-white/10 hover:border-white/20 text-white/70 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer'
                    }`}
                    title={currentProj.github === '#' ? 'Repository Locked' : 'GitHub Repository'}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href={currentProj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (currentProj.live === '#') {
                        e.preventDefault();
                      }
                    }}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                      currentProj.live === '#'
                        ? 'bg-neutral-900/50 text-white/20 border border-white/5 cursor-not-allowed pointer-events-none'
                        : 'bg-[var(--color-red)] text-white hover:shadow-[0_0_12px_rgba(255,16,42,0.4)] cursor-pointer'
                    }`}
                    title={currentProj.live === '#' ? 'Website Offline' : 'Live Website'}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  )
}
