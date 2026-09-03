"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wrench, Sun, Moon, Gamepad2, ArrowLeft } from 'lucide-react';
import PracticalEETools from '../components/PracticalEETools';

export default function ToolsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'bg-[#030712] text-zinc-300' : 'bg-[#fafafa] text-zinc-800'
    }`}>
      {/* --- UNIFIED TOP NAVIGATION WITH PROMINENT BACK BUTTON --- */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm transition-colors ${
        isDark ? 'bg-[#030712]/80 border-b border-zinc-800/60' : 'bg-white/80 border-b border-zinc-200/60'
      }`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-3">
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
              <Link href="/contact" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>contact</Link>
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/tools"
              aria-label="EE Workbench Tools"
              title="EE Workbench Tools (Active)"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'bg-zinc-800 text-white shadow-sm' : 'bg-zinc-200 text-zinc-950 font-semibold shadow-sm'
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

      {/* --- CONTENT CONTAINER EXPANDED TO MAX-W-5XL --- */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        <PracticalEETools isDark={isDark} />

        {/* SUBTLE FOOTER */}
        <footer className="flex items-center justify-between text-xs text-zinc-500 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <p>© {new Date().getFullYear()} Probal Khanra. Hardware Workbench.</p>
          <Link 
            href="/bday" 
            aria-label="Secret"
            title="✦"
            className="opacity-20 hover:opacity-80 transition-opacity text-[11px] select-none cursor-default"
          >
            ✦
          </Link>
        </footer>
      </main>
    </div>
  );
}
