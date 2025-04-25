"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
  pulseState: number
  pulseSpeed: number
  color: string
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const requestRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const colors = ["#00F0FF", "#BD00FF", "#FF0099"]

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const nodeCount = Math.floor((dimensions.width * dimensions.height) / 40000) + 15

    nodesRef.current = Array.from({ length: nodeCount }, () => {
      return {
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        connections: [],
        pulseState: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    nodesRef.current.forEach((node, i) => {
      for (let j = 0; j < nodesRef.current.length; j++) {
        if (i !== j && Math.random() > 0.85) {
          node.connections.push(j)
        }
      }
    })

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodesRef.current.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > dimensions.width) node.vx *= -1
        if (node.y < 0 || node.y > dimensions.height) node.vy *= -1

        node.pulseState += node.pulseSpeed
        if (node.pulseState > Math.PI * 2) node.pulseState -= Math.PI * 2

        node.connections.forEach((j) => {
          const target = nodesRef.current[j]
          const dx = target.x - node.x
          const dy = target.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            const opacity = 1 - distance / 200

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = `${node.color}${Math.floor(opacity * 40)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.stroke()

            const pulsePosition = (Math.sin(node.pulseState) + 1) / 2
            const pulseX = node.x + dx * pulsePosition
            const pulseY = node.y + dy * pulsePosition

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 1, 0, Math.PI * 2)
            ctx.fillStyle = `${node.color}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.fill()
          }
        })

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color + "80"
        ctx.fill()

        const glowRadius = node.radius * (1 + Math.sin(node.pulseState) * 0.3)
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius * 2, 0, Math.PI * 2)
        ctx.fillStyle = node.color + "20"
        ctx.fill()
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [dimensions])

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2, delay: 3 }}
    />
  )
}
