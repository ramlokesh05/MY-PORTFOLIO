import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

export default function About() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.5em] text-noir-red">01</span>
            <h2 className="font-serif text-3xl md:text-5xl text-noir-white">About Me</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-noir-gray to-transparent ml-4" />
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Profile Image */}
          <SectionReveal variant="fadeLeft" className="md:col-span-2">
            <div className="relative group cursor-hover">
              <div className="relative overflow-hidden border border-noir-gray">
                {/* Profile image with noir styling -> color on hover */}
                <div className="aspect-[3/4] bg-noir-mid flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/profile.jpg" 
                    alt="Ram Lokesh"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 filter grayscale contrast-125 sepia-[.20] hue-rotate-[-30deg] group-hover:grayscale-0 group-hover:sepia-0 group-hover:hue-rotate-0 group-hover:contrast-100"
                  />
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>

                {/* Red glow on hover */}
                <div className="absolute inset-0 bg-noir-red/0 group-hover:bg-noir-red/10 transition-all duration-500 mix-blend-color" />
                <div className="absolute inset-0 border border-transparent group-hover:border-noir-red/40 transition-all duration-500 group-hover:shadow-[inset_0_0_40px_rgba(255,43,43,0.15)]" />

                {/* Corner markers */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-noir-gray/40 group-hover:border-noir-red/60 transition-colors" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-noir-gray/40 group-hover:border-noir-red/60 transition-colors" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-noir-gray/40 group-hover:border-noir-red/60 transition-colors" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-noir-gray/40 group-hover:border-noir-red/60 transition-colors" />
              </div>

              {/* Label */}
              <div className="mt-3 font-mono text-[9px] tracking-[0.3em] text-noir-muted text-center">
                SUBJECT: RAM LOKESH // ENGINEER
              </div>
            </div>
          </SectionReveal>

          {/* Bio Content */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Timeline snippet (Moved to top) */}
            <SectionReveal variant="fadeRight" delay={0.2}>
              <div className="glass p-6 paper-texture hover:border-noir-red/20 transition-colors duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-emerald-500">
                    CURRENT STATUS
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-noir-white text-sm font-medium">Open to Opportunities</p>
                    <p className="font-mono text-[10px] text-noir-muted tracking-wider">
                      Cloud Engineer / DevOps / SRE Roles
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal variant="fadeRight" delay={0.4}>
              <div className="glass p-6 paper-texture hover:border-noir-red/20 transition-colors duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-noir-red/60" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-noir-red">
                    PROFILE SUMMARY
                  </span>
                </div>
                <p className="text-noir-text leading-relaxed text-sm mb-4">
                  I am a Computer Science Engineer specializing in Cloud Engineering and DevOps,
                  with hands-on experience designing, deploying, and managing cloud-native applications
                  and infrastructure at scale.
                </p>
                <p className="text-noir-text leading-relaxed text-sm">
                  My expertise spans across AWS, Azure, and GCP platforms, with deep knowledge in
                  containerization, orchestration, infrastructure as code, and CI/CD pipeline design.
                  I am passionate about building systems that are resilient, scalable, and automated.
                </p>
              </div>
            </SectionReveal>

            {/* Quick stats */}
            <SectionReveal variant="fadeRight" delay={0.6}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: '3', label: 'MONTHS EXP' },
                  { val: '3', label: 'PROJECTS' },
                  { val: '10', label: 'CERTIFICATIONS' },
                  { val: '2027', label: 'GRADUATION' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="glass p-4 text-center cursor-hover group hover:border-noir-red/20 transition-colors duration-500"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,43,43,0.15)' }}
                  >
                    <div className="font-serif text-2xl text-noir-white group-hover:text-noir-red transition-colors">
                      {stat.val}
                    </div>
                    <div className="font-mono text-[8px] tracking-[0.2em] text-noir-muted mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>


          </div>
        </div>
      </div>
    </section>
  )
}
