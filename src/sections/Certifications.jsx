import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import StarBorder from '../components/StarBorder'
import { SiGithub, SiMongodb, SiCplusplus } from 'react-icons/si'
import { FaCode, FaGraduationCap, FaEye, FaDownload, FaExternalLinkAlt } from 'react-icons/fa'
import { GrOracle } from 'react-icons/gr'
import ShinyText from '../components/ShinyText'

export default function Certifications() {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const getCertIcon = (id, isBig = false) => {
    const size = isBig ? 30 : 22
    switch (id) {
      case 'dsa':
        return <SiCplusplus size={size} className="text-[#00599c]" />
      case 'microsoft':
        return (
          <svg viewBox="0 0 23 23" style={{ width: size, height: size }}>
            <rect x="0" y="0" width="10" height="10" fill="#f25022" />
            <rect x="11" y="0" width="10" height="10" fill="#7fba00" />
            <rect x="0" y="11" width="10" height="10" fill="#00a4ef" />
            <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
          </svg>
        )
      case 'github':
        return <SiGithub size={size} className="text-white" />
      case 'nptel':
        return <FaGraduationCap size={size} className="text-[#f39c12]" />
      case 'oracle':
        return <GrOracle size={size} className="text-[#f80000]" />
      case 'mongodb':
        return <SiMongodb size={size} className="text-[#47a248]" />
      default:
        return <FaCode size={size} className="text-slate-400" />
    }
  }

  const getBrandColor = (id) => {
    switch (id) {
      case 'dsa':
        return '#00599c'
      case 'microsoft':
        return '#00a4ef'
      case 'github':
        return '#24292e'
      case 'nptel':
        return '#f39c12'
      case 'oracle':
        return '#f80000'
      case 'mongodb':
        return '#47a248'
      default:
        return '#ff102a'
    }
  }

  const certData = [
    {
      id: 'microsoft',
      code: 'CERT-01',
      issuer: 'Microsoft',
      certificates: [
        {
          title: 'Microsoft Certified: Azure Administrator Associate',
          date: "Jun'26",
          verifyId: '931C28C5AE64EB9A',
          verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-in/KarriPhaneendraRamLokesh-3916/931C28C5AE64EB9A?sharingId=85BDC3F72463BB58',
          image: '/images/microsoft-certificate.png',
          desc: 'Implement, manage, and monitor identity, governance, storage, compute, and virtual networks in a cloud environment.'
        }
      ]
    },
    {
      id: 'oracle',
      code: 'CERT-02',
      issuer: 'Oracle',
      certificates: [
        {
          title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
          date: "Mar'26",
          verifyId: '103440761OCI25FNDCFA',
          verifyUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=7912ADD0889956428E4AF62D9FC6CE015AAA808DB40BD79734E3CF1B088DF029',
          image: '/images/oracle-foundations-certificate.png',
          desc: 'Demonstrated fundamental knowledge of public cloud services provided by Oracle Cloud Infrastructure, including OCI core services, architecture, security, and pricing.'
        },
        {
          title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
          date: "Mar'26",
          verifyId: '103440761OCI25AICFA',
          verifyUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=964782A83E3E208B41B1173ABD3ED0AA7C2915E69925135BACB9357487747F72',
          image: '/images/oracle-ai-certificate.png',
          desc: 'Demonstrated fundamental understanding of Artificial Intelligence (AI) and Machine Learning (ML) concepts and how they are implemented within Oracle Cloud Infrastructure (OCI).'
        },
        {
          title: 'Oracle Data Platform 2025 Certified Foundations Associate',
          date: "Mar'26",
          verifyId: '103440761OCI25DCFA',
          verifyUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=FA0B6C5A550EDF11857C67D88B963C70C3D80E90848E84D1987D7F6213D5475E',
          image: '/images/oracle-data-platform-certificate.png',
          desc: 'Demonstrated foundational knowledge of Oracle Data Platform services, data management design, data warehouse integration, and cloud databases.'
        }
      ]
    },
    {
      id: 'mongodb',
      code: 'CERT-03',
      issuer: 'MongoDB',
      certificates: [
        {
          title: 'MongoDB Associate',
          date: "Jan'26",
          verifyId: 'MDB-AD-99120',
          verifyUrl: 'https://university.mongodb.com/',
          desc: 'Document modeling, index optimizations, aggregation frameworks, and cluster replication setup.'
        }
      ]
    },
    {
      id: 'github',
      code: 'CERT-04',
      issuer: 'GitHub',
      certificates: [
        {
          title: 'GitHub Foundations',
          date: "Feb'26",
          verifyId: 'GH-FND-88402',
          verifyUrl: 'https://github.com/ramlokesh05',
          desc: 'Branch protection rules, GitHub Actions pipeline design, repository governance, and secure release tagging.'
        }
      ]
    },
    {
      id: 'dsa',
      code: 'CERT-05',
      issuer: 'Cipher Schools',
      certificates: [
        {
          title: 'Data Structures and Algorithms',
          date: "Aug'25",
          verifyId: 'CSW2025-13429',
          verifyUrl: 'https://www.cipherschools.com/certificate/preview?id=68921d7dcec61f8eee566987',
          image: '/images/dsa-certificate.png',
          desc: 'Advanced data structures, graph search algorithms, dynamic programming, and complexity mapping in C++.'
        },
        {
          title: 'Git and GitHub',
          date: "Jun'25",
          verifyId: 'CSW2025-11405',
          verifyUrl: 'https://www.cipherschools.com/certificate/preview?id=684b03194f9ff73e6af313af',
          image: '/images/cipher-git-certificate.png',
          desc: 'Comprehensive training in Git and GitHub, version control systems, branch management, and collaborative development workflows.'
        }
      ]
    },
    {
      id: 'nptel',
      code: 'CERT-06',
      issuer: 'NPTEL (IIT Madras)',
      certificates: [
        {
          title: 'Social Networks',
          date: "Oct'25",
          verifyId: 'NPTEL25CS65S647501090',
          verifyUrl: '/images/nptel-certificate.png',
          image: '/images/nptel-certificate.png',
          desc: 'Analysis of relation networks, graph hubs, centrality distribution models, and structural link predictions.'
        }
      ]
    }
  ]

  const [selectedCert, setSelectedCert] = useState(certData[0])
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevSubCert = (e) => {
    e.stopPropagation()
    setActiveSubIndex(prev => (prev === 0 ? selectedCert.certificates.length - 1 : prev - 1))
  }

  const handleNextSubCert = (e) => {
    e.stopPropagation()
    setActiveSubIndex(prev => (prev === selectedCert.certificates.length - 1 ? 0 : prev + 1))
  }

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto px-6 py-8 relative flex flex-col justify-center min-h-[80vh]">

      {/* ─── TITLE ─── */}
      <div style={{ marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-1px', left: 0, width: '48px', height: '2px', background: 'var(--color-red)', borderRadius: '2px' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-red)', marginBottom: '6px', textTransform: 'uppercase' }}>Receipts of my patience</div>
        <h2 style={{ fontFamily: 'var(--font-wide)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          <ShinyText
            text="Shiny Badges I Collected"
            speed={2.5}
            delay={0}
            color="#f0dede"
            shineColor="#cc1133"
            spread={145}
            direction="left"
            yoyo={false}
            pauseOnHover
          />
        </h2>
      </div>

      {/* ─── WORKSPACE DUAL-PANEL LAYOUT ─── */}
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">

        {/* Left Column: Certifications Grid (3 cols) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between font-mono text-[10px] mb-3 px-1 text-[var(--color-fg)] opacity-70">
            <span>Select a credential to view details</span>
            <span>Total: {certData.length} items</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-[var(--color-border)] p-4 flex-1" style={{ borderRadius: '14px', background: 'rgba(10,4,6,0.52)', backdropFilter: 'blur(20px)' }}>
            {certData.map((cert, idx) => {
              const isSelected = selectedCert?.id === cert.id
              return (
                <StarBorder
                  as={motion.div}
                  key={cert.id}
                  onClick={() => {
                    setSelectedCert(cert)
                    setActiveSubIndex(0)
                    if (isMobile) {
                      setModalOpen(true);
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  color={isSelected ? "#ff102a" : "transparent"}
                  speed="3s"
                  style={{ borderRadius: '10px' }}
                  className="cursor-pointer aspect-square relative select-none"
                  innerClassName="flex flex-col justify-between items-center text-center p-4 w-full h-full border hover:border-[var(--color-red)] transition-all duration-150"
                  innerStyle={{
                    background: isSelected ? 'rgba(255,80,5,0.08)' : 'rgba(0,0,0,0.2)',
                    borderColor: isSelected ? 'var(--color-red)' : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="font-mono text-[9px] opacity-60 tracking-wider uppercase block">
                    {cert.certificates[0].date}
                  </span>

                  <div
                    className={`w-14 h-14 rounded-full border flex flex-col items-center justify-center transition-transform duration-200 ${isSelected ? 'border-[var(--color-red)] scale-110' : 'border-[rgba(255,255,255,0.2)]'
                      }`}
                  >
                    {getCertIcon(cert.id)}
                  </div>

                  <span className="font-wide text-[11px] tracking-tight truncate max-w-[72%] font-bold text-[var(--color-fg)]">
                    {cert.issuer}
                  </span>

                  {/* Multiple items count indicator */}
                  {cert.certificates.length > 1 && (
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] bg-[var(--color-red)]/20 border border-[var(--color-red)]/40 w-4 h-4 flex items-center justify-center text-[var(--color-red)] rounded-full font-bold">
                      {cert.certificates.length}
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-2 left-2 text-[var(--color-red)] font-mono text-[10px]">
                      ●
                    </div>
                  )}
                </StarBorder>
              )
            })}
          </div>
        </div>

        {/* Right Column: Certification Detail (2 cols) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col justify-between">
          <div className="flex-1 flex flex-col min-h-[300px]">
            <AnimatePresence mode="wait">
              {selectedCert ? (
                (() => {
                  const activeSub = selectedCert.certificates[activeSubIndex] || selectedCert.certificates[0]
                  return (
                    <motion.div
                      key={`${selectedCert.id}-${activeSubIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 border border-[var(--color-border)] flex flex-col p-6 relative"
                      style={{ borderRadius: '14px', background: 'rgba(10,4,6,0.52)', backdropFilter: 'blur(20px)' }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-[9px] text-[var(--color-red)] tracking-[0.25em] block text-transform uppercase">
                          Credential Details
                        </span>
                        {selectedCert.certificates.length > 1 && (
                          <span className="font-mono text-[9px] text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                            {activeSubIndex + 1} of {selectedCert.certificates.length}
                          </span>
                        )}
                      </div>
                      <h3 className="font-wide text-[16px] md:text-[18px] text-[var(--color-fg)] font-bold mb-4 leading-tight">
                        {activeSub.title}
                      </h3>

                      {/* Certificate Document Mock or Image */}
                      <div className="flex-1 border border-[rgba(255,255,255,0.1)] p-2 font-mono text-center flex flex-col justify-center items-center relative mb-4 overflow-hidden" style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
                        {activeSub.image ? (
                          <div className="w-full h-full min-h-[200px] flex items-center justify-center relative group p-2">
                            <img
                              src={activeSub.image}
                              alt={activeSub.title}
                              className="w-full h-auto max-h-[220px] object-contain rounded border border-white/10 group-hover:scale-[1.03] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded">
                              <span className="font-mono text-[9px] text-white tracking-widest uppercase border border-white/20 px-3 py-1 bg-black/40">
                                Verified Certificate
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full min-h-[240px] flex flex-col justify-between items-center p-5 relative overflow-hidden bg-gradient-to-br from-neutral-950/80 to-neutral-900/80 rounded border border-white/5">
                            {/* Background Ambient Glow */}
                            <div
                              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[70px] opacity-20 pointer-events-none transition-all duration-500"
                              style={{ backgroundColor: getBrandColor(selectedCert.id) }}
                            />
                            <div
                              className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-[70px] opacity-10 pointer-events-none transition-all duration-500"
                              style={{ backgroundColor: getBrandColor(selectedCert.id) }}
                            />

                            {/* Elegant Inner Border */}
                            <div className="absolute inset-2 border border-white/5 rounded pointer-events-none" />

                            {/* Top Ribbon */}
                            <div className="w-full flex justify-between items-center z-10 px-1">
                              <span className="font-mono text-[7px] text-white/40 tracking-[0.2em] uppercase">
                                Digital Credential
                              </span>
                              <div className="opacity-75 scale-90">
                                {getCertIcon(selectedCert.id)}
                              </div>
                            </div>

                            {/* Certificate Core Content */}
                            <div className="text-center my-3 z-10 px-2 flex flex-col items-center">
                              <span className="font-mono text-[7px] text-white/40 tracking-[0.25em] uppercase mb-1 block">
                                Certificate of Achievement
                              </span>
                              <div className="w-10 h-[1px] bg-white/10 mb-2" />

                              <p className="font-mono text-[8px] text-white/30 mb-0.5">this is proudly presented to</p>
                              <h4 className="font-wide text-[12px] font-bold text-white tracking-wide mb-2">
                                Karri Phaneendra Ram Lokesh
                              </h4>

                              <p className="font-mono text-[8px] text-white/30 mb-1">for successfully completing requirements for</p>
                              <h3
                                className="font-wide text-[11px] font-extrabold tracking-tight uppercase leading-snug max-w-[240px]"
                                style={{ color: getBrandColor(selectedCert.id) }}
                              >
                                {activeSub.title}
                              </h3>

                              <p className="font-body text-[9px] text-white/60 max-w-[220px] leading-relaxed mt-2.5 italic">
                                &ldquo;{activeSub.desc}&rdquo;
                              </p>
                            </div>

                            {/* Footer details */}
                            <div className="w-full pt-2 border-t border-white/5 grid grid-cols-2 gap-4 text-left text-[8px] font-mono z-10 opacity-70 px-1">
                              <div>
                                <span className="text-white/40 block text-[7px] uppercase tracking-wider mb-0.5">Issuer</span>
                                <span className="font-bold text-white/80">{selectedCert.issuer}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-white/40 block text-[7px] uppercase tracking-wider mb-0.5">Date Issued</span>
                                <span className="font-bold text-white/80">{activeSub.date}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Navigation Overlay Arrows for Multi-Certificate brand tiles */}
                        {selectedCert.certificates.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={handlePrevSubCert}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/80 text-white border border-white/10 flex items-center justify-center hover:bg-[var(--color-red)] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer shadow-lg select-none"
                              title="Previous Certificate"
                            >
                              ❮
                            </button>
                            <button
                              type="button"
                              onClick={handleNextSubCert}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/80 text-white border border-white/10 flex items-center justify-center hover:bg-[var(--color-red)] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer shadow-lg select-none"
                              title="Next Certificate"
                            >
                              ❯
                            </button>

                            {/* Page Dots Indicator inside the photo frame */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/70 px-2.5 py-1 rounded-full border border-white/5 shadow-md">
                              {selectedCert.certificates.map((_, idx) => (
                                <span
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveSubIndex(idx)
                                  }}
                                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-200 ${idx === activeSubIndex ? 'bg-[var(--color-red)] scale-125' : 'bg-white/30 hover:bg-white/60'
                                    }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-2 font-mono text-[9px] text-[var(--color-fg)] opacity-60 text-center uppercase tracking-wider">
                        Verification ID: {activeSub.verifyId}
                      </div>
                      <div className="mt-4 flex justify-center gap-4">
                        {activeSub.verifyUrl && (
                          <a
                            href={activeSub.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-[var(--color-red)] rounded-lg text-white font-bold hover:shadow-[0_0_15px_rgba(255,16,42,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                            title={selectedCert.id === 'nptel' ? 'View Certificate' : 'Verify Credential'}
                          >
                            {selectedCert.id === 'nptel' ? <FaEye size={16} /> : <FaExternalLinkAlt size={14} />}
                          </a>
                        )}
                        <a
                          href={activeSub.image || '#'}
                          download={activeSub.image ? `${activeSub.title.toLowerCase().replace(/\s+/g, '-')}-certificate.png` : undefined}
                          onClick={(e) => {
                            if (!activeSub.image) {
                              e.preventDefault();
                            }
                          }}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold transition-all ${activeSub.image
                              ? 'bg-neutral-800 hover:bg-neutral-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer hover:scale-105 active:scale-95 border border-white/10'
                              : 'bg-neutral-900/50 text-white/20 border border-white/5 cursor-not-allowed'
                            }`}
                          title={activeSub.image ? 'Download Certificate' : 'No certificate file available for download'}
                        >
                          <FaDownload size={14} />
                        </a>
                      </div>
                    </motion.div>
                  )
                })()
              ) : (
                <div className="flex-1 border border-dashed border-[var(--color-border)] flex items-center justify-center p-6 text-center" style={{ borderRadius: '14px', background: 'rgba(10,4,6,0.2)' }}>
                  <span className="font-mono text-[10px] tracking-widest text-[var(--color-fg)] opacity-50 uppercase leading-relaxed">
                    Select a credential<br />
                    to view detailed verification.
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Mobile Modal Overlay */}
      <AnimatePresence>
        {isMobile && modalOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0c0508] border border-white/10 p-6 rounded-2xl relative shadow-2xl overflow-y-auto max-h-[85vh] text-[var(--color-fg)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-base font-mono bg-transparent border-0 cursor-pointer z-40"
              >
                ✕
              </button>

              {(() => {
                const activeSub = selectedCert.certificates[activeSubIndex] || selectedCert.certificates[0]
                return (
                  <>
                    <div className="flex justify-between items-center mb-2 pr-6">
                      <span className="font-mono text-[9px] text-[var(--color-red)] tracking-[0.25em] block text-transform uppercase font-bold">
                        Credential Details
                      </span>
                      {selectedCert.certificates.length > 1 && (
                        <span className="font-mono text-[9px] text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          {activeSubIndex + 1} of {selectedCert.certificates.length}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-wide text-[16px] text-[var(--color-fg)] font-bold mb-4 leading-tight">
                      {activeSub.title}
                    </h3>

                    {/* Certificate image or layout */}
                    <div className="border border-[rgba(255,255,255,0.1)] p-2 font-mono text-center flex flex-col justify-center items-center relative mb-4 overflow-hidden rounded-lg bg-black/40 min-h-[220px]">
                      {activeSub.image ? (
                        <div className="w-full h-full flex items-center justify-center relative p-2">
                          <img
                            src={activeSub.image}
                            alt={activeSub.title}
                            className="w-full h-auto max-h-[200px] object-contain rounded border border-white/10"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col justify-between items-center p-4 relative overflow-hidden bg-gradient-to-br from-neutral-950/80 to-neutral-900/80 rounded border border-white/5 min-h-[200px] w-full">
                          {/* Ambient Glow */}
                          <div
                            className="absolute -top-20 -right-20 w-36 h-36 rounded-full blur-[60px] opacity-20 pointer-events-none"
                            style={{ backgroundColor: getBrandColor(selectedCert.id) }}
                          />
                          <div className="absolute inset-1.5 border border-white/5 rounded pointer-events-none" />

                          <div className="w-full flex justify-between items-center z-10">
                            <span className="font-mono text-[7px] text-white/40 tracking-[0.2em] uppercase">
                              Digital Credential
                            </span>
                            <div className="opacity-75 scale-75">
                              {getCertIcon(selectedCert.id)}
                            </div>
                          </div>

                          <div className="text-center my-2 z-10 px-1 flex flex-col items-center">
                            <span className="font-mono text-[6px] text-white/40 tracking-[0.25em] uppercase mb-1 block">
                              Certificate of Achievement
                            </span>
                            <div className="w-8 h-[1px] bg-white/10 mb-1.5" />
                            <h4 className="font-wide text-[10px] font-bold text-white tracking-wide mb-1.5">
                              Karri Phaneendra Ram Lokesh
                            </h4>
                            <h3
                              className="font-wide text-[9px] font-extrabold tracking-tight uppercase leading-snug max-w-[200px]"
                              style={{ color: getBrandColor(selectedCert.id) }}
                            >
                              {activeSub.title}
                            </h3>
                            <p className="font-body text-[8px] text-white/60 max-w-[190px] leading-relaxed mt-2 italic">
                              &ldquo;{activeSub.desc}&rdquo;
                            </p>
                          </div>

                          <div className="w-full pt-1.5 border-t border-white/5 grid grid-cols-2 gap-2 text-left text-[7px] font-mono z-10 opacity-70">
                            <div>
                              <span className="text-white/40 block text-[6px] uppercase tracking-wider mb-0.5">Issuer</span>
                              <span className="font-bold text-white/80">{selectedCert.issuer}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-white/40 block text-[6px] uppercase tracking-wider mb-0.5">Date Issued</span>
                              <span className="font-bold text-white/80">{activeSub.date}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Carousel Arrow Controls */}
                      {selectedCert.certificates.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={handlePrevSubCert}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/80 text-white border border-white/10 flex items-center justify-center hover:bg-[var(--color-red)] cursor-pointer"
                          >
                            ❮
                          </button>
                          <button
                            type="button"
                            onClick={handleNextSubCert}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/80 text-white border border-white/10 flex items-center justify-center hover:bg-[var(--color-red)] cursor-pointer"
                          >
                            ❯
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/70 px-2 py-0.5 rounded-full border border-white/5">
                            {selectedCert.certificates.map((_, idx) => (
                              <span
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveSubIndex(idx)
                                }}
                                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-200 ${idx === activeSubIndex ? 'bg-[var(--color-red)] scale-125' : 'bg-white/30'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-1 font-mono text-[9px] text-[var(--color-fg)] opacity-60 text-center uppercase tracking-wider">
                      Verification ID: {activeSub.verifyId}
                    </div>

                    <div className="mt-4 flex justify-center gap-4">
                      {activeSub.verifyUrl && (
                        <a
                          href={activeSub.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center bg-[var(--color-red)] rounded-lg text-white font-bold hover:scale-105 active:scale-95 transition-transform"
                          title="Verify Credential"
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                      <a
                        href={activeSub.image || '#'}
                        download={activeSub.image ? `${activeSub.title.toLowerCase().replace(/\s+/g, '-')}-certificate.png` : undefined}
                        onClick={(e) => {
                          if (!activeSub.image) e.preventDefault()
                        }}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold transition-transform ${activeSub.image ? 'bg-neutral-800 border border-white/10 hover:scale-105 active:scale-95' : 'bg-neutral-900/50 text-white/20 border border-white/5 cursor-not-allowed'}`}
                        title="Download Certificate"
                      >
                        <FaDownload size={14} />
                      </a>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
