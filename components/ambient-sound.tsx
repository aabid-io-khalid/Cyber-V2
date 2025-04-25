"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.3)
  const [isInitialized, setIsInitialized] = useState(false)

  const ambientRef = useRef<HTMLAudioElement | null>(null)
  const uiSoundsRef = useRef<{ [key: string]: HTMLAudioElement }>({})

  useEffect(() => {
    ambientRef.current = new Audio("/sounds/ambient.mp3")
    ambientRef.current.loop = true
    ambientRef.current.volume = 0

    const sounds = {
      hover: "/sounds/hover.mp3",
      click: "/sounds/click.mp3",
      scan: "/sounds/scan.mp3",
      glitch: "/sounds/glitch.mp3",
    }

    Object.entries(sounds).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.volume = 0
      uiSoundsRef.current[key] = audio
    })

    document.addEventListener("mouseover", handleHover)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("mouseover", handleHover)
      document.removeEventListener("click", handleClick)

      if (ambientRef.current) {
        ambientRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!ambientRef.current) return

    const targetVolume = isMuted ? 0 : volume
    const currentVolume = ambientRef.current.volume

    const fadeInterval = setInterval(() => {
      if (ambientRef.current) {
        if (Math.abs(ambientRef.current.volume - targetVolume) < 0.01) {
          ambientRef.current.volume = targetVolume
          clearInterval(fadeInterval)
        } else {
          ambientRef.current.volume += (targetVolume - currentVolume) * 0.1
        }
      }
    }, 50)

    Object.values(uiSoundsRef.current).forEach((audio) => {
      audio.volume = isMuted ? 0 : volume * 0.5
    })

    return () => clearInterval(fadeInterval)
  }, [isMuted, volume])

  const handleHover = (e: MouseEvent) => {
    if (!isInitialized) return

    const target = e.target as HTMLElement
    if (target.tagName === "BUTTON" || target.tagName === "A" || target.classList.contains("sound-hover")) {
      playSound("hover")
    }
  }

  const handleClick = () => {
    if (!isInitialized) return
    playSound("click")
  }

  const playSound = (name: string) => {
    const sound = uiSoundsRef.current[name]
    if (sound && !isMuted) {
      const clone = sound.cloneNode() as HTMLAudioElement
      clone.volume = sound.volume
      clone.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const toggleMute = () => {
    if (!isInitialized) {
      setIsInitialized(true)
      if (ambientRef.current) {
        ambientRef.current.play().catch((e) => console.log("Audio play failed:", e))
      }
    }

    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-black/70 border border-neon-blue/30 flex items-center justify-center hover:bg-cyber-blue/30 transition-colors group"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-neon-blue group-hover:text-white transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-neon-blue group-hover:text-white transition-colors" />
        )}
        <div className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/50 group-hover:scale-110 transition-all duration-300"></div>
      </button>
    </div>
  )
}
