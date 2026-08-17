"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, GraduationCap, Wrench, Award, Check } from 'lucide-react';
import { SYSTEM_CONFIG, PROJECTS, CORE_SKILLS, EDUCATION_TIMELINE, CERTIFICATES, WORKBENCH_TOOLS } from '../registry';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function ResumeModal({ isOpen, onClose, isDark }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<'sheet' | 'pdf'>('sheet');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-4xl max-h-[88vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col font-sans ${
            isDark 
              ? 'bg-[#09090b] border-zinc-800 text-zinc-200' 
              : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl'
          }`}
        >
          {/* MODAL HEADER */}
          <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <FileText size={20} />
              </div>
              <div>
                <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {SYSTEM_CONFIG.name} — Curriculum Vitae
                </h2>
                <p className="text-xs text-zinc-500 font-mono">Electrical Engineering Student @ BCREC • Durgapur, WB</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* VIEW MODE TOGGLE */}
              <div className={`flex p-1 rounded-xl border text-xs font-mono font-bold ${
                isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-200/60 border-zinc-300'
              }`}>
                <button
                  onClick={() => setActiveTab('sheet')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'sheet'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  Digital CV
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'pdf'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  PDF Document
                </button>
              </div>

              {/* DOWNLOAD BUTTON */}
              <a
                href={SYSTEM_CONFIG.resumeUrl}
                download
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-blue-600/20"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-all ${
                  isDark ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200'
                }`}
                aria-label="Close CV Preview Modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MODAL BODY */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {activeTab === 'sheet' ? (
              <div className="space-y-8">
                {/* SUMMARY HEADER */}
                <div className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <h3 className="text-lg font-bold text-blue-500 mb-1">{SYSTEM_CONFIG.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono mb-3">{SYSTEM_CONFIG.tagline}</p>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800/40">
                    <span>Email: <a href={`mailto:${SYSTEM_CONFIG.email}`} className="text-blue-400 underline">{SYSTEM_CONFIG.email}</a></span>
                    <span>LinkedIn: <a href={SYSTEM_CONFIG.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">probal-khanra</a></span>
                    <span>GitHub: <a href={SYSTEM_CONFIG.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">Probal-Khanra</a></span>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-blue-500 flex items-center gap-2">
                    <GraduationCap size={16} /> Education
                  </h4>
                  <div className="space-y-3">
                    {EDUCATION_TIMELINE.map(edu => (
                      <div key={edu.id} className={`p-4 rounded-xl border ${
                        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-sm">{edu.degree}</h5>
                            <p className="text-xs font-mono text-zinc-500">{edu.institution}</p>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-bold">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FEATURED PROJECTS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-blue-500">Key Engineering Projects</h4>
                  <div className="space-y-3">
                    {PROJECTS.map(p => (
                      <div key={p.id} className={`p-4 rounded-xl border ${
                        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                      }`}>
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-bold text-sm italic">{p.title}</h5>
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">{p.tech}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VERIFIED CERTIFICATIONS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-blue-500 flex items-center gap-2">
                    <Award size={16} /> Technical Certifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CERTIFICATES.map(c => (
                      <div key={c.id} className={`p-3.5 rounded-xl border ${
                        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                      }`}>
                        <h5 className="font-bold text-xs italic line-clamp-1">{c.title}</h5>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{c.issuer}</p>
                        <p className="text-[9px] text-blue-400 font-mono mt-1">Issued {c.issued}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SKILLS & WORKBENCH */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono uppercase font-bold text-blue-500">Core Technical Skills</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {CORE_SKILLS.map(s => (
                        <span key={s.name} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border uppercase font-bold ${
                          isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                        }`}>{s.name}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-mono uppercase font-bold text-blue-500">Hardware Workbench</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {WORKBENCH_TOOLS.map(t => (
                        <span key={t.name} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border uppercase font-bold ${
                          isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                        }`}>{t.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* PDF VIEWER TAB */
              <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center">
                <object
                  data={SYSTEM_CONFIG.resumeUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="p-8 text-center space-y-4">
                    <p className="text-sm font-mono text-zinc-400">PDF Preview requires native PDF viewer support.</p>
                    <a
                      href={SYSTEM_CONFIG.resumeUrl}
                      download
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold inline-flex items-center gap-2"
                    >
                      <Download size={16} /> Download {SYSTEM_CONFIG.name}_Resume.pdf
                    </a>
                  </div>
                </object>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
