"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Sun, 
  Moon, 
  X, 
  Gamepad2,
  Wrench,
  FileText,
  Cloud,
  Tv,
  Palette,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
// Importing dashboard data and types
import { PROJECTS, CORE_SKILLS, SYSTEM_CONFIG, ProjectItem, EDUCATION_TIMELINE, WORKBENCH_TOOLS, SOFTWARE_STACK, CERTIFICATES } from './registry';
import ProbalTerminal from './components/ProbalTerminal';

interface IParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  update: (w: number, h: number) => void;
}

export default function ProbalPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const copyEmail = () => {
    navigator.clipboard.writeText(SYSTEM_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Ultra-High Performance Viewport-Fixed Particle Canvas (Zero Reflows)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2x for retina battery/GPU efficiency
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    class Particle implements IParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      alpha: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2 + 1.2;
        this.baseAlpha = Math.random() * 0.3 + 0.2;
        this.alpha = this.baseAlpha;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Friction damping
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Maintain float speed
        if (Math.abs(this.vx) < 0.15) this.vx += (Math.random() - 0.5) * 0.15;
        if (Math.abs(this.vy) < 0.15) this.vy += (Math.random() - 0.5) * 0.15;

        // Viewport boundary bounce
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse pointer repulsion
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = 120;
        const maxDistSq = maxDist * maxDist;

        if (distSq < maxDistSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (maxDist - dist) / maxDist;
          const pushAngle = Math.atan2(dy, dx);
          this.vx -= Math.cos(pushAngle) * force * 0.5;
          this.vy -= Math.sin(pushAngle) * force * 0.5;
          this.alpha = Math.min(0.85, this.baseAlpha + force * 0.35);
        } else {
          if (this.alpha > this.baseAlpha) this.alpha -= 0.02;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = width < 768;
      const count = isMobile 
        ? Math.min(Math.floor((width * height) / 28000), 30) 
        : Math.min(Math.floor((width * height) / 20000), 55);
      
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
      }
    };

    setupCanvas();
    initParticles();

    const maxDist = 135;
    const maxDistSq = maxDist * maxDist;
    const mmaxDist = 160;
    const mmaxDistSq = mmaxDist * mmaxDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particleCount = particles.length;
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.update(width, height);

        // 1. Draw connecting lines between nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.3;
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(59, 130, 246, ${lineAlpha})` 
              : `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 2. Connect particle to mouse cursor with tracer line
        const mdx = mouseRef.current.x - p1.x;
        const mdy = mouseRef.current.y - p1.y;
        const mdistSq = mdx * mdx + mdy * mdy;

        if (mdistSq < mmaxDistSq) {
          const mdist = Math.sqrt(mdistSq);
          const mAlpha = (1 - mdist / mmaxDist) * 0.5;
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(96, 165, 250, ${mAlpha})` 
            : `rgba(29, 78, 216, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }

        // 3. Draw particle dot
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(96, 165, 250, ${p1.alpha})` 
          : `rgba(37, 99, 235, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      setupCanvas();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <main 
      className={`min-h-screen font-sans selection:bg-blue-500/20 overflow-x-hidden relative transition-colors duration-500 ${
        isDark ? 'bg-[#09090b] text-zinc-300' : 'bg-[#f4f4f5] text-zinc-800'
      }`}
    >
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
          isDark ? 'opacity-[0.75]' : 'opacity-[0.65]'
        }`} 
      />

      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] z-50 origin-left ${isDark ? 'bg-white' : 'bg-blue-600'}`} 
        style={{ scaleX }} 
      />

      {/* TOP HEADER / CONTROLS WITH LABELS (MOBILE RESPONSIVE - MONOCHROME GRAYSCALE) */}
      <header className="fixed top-3 right-3 sm:top-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-3">
        {/* MINI GAME LAUNCHER BUTTON */}
        <Link
          href="/arcade"
          aria-label="Open Hardware Arcade Games Page"
          className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all hover:scale-105 shadow-sm flex items-center gap-1.5 sm:gap-2 ${
            isDark 
              ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white' 
              : 'bg-white/90 border-zinc-200 text-zinc-800 hover:bg-zinc-100 shadow-sm'
          }`}
          title="Play Hardware Mini-Games"
        >
          <Gamepad2 size={15} />
          <span className="text-[11px] sm:text-xs font-bold font-sans">Arcade</span>
        </Link>

        {/* WORKBENCH UTILITIES LAUNCHER BUTTON */}
        <Link
          href="/tools"
          aria-label="Open Practical Engineering Tools"
          className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all hover:scale-105 shadow-sm flex items-center gap-1.5 sm:gap-2 ${
            isDark 
              ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white' 
              : 'bg-white/90 border-zinc-200 text-zinc-800 hover:bg-zinc-100 shadow-sm'
          }`}
          title="Practical EE Workbench Tools"
        >
          <Wrench size={15} />
          <span className="text-[11px] sm:text-xs font-bold font-sans">Tools</span>
        </Link>

        {/* THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all hover:scale-105 shadow-sm flex items-center gap-1.5 sm:gap-2 ${
            isDark 
              ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white' 
              : 'bg-white/90 border-zinc-200 text-zinc-800 hover:bg-zinc-100 shadow-sm'
          }`}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
          <span className="text-[11px] sm:text-xs font-bold font-sans">{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </header>

      <div className="relative z-10 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className={`min-h-screen py-24 md:py-0 flex flex-col justify-center border-b ${isDark ? 'border-white/5' : 'border-slate-300'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            <motion.div 
              className="md:col-span-8" 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
            >
              {/* MOBILE PROFILE AVATAR HEADER */}
              <div className="flex md:hidden items-center gap-3.5 mb-6">
                <div className={`w-20 h-20 rounded-2xl relative overflow-hidden shrink-0 border-2 shadow-xl ${
                  isDark ? 'border-blue-500/40 bg-zinc-900 shadow-blue-500/10' : 'border-blue-600/40 bg-white shadow-slate-300'
                }`}>
                  <Image 
                    src={SYSTEM_CONFIG.profileImage} 
                    alt={SYSTEM_CONFIG.name}
                    fill
                    priority
                    sizes="80px"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                </div>

                <div className="space-y-1">
                  <div className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 ${
                    isDark ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    <MapPin size={13} className="shrink-0" />
                    <span>{SYSTEM_CONFIG.location}</span>
                  </div>
                  <span className={`text-[11px] font-mono block ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    EE Student @ BCREC
                  </span>
                </div>
              </div>

              <h1 className={`text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter leading-none mb-3 ${isDark ? 'text-white/95' : 'text-slate-950'}`}>
                {SYSTEM_CONFIG.name}
              </h1>

              {/* DESKTOP LOCATION BADGE */}
              <div className={`hidden md:flex text-xs md:text-sm font-mono uppercase tracking-[0.2em] font-bold mb-6 md:mb-8 items-center gap-2 ${
                isDark ? 'text-blue-400' : 'text-blue-700'
              }`}>
                <MapPin size={14} className="shrink-0" />
                <span>{SYSTEM_CONFIG.location}</span>
              </div>

              <p className={`text-base sm:text-xl md:text-2xl max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-900'}`}>
                {SYSTEM_CONFIG.tagline}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className={`flex items-center gap-6 ${isDark ? 'text-white/40' : 'text-slate-700'}`}>
                  <a 
                    href={SYSTEM_CONFIG.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub Profile" 
                    className={`transition-all hover:scale-110 ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
                  >
                    <Github size={22} />
                  </a>
                  <a 
                    href={SYSTEM_CONFIG.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn Profile" 
                    className={`transition-all hover:scale-110 ${isDark ? 'hover:text-white' : 'hover:text-slate-950'}`}
                  >
                    <Linkedin size={22} />
                  </a>
                </div>

                {/* CV DOWNLOAD BUTTON */}
                <a
                  href={SYSTEM_CONFIG.resumeUrl}
                  download="Probal_Khanra_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV PDF"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-md ${
                    isDark
                      ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-blue-600/20'
                      : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  }`}
                >
                  <FileText size={14} />
                  <span>Download_CV</span>
                </a>
              </div>
            </motion.div>

            {/* --- DESKTOP TALL IMAGE MODULE --- */}
            <motion.div 
              className="md:col-span-4 hidden md:flex justify-end mt-4 md:mt-0" 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={`w-full max-w-[320px] aspect-[3/4] rounded-3xl relative overflow-hidden group shadow-2xl ${
                isDark 
                  ? 'bg-[#0a0a0a] border border-white/10 shadow-blue-500/5' 
                  : 'bg-[#cbd5e1] border border-slate-500 shadow-slate-600/30'
              }`}>
                <Image 
                  src={SYSTEM_CONFIG.profileImage} 
                  alt={SYSTEM_CONFIG.name}
                  fill
                  priority
                  sizes="320px"
                  className="w-full h-full object-cover grayscale-0 opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 z-10 ${
                  isDark ? 'from-[#020202]' : 'from-[#94a3b8]'
                }`} />
                <div className={`absolute inset-0 border-[1px] rounded-3xl pointer-events-none z-10 ${
                  isDark ? 'border-white/5' : 'border-slate-400/40'
                }`} />
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- WORK & SKILLS SECTION --- */}
        <section className="py-16 md:py-32">
          {/* Currently Working/Learning */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className={`flex items-center gap-3 mb-10 md:mb-16 p-3.5 sm:p-4 border rounded-2xl inline-flex max-w-full ${
              isDark 
                ? 'bg-white/[0.03] border-white/10' 
                : 'bg-[#cbd5e1] border-slate-500 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className={`text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold truncate ${isDark ? 'text-white/60' : 'text-slate-800'}`}>
              Current Focus: <span className={`font-mono uppercase ${isDark ? 'text-white' : 'text-slate-950 font-bold'}`}>{SYSTEM_CONFIG.currentFocus}</span>
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
            {/* Projects (Left) */}
            <div className="md:col-span-7 space-y-8">
              <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-6 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>Featured Projects</h2>

              <div className="space-y-6">
                {PROJECTS.map((p) => (
                  <div 
                    key={p.id} 
                    className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                      isDark 
                        ? 'border-zinc-800 bg-zinc-900/90 hover:border-blue-500/40' 
                        : 'border-zinc-200 bg-white shadow-sm hover:border-blue-500'
                    }`}
                  >
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(p)}
                          className="text-left group/title"
                        >
                          <h3 className={`text-2xl md:text-3xl font-bold transition-colors tracking-tight italic ${
                            isDark 
                              ? 'text-white group-hover/title:text-blue-400' 
                              : 'text-zinc-900 group-hover/title:text-blue-600'
                          }`}>
                            {p.title}
                          </h3>
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProject(p)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-mono uppercase font-bold transition-all ${
                              isDark
                                ? 'bg-zinc-800 border-zinc-700 text-blue-400 hover:bg-zinc-700'
                                : 'bg-zinc-100 border-zinc-200 text-blue-600 hover:bg-zinc-200 shadow-sm'
                            }`}
                            title="View Technical Specs & Schematics"
                          >
                            <span>Specs</span>
                          </button>

                          <a 
                            href={p.repo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`View ${p.title} repository`} 
                            className={`p-2 rounded-xl border transition-colors ${
                              isDark ? 'border-zinc-800 text-zinc-400 hover:text-white' : 'border-zinc-200 text-zinc-600 hover:text-zinc-900'
                            }`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>

                      <span className={`text-[10px] uppercase font-mono tracking-widest block ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600 font-semibold'
                      }`}>{p.tech}</span>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {p.manifest.map(item => (
                          <span 
                            key={item} 
                            className={`text-[9px] font-mono border px-2 py-0.5 rounded-lg uppercase font-bold ${
                              isDark ? 'border-zinc-800 text-zinc-300 bg-zinc-950' : 'border-zinc-200 text-zinc-700 bg-zinc-100'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Workbench (Right - Sticky on desktop) */}
            <div className="md:col-span-5 space-y-8 md:sticky md:top-28 self-start">
              {/* Skills & Tools */}
              <div>
                <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-6 ${
                  isDark ? 'text-blue-400' : 'text-blue-700'
                }`}>Skills & Tools</h2>

                <div className="space-y-3">
                  {CORE_SKILLS.map((skill) => (
                    <div 
                      key={skill.name} 
                      className={`p-3.5 border rounded-xl transition-all group ${
                        isDark 
                          ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' 
                          : 'bg-[#cbd5e1] border-slate-500 hover:bg-[#e2e8f0] shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] uppercase font-bold tracking-[0.15em] transition-colors ${
                          isDark ? 'text-gray-300 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-[9px] font-mono uppercase tracking-widest ${
                          isDark ? 'text-blue-400/70' : 'text-blue-700/80 font-bold'
                        }`}>
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Workbench */}
              <div>
                <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-6 pt-2 ${
                  isDark ? 'text-blue-400' : 'text-blue-700'
                }`}>Hardware Workbench</h2>

                <div className="grid grid-cols-2 gap-2.5">
                  {WORKBENCH_TOOLS.map((tool) => (
                    <div 
                      key={tool.name} 
                      className={`p-3 border rounded-xl transition-all group ${
                        isDark 
                          ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' 
                          : 'bg-[#cbd5e1] border-slate-500 hover:bg-[#e2e8f0] shadow-sm'
                      }`}
                      title={tool.desc}
                    >
                      <span className={`text-[10px] uppercase font-bold tracking-[0.1em] transition-colors block truncate ${
                        isDark ? 'text-gray-400 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950'
                      }`}>
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud, Backend & Creative Stack */}
              <div>
                <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-6 pt-2 ${
                  isDark ? 'text-blue-400' : 'text-blue-700'
                }`}>Cloud, Backend & Creative</h2>

                <div className="space-y-2.5">
                  {SOFTWARE_STACK.map((item) => (
                    <div 
                      key={item.name}
                      className={`p-3 border rounded-xl transition-all group ${
                        isDark 
                          ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' 
                          : 'bg-[#cbd5e1] border-slate-500 hover:bg-[#e2e8f0] shadow-sm'
                      }`}
                      title={item.desc}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase font-bold tracking-[0.1em] transition-colors ${
                          isDark ? 'text-gray-300 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-950'
                        }`}>
                          {item.name}
                        </span>
                        <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded border ${
                          isDark ? 'border-zinc-800 text-blue-400 bg-zinc-950' : 'border-slate-300 text-blue-700 bg-white font-semibold'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section className={`py-32 border-t ${isDark ? 'border-white/5' : 'border-slate-400/60'}`}>
          <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-10 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>Education</h2>

          <div className="space-y-6">
            {EDUCATION_TIMELINE.map((edu) => (
              <div 
                key={edu.id} 
                className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                  isDark 
                    ? 'border-zinc-800 bg-zinc-900/90 hover:border-blue-500/40' 
                    : 'border-zinc-200 bg-white shadow-sm hover:border-blue-500'
                }`}
              >
                <div className="relative z-10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className={`text-2xl font-bold tracking-tight italic ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}>{edu.degree}</h3>
                      <span className={`text-[10px] uppercase font-mono tracking-widest block mt-1 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600 font-semibold'
                      }`}>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg border font-bold ${
                        isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}>{edu.year}</span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg border font-bold ${
                        isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                      }`}>{edu.status}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {edu.highlights.map(h => (
                      <span 
                        key={h} 
                        className={`text-[9px] font-mono border px-2 py-0.5 rounded-lg uppercase font-bold ${
                          isDark ? 'border-zinc-800 text-zinc-300 bg-zinc-950' : 'border-zinc-200 text-zinc-700 bg-zinc-100'
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CERTIFICATIONS & LICENSES --- */}
        <section className={`py-32 border-t ${isDark ? 'border-white/5' : 'border-slate-400/60'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className={`text-xs font-mono uppercase tracking-widest font-bold mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>Certifications & Licenses</h2>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Verified credentials & technical certifications from LinkedIn.</p>
            </div>
            <a 
              href={SYSTEM_CONFIG.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-xs font-mono font-bold hover:underline ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              <span>View All on LinkedIn</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert) => (
              <div 
                key={cert.id} 
                className={`group relative overflow-hidden rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                  isDark 
                    ? 'border-zinc-800 bg-zinc-900/90 hover:border-blue-500/40' 
                    : 'border-zinc-200 bg-white shadow-sm hover:border-blue-500'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border font-bold ${
                      isDark ? 'bg-zinc-800 border-zinc-700 text-blue-400' : 'bg-zinc-100 border-zinc-200 text-blue-600'
                    }`}>Issued {cert.issued}</span>
                    <a 
                      href={cert.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                      title="Verify on LinkedIn"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold tracking-tight italic ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>{cert.title}</h3>
                    <span className={`text-[10px] uppercase font-mono tracking-widest block mt-1 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600 font-semibold'
                    }`}>{cert.issuer}</span>

                    {cert.credentialId && (
                      <span className={`text-[9px] font-mono block mt-2 truncate ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}>
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-6">
                  {cert.skills.map(s => (
                    <span 
                      key={s} 
                      className={`text-[9px] font-mono border px-2 py-0.5 rounded-lg uppercase font-bold ${
                        isDark ? 'border-zinc-800 text-zinc-400 bg-zinc-950' : 'border-zinc-200 text-zinc-600 bg-zinc-100'
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* --- CONTACT HUB --- */}
        <section className={`py-32 border-t ${isDark ? 'border-white/5' : 'border-slate-400/60'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <h3 className={`text-4xl font-bold tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Get in Touch
            </h3>
            
            <div className={`flex flex-col gap-6 font-mono text-xs ${
              isDark ? 'text-gray-400' : 'text-slate-900'
            }`}>
              {/* GMAIL LINK + COPY BUTTON */}
              <div className="flex items-center gap-4 group">
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SYSTEM_CONFIG.email}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`transition-colors flex items-center gap-4 ${
                    isDark ? 'hover:text-white' : 'hover:text-slate-950 font-bold'
                  }`}
                >
                  <span className="text-blue-500 font-bold">Email:</span> {SYSTEM_CONFIG.email}
                </a>
                
                <button 
                  onClick={copyEmail}
                  className={`p-2 rounded-lg transition-all ${
                    isDark 
                      ? 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10' 
                      : 'bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Copy Email"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* LINKEDIN LINK */}
              <a 
                href={SYSTEM_CONFIG.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors flex items-center gap-4 group ${
                  isDark ? 'hover:text-white' : 'hover:text-slate-950 font-bold'
                }`}
              >
                <span className="text-blue-500 font-bold group-hover:translate-x-1 transition-transform">LinkedIn:</span> /in/{SYSTEM_CONFIG.linkedin.split('/').pop()}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* --- PROJECT SPECS / SCHEMATICS DRAWER MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 border shadow-2xl font-mono ${
                isDark 
                  ? 'bg-[#0a0a0a] border-white/15 text-gray-300 shadow-blue-500/10' 
                  : 'bg-[#cbd5e1] border-slate-500 text-slate-950 shadow-2xl'
              }`}
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b pb-4 border-blue-500/20">
                <div>
                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest block">[ SPECS_MANIFEST ]</span>
                  <h2 className={`text-2xl font-bold tracking-tighter italic ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {selectedProject.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-xl border transition-all ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-900'
                  }`}
                  aria-label="Close Specs Modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* MINIMAL MATERIALS, QUANTITY & PURPOSE LIST */}
              <div className="mt-6 space-y-3 text-xs">
                {selectedProject.bom.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/5 hover:border-white/10 text-gray-300' 
                        : 'bg-[#e2e8f0] border-slate-400 hover:border-slate-500 text-slate-950 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm tracking-wide">{item.component}</span>
                      <span className="font-mono text-blue-500 font-bold text-xs bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        x{item.qty}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1.5 leading-relaxed font-sans ${
                      isDark ? 'text-gray-400' : 'text-slate-700'
                    }`}>
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INTERACTIVE PROBAL TERMINAL (EASTER EGG) --- */}
      <ProbalTerminal isDark={isDark} />
    </main>
  );
}