"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { motion, useScroll } from "framer-motion"

type ScrollContextType = {
  scrollY: number
  scrollYProgress: number
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollYProgress: 0,
})

export const useScrollContext = () => useContext(ScrollContext)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollYProgressValue)
    return unsubscribe
  }, [scrollYProgress])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollYProgress: scrollYProgressValue }}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgressValue }}
      />
      {children}
    </ScrollContext.Provider>
  )
}
