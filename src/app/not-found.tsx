"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

// The function name doesn't matter as much as the "export default" part
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen bg-[#020202] flex items-center justify-center p-6 font-mono text-xs uppercase tracking-widest overflow-hidden relative">
      <div className="space-y-6 max-w-sm w-full relative z-10">
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-red-500 font-bold flex items-center gap-3"
        >
          <ShieldAlert size={16} />
          <span>[ FATAL_ERROR: 404_NULL_REFERENCE ]</span>
        </motion.div>
        
        <div className="text-white/30 space-y-2">
          <p>Signal lost: requested_path_undefined.</p>
          <p>Analyzing hardware integrity... OK</p>
          <p>Scanning neural nodes... FAILED</p>
        </div>

        <div className="relative h-[2px] w-full bg-white/5 overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-blue-500 shadow-[0_0_15px_#3b82f6]"
          />
        </div>

        <div className="text-blue-500 font-bold">
          Rerouting to core_systems in 3.0s...
        </div>
      </div>

      {/* Subtle background noise */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </main>
  );
}