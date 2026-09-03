"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Wrench, 
  Gamepad2, 
  Sun, 
  Moon,
  Github,
  Linkedin,
  ArrowLeft,
  Send
} from 'lucide-react';
import { SYSTEM_CONFIG } from '../registry';

export default function ContactPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(SYSTEM_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'bg-[#030712] text-zinc-300' : 'bg-[#fafafa] text-zinc-800'
    }`}>
      {/* --- TOP NAVIGATION WITH PROMINENT BACK BUTTON --- */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm transition-colors ${
        isDark ? 'bg-[#030712]/80 border-b border-zinc-800/60' : 'bg-white/80 border-b border-zinc-200/60'
      }`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              aria-label="Back to Portfolio"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-700/80 text-white hover:bg-zinc-800 shadow-sm'
                  : 'bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100 shadow-sm'
              }`}
            >
              <ArrowLeft size={14} className="stroke-[2.5]" />
              <span>portfolio</span>
            </Link>

            <nav className="flex items-center gap-3.5 sm:gap-6 text-xs sm:text-sm lowercase whitespace-nowrap">
              <Link href="/#showcase" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>projects</Link>
              <Link href="/#skills" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>tech stack</Link>
              <span className={`whitespace-nowrap font-semibold ${isDark ? 'text-white' : 'text-zinc-950'}`}>contact</span>
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/tools"
              aria-label="EE Workbench Tools"
              title="EE Workbench Tools"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Wrench size={18} />
            </Link>

            <Link
              href="/arcade"
              aria-label="Arcade Games"
              title="Micro-Arcade Games"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Gamepad2 size={18} />
            </Link>

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

      {/* --- MINIMAL CONTACT BODY --- */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
        {/* HERO TITLE */}
        <div className="space-y-2">
          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            contact.
          </h1>
          <p className={`text-sm leading-relaxed max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Always interested in discussing embedded firmware, custom electronics, IoT, or collaborating on new engineering builds.
          </p>
        </div>

        {/* CLEAN CONTACT CHANNELS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. GITHUB (GUITAR) */}
          <a
            href={SYSTEM_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl border transition-all group flex flex-col justify-between ${
              isDark 
                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900' 
                : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold flex items-center gap-2">
                <Github size={16} className={isDark ? 'text-white' : 'text-zinc-900'} />
                <span>GitHub</span>
              </span>
              <ExternalLink size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                @Probal-Khanra
              </p>
              <p className="text-xs text-zinc-500 mt-1">Open-source firmware, circuit schematics & hardware code</p>
            </div>
          </a>

          {/* 2. MY PLACE (LOCATION) */}
          <div
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                <span>My Place</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active" />
            </div>
            <div>
              <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Singur, Hooghly
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                West Bengal, India · BCREC Durgapur
              </p>
            </div>
          </div>

          {/* 3. EMAIL DIRECT */}
          <div
            className={`p-5 rounded-2xl border transition-all sm:col-span-2 ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold flex items-center gap-2">
                <Mail size={16} className={isDark ? 'text-white' : 'text-zinc-900'} />
                <span>Email</span>
              </span>

              <button
                onClick={copyEmail}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
                  isDark 
                    ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300' 
                    : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                }`}
                title="Copy email address"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <a
                  href={`mailto:${SYSTEM_CONFIG.email}`}
                  className={`text-base font-bold hover:underline font-mono ${isDark ? 'text-white' : 'text-zinc-950'}`}
                >
                  {SYSTEM_CONFIG.email}
                </a>
                <p className="text-xs text-zinc-500 mt-1">Fastest response for technical inquiries or opportunities</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${SYSTEM_CONFIG.email}`}
                  className="px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Send size={13} />
                  <span>Send Email</span>
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SYSTEM_CONFIG.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                    isDark ? 'border-zinc-800 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                  }`}
                >
                  Open in Gmail
                </a>
              </div>
            </div>
          </div>

          {/* 4. LINKEDIN */}
          <a
            href={SYSTEM_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl border transition-all group flex items-center justify-between sm:col-span-2 ${
              isDark 
                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900' 
                : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'}`}>
                <Linkedin size={18} />
              </div>
              <div>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  LinkedIn Profile
                </p>
                <p className="text-xs text-zinc-500">linkedin.com/in/probal-khanra</p>
              </div>
            </div>
            <ExternalLink size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* FOOTER */}
        <footer className="flex items-center justify-between text-xs text-zinc-500 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {SYSTEM_CONFIG.name}. Built with Next.js.
            <Link 
              href="/bday" 
              aria-label="Secret"
              title="✦"
              className="opacity-20 hover:opacity-80 transition-opacity text-[11px] ml-1 select-none cursor-default"
            >
              ✦
            </Link>
          </p>

          <Link
            href="/"
            className="hover:underline text-zinc-400 hover:text-white flex items-center gap-1 font-medium"
          >
            <ArrowLeft size={12} />
            <span>back to portfolio</span>
          </Link>
        </footer>
      </main>
    </div>
  );
}
