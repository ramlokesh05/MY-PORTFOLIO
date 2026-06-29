import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextType from '../components/TextType'

const educationDetails = [
  {
    year: "2020 — 2021",
    degree: "Matriculation (10th)",
    major: "General Academics",
    institution: "Ashram Public School, Kakinada",
    gpa: "Percentage: 80%",
    highlights: [
      "Graduated with strong academic standing",
      "Solidified foundational logic and mathematical abilities"
    ]
  },
  {
    year: "2021 — 2023",
    degree: "Intermediate (12th)",
    major: "MPC (Maths, Physics, Chemistry)",
    institution: "Aditya Junior College, Kakinada",
    gpa: "Percentage: 69%",
    highlights: [
      "Core focus on Mathematics, Physics, and Chemistry",
      "Developed strong analytical and problem-solving skills"
    ]
  },
  {
    year: "2023 — Present",
    degree: "Bachelor of Technology",
    major: "Computer Science & Engineering",
    institution: "Lovely Professional University, Phagwara",
    gpa: "CGPA: 6.6",
    highlights: [
      "Specializing in Cloud Computing & DevOps principles",
      "Building scalable infrastructure and automated CI/CD pipelines"
    ]
  }
];

export default function Education() {
  const [activeStep, setActiveStep] = useState(2); // Start at B.Tech (index 2)

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-6xl mx-auto px-6 text-[var(--color-fg)]">

      {/* ─── SECTION HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12 text-center"
      >
        <span className="font-mono block text-[var(--color-red)] text-[10px] tracking-[0.3em] font-bold mb-2 uppercase">
          Forced Learning Phases
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-md min-h-[1.2em] flex items-center justify-center">
          <TextType
            text={[
              "Where I Acquired Paper Credentials",
              "Forced Learning Phases",
              "Knowledge.exe Loading...",
              "Grades Were Sacrificed Here"
            ]}
            typingSpeed={55}
            deletingSpeed={30}
            pauseDuration={2200}
            loop
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            startOnVisible
            className="font-black uppercase tracking-tighter"
          />
        </h2>
        <div className="w-16 h-1 bg-[var(--color-red)] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* ─── DYNAMIC JOURNEY INTERFACE ─── */}
      <div className="flex flex-col justify-center max-h-[70vh]">

        {/* Horizontal Journey Timeline Indicator (Always visible, interactive) */}
        <div className="relative w-full max-w-3xl mx-auto mb-10 px-4">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />

          {/* Active Progress Fill */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[var(--color-red)] -translate-y-1/2 transition-all duration-500 ease-out z-0"
            style={{ width: `${(activeStep / (educationDetails.length - 1)) * 100}%` }}
          />

          {/* Interactive Steps */}
          <div className="relative flex justify-between z-10">
            {educationDetails.map((edu, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center focus:outline-none group cursor-pointer bg-transparent border-0 p-0"
                >
                  {/* Step Node Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-mono text-xs font-bold ${isActive
                        ? 'border-[var(--color-red)] bg-black text-[var(--color-red)] shadow-[0_0_15px_rgba(255,16,42,0.4)] scale-110'
                        : isCompleted
                          ? 'border-[var(--color-red)] bg-[var(--color-red)] text-white'
                          : 'border-white/20 bg-black/80 text-white/50 group-hover:border-white/40'
                      }`}
                  >
                    {idx + 1}
                  </div>
                  {/* Step Label/Year */}
                  <span
                    className={`mt-2 font-mono text-[9px] md:text-[10px] tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-[var(--color-red)] font-bold' : 'text-white/60'
                      }`}
                  >
                    {edu.year.includes('Expected') ? '2027' : edu.year.includes('Completed') ? '2021' : edu.year.split(' — ')[1] || edu.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── DESKTOP/LARGE TABLET VIEW (3 Columns Connected) ─── */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-stretch w-full max-w-5xl mx-auto">
          {educationDetails.map((edu, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${isActive
                    ? 'bg-black/90 border-[var(--color-red)] shadow-[0_0_30px_rgba(255,16,42,0.15)] scale-[1.03] z-10'
                    : 'bg-black/40 border-white/5 opacity-60 hover:opacity-100 hover:border-white/10'
                  }`}
              >
                {/* Degree Title & Year */}
                <div className="mb-4">
                  <span className="font-mono text-[9px] text-[var(--color-red)] tracking-widest uppercase block mb-1">
                    {edu.year}
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-white line-clamp-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    {edu.major}
                  </p>
                </div>

                <div className="font-wide text-xs text-white tracking-wide font-bold mb-3 uppercase">
                  {edu.institution}
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[11px] text-[var(--color-red)] w-fit mb-4">
                  GPA: <span className="font-bold">{edu.gpa}</span>
                </div>

                <div className="border-t border-white/5 pt-4 flex-1">
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-white/70 leading-normal">
                        <span className="text-[var(--color-red)] mt-0.5">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── MOBILE VIEW (Single Animated Card) ─── */}
        <div className="block md:hidden w-full max-w-md mx-auto px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-black/90 border border-[var(--color-red)] rounded-2xl p-6 shadow-[0_0_25px_rgba(255,16,42,0.1)] flex flex-col min-h-[260px]"
            >
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <span className="font-mono text-[9px] text-[var(--color-red)] tracking-widest uppercase block mb-1">
                    {educationDetails[activeStep].year}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                    {educationDetails[activeStep].degree}
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    {educationDetails[activeStep].major}
                  </p>
                </div>
                <div className="inline-flex items-center px-2 py-0.5 bg-[var(--color-red)]/10 border border-[var(--color-red)]/20 rounded font-mono text-[10px] text-[var(--color-red)] font-bold whitespace-nowrap">
                  {educationDetails[activeStep].gpa}
                </div>
              </div>

              <div className="font-wide text-xs text-white tracking-wide font-bold mb-4 uppercase">
                {educationDetails[activeStep].institution}
              </div>

              <div className="border-t border-white/5 pt-4 flex-1">
                <ul className="space-y-2">
                  {educationDetails[activeStep].highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-white/70 leading-normal">
                      <span className="text-[var(--color-red)] mt-0.5">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}
