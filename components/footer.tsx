"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Instagram,
  Twitter,
  Dribbble,
  Linkedin,
  Shield,
  AlertTriangle,
  Terminal,
  Eye,
  Cpu,
  Database,
  Zap,
} from "lucide-react"
import { event } from "@/lib/analytics"

export default function Footer() {
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

  const handleSocialClick = (platform: string) => {
    event({
      action: "social_link_click",
      category: "Navigation",
      label: platform,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <footer className="relative bg-gray-900 text-white py-16 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 via-black to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(132,204,22,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent" />

        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-10" />

        {/* Circuit pattern */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />

        {/* Binary code overlay */}
        <div className="absolute inset-0 binary-code-overlay opacity-5"></div>

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
        <div className="absolute bottom-10 right-10 surveillance-camera">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl font-bold mb-4 cyberpunk-heading terminal-text holographic-text"
                data-text="// NEOCORP"
              >
                <span className="text-red-500">&#47;&#47;</span> NEOCORP
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Advanced design solutions for the dystopian landscape. Specialized in neural interfaces, quantum
                rendering, and toxic-resistant UI systems for the modern corporate wasteland.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="bg-black/50 p-2 rounded-full hover:bg-lime-900/50 transition-colors border border-lime-500/20 group holographic-button"
                  data-cursor="pointer"
                  onClick={() => handleSocialClick("instagram")}
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                </Link>
                <Link
                  href="#"
                  className="bg-black/50 p-2 rounded-full hover:bg-lime-900/50 transition-colors border border-lime-500/20 group holographic-button"
                  data-cursor="pointer"
                  onClick={() => handleSocialClick("twitter")}
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                </Link>
                <Link
                  href="#"
                  className="bg-black/50 p-2 rounded-full hover:bg-lime-900/50 transition-colors border border-lime-500/20 group holographic-button"
                  data-cursor="pointer"
                  onClick={() => handleSocialClick("dribbble")}
                >
                  <Dribbble className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                </Link>
                <Link
                  href="#"
                  className="bg-black/50 p-2 rounded-full hover:bg-lime-900/50 transition-colors border border-lime-500/20 group holographic-button"
                  data-cursor="pointer"
                  onClick={() => handleSocialClick("linkedin")}
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-lime-400 transition-colors" />
                </Link>
              </div>

              {/* Security notice */}
              <div className="mt-8 p-3 bg-black/50 border border-red-500/20 rounded-md holographic-ui">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-red-400 font-mono text-xs">
                      SECURITY NOTICE: All communications are monitored and recorded. Unauthorized access will trigger
                      neural recalibration protocols.
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 holographic-text" data-text="Navigation">
              <Terminal className="w-4 h-4 text-lime-500" />
              <span>Navigation</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#home"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  data-cursor="pointer"
                >
                  <span className="w-1 h-1 bg-lime-500/50 group-hover:w-2 transition-all"></span>
                  <span className="group-hover:holographic-text" data-text="Home">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  data-cursor="pointer"
                >
                  <span className="w-1 h-1 bg-lime-500/50 group-hover:w-2 transition-all"></span>
                  <span className="group-hover:holographic-text" data-text="About">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  data-cursor="pointer"
                >
                  <span className="w-1 h-1 bg-lime-500/50 group-hover:w-2 transition-all"></span>
                  <span className="group-hover:holographic-text" data-text="Projects">
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  data-cursor="pointer"
                >
                  <span className="w-1 h-1 bg-lime-500/50 group-hover:w-2 transition-all"></span>
                  <span className="group-hover:holographic-text" data-text="Services">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  data-cursor="pointer"
                >
                  <span className="w-1 h-1 bg-lime-500/50 group-hover:w-2 transition-all"></span>
                  <span className="group-hover:holographic-text" data-text="Contact">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 holographic-text" data-text="Secure Contact">
              <Shield className="w-4 h-4 text-lime-500" />
              <span>Secure Contact</span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-lime-500/50 mt-2"></span>
                <span>Sector 7G, Neo-Tokyo District</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-lime-500/50 mt-2"></span>
                <span>encrypted@neocorp.net</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-lime-500/50 mt-2"></span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-red-500/50 mt-2"></span>
                <span className="text-red-400 font-mono text-xs">SECURE CHANNEL ONLY</span>
              </li>
            </ul>

            {/* Access terminal */}
            <div className="mt-4 p-3 bg-black/50 border border-lime-500/20 rounded-md holographic-ui">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                <span className="text-lime-400 font-mono text-xs">TERMINAL ACCESS: GRANTED</span>
              </div>

              {/* Holographic decorative elements */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 right-0 w-4 h-px bg-lime-500/50"></div>
                <div className="absolute top-0 right-0 w-px h-4 bg-lime-500/50"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-4 h-px bg-lime-500/50"></div>
                <div className="absolute bottom-0 left-0 w-px h-4 bg-lime-500/50"></div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-gray-500 font-mono text-sm holographic-text"
              data-text={`© ${new Date().getFullYear()} NEOCORP. All rights reserved.`}
            >
              © {new Date().getFullYear()} NEOCORP. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-lime-400 text-xs holographic-badge">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-lime-400 text-xs holographic-badge">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-lime-400 text-xs holographic-badge">
                Security
              </Link>
            </div>
          </div>

          {/* Binary code footer */}
          <div className="mt-4 overflow-hidden h-4">
            <div className="binary-scroll font-mono text-[8px] text-lime-500/30">
              01001110 01000101 01001111 01000011 01001111 01010010 01010000 00100000 01010011 01000101 01000011
              01010101 01010010 01000101 00100000 01010011 01011001 01010011 01010100 01000101 01001101 01010011
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
