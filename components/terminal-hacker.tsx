"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, Play, Lock, Unlock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { event } from "@/lib/analytics"

interface TerminalHackerProps {
  onClose: () => void
}

export default function TerminalHacker({ onClose }: TerminalHackerProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [hackProgress, setHackProgress] = useState(0)
  const [isHacking, setIsHacking] = useState(false)
  const [hackComplete, setHackComplete] = useState(false)
  const [accessLevel, setAccessLevel] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initialLines = [
      "NeoSec Terminal v3.5.7",
      "WARNING: Unauthorized access is prohibited",
      "All activities are monitored and recorded",
      "Type 'help' for available commands",
      "",
    ]
    setTerminalLines(initialLines)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(currentInput)
      setCurrentInput("")
    }
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const newLines = [...terminalLines, `> ${cmd}`, ""]

    event({
      action: "terminal_command",
      category: "Terminal",
      label: command,
    })

    switch (command) {
      case "help":
        newLines.push(
          "Available commands:",
          "- help: Display this help message",
          "- status: Check system status",
          "- hack: Attempt to bypass security",
          "- clear: Clear terminal",
          "- exit: Close terminal",
          "",
        )
        break

      case "status":
        newLines.push(
          "SYSTEM STATUS:",
          `- Security Level: ${hackComplete ? "COMPROMISED" : "ACTIVE"}`,
          `- Access Level: ${accessLevel}`,
          `- Firewall: ${hackComplete ? "BYPASSED" : "ENABLED"}`,
          `- Intrusion Detection: ${hackComplete ? "DISABLED" : "ACTIVE"}`,
          "",
        )
        break

      case "hack":
        if (isHacking) {
          newLines.push("Hack already in progress...", "")
        } else if (hackComplete) {
          newLines.push("System already compromised. Access granted.", "")
        } else {
          newLines.push("Initiating security bypass...", "Attempting to crack encryption...", "")
          setIsHacking(true)
          startHack()
        }
        break

      case "clear":
        setTerminalLines([])
        return

      case "exit":
        handleClose()
        return

      default:
        if (command) {
          newLines.push(`Command not recognized: ${cmd}`, "")
        }
    }

    setTerminalLines(newLines)
  }

  const startHack = () => {
    setHackProgress(0)

    const audio = new Audio("/sounds/typing.mp3")
    audio.volume = 0.2
    audio.loop = true
    audio.play().catch((e) => console.log("Audio play failed:", e))

    const interval = setInterval(() => {
      setHackProgress((prev) => {
        const increment = Math.random() * 5
        const newProgress = prev + increment

        if (Math.random() > 0.7) {
          const messages = [
            "Bypassing firewall...",
            "Cracking encryption layer...",
            "Injecting payload...",
            "Disabling security protocols...",
            "Extracting authentication tokens...",
            "Elevating privileges...",
            "Corrupting system logs...",
          ]
          const randomMessage = messages[Math.floor(Math.random() * messages.length)]
          setTerminalLines((lines) => [...lines, randomMessage])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          audio.pause()
          completeHack()
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => {
      clearInterval(interval)
      audio.pause()
    }
  }

  const completeHack = () => {
    setIsHacking(false)
    setHackComplete(true)
    setAccessLevel(5)

    const audio = new Audio("/sounds/access-granted.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    event({
      action: "terminal_hack_complete",
      category: "Terminal",
    })

    setTerminalLines((lines) => [
      ...lines,
      "SECURITY BREACH SUCCESSFUL",
      "Access granted to security level 5",
      "All systems compromised",
      "Disabling security logs and traces...",
      "You now have full control of the system",
      "",
    ])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-16 right-6 z-40 w-full max-w-lg"
        >
          <div className="bg-gray-900/90 backdrop-blur-md rounded-lg border border-lime-500/30 shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between bg-black/50 px-4 py-2 border-b border-lime-500/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-lime-500" />
                <span className="text-lime-400 font-mono text-sm">NeoSec Terminal</span>
              </div>
              <div className="flex items-center gap-2">
                {hackComplete ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-lime-900/30 rounded-sm">
                    <Unlock className="w-3 h-3 text-lime-500" />
                    <span className="text-lime-400 font-mono text-xs">ACCESS GRANTED</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-900/30 rounded-sm">
                    <Lock className="w-3 h-3 text-red-500" />
                    <span className="text-red-400 font-mono text-xs">RESTRICTED</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-6 w-6 rounded-full hover:bg-red-500/20 text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-4">
              {/* Terminal output */}
              <div
                ref={terminalRef}
                className="bg-black/70 rounded-md p-3 h-64 overflow-y-auto font-mono text-xs text-green-400 mb-4"
              >
                {terminalLines.map((line, i) => (
                  <div key={i} className={line.startsWith(">") ? "text-cyan-400 font-bold" : ""}>
                    {line || " "}
                  </div>
                ))}
                {isHacking && (
                  <div className="mt-2">
                    <div className="text-yellow-400 mb-1">Hacking progress: {Math.floor(hackProgress)}%</div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-lime-500 transition-all duration-300"
                        style={{ width: `${hackProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal input */}
              <div className="flex items-center gap-2 bg-black/50 rounded-md px-3 py-2 border border-lime-500/20">
                <span className="text-lime-500">{">"}</span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                  placeholder="Type command..."
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => processCommand(currentInput)}
                  className="h-6 w-6 text-lime-500 hover:bg-lime-500/20"
                  disabled={!currentInput}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>

              {/* Security level indicator */}
              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500 font-mono text-xs">SECURITY LEVEL</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-1 rounded-full ${
                        i < accessLevel ? "bg-lime-500" : "bg-gray-700"
                      } transition-all duration-300`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
