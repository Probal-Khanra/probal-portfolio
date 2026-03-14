"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Copy, Check, Box } from 'lucide-react';
// Importing your dashboard data
import { PROJECTS, CORE_SKILLS, SYSTEM_CONFIG } from './registry';

export default function ProbalPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

 const copyEmail = () => {
  navigator.clipboard.writeText(SYSTEM_CONFIG.email);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    
    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 200) {
          const force = (200 - distance) / 200;
          this.x -= (dx / distance) * force * 12;
          this.y -= (dy / distance) * force * 12;
        } else { this.x += this.vx; this.y += this.vy; }
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
    }

    const init = () => { resize(); particles = Array.from({ length: 85 }, () => new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * (1 - dist / 160)})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    init(); animate();
    return () => { 
      window.removeEventListener('resize', resize); 
      window.removeEventListener('mousemove', handleMouseMove); 
    };
  }, []);

  return (
    <main className="min-h-[160vh] bg-[#020202] text-gray-500 font-sans selection:bg-white/10 overflow-x-hidden relative">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-[0.65]" />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-white z-50 origin-left" style={{ scaleX }} />

      <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="h-screen flex flex-col justify-center border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <motion.div className="md:col-span-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-8xl md:text-[10rem] font-bold text-white/95 tracking-tighter leading-none mb-8">
                {SYSTEM_CONFIG.name}
              </h1>
              <p className="text-xl md:text-2xl max-w-xl leading-relaxed text-gray-400">
                {SYSTEM_CONFIG.tagline}
              </p>
              
              <div className="flex gap-8 mt-12 text-white/40">
                <a href={SYSTEM_CONFIG.github} target="_blank" className="hover:text-white transition-all hover:scale-110"><Github size={22} /></a>
                <a href={SYSTEM_CONFIG.linkedin} target="_blank" className="hover:text-white transition-all hover:scale-110"><Linkedin size={22} /></a>
              </div>
            </motion.div>

            {/* --- IMAGE MODULE --- */}
            <motion.div 
              className="md:col-span-4 hidden md:flex justify-end" 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full max-w-[320px] aspect-[3/4] bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden group shadow-2xl shadow-blue-500/5">
                <img 
                  src={SYSTEM_CONFIG.profileImage} 
                  alt={SYSTEM_CONFIG.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 border-[1px] border-white/5 rounded-3xl pointer-events-none" />
                <div className="absolute top-4 right-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Identity_Verified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- WORK & SKILLS SECTION --- */}
        <section className="py-32">
          {/* Currently Working/Learning (Pulled from Registry) */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 mb-16 p-4 bg-white/[0.03] border border-white/10 rounded-2xl inline-flex"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
              Current Focus: <span className="text-white font-mono uppercase">{SYSTEM_CONFIG.currentFocus}</span>
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            {/* Projects (Left) */}
            <div className="md:col-span-7 space-y-16">
              <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-10 italic">Selected_Archive</h2>
              {PROJECTS.map((p) => (
                <div key={p.title} className="group border-b border-white/5 pb-10">
                  <a href={p.repo} target="_blank" className="flex items-center justify-between group/link">
                    <h3 className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors tracking-tighter italic">{p.title}</h3>
                    <ExternalLink size={18} className="text-white/10 group-hover/link:text-blue-500 transition-colors" />
                  </a>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-600 mt-2 block mb-4">{p.tech}</span>
                  
                  <div className="flex flex-wrap gap-2 mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Box size={10} className="mt-1" />
                    {p.manifest.map(item => (
                      <span key={item} className="text-[9px] font-mono border border-white/10 px-1.5 py-0.5 rounded uppercase">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills (Right) */}
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-10 italic">Core_Expertise</h2>
              {CORE_SKILLS.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all group">
                  <div className="text-blue-500/50 group-hover:text-blue-400 transition-colors">{skill.icon}</div>
                  <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-gray-500 group-hover:text-white">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT HUB --- */}
<section className="py-32 border-t border-white/5">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <h3 className="text-4xl font-bold text-white tracking-tighter italic leading-none">Initialize <br /> Connection_</h3>
    <div className="flex flex-col gap-6 font-mono text-gray-500 text-xs">
      
      {/* GMAIL LINK + COPY BUTTON */}
      <div className="flex items-center gap-4 group">
        <a 
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SYSTEM_CONFIG.email}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors flex items-center gap-4"
        >
          <span className="text-blue-500 tracking-[0.2em] font-bold">Email_</span> {SYSTEM_CONFIG.email}
        </a>
        
        <button 
          onClick={copyEmail}
          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-white/20 hover:text-white"
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
        className="hover:text-white transition-colors flex items-center gap-4 group"
      >
        <span className="text-blue-500 tracking-[0.2em] font-bold group-hover:translate-x-1 transition-transform">LinkedIn_</span> /in/{SYSTEM_CONFIG.linkedin.split('/').pop()}
      </a>
      
    </div>
  </div>
</section>

        <footer className="py-10 border-t border-white/5 flex justify-between text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
          <p>Durgapur, WB</p>
          <p>© {new Date().getFullYear()} {SYSTEM_CONFIG.name.toUpperCase()}</p>
        </footer>
      </div>
    </main>
  );
}