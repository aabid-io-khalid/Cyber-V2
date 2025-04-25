"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GlitchTransitionProps {
  isActive: boolean
}

export default function GlitchTransition({ isActive }: GlitchTransitionProps) {
  const [lines, setLines] = useState<number[]>([])

  useEffect(() => {
    if (isActive) {
      const newLines = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
      setLines(newLines)

      // Play glitch sound
      const audio = new Audio("/sounds/glitch.mp3")
      audio.volume = 0.2
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [isActive])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Horizontal glitch lines */}
          {lines.map((pos, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-neon-blue/80"
              style={{ top: `${pos}%` }}
              initial={{ scaleX: 0, x: "-100%" }}
              animate={{
                scaleX: [0, 1, 1, 0],
                x: ["-100%", "0%", "0%", "100%"],
              }}
              transition={{
                duration: 0.4,
                times: [0, 0.2, 0.8, 1],
                delay: i * 0.02,
              }}
            />
          ))}

          {/* RGB split effect */}
          <motion.div
            className="absolute inset-0 bg-neon-red/10"
            initial={{ x: 0 }}
            animate={{ x: [-5, 5, -2, 0] }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-0 bg-neon-blue/10"
            initial={{ x: 0 }}
            animate={{ x: [5, -5, 2, 0] }}
            transition={{ duration: 0.5 }}
          />

          {/* Noise overlay */}
          <motion.div
            className="absolute inset-0 digital-noise"
            style={{ opacity: 0.3, mixBlendMode: "overlay" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
