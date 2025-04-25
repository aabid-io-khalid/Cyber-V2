"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ReactiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const requestRef = useRef<number>()

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const cellSize = 40
    const cols = Math.ceil(dimensions.width / cellSize) + 1
    const rows = Math.ceil(dimensions.height / cellSize) + 1

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const offsetX = (mousePosition.x / dimensions.width - 0.5) * 10
      const offsetY = (mousePosition.y / dimensions.height - 0.5) * 10

      ctx.strokeStyle = "#00F0FF10" 
      ctx.lineWidth = 0.5

      for (let i = 0; i < cols; i++) {
        const x = i * cellSize + (offsetX % cellSize)

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, dimensions.height)
        ctx.stroke()
      }

      for (let i = 0; i < rows; i++) {
        const y = i * cellSize + (offsetY % cellSize)

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(dimensions.width, y)
        ctx.stroke()
      }

      const mouseX = mousePosition.x
      const mouseY = mousePosition.y
      const radius = 100

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius)

      gradient.addColorStop(0, "#00F0FF30")
      gradient.addColorStop(1, "#00F0FF00")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2)
      ctx.fill()

      const cellX = Math.floor(mouseX / cellSize)
      const cellY = Math.floor(mouseY / cellSize)
      const highlightRadius = 2

      ctx.strokeStyle = "#00F0FF40"
      ctx.lineWidth = 1

      for (let i = cellX - highlightRadius; i <= cellX + highlightRadius; i++) {
        for (let j = cellY - highlightRadius; j <= cellY + highlightRadius; j++) {
          const distance = Math.sqrt(Math.pow(i - cellX, 2) + Math.pow(j - cellY, 2))

          if (distance <= highlightRadius) {
            const opacity = 1 - distance / highlightRadius
            ctx.strokeStyle = `#00F0FF${Math.floor(opacity * 64)
              .toString(16)
              .padStart(2, "0")}`

            const x = i * cellSize + (offsetX % cellSize)
            const y = j * cellSize + (offsetY % cellSize)

            ctx.beginPath()
            ctx.rect(x, y, cellSize, cellSize)
            ctx.stroke()
          }
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [dimensions, mousePosition])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3 }}
    />
  )
}
