"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Fingerprint, Eye, Check, Scan, Cpu, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { event } from "@/lib/analytics"

interface BiometricAuthProps {
  onComplete: () => void
}

export default function BiometricAuth({ onComplete }: BiometricAuthProps) {
  const [step, setStep] = useState<"initial" | "scanning" | "complete">("initial")
  const [scanProgress, setScanProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [neuralConnections, setNeuralConnections] = useState<
    Array<{ x1: number; y1: number; x2: number; y2: number; active: boolean }>
  >([])
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; size: number; color: string }>>([])

  useEffect(() => {
    const connections = []
    const points = []
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      points.push({ x, y, size: Math.random() * 4 + 2, color: getRandomColor() })
    }
    setDataPoints(points)

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() > 0.7) {
          connections.push({
            x1: points[i].x,
            y1: points[i].y,
            x2: points[j].x,
            y2: points[j].y,
            active: Math.random() > 0.5,
          })
        }
      }
    }
    setNeuralConnections(connections)

    function getRandomColor() {
      const colors = [
        "#00F0FF", // neon blue
        "#BD00FF", // neon purple
        "#FF0099", // neon pink
        "#FFD700", // neon yellow
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }, [])

  useEffect(() => {
    if (step === "scanning") {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 4 
          if (newProgress >= 100) {
            clearInterval(interval)
            setStep("complete")
            return 100
          }
          return newProgress
        })
      }, 30) 

      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === "complete") {
      event({
        action: "biometric_auth_complete",
        category: "User Authentication",
      })

      setTimeout(() => {
        setFadeOut(true)
      }, 800) // Reduced time

      setTimeout(() => {
        onComplete()
      }, 1500) // Reduced time
    }
  }, [step, onComplete])

  const startScan = () => {
    setStep("scanning")

    const audio = new Audio("/sounds/scan.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    event({
      action: "biometric_scan_start",
      category: "User Authentication",
    })
  }

  useEffect(() => {
    if (step === "scanning" || step === "complete") {
      const interval = setInterval(() => {
        setNeuralConnections((prev) =>
          prev.map((conn) => ({
            ...conn,
            active: Math.random() > 0.3,
          })),
        )
      }, 300) 
      return () => clearInterval(interval)
    }
  }, [step])

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-black to-cyber-blue/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(189,0,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 circuit-pattern opacity-10" />
            <div className="absolute inset-0 digital-rain opacity-8" />
            <div className="absolute inset-0 grid-lines opacity-15" />

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-conic from-neon-purple/5 via-neon-blue/5 to-neon-pink/5 animate-spin-slow opacity-30" />

            {/* Neural network visualization */}
            <div className="absolute inset-0">
              {neuralConnections.map((conn, i) => (
                <div
                  key={i}
                  className={`absolute bg-gradient-to-r ${conn.active ? "from-neon-blue to-neon-purple" : "from-gray-700 to-gray-800"} transition-all duration-300`}
                  style={{
                    height: "1px",
                    width: `${Math.sqrt(Math.pow(conn.x2 - conn.x1, 2) + Math.pow(conn.y2 - conn.y1, 2))}%`,
                    left: `${conn.x1}%`,
                    top: `${conn.y1}%`,
                    opacity: conn.active ? 0.6 : 0.2,
                    transform: `rotate(${Math.atan2(conn.y2 - conn.y1, conn.x2 - conn.x1) * (180 / Math.PI)}deg)`,
                    transformOrigin: "left center",
                  }}
                />
              ))}

              {dataPoints.map((point, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse-slow"
                  style={{
                    width: `${point.size}px`,
                    height: `${point.size}px`,
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    backgroundColor: point.color,
                    boxShadow: `0 0 10px ${point.color}`,
                  }}
                />
              ))}
            </div>

            {/* Enhanced corner decorations */}
            <div className="absolute top-0 left-0 w-64 h-64">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-neon-blue/50 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neon-blue/50 to-transparent" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue/50" />
              <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-neon-purple/50" />
              <div className="absolute top-4 left-16 w-2 h-2 bg-neon-blue/50 rounded-full animate-pulse" />
              <div className="absolute top-4 left-16 w-2 h-2 bg-neon-blue/50 rounded-full animate-pulse"></div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64">
              <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-neon-purple/50 to-transparent" />
              <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-neon-purple/50 to-transparent" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple/50" />
              <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-neon-blue/50" />
              <div className="absolute top-4 right-16 w-2 h-2 bg-neon-purple/50 rounded-full animate-pulse"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-64 h-64">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-neon-blue/50 to-transparent" />
              <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-neon-blue/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue/50" />
              <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-neon-purple/50" />
              <div className="absolute bottom-4 left-16 w-2 h-2 bg-neon-blue/50 rounded-full animate-pulse"></div>
            </div>

            <div className="absolute bottom-0 right-0 w-64 h-64">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-neon-pink/50 to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-neon-pink/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-pink/50" />
              <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-neon-purple/50" />
              <div className="absolute bottom-4 right-16 w-2 h-2 bg-neon-pink/50 rounded-full animate-pulse"></div>
            </div>

            {/* Enhanced surveillance elements */}
            <div className="absolute top-10 right-10 surveillance-camera">
              <div className="relative">
                <Eye className="text-neon-red w-6 h-6 animate-pulse" />
                <div className="absolute inset-0 bg-neon-red/20 rounded-full blur-md animate-ping-slow"></div>
                <div className="camera-ray"></div>
              </div>
            </div>

            {/* Additional tech elements */}
            <div className="absolute top-1/4 left-1/4 flex items-center justify-center">
              <Cpu className="text-neon-blue/30 w-12 h-12" />
              <div className="absolute inset-0 bg-neon-blue/10 rounded-full blur-md animate-pulse-slow"></div>
            </div>

            <div className="absolute bottom-1/4 right-1/4 flex items-center justify-center">
              <Database className="text-neon-purple/30 w-12 h-12" />
              <div className="absolute inset-0 bg-neon-purple/10 rounded-full blur-md animate-pulse-slow"></div>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-md rounded-lg border border-neon-blue/20 shadow-2xl">
            {step === "initial" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-black/50 rounded-full flex items-center justify-center border border-neon-blue/30 mb-4">
                      <Fingerprint className="w-12 h-12 text-neon-blue" />
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 rounded-full border border-neon-blue/50 animate-ping-slow"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-neon-purple/30 animate-spin-slow"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-black text-xs font-bold">
                      5
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Biometric Authentication Required</h2>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Access to this terminal requires biometric verification. Please initiate scan to continue.
                  </p>

                  {/* Security level indicator */}
                  <div className="mt-4 flex justify-center gap-1">
                    <div className="px-3 py-1 bg-black/50 border border-neon-blue/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
                        <span className="text-neon-blue font-mono text-xs">CLEARANCE REQUIRED</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-black/50 border border-neon-red/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-red animate-pulse"></div>
                        <span className="text-neon-red font-mono text-xs">RESTRICTED</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={startScan}
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white px-6 py-2 rounded-md border border-neon-blue/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    <span>Initiate Scan</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-white/20 to-neon-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                </Button>
              </motion.div>
            ) : step === "scanning" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8">
                  <div className="relative w-64 h-64 mx-auto bg-black/50 rounded-md border border-neon-blue/30 mb-4 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col">
                      {/* Enhanced scan animation */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue/30 via-neon-blue/70 to-neon-blue/30 z-10"
                        style={{ top: `${scanProgress}%` }}
                      ></div>

                      {/* Fingerprint with enhanced effects */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <Fingerprint className="w-32 h-32 text-neon-blue/30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-neon-blue/5 animate-ping-slow"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border border-neon-blue/20 animate-spin-slow"></div>
                          </div>
                        </div>
                      </div>

                      {/* Scan overlay */}
                      <div className="absolute inset-0 cyberpunk-scanlines opacity-20"></div>
                      <div className="absolute inset-0 digital-noise opacity-10"></div>

                      {/* Holographic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Scanning Biometrics</h2>
                  <div className="flex items-center justify-center gap-2">
                    <Scan className="w-4 h-4 text-neon-blue animate-pulse" />
                    <p className="text-neon-blue font-mono">{scanProgress}% COMPLETE</p>
                  </div>

                  {/* Enhanced status indicators */}
                  <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 w-8 rounded-full transition-all duration-300 ${
                          (scanProgress / 100) * 5 > i
                            ? "bg-gradient-to-r from-neon-blue to-neon-purple"
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto bg-black/50 rounded-full flex items-center justify-center border border-neon-blue/30 mb-4">
                    <Check className="w-10 h-10 text-neon-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Access Granted</h2>
                  <p className="text-gray-400">Redirecting to secure terminal...</p>
                </div>

                <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  ></motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
