"use client"

import { useState, useEffect } from "react"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import NewsTicker from "@/components/news-ticker"
import FloatingTerminalButton from "@/components/floating-terminal-button"
import BiometricAuth from "@/components/biometric-auth"
import ParticleSystem from "@/components/particle-system"
import NeuralNetwork from "@/components/neural-network"
import ReactiveGrid from "@/components/reactive-grid"
import AmbientSound from "@/components/ambient-sound"
import CRTEffect from "@/components/crt-effect"
import InteractiveTerminal from "@/components/interactive-terminal"
import GlitchTransition from "@/components/glitch-transition"

export default function Home() {
  const [showBiometricAuth, setShowBiometricAuth] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBiometricAuth(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSection = entry.target.id

            if (activeSection && newSection !== activeSection) {
              setIsTransitioning(true)
              setTimeout(() => setIsTransitioning(false), 500)
            }

            setActiveSection(newSection)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [activeSection])

  return (
    <>
      <Preloader />
      <CustomCursor />
      {showBiometricAuth && <BiometricAuth onComplete={() => setShowBiometricAuth(false)} />}

      {/* Background effects */}
      <NeuralNetwork />
      <ReactiveGrid />
      <ParticleSystem />
      <CRTEffect />

      {/* UI elements */}
      <Navbar />
      <GlitchTransition isActive={isTransitioning} />
      <AmbientSound />
      <InteractiveTerminal />

      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
      <NewsTicker />
      <FloatingTerminalButton />
    </>
  )
}
