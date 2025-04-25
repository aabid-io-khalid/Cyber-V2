"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Palette, Shield, Cpu, Zap, AlertTriangle, Eye, Database } from "lucide-react"
import { event } from "@/lib/analytics"

const services = [
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Neural Interface Design",
    description:
      "Create immersive neural interfaces that seamlessly connect users with digital environments while maintaining strict security protocols.",
    color: "from-lime-500 to-green-500",
    securityLevel: "LEVEL 3",
    warning: "Neural compliance required",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Secure Authentication",
    description:
      "Implement biometric and neural authentication systems that protect digital assets from unauthorized access and corporate espionage.",
    color: "from-red-500 to-amber-500",
    securityLevel: "LEVEL 5",
    warning: "Classified protocols",
  },
  {
    icon: <Cpu className="w-10 h-10" />,
    title: "Quantum Rendering",
    description:
      "Leverage quantum computing to create real-time rendering solutions that push the boundaries of visual fidelity in toxic environments.",
    color: "from-cyan-500 to-blue-500",
    securityLevel: "LEVEL 4",
    warning: "Quantum clearance needed",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Dystopian UI Systems",
    description:
      "Design toxic-resistant user interfaces that function in harsh environmental conditions while maintaining critical information hierarchy.",
    color: "from-purple-500 to-pink-500",
    securityLevel: "LEVEL 3",
    warning: "Environmental hazard",
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0.5, y: 0.5 })
  const [holographicElements, setHolographicElements] = useState<
    Array<{ x: number; y: number; size: number; color: string }>
  >([])

  useEffect(() => {
    const elements = Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: getRandomColor(),
    }))

    setHolographicElements(elements)

    function getRandomColor() {
      const colors = [
        "rgba(132, 204, 22, 0.7)", // lime
        "rgba(6, 182, 212, 0.7)", // cyan
        "rgba(139, 92, 246, 0.7)", // purple
        "rgba(236, 72, 153, 0.7)", // pink
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }, [])

  const handleServiceHover = (index: number | null) => {
    setHoveredService(index)

    if (index !== null) {
      event({
        action: "service_hover",
        category: "User Interaction",
        label: services[index].title,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <section id="services" className="relative py-32 overflow-hidden cyberpunk-bg" onMouseMove={handleMouseMove}>
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 via-black to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(132,204,22,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-20" />

        {/* Animated circuit patterns */}
        <div className="absolute inset-0 circuit-pattern opacity-10" />

        {/* Digital rain effect */}
        <div className="absolute inset-0 digital-rain opacity-5" />

        {/* Dystopian elements */}
        <div className="absolute inset-0 dystopian-overlay opacity-10" />
        <div className="absolute inset-0 surveillance-grid opacity-5" />

        {/* Holographic elements */}
        {holographicElements.map((element, index) => (
          <div
            key={index}
            className="absolute rounded-full holographic-pulse"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              top: `${element.y}%`,
              left: `${element.x}%`,
              backgroundColor: element.color,
              boxShadow: `0 0 10px ${element.color}`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}

        {/* Holographic data lines */}
        {holographicElements.slice(0, 5).map((element, index) => {
          const nextElement = holographicElements[(index + 1) % holographicElements.length]
          const angle = Math.atan2(nextElement.y - element.y, nextElement.x - element.x)
          const distance = Math.sqrt(Math.pow(nextElement.x - element.x, 2) + Math.pow(nextElement.y - element.y, 2))

          return (
            <div
              key={`line-${index}`}
              className="absolute holographic-data-line"
              style={{
                top: `${element.y}%`,
                left: `${element.x}%`,
                width: `${distance}%`,
                transform: `rotate(${angle}rad)`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${index * 0.3}s`,
              }}
            />
          )
        })}

        {/* Animated glow orbs */}
        <div className="absolute top-3/4 left-1/4 w-32 h-32 rounded-full bg-lime-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-3/4 right-1/4 w-40 h-40 rounded-full bg-red-500/10 blur-3xl animate-pulse-slow-delay" />

        {/* Binary code overlay */}
        <div className="absolute inset-0 binary-code-overlay opacity-5"></div>

        {/* Surveillance cameras */}
        <div className="absolute top-10 right-10 surveillance-camera">
          <Eye className="text-red-500 w-6 h-6 animate-pulse" />
          <div className="camera-ray"></div>
        </div>

        {/* Holographic tech icons */}
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <Cpu className="w-16 h-16 text-cyan-500 holographic-rotate" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-20">
          <Database className="w-16 h-16 text-purple-500 holographic-rotate" />
        </div>
        <div className="absolute top-2/3 left-1/3 opacity-20">
          <Shield className="w-12 h-12 text-lime-500 holographic-rotate" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-20">
          <Zap className="w-12 h-12 text-pink-500 holographic-rotate" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glitch-container">
            <h2
              className="text-sm font-medium text-lime-400 mb-2 tracking-widest neon-text-toxic glitch-text holographic-text"
              data-text="CLASSIFIED SERVICES"
            >
              CLASSIFIED SERVICES
            </h2>
          </div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-4 text-white cyberpunk-heading terminal-text holographic-text"
            data-text="// OPERATIONAL CAPABILITIES"
          >
            <span className="text-red-500">&#47;&#47;</span> OPERATIONAL CAPABILITIES
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 via-yellow-500 to-red-500 mx-auto rounded-full glow-bar" />
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Specialized services designed for the dystopian landscape of modern design. Each service comes with
            appropriate security clearance requirements.
          </p>

          {/* Security clearance badge */}
          <div className="mt-6 inline-block px-4 py-2 border border-lime-500/30 bg-black/30 rounded-md holographic-ui">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-lime-500 animate-pulse"></div>
              <span className="text-lime-400 font-mono text-sm">AUTHORIZED SERVICES ONLY</span>
            </div>

            {/* Holographic decorative elements */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 right-0 w-4 h-px bg-cyan-500/50"></div>
              <div className="absolute top-0 right-0 w-px h-4 bg-cyan-500/50"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-4 h-px bg-lime-500/50"></div>
              <div className="absolute bottom-0 left-0 w-px h-4 bg-lime-500/50"></div>
            </div>
          </div>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 0 20px rgba(132, 204, 22, 0.3), 0 0 30px rgba(239, 68, 68, 0.2)",
              }}
              onMouseEnter={() => handleServiceHover(index)}
              onMouseLeave={() => handleServiceHover(null)}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-lime-500/50 cyberpunk-card holographic-ui relative overflow-hidden group"
              style={
                {
                  "--x": `${hoverPosition.x * 100}%`,
                  "--y": `${hoverPosition.y * 100}%`,
                } as React.CSSProperties
              }
            >
              {/* Service content */}
              <div
                className={`text-gradient-${service.color} mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-white holographic-text" data-text={service.title}>
                {service.title}
              </h4>
              <p className="text-gray-400">{service.description}</p>

              {/* Security level badge */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 border border-lime-500/30 rounded-sm holographic-badge">
                <span className="text-lime-400 font-mono text-xs">{service.securityLevel}</span>
              </div>

              {/* Warning label */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 border border-red-500/30 rounded-sm holographic-badge">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-red-400 font-mono text-xs">{service.warning}</span>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/0 group-hover:from-lime-900/10 group-hover:via-black/0 group-hover:to-red-900/10 transition-all duration-500"></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-lime-500/0 group-hover:border-lime-500/30 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-red-500/0 group-hover:border-red-500/30 transition-all duration-300"></div>

              {/* Scan line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px bg-lime-500/0 group-hover:bg-lime-500/30 transition-all duration-300"
                style={{
                  transform: hoveredService === index ? "translateY(100vh)" : "translateY(0)",
                  transition: "transform 2s linear",
                }}
              ></div>

              {/* Holographic data points */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute holographic-data-point opacity-0 group-hover:opacity-100"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                />
              ))}

              {/* Holographic shimmer effect */}
              <div className="absolute inset-0 holographic-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
