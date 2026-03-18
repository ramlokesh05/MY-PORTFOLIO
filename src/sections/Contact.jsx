import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState('')
  const [ripple, setRipple] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const btnRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
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
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleBtnClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setTimeout(() => setRipple(null), 600)
  }

  const fields = [
    { name: 'name', label: 'NAME', type: 'text', placeholder: 'Your Name' },
    { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
    { name: 'subject', label: 'SUBJECT', type: 'text', placeholder: 'Subject Line' },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">06</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">Contact</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
          <p className="font-mono text-xs text-noir-muted tracking-wider mb-16">
            SEND A TRANSMISSION // ALL CHANNELS OPEN
          </p>
        </SectionReveal>

        <SectionReveal variant="fadeUp" delay={0.2}>
          <form onSubmit={handleSubmit} className="glass p-8 md:p-12 paper-texture space-y-8 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-noir-red/50 via-noir-red/20 to-transparent" />

            {/* Classification */}
            <div className="flex items-center gap-2 mb-8">
              <span className="font-mono text-[9px] tracking-[0.3em] text-noir-red border border-noir-red/30 px-2 py-0.5">
                ENCRYPTED
              </span>
              <span className="font-mono text-[9px] tracking-wider text-noir-muted">
                SECURE CHANNEL
              </span>
            </div>

            {/* Input fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <motion.div
                  key={field.name}
                  className="relative"
                  animate={focused === field.name ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="font-mono text-[10px] tracking-[0.3em] text-noir-muted block mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused('')}
                    className="input-noir w-full px-4 py-3 font-mono text-sm tracking-wider cursor-hover"
                  />
                  {/* Animated bottom border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-noir-red"
                    initial={{ width: '0%' }}
                    animate={focused === field.name ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Message textarea */}
            <motion.div
              className="relative"
              animate={focused === 'message' ? { scale: 1.01 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <label className="font-mono text-[10px] tracking-[0.3em] text-noir-muted block mb-2">
                MESSAGE
              </label>
              <textarea
                name="message"
                placeholder="Your message..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                className="input-noir w-full px-4 py-3 font-mono text-sm tracking-wider resize-none cursor-hover"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-noir-red"
                initial={{ width: '0%' }}
                animate={focused === 'message' ? { width: '100%' } : { width: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Submit button */}
            <div className="pt-4">
              <motion.button
                ref={btnRef}
                type="submit"
                onClick={handleBtnClick}
                className="magnetic-btn relative font-mono text-sm tracking-[0.3em] px-10 py-4 border border-noir-red/40 text-noir-red hover:bg-noir-red/10 transition-all duration-500 cursor-hover overflow-hidden"
                whileHover={{
                  boxShadow: '0 0 30px rgba(255,43,43,0.3)',
                  borderColor: '#ff2b2b',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">
                  {submitted ? '✓ TRANSMITTED' : 'SEND TRANSMISSION'}
                </span>

                {/* Ripple */}
                {ripple && (
                  <motion.span
                    className="absolute bg-noir-red/20 rounded-full"
                    style={{ left: ripple.x, top: ripple.y }}
                    initial={{ width: 0, height: 0, x: 0, y: 0 }}
                    animate={{ width: 300, height: 300, x: -150, y: -150, opacity: [1, 0] }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
          </form>
        </SectionReveal>
      </div>
    </section>
  )
}
