"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2, GripHorizontal } from 'lucide-react';
import { SYSTEM_CONFIG, PROJECTS, CORE_SKILLS, CERTIFICATES } from '../registry';

interface CommandOutput {
  id: string;
  command: string;
  result: React.ReactNode;
}

interface ProbalTerminalProps {
  isDark: boolean;
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  hideFloatingTrigger?: boolean;
}

const CHIP_ASCII = `    |  |  |  |  |
  .---------------.
  | +-----------+ |
= | | PROBAL-EE | | =
= | | ESP32-S3  | | =
= | | RTOS CORE | | =
  | +-----------+ |
  '---------------'
    |  |  |  |  |`;

export default function ProbalTerminal({ isDark, isOpen: extIsOpen, setIsOpen: extSetIsOpen, hideFloatingTrigger }: ProbalTerminalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = extIsOpen !== undefined ? extIsOpen : internalIsOpen;
  const setIsOpen = extSetIsOpen || setInternalIsOpen;
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');

  // DRAGGING STATE & REFS
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: 'init',
      result: (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-emerald-400 font-bold">probal@bcrec-ee:~$ neofetch</p>
          <div className="flex gap-3 sm:gap-4 items-start pt-1">
            <div className="text-emerald-400 font-bold hidden sm:block leading-tight text-[9px] select-none font-mono">
              <pre className="m-0">{CHIP_ASCII}</pre>
            </div>
            <div className="space-y-0.5 text-zinc-300 text-[11px]">
              <p><span className="text-emerald-400 font-bold">OS:</span> Probal Linux 6.8.0-ee x86_64</p>
              <p><span className="text-emerald-400 font-bold">Host:</span> BCREC Electrical Engineering Workstation</p>
              <p><span className="text-emerald-400 font-bold">Kernel:</span> Embedded ESP32-S3 + RTOS Kernel</p>
              <p><span className="text-emerald-400 font-bold">Focus:</span> {SYSTEM_CONFIG.currentFocus}</p>
              <p className="text-zinc-500 pt-1">Type <span className="text-amber-400 font-bold">'help'</span> or <span className="text-amber-400 font-bold">'ls'</span> for commands.</p>
            </div>
          </div>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // MOUSE DRAG HANDLER
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!terminalRef.current) return;

    const rect = terminalRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position ? position.x : rect.left,
      initialY: position ? position.y : rect.top
    };
    setIsDragging(true);
  };

  // TOUCH DRAG HANDLER (MOBILE / TABLET)
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!terminalRef.current || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const rect = terminalRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: position ? position.x : rect.left,
      initialY: position ? position.y : rect.top
    };
    setIsDragging(true);
  };

  // DRAG MOVEMENT LISTENER
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !terminalRef.current) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      const width = terminalRef.current.offsetWidth || 400;
      const height = terminalRef.current.offsetHeight || 300;

      const newX = Math.max(8, Math.min(window.innerWidth - width - 8, dragRef.current.initialX + deltaX));
      const newY = Math.max(8, Math.min(window.innerHeight - height - 8, dragRef.current.initialY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current || !terminalRef.current || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragRef.current.startX;
      const deltaY = touch.clientY - dragRef.current.startY;
      const width = terminalRef.current.offsetWidth || 400;
      const height = terminalRef.current.offsetHeight || 300;

      const newX = Math.max(8, Math.min(window.innerWidth - width - 8, dragRef.current.initialX + deltaX));
      const newY = Math.max(8, Math.min(window.innerHeight - height - 8, dragRef.current.initialY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      dragRef.current = null;
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, isOpen, isMinimized, setIsOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const lowerCmd = cmd.toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode;

    switch (lowerCmd) {
      case 'help':
      case '?':
      case 'man':
        res = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <p className="text-blue-400 font-bold">Available Linux Commands:</p>
            <p><span className="text-amber-400 font-bold">ls</span>          - List directory contents (projects, skills, certs)</p>
            <p><span className="text-amber-400 font-bold">whoami</span>      - Display current user profile</p>
            <p><span className="text-amber-400 font-bold">uname -a</span>    - Print kernel & system details</p>
            <p><span className="text-amber-400 font-bold">neofetch</span>    - Print hardware system summary</p>
            <p><span className="text-amber-400 font-bold">cat [file]</span>   - Read file (e.g. 'cat projects', 'cat skills')</p>
            <p><span className="text-amber-400 font-bold">clear</span>       - Clear terminal output</p>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="text-xs text-zinc-300 font-mono space-y-1">
            <p><span className="text-emerald-400 font-bold">User:</span> {SYSTEM_CONFIG.name}</p>
            <p><span className="text-blue-400 font-bold">Role:</span> {SYSTEM_CONFIG.tagline}</p>
            <p><span className="text-amber-400 font-bold">Email:</span> {SYSTEM_CONFIG.email}</p>
          </div>
        );
        break;

      case 'uname -a':
      case 'uname':
        res = (
          <p className="text-xs text-emerald-400 font-mono">
            Linux bcrec-ee 6.8.0-generic-rtos #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux (ESP32-S3)
          </p>
        );
        break;

      case 'ls':
      case 'ls -l':
      case 'dir':
        res = (
          <div className="text-xs font-mono grid grid-cols-2 gap-2 text-blue-400">
            <p><span className="text-emerald-400">drwxr-xr-x</span>  projects/</p>
            <p><span className="text-emerald-400">drwxr-xr-x</span>  skills/</p>
            <p><span className="text-emerald-400">drwxr-xr-x</span>  certificates/</p>
            <p><span className="text-amber-400">-rw-r--r--</span>  resume.pdf</p>
            <p className="col-span-2 text-zinc-500 text-[10px] pt-1">Tip: type 'cat projects' or 'cat skills'</p>
          </div>
        );
        break;

      case 'cat projects':
      case 'projects':
        res = (
          <div className="text-xs text-zinc-300 font-mono space-y-2">
            <p className="text-blue-400 font-bold">projects.json:</p>
            {PROJECTS.map(p => (
              <div key={p.id} className="border-l-2 border-blue-500 pl-2">
                <p className="text-white font-bold">{p.title} <span className="text-emerald-400 text-[10px]">[{p.status}]</span></p>
                <p className="text-zinc-400 text-[11px]">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat skills':
      case 'skills':
        res = (
          <div className="text-xs text-zinc-300 font-mono space-y-1">
            <p className="text-blue-400 font-bold">skills.conf:</p>
            {CORE_SKILLS.map(s => (
              <p key={s.name}>• <span className="text-white">{s.name}</span> <span className="text-zinc-500">[{s.category}]</span></p>
            ))}
          </div>
        );
        break;

      case 'cat certs':
      case 'cat certificates':
      case 'certs':
        res = (
          <div className="text-xs text-zinc-300 font-mono space-y-1">
            <p className="text-blue-400 font-bold">licenses.txt:</p>
            {CERTIFICATES.map(c => (
              <p key={c.id}>• <span className="text-white font-bold">{c.title}</span> — <span className="text-amber-400">{c.issuer}</span> ({c.issued})</p>
            ))}
          </div>
        );
        break;

      case 'neofetch':
        res = (
          <div className="flex gap-3 sm:gap-4 items-start pt-1 text-xs font-mono">
            <div className="text-emerald-400 font-bold hidden sm:block leading-tight text-[9px] select-none font-mono">
              <pre className="m-0">{CHIP_ASCII}</pre>
            </div>
            <div className="space-y-0.5 text-zinc-300 text-[11px]">
              <p><span className="text-emerald-400 font-bold">User:</span> {SYSTEM_CONFIG.name} @ BCREC</p>
              <p><span className="text-emerald-400 font-bold">OS:</span> Probal Linux 6.8.0-ee x86_64</p>
              <p><span className="text-emerald-400 font-bold">Hardware:</span> ESP32-S3 Dual-Core Xtensa LX7</p>
              <p><span className="text-emerald-400 font-bold">Focus:</span> {SYSTEM_CONFIG.currentFocus}</p>
              <p><span className="text-emerald-400 font-bold">Uptime:</span> 3rd Year Electrical Engineering</p>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        res = (
          <p className="text-xs text-rose-400 font-mono">
            bash: {cmd}: command not found. Type <span className="text-amber-400 font-bold">'help'</span> or <span className="text-amber-400 font-bold">'ls'</span>.
          </p>
        );
    }

    setHistory(prev => [...prev, { id: Math.random().toString(), command: input, result: res }]);
    setInput('');
  };

  // FLOATING TRIGGER BUTTON (IF NOT CONTROLLED EXTERNALLY)
  if (!isOpen) {
    if (hideFloatingTrigger) return null;
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-13 h-13 rounded-2xl border shadow-2xl transition-all hover:scale-110 flex items-center justify-center p-3.5 ${
          isDark 
            ? 'bg-zinc-900 border-zinc-700 text-emerald-400 hover:bg-zinc-800 shadow-emerald-500/10' 
            : 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800 shadow-xl'
        }`}
        title="Open Linux Terminal"
        aria-label="Open Linux Terminal"
      >
        <Terminal size={22} />
      </button>
    );
  }

  return (
    <>
      {/* FULLPAGE BACKDROP: CLICK ANYWHERE TO CLOSE */}
      {!isMinimized && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] cursor-pointer transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          title="Click anywhere outside to close console"
          aria-label="Close terminal overlay"
        />
      )}

      <div 
        ref={terminalRef}
        className={`fixed z-50 transition-all ${
          isMinimized 
            ? 'w-72' 
            : 'w-[94vw] sm:w-[500px] h-[390px]'
        } ${!position ? (isMinimized ? 'bottom-6 right-6' : 'bottom-4 sm:bottom-6 right-3 sm:right-6') : ''}`}
        style={position ? {
          left: `${position.x}px`,
          top: `${position.y}px`,
          right: 'auto',
          bottom: 'auto',
          transition: isDragging ? 'none' : undefined
        } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-mono bg-[#121212]/95 backdrop-blur-md">
          {/* LINUX TERMINAL HEADER BAR (DRAGGABLE) */}
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="bg-[#1e1e1e] border-b border-zinc-800 px-4 py-3 flex items-center justify-between text-xs select-none cursor-grab active:cursor-grabbing"
            title="Drag to move terminal window"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 inline-block transition-transform active:scale-90" 
                  title="Close Terminal" 
                />
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 inline-block transition-transform active:scale-90" 
                  title="Minimize" 
                />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <span className="text-zinc-300 font-bold text-[11px] ml-2 flex items-center gap-1.5 pointer-events-none">
                <Terminal size={14} className="text-emerald-400" /> probal@bcrec-ee: ~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Drag Handle Indicator */}
              <div className="hidden sm:flex items-center gap-1 text-zinc-600 pointer-events-none">
                <GripHorizontal size={14} />
              </div>

              <div className="flex items-center gap-1.5 text-zinc-400">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:text-white hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 rounded-lg transition-colors flex items-center gap-1 font-bold text-xs"
                  title="Close Terminal (or click anywhere outside / press Esc)"
                  aria-label="Close Terminal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

        {/* LINUX TERMINAL BODY */}
        {!isMinimized && (
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#121212]">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.command !== 'init' && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-emerald-400 font-bold">probal@bcrec-ee</span>
                    <span className="text-zinc-400">:</span>
                    <span className="text-blue-400 font-bold">~</span>
                    <span className="text-zinc-200">$ {item.command}</span>
                  </div>
                )}
                <div>{item.result}</div>
              </div>
            ))}
            <div ref={bottomRef} />

            {/* LINUX PROMPT INPUT */}
            <form onSubmit={handleCommand} className="flex items-center gap-1 pt-2 border-t border-zinc-800/60 text-xs">
              <span className="text-emerald-400 font-bold">probal@bcrec-ee</span>
              <span className="text-zinc-400">:</span>
              <span className="text-blue-400 font-bold">~</span>
              <span className="text-zinc-200">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ls, help, whoami..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder:text-zinc-600 ml-1"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  </>
);
}
