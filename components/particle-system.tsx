"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  life: number
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const colors = ["#00F0FF", "#BD00FF", "#FF0099", "#FFD700"]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      if (Math.random() > 0.5) {
        createParticles(5, e.clientX, e.clientY)
      }

      clearTimeout(mouseTimeout.current)
      mouseTimeout.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const mouseTimeout = useRef<NodeJS.Timeout>()

  const createParticles = (count: number, x: number, y: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1

      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 0.5 + 0.5, // Life between 0.5 and 1
      })
    }
  }

  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time
    }

    const deltaTime = time - previousTimeRef.current
    previousTimeRef.current = time

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particlesRef.current.forEach((particle, index) => {
          particle.x += particle.vx
          particle.y += particle.vy

          particle.life -= 0.01

          if (particle.life <= 0) {
            particlesRef.current.splice(index, 1)
            return
          }

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.life * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + "33" // 20% opacity
          ctx.fill()
        })

        if (Math.random() > 0.95) {
          createParticles(1, Math.random() * canvas.width, Math.random() * canvas.height)
        }
      }
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight

      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth
          canvasRef.current.height = window.innerHeight
        }
      }

      window.addEventListener("resize", handleResize)

      requestRef.current = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 3 }}
    />
  )
}
