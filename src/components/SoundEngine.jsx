import { useEffect, useRef, createContext, useContext, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Sound Context ───────────────────────────────────────────────────────────
const SoundContext = createContext(null)

export function useSoundEngine() {
  return useContext(SoundContext)
}

// ─── Audio Helpers & Synthesizers ──────────────────────────────────────────────
function createAudioContext() {
  if (typeof window === 'undefined') return null
  return new (window.AudioContext || window.webkitAudioContext)()
}

// Helper: Noise Buffer for wind and fire
let noiseBufferCache = null
function getNoiseBuffer(ctx) {
  if (noiseBufferCache) return noiseBufferCache
  if (!ctx) return null
  const bufferSize = ctx.sampleRate * 2 // 2 seconds of noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  noiseBufferCache = buffer
  return buffer
}

// 1. Deep castle scroll sound (low frequency thud/rumble)
function playScrollSound(ctx, vol = 0.15) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 180
  
  osc.type = 'sine'
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
  
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.6)
}

// 2. Light electrical / torch sizzle hover sound
function playHoverSound(ctx, vol = 0.05) {
  if (!ctx || ctx.state === 'suspended') return
  const buffer = getNoiseBuffer(ctx)
  if (!buffer) return
  
  const source = ctx.createBufferSource()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  
  filter.type = 'highpass'
  filter.frequency.value = 5000
  
  source.buffer = buffer
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
  
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(ctx.currentTime)
}

// 3. Bat-wing snap / lock-on click
function playClickSound(ctx, vol = 0.25) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'square'
  osc.frequency.setValueAtTime(180, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.15)
}

// 4. Gothic organ intro sting
function playOpenSound(ctx, vol = 0.2) {
  if (!ctx || ctx.state === 'suspended') return
  const chords = [110, 138.6, 165, 220] // A-major-ish chord
  chords.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    
    filter.type = 'lowpass'
    filter.frequency.value = 800
    
    osc.type = i % 2 === 0 ? 'triangle' : 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(freq * 1.01, ctx.currentTime + 1.2)
    
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(vol / chords.length, ctx.currentTime + 0.1 + i * 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
    
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.6)
  })
}

// 5. Void rumble for screen transitions
function playPageChangeSound(ctx, vol = 0.25) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  
  filter.type = 'lowpass'
  filter.frequency.value = 90
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(60, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.8)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9)
  
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.9)
}

// 6. Echoing stone footstep (low frequency thuds panning left/right)
let lastFootstepPan = -0.3
function playFootstepSound(ctx, vol = 0.18) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  
  // Alternate panning to simulate walking
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
  const pan = lastFootstepPan === -0.3 ? 0.3 : -0.3
  lastFootstepPan = pan

  filter.type = 'lowpass'
  filter.frequency.value = 130
  
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(55, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.2)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
  
  if (panner) {
    panner.pan.setValueAtTime(pan, ctx.currentTime)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(panner)
    panner.connect(ctx.destination)
  } else {
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
  }
  
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.28)
}

// 7. Metal chain creak for Drawbridge
function playDrawbridgeCreak(ctx, vol = 0.15) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  
  filter.type = 'bandpass'
  filter.frequency.value = 900
  filter.Q.value = 4
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(110, ctx.currentTime)
  
  lfo.frequency.setValueAtTime(7, ctx.currentTime) // squeak speed
  lfoGain.gain.setValueAtTime(35, ctx.currentTime)
  
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0)
  
  lfo.connect(lfoGain)
  lfoGain.connect(osc.frequency)
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  
  lfo.start(ctx.currentTime)
  osc.start(ctx.currentTime)
  lfo.stop(ctx.currentTime + 1.1)
  osc.stop(ctx.currentTime + 1.1)
}

// 8. AWS Longsword metallic clash ring
function playSwordClash(ctx, vol = 0.25) {
  if (!ctx || ctx.state === 'suspended') return
  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 1000

  // Multiple high frequency oscillators for metal resonance
  const freqs = [1800, 2300, 2700, 3100]
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.9, ctx.currentTime + 0.4)
    
    gain.gain.setValueAtTime(vol / freqs.length, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4 + idx * 0.1)
    
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.6)
  })
}

// 9. Docker Shield heavy block thud
function playShieldBlock(ctx, vol = 0.3) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(220, ctx.currentTime)
  
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(90, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
  
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.25)
}

// 10. Kubernetes spell/rune glow shimmer
function playSpellMagic(ctx, vol = 0.22) {
  if (!ctx || ctx.state === 'suspended') return
  const notes = [440, 554.37, 659.25, 880, 1109.73, 1318.51] // A major arpeggio
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const delay = i * 0.06
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
    osc.frequency.linearRampToValueAtTime(freq * 1.5, ctx.currentTime + delay + 0.35)
    
    gain.gain.setValueAtTime(0, ctx.currentTime + delay)
    gain.gain.linearRampToValueAtTime(vol * 0.3, ctx.currentTime + delay + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.35)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + 0.4)
  })
}

