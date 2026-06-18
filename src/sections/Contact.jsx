import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecryptedText from '../components/DecryptedText'

export default function Contact() {
  const sectionRef = useRef(null)

  const formDataInit = { name: '', email: '', subject: '', message: '' }
  const [formData, setFormData] = useState(formDataInit)
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSubmitError(null)

    try {
      const response = await fetch('https://formspree.io/f/xdkrawjo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData(formDataInit)
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error || 'Submission failed. Please try again.')
      }
    } catch (error) {
      console.error('Transmission error:', error)
      setSubmitError('Failed to establish server connection.')
    }

    setIsSending(false)
  }

  const handleResumeClick = (e) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.target = '_blank'
    link.download = 'Ram_Lokesh_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div ref={sectionRef} className="w-full max-w-xl mx-auto px-6 py-6 relative flex flex-col justify-center min-h-[70vh] text-[var(--color-fg)]">

      {/* ─── SECTION TITLE ─── */}
      <div className="mb-8 pb-4 border-b border-white/10 relative text-center md:text-left">
        <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-[2px] bg-[var(--color-red)] rounded" />
        <div className="font-mono text-[9px] tracking-[0.15em] text-[var(--color-red)] mb-1.5 uppercase whitespace-nowrap overflow-hidden">
          Response times may vary based on CPU temp and coffee levels
        </div>
        <h2 className="font-wide text-xl md:text-2xl font-extrabold uppercase tracking-tight whitespace-nowrap overflow-hidden flex items-center gap-2 flex-wrap">
          <DecryptedText
            text="Ping My Server"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={40}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&"
            className="text-white"
            encryptedClassName="text-[var(--color-red)] opacity-60"
          />
          <DecryptedText
            text="(Or send meme links!)"
            animateOn="hover"
            sequential
            revealDirection="center"
            speed={35}
            characters="!@#$%^&*()_+=[]{}|;:,.<>?"
            className="text-[var(--color-red)]"
            encryptedClassName="text-white/30"
          />
        </h2>
      </div>

      {/* ─── EMAIL COMPOSER FORM (Simple mail template) ─── */}
      <div className="relative w-full">
        <form
          onSubmit={handleSubmit}
          className="border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col bg-black/70 backdrop-blur-md"
        >
          {/* Email Window Header (like macOS Mail window) */}
          <div className="bg-[#131316] border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold">
              Compose Message
            </span>
            <div className="w-10" />
          </div>



          {/* Email Fields (Borderless Inputs in Rows) */}
          <div className="flex flex-col">

            {/* TO */}
            <div className="border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
              <span className="font-mono text-[10px] text-white/40 uppercase w-14 select-none">To:</span>
              <div className="flex items-center bg-[var(--color-red)]/10 border border-[var(--color-red)]/30 px-2 py-0.5 rounded text-[10px] text-[var(--color-red)] font-bold font-mono select-none">
                Ram Lokesh &lt;karrilokesh2006@gmail.com&gt;
              </div>
            </div>

            {/* FROM NAME */}
            <div className="border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
              <label htmlFor="name-input" className="font-mono text-[10px] text-white/40 uppercase w-14 select-none">Name:</label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="compose-input flex-1 text-white"
              />
            </div>

            {/* FROM EMAIL */}
            <div className="border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
              <label htmlFor="email-input" className="font-mono text-[10px] text-white/40 uppercase w-14 select-none">Email:</label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="compose-input flex-1 text-white"
              />
            </div>

            {/* SUBJECT */}
            <div className="border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
              <label htmlFor="subject-input" className="font-mono text-[10px] text-white/40 uppercase w-14 select-none">Subject:</label>
              <input
                id="subject-input"
                type="text"
                name="subject"
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="compose-input flex-1 text-white"
              />
            </div>

            {/* MESSAGE BODY */}
            <div className="px-4 py-4">
              <textarea
                name="message"
                required
                placeholder="Write your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="compose-input w-full text-white resize-none leading-relaxed"
              />
            </div>

          </div>

          {/* Submission Error Banner */}
          {submitError && (
            <div className="px-4 py-2 bg-red-950/40 border-t border-red-900/30 text-[10px] text-red-400 font-mono text-center">
              {submitError}
            </div>
          )}

          {/* Email Footer (Mail Tools & Send Button) */}
          <div className="bg-[#131316]/60 border-t border-white/5 px-4 py-3 flex justify-between items-center">

            {/* Connection Status Icon */}
            <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] uppercase tracking-wider select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>TCP Handshake Ready</span>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSending || submitted}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer ${submitted
                  ? 'bg-emerald-600 text-white border border-emerald-500'
                  : 'bg-[var(--color-red)] text-white hover:shadow-[0_0_15px_rgba(255,16,42,0.3)] hover:scale-[1.02]'
                } border-0`}
            >
              {isSending ? (
                <span>SYN-ACK...</span>
              ) : submitted ? (
                <>
                  <span>ACK (200 OK)</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </>
              ) : (
                <>
                  <span>SEND PACKET</span>
                  <svg className="w-3 h-3 rotate-45 mt-[-1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>

          </div>

        </form>
      </div>

      {/* ─── SOCIAL LINKS & RESUME (Logos Only) ─── */}
      <div className="flex justify-center gap-6 mt-4">

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ramlokesh05/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)]"
          aria-label="LinkedIn"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ramlokesh05"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)]"
          aria-label="GitHub"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* Resume */}
        <button
          onClick={handleResumeClick}
          className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)] cursor-pointer"
          aria-label="Resume"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        </button>

      </div>

    </div>
  )
}
