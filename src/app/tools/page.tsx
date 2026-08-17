"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wrench, Sun, Moon, ArrowLeft } from 'lucide-react';
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
    <main className={`min-h-screen font-sans selection:bg-blue-500/20 transition-colors duration-500 relative ${
      isDark ? 'bg-[#09090b] text-zinc-200' : 'bg-[#f4f4f5] text-zinc-900'
    }`}>
      {/* HEADER BAR */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors ${
        isDark ? 'bg-[#09090b]/80 border-zinc-800' : 'bg-white/80 border-zinc-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold ${
              isDark ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-sm'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Wrench size={20} />
            </div>
            <div>
              <h1 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Workbench Utilities
              </h1>
              <p className="text-xs text-zinc-500 font-medium">Precision electronics engineering tools</p>
            </div>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark/Light Mode"
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all hover:scale-105 ${
            isDark 
              ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800' 
              : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-sm'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <PracticalEETools isDark={isDark} />
      </div>
    </main>
  );
}
