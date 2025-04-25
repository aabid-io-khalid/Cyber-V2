"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalIcon, X, ChevronRight, Maximize2, Minimize2 } from "lucide-react"

interface CommandResult {
  command: string
  output: string[]
  isError?: boolean
}

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands: { [key: string]: (args: string[]) => string[] } = {
    help: () => [
      "Available commands:",
      "- help: Display this help message",
      "- about: Display information about this site",
      "- clear: Clear terminal history",
      "- echo [text]: Display text",
      "- date: Display current date and time",
      "- theme [color]: Change theme color (blue, purple, pink, cyan)",
      "- matrix: Display Matrix-style animation",
      "- exit: Close terminal",
    ],
    about: () => [
      "Cyberpunk Portfolio v1.0",
      "A high-tech dystopian portfolio template for creative professionals",
      "in a world where design meets the dark edge of technology.",
      "",
      "Created with Next.js, Tailwind CSS, and Framer Motion",
    ],
    clear: () => {
      setHistory([])
      return []
    },
    echo: (args) => [args.join(" ")],
    date: () => [new Date().toLocaleString()],
    theme: (args) => {
      const color = args[0]?.toLowerCase()
      if (!color) return ["Usage: theme [color]", "Available colors: blue, purple, pink, cyan"]

      const colors: { [key: string]: string } = {
        blue: "#00F0FF",
        purple: "#BD00FF",
        pink: "#FF0099",
        cyan: "#00F0FF",
      }

      if (!colors[color]) return [`Unknown color: ${color}`]

      document.documentElement.style.setProperty("--theme-color", colors[color])

      return [`Theme color changed to ${color}`]
    },
    matrix: () => {
      // This would trigger a matrix animation in a real implementation
      return ["Initiating Matrix sequence...", "Wake up, Neo..."]
    },
    exit: () => {
      setIsOpen(false)
      return []
    },
  }

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const parts = trimmedCmd.split(" ")
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    let result: CommandResult

    if (commands[commandName]) {
      result = {
        command: trimmedCmd,
        output: commands[commandName](args),
      }
    } else {
      result = {
        command: trimmedCmd,
        output: [`Command not found: ${commandName}`, "Type 'help' for available commands"],
        isError: true,
      }
    }

    setHistory((prev) => [...prev, result])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput("")
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: ["Welcome to the Interactive Terminal", "Type 'help' for available commands", ""],
      },
    ])
  }, [])

  return (
    <>
      {/* Terminal toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-black/70 border border-neon-blue/30 flex items-center justify-center hover:bg-cyber-blue/30 transition-colors group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
      >
        <TerminalIcon className="w-5 h-5 text-neon-blue group-hover:text-white transition-colors" />
        <div className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/50 group-hover:scale-110 transition-all duration-300"></div>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-50"
            style={{
              top: isMinimized ? "calc(100% - 40px)" : position.y || "50%",
              left: position.x || "50%",
              transform: isMinimized ? "translateX(-50%)" : position.x ? "none" : "translate(-50%, -50%)",
              width: isMinimized ? "300px" : "600px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            drag={!isMinimized}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              setPosition({
                x: info.point.x - (isMinimized ? 150 : 300),
                y: info.point.y - (isMinimized ? 20 : 200),
              })
            }}
          >
            {/* Terminal header */}
            <div className="bg-gray-900 border-b border-neon-blue/30 p-2 rounded-t-lg flex items-center justify-between cursor-move">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-neon-blue" />
                <span className="text-neon-blue font-mono text-sm">Terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-gray-700 rounded">
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  className="bg-gray-900/90 backdrop-blur-md p-4 rounded-b-lg border border-t-0 border-neon-blue/30 font-mono text-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "400px", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div ref={terminalRef} className="h-[calc(100%-32px)] overflow-y-auto mb-2 text-gray-300">
                    {history.map((item, i) => (
                      <div key={i} className="mb-2">
                        {item.command && (
                          <div className="flex items-center gap-1 text-neon-blue">
                            <ChevronRight className="w-3 h-3" />
                            <span>{item.command}</span>
                          </div>
                        )}
                        {item.output.map((line, j) => (
                          <div key={j} className={`ml-4 ${item.isError ? "text-neon-red" : ""}`}>
                            {line || " "}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-700 pt-2">
                    <ChevronRight className="w-4 h-4 text-neon-blue" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white"
                      placeholder="Type a command..."
                    />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
