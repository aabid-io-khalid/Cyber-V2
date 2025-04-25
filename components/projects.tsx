"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Layers, Monitor, Shield, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollContext } from "@/components/scroll-provider"
import { event } from "@/lib/analytics"

const projects = [
  {
    id: 1,
    title: "LANDING PAGE FOR BYTEBREW",
    number: "003",
    category: "Web Design",
    year: "2025",
    image: "/images/project-1.png",
    tags: ["React", "Next.js", "Tailwind"],
    icon: <Monitor className="w-4 h-4" />,
    description: "A cutting-edge landing page with advanced animations and interactive elements.",
    color: "from-neon-blue to-cyber-teal",
  },
  {
    id: 2,
    title: "BRAND IDENTITY FOR DIGITRON",
    number: "004",
    category: "Branding",
    year: "2024",
    image: "/images/project-2.png",
    tags: ["Branding", "Logo", "Identity"],
    icon: <Layers className="w-4 h-4" />,
    description: "Complete brand identity system for a cybersecurity tech company.",
    color: "from-neon-purple to-neon-pink",
  },
  {
    id: 3,
    title: "LANDING PAGE FOR NEOWAVE",
    number: "005",
    category: "Web Design",
    year: "2024",
    image: "/images/project-3.png",
    tags: ["UI/UX", "React", "Animation"],
    icon: <Monitor className="w-4 h-4" />,
    description: "Futuristic web experience with advanced 3D elements and interactions.",
    color: "from-neon-blue to-cyber-blue",
  },
  {
    id: 4,
    title: "SECURITY SYSTEM FOR VAPORIFY",
    number: "006",
    category: "Security",
    year: "2023",
    image: "/images/project-4.png",
    tags: ["Security", "Encryption", "Authentication"],
    icon: <Shield className="w-4 h-4" />,
    description: "Advanced security system with biometric authentication and encryption.",
    color: "from-neon-red to-neon-yellow",
  },
  {
    id: 5,
    title: "DYSTOPIAN INTERFACE FOR NEOCORP",
    number: "007",
    category: "UI/UX",
    year: "2023",
    image: "/images/project-5.png",
    tags: ["UI/UX", "Dystopian", "Interface"],
    icon: <AlertTriangle className="w-4 h-4" />,
    description: "Dystopian interface design for a futuristic surveillance system.",
    color: "from-neon-blue to-neon-purple",
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [imageTilt, setImageTilt] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const projectsListRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { scrollY } = useScrollContext()

  function useInView(ref: React.RefObject<HTMLElement>, options: { once: boolean; amount: number }) {
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (options.once && ref.current) {
              observer.unobserve(ref.current)
            }
          } else if (!options.once) {
            setIsInView(false)
          }
        },
        { threshold: options.amount },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, [ref, options.once, options.amount])

    return isInView
  }

  const projectElements = useMemo(() => {
    return projects.map((project, index) => (
      <ProjectItem
        key={project.id}
        project={project}
        index={index}
        isInView={isInView}
        isActive={activeProject === project.id}
        onMouseEnter={() => handleProjectHover(project.id)}
        totalProjects={projects.length}
      />
    ))
  }, [isInView, activeProject])

  useEffect(() => {
    if (activeProject === null || !projectsListRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      setHoverPosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth + 0.5,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight + 0.5,
      })

      const windowWidth = window.innerWidth
      const tiltX = ((e.clientX - windowWidth / 2) / windowWidth) * 10 // -5 to 5 degrees tilt
      setImageTilt(tiltX)
    }

    let ticking = false
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMouseMove(e)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("mousemove", throttledMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [activeProject])

  const handleProjectHover = (projectId: number) => {
    if (activeProject !== projectId) {
      setActiveProject(projectId)

      const index = projects.findIndex((p) => p.id === projectId)
      if (index !== -1) {
        setCurrentIndex(index)
      }

      if (typeof window !== "undefined") {
        const audio = new Audio("/sounds/glitch.mp3")
        audio.volume = 0.1
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }
    }
  }

  const handleMouseLeave = () => {
    setActiveProject(null)
  }

  const handleNextProject = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    const nextIndex = (currentIndex + 1) % projects.length
    setCurrentIndex(nextIndex)
    setActiveProject(projects[nextIndex].id)

    event({
      action: "project_navigation",
      category: "Navigation",
      label: "next",
    })

    setTimeout(() => setIsTransitioning(false), 300)
  }, [currentIndex, isTransitioning])

  const handlePrevProject = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setCurrentIndex(prevIndex)
    setActiveProject(projects[prevIndex].id)

    event({
      action: "project_navigation",
      category: "Navigation",
      label: "previous",
    })

    setTimeout(() => setIsTransitioning(false), 300)
  }, [currentIndex, isTransitioning])

  const parallaxOffset = scrollY * 0.1

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden cyberpunk-bg"
      onMouseLeave={handleMouseLeave}
    >
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-black to-cyber-blue/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(189,0,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,240,255,0.15),transparent_70%)]" />

        {/* Dystopian elements */}
        <div className="absolute inset-0 dystopian-overlay opacity-10" />
        <div className="absolute inset-0 surveillance-grid opacity-5" />

        {/* Animated circuit patterns */}
        <div
          className="absolute inset-0 circuit-pattern opacity-10"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />

        {/* Digital rain effect */}
        <div className="absolute inset-0 digital-rain opacity-5" />

        {/* Top and bottom borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 grid-lines opacity-20"
          style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
        />

        {/* Animated glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-neon-purple/10 blur-3xl animate-pulse-slow"
          style={{ transform: `translateY(${parallaxOffset * 1.5}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-neon-blue/10 blur-3xl animate-pulse-slow-delay"
          style={{ transform: `translateY(${-parallaxOffset * 1.2}px)` }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="glitch-container">
            <h2
              className="text-sm font-medium text-neon-blue mb-3 tracking-[0.2em] uppercase neon-text-toxic glitch-text"
              data-text="CLASSIFIED PROJECTS"
            >
              CLASSIFIED PROJECTS
            </h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-white cyberpunk-heading terminal-text">
            <span className="text-neon-red">&#47;&#47;</span> ACCESS GRANTED
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mx-auto rounded-full glow-bar" />

          {/* Security clearance badge */}
          <div className="mt-6 inline-block px-4 py-2 border border-neon-blue/30 bg-black/30 rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></div>
              <span className="text-neon-blue font-mono text-sm">SECURITY CLEARANCE: LEVEL 5</span>
            </div>
          </div>
        </motion.div>

        <div className="relative" ref={projectsListRef}>
          {/* Fixed position container for the image preview */}
          <div className="relative w-full h-full">
            <AnimatePresence>
              {activeProject !== null && (
                <motion.div
                  ref={imageContainerRef}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 5, rotateY: -5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    rotateY: imageTilt, // Apply the tilt based on cursor position
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    position: "fixed", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    width: 600, 
                    height: 350, 
                    zIndex: 20,
                    pointerEvents: "none", 
                    perspective: 1000,
                  }}
                  className="project-image-container"
                >
                  <motion.div
                    className="relative w-full h-full overflow-hidden rounded-lg cyberpunk-card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10 z-10 mix-blend-overlay" />

                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.1 }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={projects.find((p) => p.id === activeProject)?.image || ""}
                        alt={projects.find((p) => p.id === activeProject)?.title || ""}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20" />

                    {/* Advanced cyberpunk overlay effects */}
                    <div className="absolute inset-0 cyberpunk-scanlines opacity-10 z-30" />
                    <div
                      className="absolute inset-0 cyberpunk-glitch-effect z-30"
                      style={{
                        opacity: 0.3,
                        animationDuration: "5s",
                      }}
                    />

                    {/* Digital noise */}
                    <div className="absolute inset-0 digital-noise z-30 mix-blend-overlay" style={{ opacity: 0.2 }} />

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-40">
                      <div className="text-xs text-neon-blue mb-1 font-mono tracking-wider">
                        {projects.find((p) => p.id === activeProject)?.category}
                      </div>
                      <div className="text-white text-lg font-bold neon-text-white">
                        {projects.find((p) => p.id === activeProject)?.title}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projects
                          .find((p) => p.id === activeProject)
                          ?.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs bg-black/50 text-neon-blue px-2 py-1 rounded-sm border border-neon-blue/30"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Security clearance overlay */}
                    <div className="absolute top-3 right-3 z-40">
                      <div className="px-2 py-1 bg-black/50 border border-neon-red/50 rounded-sm">
                        <span className="text-xs text-neon-red font-mono">CLASSIFIED</span>
                      </div>
                    </div>

                    {/* Holographic overlay effect */}
                    <div
                      className="absolute inset-0 z-35 holographic-overlay"
                      style={{
                        background: `radial-gradient(circle at ${hoverPosition.x * 100}% ${hoverPosition.y * 100}%, rgba(0, 240, 255, 0.2) 0%, transparent 70%)`,
                      }}
                    />
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-neon-blue to-transparent" />
                  <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-neon-blue to-transparent" />
                  <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-neon-red to-transparent" />
                  <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-neon-red to-transparent" />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-blue" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neon-blue" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neon-red" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-red" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project list - using memoized elements for better performance */}
          <div className="max-w-5xl mx-auto">{projectElements}</div>

          {/* Navigation controls - always visible and clickable */}
          {activeProject !== null && (
            <div className="fixed bottom-32 right-10 z-50 flex flex-col gap-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handlePrevProject}
                className="w-12 h-12 rounded-full bg-black/70 border border-neon-blue/30 flex items-center justify-center hover:bg-cyber-blue/30 transition-colors group pointer-events-auto"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-neon-blue group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/50 group-hover:scale-110 transition-all duration-300"></div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={handleNextProject}
                className="w-12 h-12 rounded-full bg-black/70 border border-neon-blue/30 flex items-center justify-center hover:bg-cyber-blue/30 transition-colors group pointer-events-auto"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-neon-blue group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/50 group-hover:scale-110 transition-all duration-300"></div>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectItem({
  project,
  index,
  isInView,
  isActive,
  onMouseEnter,
  totalProjects,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
  isActive: boolean
  onMouseEnter: () => void
  totalProjects: number
}) {
  const dataPoints = useMemo(() => {
    return Array.from({ length: 3 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={onMouseEnter}
      className={`group relative py-12 transition-all duration-300 ${isActive ? "scale-105 pl-4" : "scale-100"}`}
    >
      {/* Project card with enhanced styling */}
      <div
        className={`
          relative z-10 rounded-lg p-6
          ${
            isActive
              ? `bg-gradient-to-r from-black/50 to-black/30 border-l-2 border-gradient-${project.color}`
              : "bg-transparent hover:bg-black/20"
          }
          transition-all duration-300
        `}
      >
        <motion.div
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="mr-6 flex flex-col items-center">
              <span className="text-white/30 text-sm font-mono">{project.number}</span>
              <div
                className={`mt-2 p-2 rounded-full ${
                  isActive ? `bg-gradient-to-r ${project.color}` : "bg-white/10"
                } transition-all duration-300`}
              >
                {project.icon}
              </div>
            </div>
            <div>
              <h3
                className={`text-2xl md:text-4xl font-bold transition-all duration-300 ${
                  isActive ? "cyberpunk-text-active" : "text-white group-hover:cyberpunk-text"
                }`}
              >
                {project.title}
              </h3>

              {/* Project details that appear on hover */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  height: isActive ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 text-gray-400">{project.description}</div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-black/50 text-neon-blue px-2 py-1 rounded-sm border border-neon-blue/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-white/50 text-sm hidden md:block">{project.category}</span>
            <span className="text-white/50 text-sm hidden md:block">{project.year}</span>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isActive
                  ? "border-neon-blue cyberpunk-button-active"
                  : "border-white/20 group-hover:border-neon-blue group-hover:cyberpunk-button"
              } relative overflow-hidden z-30 pointer-events-auto`}
              onClick={() => {
                event({
                  action: "project_click",
                  category: "Navigation",
                  label: project.title,
                })
                console.log(`Clicked on project: ${project.title}`)
              }}
            >
              <ArrowUpRight
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/50 group-hover:text-white"
                }`}
              />

              {/* Futuristic button effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/20 group-hover:to-neon-purple/20 transition-all duration-500"></div>

              {/* Data points */}
              {dataPoints.map((point, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:opacity-70"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${point.size}px`,
                    height: `${point.size}px`,
                    transition: `transform 0.5s ease-out ${i * 0.1}s, opacity 0.3s ease-in-out`,
                    transform: isActive ? "scale(1.5)" : "scale(0)",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated line that expands on hover */}
      <motion.div
        className={`absolute bottom-0 left-0 h-px bg-gradient-to-r ${project.color}`}
        initial={{ width: "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />

      {/* Vertical line separator */}
      {index < totalProjects - 1 && <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />}

      {/* Hover gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/0 to-transparent transition-all duration-500 ${
          isActive ? "via-cyber-blue/10" : ""
        }`}
      />
    </motion.div>
  )
}
