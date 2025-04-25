"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const trailsRef = useRef<HTMLDivElement>(null)
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])
  const MAX_TRAILS = 8

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      trailPositions.current.push({ x: e.clientX, y: e.clientY })

      if (trailPositions.current.length > MAX_TRAILS) {
        trailPositions.current.shift()
      }

      if (trailsRef.current) {
        const trails = trailsRef.current.children
        for (let i = 0; i < trails.length; i++) {
          const trail = trails[i] as HTMLElement
          const pos = trailPositions.current[trailPositions.current.length - 1 - i]
          if (pos) {
            trail.style.left = `${pos.x}px`
            trail.style.top = `${pos.y}px`
            trail.style.opacity = `${1 - i / MAX_TRAILS}`
            trail.style.transform = `scale(${1 - (i / MAX_TRAILS) * 0.5})`
          }
        }
      }

      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("[data-cursor='pointer']") ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorVariant("hover")
      } else {
        setCursorVariant("default")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Cursor trails */}
      <div ref={trailsRef} className="hidden md:block">
        {Array.from({ length: MAX_TRAILS }).map((_, i) => (
          <div
            key={i}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-40 bg-gradient-to-r from-purple-500 to-cyan-500 w-3 h-3 blur-[1px]"
            style={{
              transition: "opacity 0.1s ease-out",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-30 hidden md:block w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl"
        style={{
          left: mousePosition.x - 80,
          top: mousePosition.y - 80,
          opacity: isVisible ? 0.5 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </>
  )
}
