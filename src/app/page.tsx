"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Sun, 
  Moon, 
  X, 
  FileText, 
  MapPin, 
  Layers, 
  Cpu, 
  Box, 
  Printer, 
  Terminal, 
  Flame, 
  Activity, 
  Zap, 
  Cloud, 
  Database, 
  Palette, 
  Gamepad2, 
  Wrench,
  Sparkles,
  GraduationCap,
  FolderGit2,
  FileDown,
  Mail,
  Globe,
  Bot
} from 'lucide-react';

import { 
  SYSTEM_CONFIG, 
  PROJECTS, 
  CORE_SKILLS, 
  EDUCATION_TIMELINE, 
  WORKBENCH_TOOLS, 
  SOFTWARE_STACK, 
  CERTIFICATES,
  ProjectItem,
  CertificateItem 
} from './registry';
import ProbalTerminal from './components/ProbalTerminal';

interface TechItem {
  name: string;
  logo: React.ReactNode;
}

const TECH_STACK: TechItem[] = [
  {
    name: "C / C++",
    logo: <span className="w-5 h-5 rounded-md bg-white text-black font-bold font-mono text-[9px] flex items-center justify-center shrink-0 select-none">C++</span>
  },
  {
    name: "Python",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M11.9 2c-3.1 0-4.9 1.4-4.9 3.4v2.5h5v.8H5.6C3.6 8.7 2 10.3 2 13.4c0 3.1 1.7 4.7 4.7 4.7h1.6v-2.3c0-1.7 1.4-3.1 3.1-3.1h4.9c1.4 0 2.5-1.1 2.5-2.5V5.4C18.8 3.4 17 2 11.9 2zm-1.8 1.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3.8 6.7v2.3c0 1.7-1.4 3.1-3.1 3.1H5.9c-1.4 0-2.5 1.1-2.5 2.5v4.8c0 2 1.8 3.4 6.9 3.4 3.1 0 4.9-1.4 4.9-3.4v-2.5h-5v-.8h6.4c2 0 3.6-1.6 3.6-4.7 0-3.1-1.7-4.7-4.7-4.7h-1.6zm-1.8 11.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
      </svg>
    )
  },
  {
    name: "ESP32 & IoT",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 9h6m-6 3h6m-6 3h6M2 7h3m-3 5h3m-3 5h3m14-10h3m-3 5h3m-3 5h3" />
      </svg>
    )
  },
  {
    name: "KiCad PCB",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <path d="M8.5 6h7M6 8.5v7l4 4h5.5" />
      </svg>
    )
  },
  {
    name: "3D Printing",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 18H4a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-2M6 6V3h12v3m-6 9v3m-4 0h8" />
      </svg>
    )
  },
  {
    name: "Fusion 360",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    name: "Affinity Designer",
    logo: <span className="w-5 h-5 rounded-md bg-white text-black font-bold font-mono text-[10px] flex items-center justify-center shrink-0 select-none">Af</span>
  },
  {
    name: "Git & GitHub",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M21.7 10.9l-8.6-8.6a2 2 0 00-2.8 0L8.7 3.9l3.5 3.5a2.4 2.4 0 013 3l3.4 3.4a2.4 2.4 0 11-1.4 1.4l-3.2-3.2v4.8a2.4 2.4 0 11-2 0V9.8a2.4 2.4 0 01-1.3-3.1L7.2 5.2 2.3 10.1a2 2 0 000 2.8l8.6 8.6a2 2 0 002.8 0l8-8a2 2 0 000-2.8z" />
      </svg>
    )
  },
  {
    name: "Linux & Bash",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )
  },
  {
    name: "Soldering & SMD Rework",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z" />
      </svg>
    )
  },
  {
    name: "Hardware Prototyping",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="17" cy="12" r="1.5" fill="currentColor" />
        <circle cx="7" cy="17" r="1.5" fill="currentColor" />
        <circle cx="12" cy="17" r="1.5" fill="currentColor" />
        <circle cx="17" cy="17" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "MicroPython",
    logo: <span className="w-5 h-5 rounded-md bg-white text-black font-bold font-mono text-[9px] flex items-center justify-center shrink-0 select-none">µPy</span>
  },
  {
    name: "Arduino & PlatformIO",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18.178 8c5.096 0 5.096 8 0 8-2.607 0-4.444-2.193-6.178-4 1.734-1.807 3.571-4 6.178-4zM5.822 8C.726 8 .726 16 5.822 16c2.607 0 4.444-2.193 6.178-4-1.734-1.807-3.571-4-6.178-4z" />
        <path d="M4 12h3.5m9-1.5v3m-1.5-1.5h3" />
      </svg>
    )
  },
  {
    name: "I2C / SPI / UART",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h3l2-6 4 12 3-8 2 4h4" />
      </svg>
    )
  },
  {
    name: "Multimeter & Oscilloscope",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 12l3-4M8 16h.01M16 16h.01" />
      </svg>
    )
  },
  {
    name: "Circuit Schematics & BOM",
    logo: (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h5l2-4 4 8 3-5 2 3h4" />
        <circle cx="2" cy="12" r="1" fill="currentColor" />
        <circle cx="20" cy="14" r="1" fill="currentColor" />
      </svg>
    )
  }
];

