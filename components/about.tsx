"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Shield, Terminal, Code, Cpu, Database, Eye, AlertTriangle, Lock } from "lucide-react"
import { event } from "@/lib/analytics"

export default function About() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("profile")
  const [scanLines, setScanLines] = useState<number[]>([])
  const [securityLevel, setSecurityLevel] = useState("CLASSIFIED")
  const [isGlitching, setIsGlitching] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])

  useEffect(() => {
    const lines = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
    setScanLines(lines)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    if (showTerminal) {
      const initialLines = [
        "NEOCORP PERSONNEL DATABASE",
        "SECURITY LEVEL: ALPHA",
        "ACCESSING CLASSIFIED RECORDS...",
        "",
      ]
      setTerminalLines(initialLines)

      const bioData = [
        "SUBJECT: COMMANDER",
        "STATUS: ACTIVE",
        "SPECIALIZATION: ADVANCED DESIGN SYSTEMS",
        "NEURAL IMPLANTS: CLASS-5 CERTIFIED",
        "CLEARANCE: MAXIMUM",
        "",
        "BACKGROUND:",
        "Former lead designer for MegaTech Industries.",
        "Specialized in neural interface design and toxic-resistant UI systems.",
        "Developed proprietary encryption for visual data transmission.",
        "10+ years experience in dystopian visualization frameworks.",
        "",
        "SKILLS:",
        "- Neural Interface Design",
        "- Toxic-Resistant UI Systems",
        "- Encryption Algorithms",
        "- Holographic Projection",
        "- Quantum Rendering",
        "",
        "WARNING: FURTHER ACCESS REQUIRES LEVEL-6 AUTHORIZATION",
      ]

      let index = 0
      const typeInterval = setInterval(() => {
        if (index < bioData.length) {
          setTerminalLines((prev) => [...prev, bioData[index]])
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 100)

      return () => clearInterval(typeInterval)
    }
  }, [showTerminal])

  useEffect(() => {
    if (terminalRef.current && showTerminal) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines, showTerminal])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)

    event({
      action: "about_tab_change",
      category: "Navigation",
      label: tab,
    })

    if (tab === "terminal") {
      setShowTerminal(true)
    } else {
      setShowTerminal(false)
    }
  }

  return (
    <section id="about" ref={containerRef} className="relative py-32 overflow-hidden cyberpunk-bg">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 via-black to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(132,204,22,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Grid lines with parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 grid-lines opacity-20" />

        {/* Animated circuit patterns with parallax */}
        <motion.div style={{ y: y2 }} className="absolute inset-0 circuit-pattern opacity-10" />

        {/* Digital rain effect */}
        <div className="absolute inset-0 digital-rain opacity-5" />

        {/* Animated glow orbs with parallax */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-lime-500/10 blur-3xl animate-pulse-slow"
        />
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-red-500/10 blur-3xl animate-pulse-slow-delay"
        />

        {/* Binary code overlay */}
        <div className="absolute inset-0 binary-code-overlay opacity-5"></div>

        {/* Surveillance cameras */}
        <div className="absolute top-10 right-10 surveillance-camera">
          <Eye className="text-red-500 w-6 h-6 animate-pulse" />
          <div className="camera-ray"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="glitch-container">
            <h2
              className="text-sm font-medium text-lime-400 mb-2 tracking-widest neon-text-toxic glitch-text"
              data-text="CLASSIFIED PERSONNEL FILE"
            >
              CLASSIFIED PERSONNEL FILE
            </h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-white cyberpunk-heading terminal-text">
            <span className="text-red-500">&#47;&#47;</span> SUBJECT PROFILE
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 via-yellow-500 to-red-500 mx-auto rounded-full glow-bar" />

          {/* Security clearance badge */}
          <div className="mt-6 inline-block px-4 py-2 border border-lime-500/30 bg-black/30 rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-lime-500 animate-pulse"></div>
              <span className="text-lime-400 font-mono text-sm">SECURITY CLEARANCE: LEVEL 5</span>
            </div>
          </div>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Profile image and stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Profile image with effects */}
              <div
                className={`relative aspect-square overflow-hidden rounded-2xl cyberpunk-card ${isGlitching ? "glitch-effect" : ""}`}
              >
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Designer portrait"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />

                {/* Scan overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 cyberpunk-scanlines opacity-20" />

                {/* Scan lines */}
                {scanLines.map((pos, i) => (
                  <div key={i} className="absolute left-0 right-0 h-px bg-lime-500/20" style={{ top: `${pos}%` }}></div>
                ))}

                {/* Security classification */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-900/50 border border-red-500/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-red-500" />
                    <span className="text-red-400 font-mono text-xs">{securityLevel}</span>
                  </div>
                </div>

                {/* Biometric data points */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-lime-500 rounded-full pulse-point"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-lime-500 rounded-full pulse-point"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-lime-500 rounded-full pulse-point"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-lime-500 rounded-full pulse-point"></div>

                {/* Warning overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/50 rounded-md border border-yellow-500/30">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  <span className="text-yellow-400 font-mono text-xs">BIOMETRIC SCAN ACTIVE</span>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-lime-500/30 cyberpunk-card">
                <div className="text-4xl font-bold cyberpunk-text">10+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>

            {/* Additional stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-lime-500/20 cyberpunk-card"
              >
                <div className="text-4xl font-bold cyberpunk-text-gradient-toxic">85+</div>
                <div className="text-gray-300">Satisfied Clients</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-red-500/20 cyberpunk-card"
              >
                <div className="text-4xl font-bold cyberpunk-text-gradient-warning">190+</div>
                <div className="text-gray-300">Completed Projects</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Tabs and content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Tab navigation */}
            <div className="flex border-b border-lime-500/20">
              <button
                onClick={() => handleTabChange("profile")}
                className={`px-4 py-2 font-mono text-sm ${
                  activeTab === "profile"
                    ? "text-lime-400 border-b-2 border-lime-500"
                    : "text-gray-400 hover:text-lime-400"
                }`}
              >
                PROFILE
              </button>
              <button
                onClick={() => handleTabChange("skills")}
                className={`px-4 py-2 font-mono text-sm ${
                  activeTab === "skills"
                    ? "text-lime-400 border-b-2 border-lime-500"
                    : "text-gray-400 hover:text-lime-400"
                }`}
              >
                SKILLS
              </button>
              <button
                onClick={() => handleTabChange("terminal")}
                className={`px-4 py-2 font-mono text-sm ${
                  activeTab === "terminal"
                    ? "text-lime-400 border-b-2 border-lime-500"
                    : "text-gray-400 hover:text-lime-400"
                }`}
              >
                TERMINAL
              </button>
            </div>

            {/* Tab content */}
            <div className="min-h-[400px]">
              {/* Profile tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-lime-500/20">
                    <h4 className="text-2xl font-bold text-white mb-4 cyberpunk-heading">
                      Creative Designer Based in Neo-Tokyo
                    </h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      I'm passionate about creating beautiful, functional designs that make an impact in our dystopian
                      world. With over 10 years of experience in the industry, I've worked with clients from various
                      sectors to bring their visions to life despite increasing corporate surveillance and environmental
                      challenges.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      My approach combines creativity with strategic thinking, ensuring that every design not only looks
                      great but also achieves its intended purpose while maintaining security clearance. I believe in
                      the power of design to transform businesses and create meaningful connections with audiences in an
                      increasingly disconnected society.
                    </p>

                    {/* Security warning */}
                    <div className="mt-6 p-3 bg-black/50 border border-red-500/20 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-red-400 font-mono text-sm">
                            WARNING: This profile contains classified information. Unauthorized access is punishable by
                            neural recalibration.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-lime-500/20">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-lime-500" />
                      <span>Credentials & Clearance</span>
                    </h4>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-300">Neural Interface Design</span>
                        <span className="text-lime-400 font-mono">LEVEL 5</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-300">Quantum Rendering</span>
                        <span className="text-lime-400 font-mono">LEVEL 4</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-300">Holographic Projection</span>
                        <span className="text-lime-400 font-mono">LEVEL 5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Encryption Algorithms</span>
                        <span className="text-red-400 font-mono">CLASSIFIED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills tab */}
              {activeTab === "skills" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-lime-500/20">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-lime-500" />
                      <span>Technical Proficiencies</span>
                    </h4>

                    {/* Skill bars */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Neural Interface Design</span>
                          <span className="text-lime-400">95%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-lime-500 to-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quantum Rendering</span>
                          <span className="text-lime-400">85%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Holographic Projection</span>
                          <span className="text-lime-400">90%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Encryption Algorithms</span>
                          <span className="text-lime-400">98%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-lime-500/20">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Code className="w-5 h-5 text-lime-500" />
                      <span>Technologies</span>
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {[
                        "React",
                        "Next.js",
                        "Three.js",
                        "WebGL",
                        "GLSL",
                        "TailwindCSS",
                        "Framer Motion",
                        "TypeScript",
                        "Node.js",
                        "WebRTC",
                        "Neural API",
                        "Quantum DB",
                      ].map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="px-3 py-2 bg-black/50 text-lime-400 rounded-md border border-lime-500/20 font-mono text-sm"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Terminal tab */}
              {activeTab === "terminal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="bg-black/70 backdrop-blur-sm p-4 rounded-xl border border-lime-500/20">
                    <div className="flex items-center justify-between mb-2 border-b border-gray-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-lime-500" />
                        <span className="text-lime-400 font-mono text-sm">NEOCORP TERMINAL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                      </div>
                    </div>

                    <div
                      ref={terminalRef}
                      className="font-mono text-xs text-green-400 h-80 overflow-y-auto terminal-text"
                    >
                      {terminalLines.map((line, i) => (
                        <div key={i} className={line && line.startsWith("WARNING") ? "text-yellow-400" : ""}>
                          {line || " "}
                        </div>
                      ))}
                      <div className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Access warning */}
                  <div className="p-3 bg-black/50 border border-red-500/20 rounded-md">
                    <div className="flex items-start gap-2">
                      <Database className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-red-400 font-mono text-sm">
                          NOTICE: Terminal access is being logged and monitored. Unauthorized commands will trigger
                          security protocols.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
