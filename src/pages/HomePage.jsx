import { useEffect, useState, useCallback } from 'react'

import { VscHome, VscAccount, VscCode, VscProject, VscWorkspaceTrusted, VscMail, VscLibrary } from 'react-icons/vsc'

import Dock from '../components/Dock'
import TextPressure from '../components/TextPressure'
import About from '../sections/About'
import Education from '../sections/Education'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Certifications from '../sections/Certifications'
import Contact from '../sections/Contact'
import Hyperspeed from '../components/Hyperspeed'
import MagicRings from '../components/MagicRings'
import Lightfall from '../components/Lightfall'
import Threads from '../components/Threads'
import GridScan from '../components/GridScan'
import StarBorder from '../components/StarBorder'
import Dither from '../components/Dither'
import LightRays from '../components/LightRays'

// ─── SECTION CONFIG ───
const FOLDERS = [
  { id: 'home', tab: 'Home' },
  { id: 'about', tab: 'About' },
  { id: 'skills', tab: 'Skills' },
  { id: 'projects', tab: 'Projects' },
  { id: 'certs', tab: 'Certifications' },
  { id: 'contact', tab: 'Contact' },
]

export default function HomePage() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const scrollContainers = document.querySelectorAll('.no-scrollbar, .overflow-y-auto')
    scrollContainers.forEach(container => {
      container.scrollTop = 0
    })
  }, [activeIdx])

  // ─── JUMP TO SECTION (No scrolling, just state change) ───
  const goTo = useCallback((idx) => {
    setActiveIdx(idx)
  }, [])

  // The sections to render based on activeIdx
  const renderSection = () => {
    switch (activeIdx) {
      case 0:
        return (
          <section
            id="section-home"
            className="hero-section flex flex-col items-center justify-center text-center px-6 relative w-full h-full"
          >
            {/* LOKESH Center Line - Absolutely Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex flex-col items-center justify-center pointer-events-none drop-shadow-lg">
              <div style={{ position: 'relative', width: '100%', maxWidth: '1120px', height: '220px', pointerEvents: 'auto' }}>
                <TextPressure
                  text="RAM LOKESH"
                  flex={false}
                  alpha={false}
                  stroke={false}
                  width
                  weight
                  italic
                  textColor="#ffffff"
                  strokeColor="#ff102a"
                  minFontSize={64}
                />
              </div>

              {/* Red Line Divider */}
              <div
                style={{
                  width: '48px',
                  height: '2px',
                  background: 'var(--color-red)',
                  marginTop: '2.5rem',
                }}
              />

              {/* Sub-text - repositioned under red line */}
              <p
                className="font-mono text-center pointer-events-auto"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  lineHeight: 2,
                  maxWidth: '380px',
                  marginTop: '2.5rem',
                  color: 'var(--color-fg)',
                  opacity: 0.9,
                }}
              >
                <span className="whitespace-nowrap block">CLOUD ENGINEERING &amp; DEVOPS</span>
                <span className="whitespace-nowrap block">KEEPING SERVERS ALIVE VIA SHEER WILLPOWER</span>
              </p>

              {/* Profile Social Buttons (Logos Only) */}
              <div className="flex gap-6 mt-8 pointer-events-auto z-20">
                <a
                  href="https://www.linkedin.com/in/ramlokesh05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/ramlokesh05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)]"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.target = '_blank';
                    link.download = 'Ram_Lokesh_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="text-white/60 hover:text-[var(--color-red)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,16,42,0.6)] cursor-pointer"
                  aria-label="Resume"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                </button>
              </div>

              {/* Button - spaced equally */}
              <div style={{ marginTop: '2.5rem' }} className="pointer-events-auto">
                <StarBorder
                  as="button"
                  color="#ff102a"
                  speed="3s"
                  onClick={() => goTo(1)}
                  className="font-mono uppercase cursor-pointer"
                  style={{ borderRadius: '20px' }}
                  innerStyle={{
                    padding: '14px 40px',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    background: 'black',
                    color: 'white',
                    border: '1px solid rgba(255,16,42,0.3)',
                  }}
                >
                  EXPLORE PROFILE ➔
                </StarBorder>
              </div>
            </div>
          </section>
        );
      case 1:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><About /></div>;
      case 2:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><Education /></div>;
      case 3:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><Skills /></div>;
      case 4:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><Projects /></div>;
      case 5:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><Certifications /></div>;
      case 6:
        return <div className="w-full h-full overflow-y-auto no-scrollbar pt-[80px] pb-[96px] flex items-center justify-center"><Contact /></div>;
      default:
        return null;
    }
  }

  return (
    <>
      {/* ─── FIXED INTERACTIVE BACKGROUND ─── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {activeIdx === 2 ? (
          <MagicRings
            color="#EF4444"
            colorTwo="#f5f5f5"
            ringCount={6}
            speed={1}
            attenuation={10}
            lineThickness={2}
            baseRadius={0.35}
            radiusStep={0.1}
            scaleRate={0.1}
            opacity={1}
            blur={0}
            noiseAmount={0.1}
            rotation={0}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={false}
            mouseInfluence={0.2}
            hoverScale={1.2}
            parallax={0.05}
            clickBurst={false}
          />
        ) : activeIdx === 3 ? (
          <Lightfall
            colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
            backgroundColor="#000000"
            speed={0.5}
            streakCount={2}
            streakWidth={1}
            streakLength={1}
            glow={1}
            density={0.6}
            twinkle={1}
            zoom={3}
            backgroundGlow={0.5}
            opacity={1}
            mouseInteraction
            mouseStrength={0.5}
            mouseRadius={1}
            color1="#eaeced"
            color2="#000000"
            color3="#de072c"
          />
        ) : activeIdx === 1 ? (
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction
          />
        ) : activeIdx === 4 ? (
          <Dither
            waveColor={[1,0.2,0.2]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        ) : activeIdx === 5 ? (
          <LightRays
            raysOrigin="top-center"
            raysColor="#f39191"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        ) : activeIdx === 6 ? (
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#2F293A"
            gridScale={0.1}
            scanColor="#F43F5E"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
            lineJitter={0.1}
            scanGlow={0.5}
            scanSoftness={2}
            enableWebcam={false}
            showPreview={false}
          />
        ) : (
          <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'mountainDistortion',
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 50,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [20, 60],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.2, 0.2],
            carFloorSeparation: [0.05, 1],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              leftCars: [0xff102a, 0xeb383e, 0xff102a],
              rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
              sticks: 0xdadafa
            }
          }}
        />
        )}

        {/* Dark overlay for text legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.42)',
          }}
        />
      </div>

      {/* ─── SITE SHELL (sits above the fixed gradient) ─── */}
      <div
        className="relative w-full h-screen text-[var(--color-fg)] overflow-hidden flex flex-col"
        style={{ zIndex: 1 }}
      >
        {/* ─── MAIN CONTENT AREA (No body scroll) ─── */}
        <main className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
          {renderSection()}
        </main>

        {/* ─── MAC-STYLE BOTTOM DOCK ─── */}
        <Dock
          items={[
            { icon: <VscHome size={18} />, label: 'Home', onClick: () => goTo(0) },
            { icon: <VscAccount size={18} />, label: 'About', onClick: () => goTo(1) },
            { icon: <VscLibrary size={18} />, label: 'Education', onClick: () => goTo(2) },
            { icon: <VscCode size={18} />, label: 'Skills', onClick: () => goTo(3) },
            { icon: <VscProject size={18} />, label: 'Projects', onClick: () => goTo(4) },
            { icon: <VscWorkspaceTrusted size={18} />, label: 'Certs', onClick: () => goTo(5) },
            { icon: <VscMail size={18} />, label: 'Contact', onClick: () => goTo(6) },
          ]}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />

      </div>
    </>
  )
}
