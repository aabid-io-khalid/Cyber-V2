"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CRTEffect() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [flickerIntensity, setFlickerIntensity] = useState(0)

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setFlickerIntensity(Math.random() * 0.2)
        setTimeout(() => setFlickerIntensity(0), 100)
      }
    }, 500)

    return () => clearInterval(flickerInterval)
  }, [])

  // Toggle effect with keyboard shortcut (Alt+C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "c") {
        setIsEnabled((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isEnabled) return null

  return (
    <>
      {/* Scanlines effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50 bg-repeat"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          opacity: 0.15,
          mixBlendMode: "multiply",
        }}
      />

      {/* Screen curvature effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.5) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />

      {/* RGB split effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-neon-red/5"
        style={{
          mixBlendMode: "screen",
          transform: "translateX(-2px)",
          opacity: 0.5 + flickerIntensity,
        }}
      />

      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-neon-blue/5"
        style={{
          mixBlendMode: "screen",
          transform: "translateX(2px)",
          opacity: 0.5 + flickerIntensity,
        }}
      />

      {/* Flicker effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-white"
        style={{
          mixBlendMode: "overlay",
          opacity: flickerIntensity,
        }}
      />
    </>
  )
}
