"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Radio, Zap } from "lucide-react"

const dystopianNews = [
  "BREAKING: NeoCorp announces mandatory neural implants for all citizens",
  "ALERT: Air toxicity levels reach new high in Sector 7",
  "NOTICE: Water rations reduced by 15% in all districts",
  "WARNING: Unauthorized thought patterns detected in Eastern Quadrant",
  "UPDATE: New surveillance drones deployed in residential sectors",
  "ALERT: Digital identity theft up 300% - update your neural firewall",
  "NOTICE: Curfew extended to 14 hours in response to resistance activity",
  "WARNING: Unregistered AI detected in commercial district",
  "UPDATE: Memory wipe services now available at all MindCorp locations",
  "BREAKING: Synthetic food shortage enters third month",
  "ALERT: Reality augmentation glitches reported in downtown grid",
  "NOTICE: Emotional suppression mandatory during work hours",
]

export default function NewsTicker() {
  const [visibleNews, setVisibleNews] = useState<string[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const randomNews = [...dystopianNews].sort(() => 0.5 - Math.random()).slice(0, 5)
    setVisibleNews(randomNews)
  }, [])

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setVisibleNews((prev) => {
        const newsList = [...prev]
        newsList.shift()
        const remainingNews = dystopianNews.filter((item) => !newsList.includes(item))
        const randomNews = remainingNews[Math.floor(Math.random() * remainingNews.length)]
        newsList.push(randomNews)
        return newsList
      })

      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-t border-red-500/30 py-2 px-4 ${
        isGlitching ? "news-glitch" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto flex items-center">
        <div className="flex items-center gap-2 pr-4 border-r border-red-500/30 mr-4">
          <Radio className="text-red-500 w-4 h-4 animate-pulse" />
          <span className="text-red-400 font-mono text-sm uppercase tracking-wider">Live Feed</span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          <div className="flex animate-ticker">
            {visibleNews.map((news, index) => (
              <div
                key={index}
                className="flex items-center gap-2 whitespace-nowrap pr-12 text-gray-300 font-mono text-sm"
              >
                <AlertTriangle className="text-yellow-500 w-4 h-4" />
                <span>{news}</span>
                <Zap className="text-red-500 w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