export default function ProbalPortfolio() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'education'>('projects');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SYSTEM_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  // --- ANTI-GRAVITY MODE STATE & PHYSICS ---
  const [isAntiGravity, setIsAntiGravity] = useState(false);
  const gravityRafRef = useRef<number>(0);
  const gravityMouseRef = useRef({ x: -9999, y: -9999 });
  const gravityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  interface GravityBody {
    el: HTMLElement;
    homeX: number;
    homeY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    angularVel: number;
    width: number;
    height: number;
  }

  const gravityBodiesRef = useRef<GravityBody[]>([]);

  const activateAntiGravity = useCallback(() => {
    if (isAntiGravity) return;
    setIsAntiGravity(true);

    // Capture all [data-gravity] elements and their current positions
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-gravity]'));
    const bodies: GravityBody[] = elements.map((el) => {
      const rect = el.getBoundingClientRect();
      el.style.willChange = 'transform';
      el.style.transition = 'none';
      el.style.zIndex = '20';
      return {
        el,
        homeX: 0,
        homeY: 0,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 1.5 + 1.0), // upward initial velocity
        rotation: 0,
        angularVel: (Math.random() - 0.5) * 1.2,
        width: rect.width,
        height: rect.height,
      };
    });
    gravityBodiesRef.current = bodies;

    // Mouse tracking for repulsion
    const handleMouse = (e: MouseEvent) => {
      gravityMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    // Physics loop
    const step = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mouse = gravityMouseRef.current;

      for (const body of gravityBodiesRef.current) {
        // Anti-gravity: gentle upward drift
        body.vy -= 0.04;
        // Slight random horizontal perturbation
        body.vx += (Math.random() - 0.5) * 0.08;

        // Mouse repulsion force field (radius ~180px)
        const rect = body.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const force = (180 - dist) / 180 * 0.8;
          body.vx += (dx / dist) * force;
          body.vy += (dy / dist) * force;
        }

        // Damping
        body.vx *= 0.985;
        body.vy *= 0.985;
        body.angularVel *= 0.99;

        // Speed clamp
        const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
        if (speed > 5) {
          body.vx = (body.vx / speed) * 5;
          body.vy = (body.vy / speed) * 5;
        }

        // Update position
        body.x += body.vx;
        body.y += body.vy;
        body.rotation += body.angularVel;

        // Viewport boundary bounce (using transform offsets)
        const elRect = body.el.getBoundingClientRect();
        if (elRect.left + body.vx < 0) { body.vx = Math.abs(body.vx) * 0.6; body.x += 2; }
        if (elRect.right + body.vx > vw) { body.vx = -Math.abs(body.vx) * 0.6; body.x -= 2; }
        if (elRect.top + body.vy < 0) { body.vy = Math.abs(body.vy) * 0.6; body.y += 2; }
        if (elRect.bottom + body.vy > vh) { body.vy = -Math.abs(body.vy) * 0.6; body.y -= 2; }

        // Apply transform
        body.el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
      }

      gravityRafRef.current = requestAnimationFrame(step);
    };

    gravityRafRef.current = requestAnimationFrame(step);

    // Auto snap-back after 8 seconds
    gravityTimerRef.current = setTimeout(() => {
      cancelAnimationFrame(gravityRafRef.current);
      window.removeEventListener('mousemove', handleMouse);

      // Animate snap-back
      for (const body of gravityBodiesRef.current) {
        body.el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        body.el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }

      // Cleanup after animation
      setTimeout(() => {
        for (const body of gravityBodiesRef.current) {
          body.el.style.willChange = '';
          body.el.style.transition = '';
          body.el.style.transform = '';
          body.el.style.zIndex = '';
        }
        gravityBodiesRef.current = [];
        setIsAntiGravity(false);
      }, 900);
    }, 8000);
  }, [isAntiGravity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(gravityRafRef.current);
      if (gravityTimerRef.current) clearTimeout(gravityTimerRef.current);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'bg-[#030712] text-zinc-300' : 'bg-[#fafafa] text-zinc-800'
    }`}>
      {/* --- CLEAN TOP NAVIGATION (EXACT TED STYLE) --- */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm transition-colors ${
        isDark ? 'bg-[#030712]/80 border-b border-zinc-800/60' : 'bg-white/80 border-b border-zinc-200/60'
      }`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-2">
          <nav className="flex items-center gap-3.5 sm:gap-8 text-xs sm:text-sm lowercase overflow-x-auto no-scrollbar">
            <a href="#about" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>home</a>
            <a href="#showcase" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>projects</a>
            <a href="#skills" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>tech stack</a>
            <Link href="/contact" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>contact</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/tools"
              aria-label="Interactive EE Workbench Tools"
              title="EE Workbench Tools"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Wrench size={18} />
            </Link>

            <Link
              href="/arcade"
              aria-label="Micro-Arcade Games"
              title="Micro-Arcade Games"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Gamepad2 size={18} />
            </Link>

            <button
              onClick={() => setIsTerminalOpen(true)}
              aria-label="Toggle Console Terminal"
              title="Toggle Console Terminal"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Terminal size={18} />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN EDITORIAL CONTAINER (CONSTRAINED TO MAX-W-3XL) --- */}
      <main className="mx-auto max-w-3xl px-4 sm:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
        
        {/* --- HERO SECTION (STACKED PHOTO DECK & WARM INTRO) --- */}
        <section id="about" className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between pt-2">
          
          {/* PHOTO STACK DECK (MATCHING SCREENSHOT) */}
          <div className="relative grid h-[210px] w-[155px] sm:h-[235px] sm:w-[175px] place-items-center shrink-0 self-center md:self-auto md:mr-8 select-none">
            {/* Layer 3 - back tilted card */}
            <div 
              className="absolute h-[210px] w-[155px] sm:h-[235px] sm:w-[175px] rounded-2xl overflow-hidden border border-zinc-700/40 shadow-md pointer-events-none transition-transform duration-300"
              style={{ transform: 'rotate(6deg)', backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }}
            />
            {/* Layer 2 - middle tilted card */}
            <div 
              className="absolute h-[210px] w-[155px] sm:h-[235px] sm:w-[175px] rounded-2xl overflow-hidden border border-zinc-700/60 shadow-lg pointer-events-none transition-transform duration-300"
              style={{ transform: 'rotate(-6deg)', backgroundColor: isDark ? '#0f172a' : '#cbd5e1' }}
            />
            {/* Layer 1 - front photo card */}
            <div 
              className={`absolute h-[210px] w-[155px] sm:h-[235px] sm:w-[175px] rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-grab active:cursor-grabbing ${
                isDark ? 'border-zinc-700 bg-zinc-900 shadow-black/80' : 'border-zinc-300 bg-white shadow-zinc-400/50'
              }`}
            >
              <Image 
                src={SYSTEM_CONFIG.profileImage} 
                alt={SYSTEM_CONFIG.name}
                fill
                priority
                sizes="175px"
                className="w-full h-full object-cover object-top select-none"
              />
            </div>
          </div>

          {/* LEFT: TEXT CONTENT */}
          <div className="flex flex-col max-w-md sm:max-w-xl">
            <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              hi probal here. <span className="inline-block">👋</span>
            </h1>

            <p className="mt-2 text-sm sm:text-base font-medium text-zinc-300">
              3rd-year electrical engineering student from West Bengal, India 🇮🇳
            </p>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-sm">
              Hardware by profession, full-stack by passion. I build connected physical devices from schematic to prototype.
            </p>

            <div className="mt-6 space-y-1">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
                <span>For Q&amp;A, start a chat with</span>
                <button 
                  onClick={() => setIsTerminalOpen(true)}
                  className="underline hover:text-white font-bold transition-colors cursor-pointer"
                >
                  Probal Console
                </button>
                <span className="text-white font-bold">↘</span>
              </div>
              <p className="text-xs text-zinc-500">
                For project inquiries or hardware collaboration, reach out via email.
              </p>
            </div>

            {/* ACTION ROW: RESUME + SOCIALS */}
            <div className="mt-6 space-y-2.5">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={SYSTEM_CONFIG.resumeUrl}
                  download="Probal_Khanra_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors h-9 px-4 py-2 border shadow-sm ${
                    isDark 
                      ? 'border-zinc-800 bg-zinc-900/90 text-white hover:bg-zinc-800' 
                      : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <span>Resume</span>
                  <FileDown size={16} />
                </a>

                <div className="flex items-center gap-5 text-zinc-400">
                  <a
                    href={SYSTEM_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={SYSTEM_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={`mailto:${SYSTEM_CONFIG.email}`}
                    className="hover:text-white transition-colors"
                    title="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>

              {/* OPEN TO INTERNSHIP STATUS */}
              <div className="flex items-center gap-2 text-xs pt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className={`font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  open to internship &amp; engineering opportunities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SEGMENTED TABS: WORK & EDUCATION (MATCHING SCREENSHOT) --- */}
        <section id="showcase" className="space-y-4">
          <div className={`h-10 items-center justify-center rounded-lg p-1 grid w-full grid-cols-2 border shadow-sm ${
            isDark ? 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
          }`}>
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? isDark ? 'bg-zinc-900 text-white shadow font-semibold' : 'bg-white text-zinc-950 shadow font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === 'education'
                  ? isDark ? 'bg-zinc-900 text-white shadow font-semibold' : 'bg-white text-zinc-950 shadow font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Education
            </button>
          </div>

          {/* ENCLOSED TIMELINE CARD CONTAINER (MATCHING SCREENSHOT) */}
          <div className={`rounded-xl border shadow overflow-hidden ${
            isDark ? 'bg-zinc-950/60 border-zinc-800/90 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800'
          }`}>
            <div className="p-4 sm:p-8">
              
              {/* TAB 1: WORK / PROJECTS VIEW */}
              {activeTab === 'projects' && (
                <ul className="ml-8 sm:ml-10 border-l border-zinc-800 space-y-8 sm:space-y-10">
                  {PROJECTS.map((proj) => (
                    <li key={proj.id} className="relative ml-8 sm:ml-10 py-1">
                      <div className={`absolute -left-[45px] sm:-left-16 top-0.5 flex items-center justify-center rounded-full border shadow-md w-10 h-10 sm:w-12 sm:h-12 overflow-hidden ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}>
                        <Cpu size={20} />
                      </div>

                      <div className="flex flex-1 flex-col justify-start gap-1.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h2 className={`text-base font-semibold leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                            {proj.title}
                          </h2>
                          <span className="text-xs font-mono text-emerald-400 font-semibold">{proj.status}</span>
                        </div>

                        <p className="text-xs font-mono text-zinc-400">{proj.tech}</p>

                        {/* PROJECT BULLET POINTS (RATHER THAN PLAIN TEXT BLOCK) */}
                        <ul className="mt-2 list-outside list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {proj.highlights && proj.highlights.length > 0 ? (
                            proj.highlights.map((point, idx) => (
                              <li key={idx} className="marker:text-zinc-500">
                                {point}
                              </li>
                            ))
                          ) : (
                            proj.description
                              .split('. ')
                              .filter(Boolean)
                              .map((sentence, idx) => (
                                <li key={idx} className="marker:text-zinc-500">
                                  {sentence.endsWith('.') ? sentence : `${sentence}.`}
                                </li>
                              ))
                          )}
                        </ul>

                        {/* PROJECT CHIPS & ACTION BUTTONS */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white hover:bg-zinc-200 text-zinc-950 shadow transition-colors"
                            >
                              <Globe size={12} />
                              <span>Live Demo</span>
                            </a>
                          )}
                          <a
                            href={proj.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
                              isDark ? 'border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                            }`}
                          >
                            <Github size={12} />
                            <span>Source</span>
                          </a>
                          <button
                            onClick={() => setSelectedProject(proj)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                              isDark ? 'border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                            }`}
                          >
                            <Wrench size={12} />
                            <span>Specs &amp; BOM</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* TAB 2: EDUCATION VIEW (WITH USER LOGO SLOTS & MONOGRAM FALLBACK) */}
              {activeTab === 'education' && (
                <ul className="ml-8 sm:ml-10 border-l border-zinc-800 space-y-8 sm:space-y-10">
                  
                  {/* ITEM 1: BCREC */}
                  <li className="relative ml-8 sm:ml-10 py-1">
                    <div className="absolute -left-[45px] sm:-left-16 top-0.5 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 shadow-md w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-white p-1">
                      <img 
                        src="/institutes/bcrec.png" 
                        alt="BCREC Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-bold text-xs font-mono text-zinc-900 hidden">BCR</span>
                    </div>

                    <div className="flex flex-1 flex-col justify-start gap-1.5">
                      <h2 className={`text-base font-semibold leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        Dr. B. C. Roy Engineering College (BCREC)
                      </h2>

                      <div className="flex flex-col gap-1 mt-0.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="text-sm font-medium text-zinc-400">B.Tech — Electrical Engineering</p>
                          <time className="whitespace-nowrap text-xs tabular-nums text-zinc-500 font-mono">2024 — 2028 · Ongoing</time>
                        </div>

                        <ul className="ml-4 mt-2 list-outside list-disc space-y-1.5 text-sm text-zinc-400">
                          <li>Focusing on embedded systems, microcontroller architecture, circuit analysis, and power electronics.</li>
                          <li>Hands-on practical development of custom multi-sensor PCB telemetry hardware and IoT nodes.</li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* ITEM 2: HIGHER SECONDARY VOCATIONAL */}
                  <li className="relative ml-8 sm:ml-10 py-1">
                    <div className="absolute -left-[45px] sm:-left-16 top-0.5 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 shadow-md w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-white p-1">
                      <img 
                        src="/institutes/vocational.png" 
                        alt="WBSCTVESD Vocational Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-bold text-xs font-mono text-zinc-900 hidden">ACR</span>
                    </div>

                    <div className="flex flex-1 flex-col justify-start gap-1.5">
                      <h2 className={`text-base font-semibold leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        Anandanagar A. C. Roy High School, Singur
                      </h2>

                      <div className="flex flex-col gap-1 mt-0.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="text-sm font-medium text-zinc-400">Higher Secondary (10+2) — Vocational Stream (Automobile)</p>
                          <time className="whitespace-nowrap text-xs tabular-nums text-zinc-500 font-mono">2022 — 2024 · Completed</time>
                        </div>

                        <ul className="ml-4 mt-2 list-outside list-disc space-y-1.5 text-sm text-zinc-400">
                          <li>Practical training in automobile electrical and mechanical subsystems, engines, and workshop technology.</li>
                          <li>Foundational CAD drafting, circuit diagnostics, and technical fabrication.</li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* ITEM 3: SECONDARY */}
                  <li className="relative ml-8 sm:ml-10 py-1">
                    <div className="absolute -left-[45px] sm:-left-16 top-0.5 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 shadow-md w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-white p-1">
                      <img 
                        src="/institutes/secondary.png" 
                        alt="WBBSE Secondary Education Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-bold text-xs font-mono text-zinc-900 hidden">ACR</span>
                    </div>

                    <div className="flex flex-1 flex-col justify-start gap-1.5">
                      <h2 className={`text-base font-semibold leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        Anandanagar A. C. Roy High School, Singur
                      </h2>

                      <div className="flex flex-col gap-1 mt-0.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="text-sm font-medium text-zinc-400">Secondary Education (10th Standard)</p>
                          <time className="whitespace-nowrap text-xs tabular-nums text-zinc-500 font-mono">2020 — 2022 · Completed</time>
                        </div>

                        <ul className="ml-4 mt-2 list-outside list-disc space-y-1.5 text-sm text-zinc-400">
                          <li>Core physical sciences, mathematics, and analytical fundamentals with high academic distinction.</li>
                        </ul>
                      </div>
                    </div>
                  </li>

                </ul>
              )}
            </div>
          </div>
        </section>

        {/* --- TECH STACK (MATCHING USER SCREENSHOT) --- */}
        <section id="skills" className="space-y-6">
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all hover:scale-105 select-none ${
                  isDark 
                    ? 'bg-zinc-900/80 border-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-800/90' 
                    : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 shadow-sm'
                }`}
              >
                {tech.logo}
                <span className="text-xs sm:text-sm font-medium tracking-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- CERTIFICATIONS & VERIFIED CREDENTIALS --- */}
        <section id="certificates" className="space-y-6" data-gravity>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Certifications
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Official training programs and verified technical certificates.
              </p>
            </div>
            <a
              href={SYSTEM_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                {/* CLEAN DOCUMENT PREVIEW */}
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="cursor-pointer overflow-hidden bg-zinc-950 aspect-[16/11] relative"
                >
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-xs text-zinc-500">
                      Certificate Preview
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {cert.issued}
                    </span>
                    <h3 className={`text-sm font-bold tracking-tight leading-snug line-clamp-2 ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        <FileText size={12} />
                        <span>View PDF</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className={`text-xs transition-colors ${
                        isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT & FOOTER --- */}
        <footer id="contact" className="pt-12 pb-16 border-t border-zinc-200 dark:border-zinc-800/80 space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Let&apos;s build something together.
              </h3>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Available for hardware engineering roles, firmware projects, and circuit collaboration.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyEmail}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                  isDark 
                    ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200' 
                    : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 shadow-sm'
                }`}
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to clipboard' : 'Copy Email'}</span>
              </button>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SYSTEM_CONFIG.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  isDark 
                    ? 'bg-zinc-100 text-zinc-900 hover:bg-white' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                Send Email
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()} {SYSTEM_CONFIG.name}. Built with Next.js & Tailwind CSS.
              <Link 
                href="/bday" 
                aria-label="Secret"
                title="✦"
                className="opacity-20 hover:opacity-80 transition-opacity text-[11px] ml-1 select-none cursor-default"
              >
                ✦
              </Link>
            </p>
            <div className="flex items-center gap-4">
              <a href={SYSTEM_CONFIG.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <a href={SYSTEM_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              <Link href="/tools" className="hover:underline text-zinc-400 hover:text-white">EE Tools</Link>
              <Link href="/arcade" className="hover:underline text-amber-500">Arcade</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* --- PROJECT SPECS MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border shadow-xl relative ${
                isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-5 right-5 p-1.5 rounded-lg border transition-all ${
                  isDark ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">Technical Specifications</span>
                  <h3 className="text-2xl font-bold tracking-tight mt-1">{selectedProject.title}</h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">{selectedProject.tech}</p>
                </div>

                {/* PINOUT MAPPINGS */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-zinc-400">Microcontroller Pinout Routing</h4>
                  <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <table className="w-full text-xs text-left">
                      <thead className={`font-mono border-b ${isDark ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>
                        <tr>
                          <th className="p-2.5">ESP32 Pin</th>
                          <th className="p-2.5">Component Target</th>
                          <th className="p-2.5">Bus Protocol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80 font-mono">
                        {selectedProject.pinouts.map((pin, i) => (
                          <tr key={i}>
                            <td className="p-2.5 text-white font-bold">{pin.pin}</td>
                            <td className="p-2.5">{pin.target}</td>
                            <td className="p-2.5 text-zinc-500">{pin.bus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* BILL OF MATERIALS */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-zinc-400">Bill of Materials (BOM)</h4>
                  <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <table className="w-full text-xs text-left">
                      <thead className={`font-mono border-b ${isDark ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>
                        <tr>
                          <th className="p-2.5">Component</th>
                          <th className="p-2.5">Specification & Role</th>
                          <th className="p-2.5 text-right">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
                        {selectedProject.bom.map((item, i) => (
                          <tr key={i}>
                            <td className="p-2.5 font-semibold text-zinc-200">{item.component}</td>
                            <td className="p-2.5 text-zinc-400">{item.reason}</td>
                            <td className="p-2.5 text-right font-mono text-zinc-500">{item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-700 hover:bg-zinc-800 text-zinc-200"
                  >
                    Close Specs
                  </button>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-200 text-zinc-950 font-semibold shadow flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Live Project</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CERTIFICATE PREVIEW MODAL --- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border shadow-2xl relative ${
                isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className={`absolute top-5 right-5 p-1.5 rounded-lg border transition-all ${
                  isDark ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                <X size={16} />
              </button>

              <div className="space-y-5">
                {/* DOCUMENT PREVIEW */}
                {selectedCert.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black/50 flex items-center justify-center p-2">
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="w-full max-h-[50vh] object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* METADATA */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Official Credential</span>
                  <h3 className="text-xl font-bold tracking-tight">{selectedCert.title}</h3>
                  <p className="text-xs text-zinc-400">
                    Issued by <strong className="text-zinc-200 font-semibold">{selectedCert.issuer}</strong> · Date: {selectedCert.issued}
                  </p>
                  {selectedCert.credentialId && (
                    <p className="text-xs font-mono text-zinc-500">ID: {selectedCert.credentialId}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className={`text-xs px-2.5 py-0.5 rounded border font-mono ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between flex-wrap gap-3">
                  <a
                    href={selectedCert.verificationUrl || selectedCert.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isDark ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    <span>Verify Online</span>
                    <ExternalLink size={12} />
                  </a>

                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-200 text-zinc-950 font-semibold shadow flex items-center gap-1.5 transition-colors"
                    >
                      <FileText size={13} />
                      <span>Open PDF</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PROBAL TERMINAL CHAT / EASTER EGG --- */}
      <ProbalTerminal 
        isDark={isDark} 
        isOpen={isTerminalOpen} 
        setIsOpen={setIsTerminalOpen} 
        hideFloatingTrigger={true} 
      />
    </div>
  );
}
