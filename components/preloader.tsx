"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [glitchIntensity, setGlitchIntensity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchIntensity(Math.random())
        setTimeout(() => setGlitchIntensity(0), 200)
      }
    }, 300)

    const timer = setTimeout(() => {
      setLoading(false)
      clearInterval(glitchInterval)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${loading ? "" : "pointer-events-none"}`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />

            {/* Glitch effect on circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#ff00ff"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{
                opacity: glitchIntensity * 0.7,
                transform: `translate(${glitchIntensity * 4}px, 0)`,
              }}
            />

            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#00ffff"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{
                opacity: glitchIntensity * 0.7,
                transform: `translate(${-glitchIntensity * 4}px, 0)`,
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-white text-xl font-mono tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                textShadow: `
                  ${glitchIntensity > 0.5 ? "2px 0 #ff00ff" : "0 0 transparent"}, 
                  ${glitchIntensity > 0.5 ? "-2px 0 #00ffff" : "0 0 transparent"}
                `,
              }}
            >
              {progress}%
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-8 text-white text-2xl font-bold tracking-widest glitch-text"
          data-text="PRELOAD"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          PRELOAD
        </motion.div>

        <motion.div
          className="mt-4 text-gray-500 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          INITIALIZING SYSTEM...
        </motion.div>

        {/* Digital noise overlay */}
        <div
          className="absolute inset-0 digital-noise mix-blend-overlay"
          style={{ opacity: 0.1 + glitchIntensity * 0.3 }}
        />
      </div>
    </motion.div>
  )
}
