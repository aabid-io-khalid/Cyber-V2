"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import TerminalHacker from "@/components/terminal-hacker"
import { event } from "@/lib/analytics"

export default function FloatingTerminalButton() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  const toggleTerminal = () => {
    const newState = !isTerminalOpen
    setIsTerminalOpen(newState)

    event({
      action: newState ? "terminal_open" : "terminal_close",
      category: "Terminal",
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={toggleTerminal}
          className={`rounded-full w-12 h-12 ${
            isTerminalOpen
              ? "bg-lime-600 hover:bg-lime-700 text-white"
              : "bg-gray-800/80 hover:bg-gray-700/80 text-lime-500"
          } backdrop-blur-sm border border-lime-500/30 shadow-lg`}
        >
          <Terminal className="w-5 h-5" />
        </Button>
      </motion.div>

      {isTerminalOpen && <TerminalHacker onClose={() => setIsTerminalOpen(false)} />}
    </>
  )
}