// 11. Contact raven caw flyoff
function playRavenCaw(ctx, vol = 0.2) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  const vibrato = ctx.createOscillator()
  const vibGain = ctx.createGain()
  
  filter.type = 'bandpass'
  filter.frequency.value = 850
  filter.Q.value = 3
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(320, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.08)
  osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.45)
  
  vibrato.frequency.setValueAtTime(22, ctx.currentTime)
  vibGain.gain.setValueAtTime(40, ctx.currentTime)
  
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
  
  vibrato.connect(vibGain)
  vibGain.connect(osc.frequency)
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  
  vibrato.start(ctx.currentTime)
  osc.start(ctx.currentTime)
  vibrato.stop(ctx.currentTime + 0.5)
  osc.stop(ctx.currentTime + 0.5)
}

// 12. Observatory telescope twinkle sound
function playStarTwinkle(ctx, vol = 0.15) {
  if (!ctx || ctx.state === 'suspended') return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'sine'
  osc.frequency.setValueAtTime(2500, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + 0.15)
  
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.18)
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function SoundProvider({ children }) {
  const ctxRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [ambienceEnabled, setAmbienceEnabled] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  
  const scrollThrottleRef = useRef(false)
  const hoverThrottleRef = useRef(false)
  
  // Ambience Audio nodes refs
  const windSourceRef = useRef(null)
  const windGainRef = useRef(null)
  const fireSourceRef = useRef(null)
  const fireGainRef = useRef(null)
  const crackleIntervalRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext()
    }
    const c = ctxRef.current
    if (c && c.state === 'suspended') {
      c.resume()
    }
    return c
  }, [])

  // Unlock on user action
  useEffect(() => {
    const unlock = () => {
      if (!unlocked) {
        const ctx = getCtx()
        if (ctx) ctx.resume().then(() => setUnlocked(true))
        setUnlocked(true)
      }
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [getCtx, unlocked])

  // Start & Stop castle ambience loops
  const stopAmbience = useCallback(() => {
    if (windSourceRef.current) {
      try { windSourceRef.current.stop() } catch(e){}
      windSourceRef.current = null
    }
    if (fireSourceRef.current) {
      try { fireSourceRef.current.stop() } catch(e){}
      fireSourceRef.current = null
    }
    if (crackleIntervalRef.current) {
      clearInterval(crackleIntervalRef.current)
      crackleIntervalRef.current = null
    }
    windGainRef.current = null
    fireGainRef.current = null
  }, [])

  const startAmbience = useCallback(() => {
    const ctx = getCtx()
    if (!ctx || ctx.state === 'suspended' || muted || !ambienceEnabled) {
      stopAmbience()
      return
    }

    stopAmbience() // Prevent duplicate overlaps

    const buffer = getNoiseBuffer(ctx)
    if (!buffer) return

    // 1. Wind Howling loop
    const windSource = ctx.createBufferSource()
    windSource.buffer = buffer
    windSource.loop = true
    
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'bandpass'
    windFilter.Q.value = 2.5
    windFilter.frequency.setValueAtTime(350, ctx.currentTime)

    // LFO to sweep wind frequency slowly
    const windLfo = ctx.createOscillator()
    const windLfoGain = ctx.createGain()
    windLfo.type = 'sine'
    windLfo.frequency.setValueAtTime(0.08, ctx.currentTime) // ultra slow sweep
    windLfoGain.gain.setValueAtTime(150, ctx.currentTime) // range +/- 150hz

    const windGain = ctx.createGain()
    windGain.gain.setValueAtTime(0.04, ctx.currentTime)

    windLfo.connect(windLfoGain)
    windLfoGain.connect(windFilter.frequency)
    windSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(ctx.destination)
    
    windLfo.start(ctx.currentTime)
    windSource.start(ctx.currentTime)

    windSourceRef.current = windSource
    windGainRef.current = windGain

    // 2. Fire crackle low rumbling heat
    const fireSource = ctx.createBufferSource()
    fireSource.buffer = buffer
    fireSource.loop = true

    const fireFilter = ctx.createBiquadFilter()
    fireFilter.type = 'lowpass'
    fireFilter.frequency.setValueAtTime(90, ctx.currentTime)

    const fireGain = ctx.createGain()
    fireGain.gain.setValueAtTime(0.06, ctx.currentTime)

    fireSource.connect(fireFilter)
    fireFilter.connect(fireGain)
    fireGain.connect(ctx.destination)
    fireSource.start(ctx.currentTime)

    fireSourceRef.current = fireSource
    fireGainRef.current = fireGain

    // 3. Fire crackle spikes (procedural interval clicks)
    crackleIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.45) {
        // Synthesize single crackle pop
        const sizzleGain = ctx.createGain()
        sizzleGain.gain.setValueAtTime(Math.random() * 0.012 + 0.003, ctx.currentTime)
        sizzleGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02)

        const sizzleFilter = ctx.createBiquadFilter()
        sizzleFilter.type = 'highpass'
        sizzleFilter.frequency.setValueAtTime(3000 + Math.random() * 2000, ctx.currentTime)

        const clickSource = ctx.createBufferSource()
        clickSource.buffer = buffer
        clickSource.connect(sizzleFilter)
        sizzleFilter.connect(sizzleGain)
        sizzleGain.connect(ctx.destination)
        clickSource.start(ctx.currentTime)
        setTimeout(() => {
          try { clickSource.stop() } catch(e){}
        }, 30)
      }
    }, 140)

  }, [getCtx, muted, ambienceEnabled, stopAmbience])

  // Sync ambient loop state when mute or ambiance toggle changes
  useEffect(() => {
    if (unlocked) {
      startAmbience()
    }
    return () => stopAmbience()
  }, [unlocked, muted, ambienceEnabled, startAmbience, stopAmbience])

  const sound = useCallback((type) => {
    if (muted) return
    const ctx = getCtx()
    if (!ctx) return
    
    switch (type) {
      case 'scroll':
        // Trigger generic deep thud on normal small scroll
        if (scrollThrottleRef.current) return
        scrollThrottleRef.current = true
        playScrollSound(ctx)
        setTimeout(() => { scrollThrottleRef.current = false }, 550)
        break
      case 'footstep':
        // Alternate echoing footstep for transition corridor walking
        if (scrollThrottleRef.current) return
        scrollThrottleRef.current = true
        playFootstepSound(ctx)
        setTimeout(() => { scrollThrottleRef.current = false }, 450)
        break
      case 'hover':
        if (hoverThrottleRef.current) return
        hoverThrottleRef.current = true
        playHoverSound(ctx)
        setTimeout(() => { hoverThrottleRef.current = false }, 120)
        break
      case 'click':
        playClickSound(ctx)
        break
      case 'open':
        playOpenSound(ctx)
        break
      case 'pageChange':
        playPageChangeSound(ctx)
        break
      case 'drawbridge_creak':
        playDrawbridgeCreak(ctx)
        break
      case 'sword_clash':
        playSwordClash(ctx)
        break
      case 'shield_block':
        playShieldBlock(ctx)
        break
      case 'spell_magic':
        playSpellMagic(ctx)
        break
      case 'raven_caw':
        playRavenCaw(ctx)
        break
      case 'star_twinkle':
        playStarTwinkle(ctx)
        break
      default:
        break
    }
  }, [muted, getCtx])

  return (
    <SoundContext.Provider value={{ sound, muted, ambienceEnabled, setAmbienceEnabled, setMuted }}>
      {children}

      {/* ── Sleuomorphic Sound Control Panel Widget ── */}
      <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-2">
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="glass px-4 py-3 rounded flex flex-col gap-2 font-mono text-[9px] tracking-wider text-noir-muted"
              style={{
                background: 'rgba(10,8,8,0.92)',
                border: '1px solid rgba(255,43,43,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.85)',
              }}
            >
              <div className="flex items-center justify-between gap-6 border-b border-noir-gray/30 pb-1.5 mb-1">
                <span className="text-noir-white font-bold">FORT SOUND SYSTEM</span>
                <span className="text-noir-red cursor-pointer" onClick={() => setPanelOpen(false)}>✕</span>
              </div>
              
              {/* Sound FX Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-noir-text hover:text-noir-white">
                <input
                  type="checkbox"
                  checked={!muted}
                  onChange={(e) => {
                    sound('click')
                    setMuted(!e.target.checked)
                  }}
                  className="accent-noir-red w-3 h-3 cursor-pointer"
                />
                SOUND EFFECTS
              </label>

              {/* Ambiance Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-noir-text hover:text-noir-white">
                <input
                  type="checkbox"
                  checked={ambienceEnabled}
                  onChange={(e) => {
                    sound('click')
                    setAmbienceEnabled(e.target.checked)
                  }}
                  className="accent-noir-red w-3 h-3 cursor-pointer"
                />
                CASTLE AMBIENCE
              </label>
              
              <div className="text-[7px] text-noir-muted leading-tight mt-1">
                ⚙ Procedural Audio engine<br />
                no network files loaded
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="sound-control-panel-btn"
          onClick={() => {
            sound('click')
            setPanelOpen(!panelOpen)
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
          style={{
            background: 'rgba(10,10,10,0.85)',
            border: '1px solid rgba(255,43,43,0.35)',
            boxShadow: (muted && !ambienceEnabled)
              ? '0 2px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 0 16px rgba(255,43,43,0.25), 0 2px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle sound controls"
          title="Toggle sound controls"
        >
          {muted ? (
            <span className="text-noir-muted text-base">🔇</span>
          ) : (
            <span className={ambienceEnabled ? "text-noir-red text-base animate-pulse" : "text-noir-red text-base"}>
              🔊
            </span>
          )}
        </motion.button>
      </div>
    </SoundContext.Provider>
  )
}
