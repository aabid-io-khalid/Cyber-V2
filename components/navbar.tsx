"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Shield, Cpu, Activity } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("home")
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "about", "projects", "services", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 3 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
        onMouseMove={handleMouseMove}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="#home"
            className="text-white text-2xl font-bold tracking-wider holographic-text relative"
            data-text="PRELOAD"
          >
            PRELOAD
            {/* Holographic badge */}
            <div className="absolute -top-1 -right-12 holographic-badge">
              <Shield className="w-3 h-3 mr-1 text-lime-400" />
              <span className="text-xs">SECURE</span>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-white text-sm uppercase tracking-wider hover:text-purple-400 transition-colors relative group ${
                      activeItem === item.href.substring(1) ? "text-lime-400" : ""
                    }`}
                  >
                    {item.name}

                    {/* Holographic underline effect */}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300 ${
                        activeItem === item.href.substring(1) ? "w-full" : ""
                      }`}
                    ></span>

                    {/* Active indicator */}
                    {activeItem === item.href.substring(1) && (
                      <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-lime-500 holographic-pulse"></span>
                    )}
                  </Link>
                </li>
              ))}

              {/* Holographic status indicator */}
              <li className="holographic-panel px-3 py-1 ml-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                <span className="text-lime-400 font-mono text-xs">ONLINE</span>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden text-white relative holographic-button p-2 rounded-md"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Holographic decorative elements */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-50"
          style={{
            background: `linear-gradient(to right, transparent, rgba(132, 204, 22, 0.5) ${hoverPosition.x}%, transparent)`,
          }}
        ></div>

        {/* Holographic corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-px bg-lime-500/50"></div>
          <div className="absolute top-0 left-0 w-px h-8 bg-lime-500/50"></div>
        </div>

        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-8 h-px bg-cyan-500/50"></div>
          <div className="absolute top-0 right-0 w-px h-8 bg-cyan-500/50"></div>
        </div>

        {/* Holographic data points */}
        <div className="absolute top-1/4 left-1/4 holographic-data-point"></div>
        <div className="absolute top-3/4 right-1/4 holographic-data-point"></div>
        <div className="absolute top-1/2 right-1/3 holographic-data-point"></div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 md:hidden holographic-ui"
          >
            <div className="flex flex-col h-full">
              <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link
                  href="#home"
                  className="text-white text-2xl font-bold tracking-wider holographic-text"
                  data-text="PRELOAD"
                >
                  PRELOAD
                </Link>
                <button
                  className="text-white holographic-button p-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <nav>
                  <ul className="flex flex-col space-y-8 items-center">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-white text-2xl uppercase tracking-wider hover:text-purple-400 transition-colors holographic-text relative group"
                          data-text={item.name}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}

                          {/* Holographic underline */}
                          <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Holographic decorative elements for mobile menu */}
              <div className="absolute bottom-10 left-10 flex items-center gap-3">
                <div className="holographic-badge px-3 py-1">
                  <Cpu className="w-3 h-3 mr-1 text-cyan-400" />
                  <span className="text-xs">SYSTEM</span>
                </div>
                <div className="holographic-badge px-3 py-1">
                  <Activity className="w-3 h-3 mr-1 text-purple-400" />
                  <span className="text-xs">ACTIVE</span>
                </div>
              </div>

              {/* Holographic corner elements */}
              <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-16 h-px bg-purple-500/50"></div>
                <div className="absolute bottom-0 right-0 w-px h-16 bg-purple-500/50"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
