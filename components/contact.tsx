"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, AlertTriangle, Shield, Lock, Eye, Cpu, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { event } from "@/lib/analytics"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [securityLevel, setSecurityLevel] = useState("SCANNING")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0.5, y: 0.5 })
  const [holographicElements, setHolographicElements] = useState<
    Array<{ x: number; y: number; size: number; color: string }>
  >([])

  useState(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setSecurityLevel("VERIFYING")

    setTimeout(() => {
      setSecurityLevel("AUTHORIZED")
      setFormSubmitted(true)

      event({
        action: "contact_form_submit",
        category: "Form",
      })
    }, 1500)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <section id="contact" className="relative py-24 cyberpunk-bg" onMouseMove={handleMouseMove}>
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 via-black to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(132,204,22,0.15),transparent_70%)]" />

        {/* Dystopian elements */}
        <div className="absolute inset-0 dystopian-overlay opacity-10" />
        <div className="absolute inset-0 surveillance-grid opacity-5" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-20" />

        {/* Animated glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-lime-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-red-500/10 blur-3xl animate-pulse-slow-delay" />

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
              data-text="SECURE TRANSMISSION"
            >
              SECURE TRANSMISSION
            </h2>
          </div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-4 text-white cyberpunk-heading terminal-text holographic-text"
            data-text="// CONTACT UPLINK"
          >
            <span className="text-red-500">&#47;&#47;</span> CONTACT UPLINK
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 via-yellow-500 to-red-500 mx-auto rounded-full glow-bar" />

          {/* Security clearance badge */}
          <div className="mt-6 inline-block px-4 py-2 border border-lime-500/30 bg-black/30 rounded-md holographic-ui">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-lime-500 animate-pulse"></div>
              <span className="text-lime-400 font-mono text-sm">TRANSMISSION ENCRYPTED</span>
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

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <motion.div
              className="flex items-start gap-4 holographic-card p-4"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              style={
                {
                  "--x": `${hoverPosition.x * 100}%`,
                  "--y": `${hoverPosition.y * 100}%`,
                } as React.CSSProperties
              }
            >
              <div className="bg-lime-900/30 p-3 rounded-full text-lime-400 border border-lime-500/30 cyberpunk-button">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white holographic-text" data-text="Location">
                  Location
                </h4>
                <p className="text-gray-300">Sector 7G, Neo-Tokyo District</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4 holographic-card p-4"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              style={
                {
                  "--x": `${hoverPosition.x * 100}%`,
                  "--y": `${hoverPosition.y * 100}%`,
                } as React.CSSProperties
              }
            >
              <div className="bg-red-900/30 p-3 rounded-full text-red-400 border border-red-500/30 cyberpunk-button">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white holographic-text" data-text="Secure Email">
                  Secure Email
                </h4>
                <p className="text-gray-300">encrypted@neocorp.net</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4 holographic-card p-4"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              style={
                {
                  "--x": `${hoverPosition.x * 100}%`,
                  "--y": `${hoverPosition.y * 100}%`,
                } as React.CSSProperties
              }
            >
              <div className="bg-amber-900/30 p-3 rounded-full text-amber-400 border border-amber-500/30 cyberpunk-button">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white holographic-text" data-text="Encrypted Line">
                  Encrypted Line
                </h4>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </motion.div>

            {/* Security warning */}
            <div className="mt-8 p-4 border border-red-500/30 bg-black/30 rounded-md holographic-ui">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-red-400 font-bold mb-1 holographic-text" data-text="SECURITY NOTICE">
                    SECURITY NOTICE
                  </h4>
                  <p className="text-gray-300 text-sm">
                    All communications are monitored and recorded for security purposes. Unauthorized access will be
                    prosecuted.
                  </p>
                </div>
              </div>

              {/* Holographic decorative elements */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 right-0 w-4 h-px bg-red-500/50"></div>
                <div className="absolute top-0 right-0 w-px h-4 bg-red-500/50"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-4 h-px bg-red-500/50"></div>
                <div className="absolute bottom-0 left-0 w-px h-4 bg-red-500/50"></div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 bg-black/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm cyberpunk-card holographic-ui"
            onSubmit={handleSubmit}
            style={
              {
                "--x": `${hoverPosition.x * 100}%`,
                "--y": `${hoverPosition.y * 100}%`,
              } as React.CSSProperties
            }
          >
            {!formSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Lock className="text-lime-500 w-4 h-4" />
                    <span className="text-lime-400 font-mono text-sm">SECURE FORM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        securityLevel === "SCANNING"
                          ? "bg-yellow-500 animate-pulse"
                          : securityLevel === "VERIFYING"
                            ? "bg-orange-500 animate-pulse-fast"
                            : "bg-lime-500"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-mono ${
                        securityLevel === "SCANNING"
                          ? "text-yellow-400"
                          : securityLevel === "VERIFYING"
                            ? "text-orange-400"
                            : "text-lime-400"
                      }`}
                    >
                      {securityLevel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Your Identity
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="bg-black/50 border-gray-700 text-white focus:border-lime-500 focus:ring-lime-500 holographic-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Secure Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-black/50 border-gray-700 text-white focus:border-lime-500 focus:ring-lime-500 holographic-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Transmission Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    className="bg-black/50 border-gray-700 text-white focus:border-lime-500 focus:ring-lime-500 holographic-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Encrypted Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message..."
                    className="min-h-[150px] bg-black/50 border-gray-700 text-white focus:border-lime-500 focus:ring-lime-500 holographic-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white px-8 py-6 h-auto rounded-full cyberpunk-button-active relative overflow-hidden group holographic-button"
                  data-cursor="pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Send Secure Message</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-white/20 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>

                  {/* Holographic button effects */}
                  <span className="absolute inset-0 holographic-shimmer"></span>

                  {/* Holographic data points */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute w-1 h-1 bg-lime-500 rounded-full opacity-0 group-hover:opacity-70"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        boxShadow: "0 0 5px rgba(132, 204, 22, 0.7)",
                        transition: `transform 0.5s ease-out ${i * 0.1}s, opacity 0.3s ease-in-out`,
                        transform: "scale(0)",
                      }}
                    />
                  ))}
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-lime-900/30 rounded-full flex items-center justify-center border border-lime-500/50 mb-6 holographic-glow">
                  <Shield className="text-lime-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 holographic-text" data-text="Transmission Received">
                  Transmission Received
                </h3>
                <p className="text-gray-300 mb-6">
                  Your message has been securely transmitted. Expect a response within 48 hours.
                </p>
                <div className="p-3 bg-black/50 border border-lime-500/20 rounded-md inline-block holographic-ui">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                    <span className="text-lime-400 font-mono text-xs">ENCRYPTION VERIFIED</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Holographic decorative elements */}
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
              <div className="absolute top-0 right-0 w-6 h-px bg-cyan-500/50"></div>
              <div className="absolute top-0 right-0 w-px h-6 bg-cyan-500/50"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-6 h-px bg-lime-500/50"></div>
              <div className="absolute bottom-0 left-0 w-px h-6 bg-lime-500/50"></div>
            </div>

            {/* Holographic data points */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute holographic-data-point"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
