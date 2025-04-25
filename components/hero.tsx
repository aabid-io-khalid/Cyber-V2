'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Eye, Shield, Cpu, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { event } from '@/lib/analytics';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [securityStatus, setSecurityStatus] = useState('SCANNING');
  const [accessGranted, setAccessGranted] = useState(false);
  const [holographicElements, setHolographicElements] = useState<
    Array<{ x: number; y: number; size: number; color: string }>
  >([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      color: getRandomColor(),
    }));

    setHolographicElements(elements);

    function getRandomColor() {
      const colors = [
        'rgba(0, 240, 255, 0.7)', // neon blue
        'rgba(189, 0, 255, 0.7)', // neon purple
        'rgba(255, 0, 153, 0.7)', // neon pink
        'rgba(255, 215, 0, 0.7)', // neon yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }, []);

  useEffect(() => {
    const text =
      '> Initializing security scan...\n> Verifying identity...\n> Access granted. Welcome back, Commander.';
    let index = 0;
    let timer: NodeJS.Timeout;

    const typeText = () => {
      if (index < text.length) {
        setTerminalText(text.substring(0, index + 1));
        index++;
        timer = setTimeout(typeText, 30 + Math.random() * 50);

        if (index === text.indexOf('Verifying')) {
          setSecurityStatus('VERIFYING');
        } else if (index === text.indexOf('Access granted')) {
          setSecurityStatus('AUTHORIZED');
          setAccessGranted(true);

          // Track event in analytics
          event({
            action: 'security_access_granted',
            category: 'User Interaction',
          });
        }
      }
    };

    setTimeout(typeText, 3500);

    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const calculateTransform = () => {
    if (!textRef.current) return {};

    const moveX = (mousePosition.x - 0.5) * 40;
    const moveY = (mousePosition.y - 0.5) * 40;

    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
    };
  };

  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current.children;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i] as HTMLElement;
      const speed = Number.parseFloat(particle.getAttribute('data-speed') || '1');
      const x = (mousePosition.x - 0.5) * speed * -30;
      const y = (mousePosition.y - 0.5) * speed * -30;

      particle.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [mousePosition]);

  const handleViewProjects = () => {
    event({
      action: 'view_projects_click',
      category: 'Navigation',
    });

    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyberpunk-bg"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-black to-cyber-blue/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(189,0,255,0.15),transparent_70%)]" />

        {/* Dystopian elements */}
        <div className="absolute inset-0 dystopian-overlay opacity-10" />
        <div className="absolute inset-0 surveillance-grid opacity-5" />

        {/* Animated circuit patterns */}
        <div
          className="absolute inset-0 circuit-pattern opacity-10"
          style={{ transform: `translateY(${y2.get()}px)` }}
        />

        {/* Digital rain effect */}
        <div className="absolute inset-0 digital-rain opacity-5" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent" />

        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-20" style={{ transform: `translateY(${y3.get()}px)` }} />

        {/* Animated glow orbs with parallax */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-neon-blue/10 blur-3xl animate-pulse-slow"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-neon-purple/10 blur-3xl animate-pulse-slow-delay"
        />

        {/* Floating particles with parallax */}
        <motion.div ref={particlesRef} style={{ y: y3 }} className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              data-speed={Math.random() * 2 + 0.5}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </motion.div>

        {/* Holographic elements */}
        {holographicElements.map((element, index) => (
          <div
            key={index}
            className="absolute rounded-full holographic-pulse"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              top: `${element.y}%`,
              left: `${element.x}%`,
              backgroundColor: element.color,
              boxShadow: `0 0 10px ${element.color}`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}

        {/* Surveillance cameras */}
        <div className="absolute top-10 right-10 surveillance-camera">
          <Eye className="text-neon-red w-6 h-6 animate-pulse" />
          <div className="camera-ray"></div>
        </div>
        <div className="absolute bottom-10 left-10 surveillance-camera">
          <Eye className="text-neon-red w-6 h-6 animate-pulse" />
          <div className="camera-ray"></div>
        </div>

        {/* Binary code overlay */}
        <div className="absolute inset-0 binary-code-overlay opacity-5"></div>

        {/* Holographic tech icons */}
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <Cpu className="w-16 h-16 text-neon-blue holographic-rotate" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-20">
          <Database className="w-16 h-16 text-neon-purple holographic-rotate" />
        </div>
        <div className="absolute top-2/3 left-1/3 opacity-20">
          <Shield className="w-12 h-12 text-neon-blue holographic-rotate" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-20">
          <Zap className="w-12 h-12 text-neon-pink holographic-rotate" />
        </div>
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-6 z-10 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mb-6 inline-block"
        >
          <div className="terminal-container px-4 py-2 rounded-md border border-neon-blue/30 backdrop-blur-sm holographic-ui">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  securityStatus === 'SCANNING'
                    ? 'bg-neon-yellow animate-pulse'
                    : securityStatus === 'VERIFYING'
                    ? 'bg-neon-red animate-pulse-fast'
                    : 'bg-neon-blue'
                }`}
              ></div>
              <span
                className={`text-xs font-mono ${
                  securityStatus === 'SCANNING'
                    ? 'text-neon-yellow'
                    : securityStatus === 'VERIFYING'
                    ? 'text-neon-red'
                    : 'text-neon-blue'
                }`}
              >
                SECURITY STATUS: {securityStatus}
              </span>
            </div>
            <p className="text-sm font-mono text-neon-blue text-left whitespace-pre-line">
              {terminalText}
              <span
                className={`inline-block w-2 h-4 bg-neon-blue ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
              ></span>
            </p>

            {/* Holographic decorative elements */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 right-0 w-4 h-px bg-neon-blue/50"></div>
              <div className="absolute top-0 right-0 w-px h-4 bg-neon-blue/50"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-4 h-px bg-neon-blue/50"></div>
              <div className="absolute bottom-0 left-0 w-px h-4 bg-neon-blue/50"></div>
            </div>
          </div>
        </motion.div>

        <div
          ref={textRef}
          style={calculateTransform()}
          className="max-w-4xl mx-auto space-y-4 transition-transform duration-200 ease-out"
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white overflow-hidden cyberpunk-heading">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 3.4, ease: [0.33, 1, 0.68, 1] }}
                className="cyberpunk-text-gradient-toxic glitch-text-subtle holographic-text"
                data-text="Dystopian"
              >
                Dystopian
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 3.6, ease: [0.33, 1, 0.68, 1] }}
                className="cyberpunk-text-gradient-warning glitch-text-subtle holographic-text"
                data-text="Cyberpunk"
              >
                Cyberpunk
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 3.8, ease: [0.33, 1, 0.68, 1] }}
                className="cyberpunk-text-gradient-toxic glitch-text-subtle holographic-text"
                data-text="Portfolio"
              >
                Portfolio
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.0 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            A high-tech dystopian portfolio template for creative professionals in a world where design meets the dark
            edge of technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.2 }}
            className="pt-8"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white rounded-full px-8 py-6 h-auto border border-white/10 cyberpunk-button-active relative overflow-hidden group holographic-button"
                onClick={handleViewProjects}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Access Projects</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-white/20 to-neon-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>

                {/* Holographic button effects */}
                <span className="absolute inset-0 holographic-shimmer"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.4 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-neon-blue"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <span className="text-sm">
            Let's update the app/page.tsx file to make the biometric scan faster:
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}