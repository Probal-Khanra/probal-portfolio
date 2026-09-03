"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Gamepad2, 
  Sun, 
  Moon, 
  ArrowLeft, 
  Play, 
  RotateCcw,
  Trophy,
  Zap,
  Sparkles,
  Grid,
  Scissors,
  Box,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Wrench
} from 'lucide-react';

type GameMode = 'snake' | 'fruit-ninja' | 'brick-breaker' | 'flappy-chip';

export default function ArcadePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeGame, setActiveGame] = useState<GameMode>('snake');
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'bg-[#030712] text-zinc-300' : 'bg-[#fafafa] text-zinc-800'
    }`}>
      {/* --- UNIFIED TOP NAVIGATION (MATCHING MAIN SITE) --- */}
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
              <Link href="/contact" className={`whitespace-nowrap transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}>contact</Link>
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
              title="Micro-Arcade Games (Active)"
              className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-colors ${
                isDark ? 'bg-zinc-800 text-white shadow-sm' : 'bg-zinc-200 text-zinc-950 font-semibold shadow-sm'
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

      {/* --- CONTENT CONTAINER CONSTRAINED TO MAX-W-3XL --- */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* MINIMAL GAME TAB SELECTOR (LABELS UNDER ICONS) */}
        <nav aria-label="Game Selection" className="w-full">
          <div className={`p-1.5 rounded-2xl border backdrop-blur-xl grid grid-cols-4 gap-1.5 transition-all ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-zinc-200 shadow-sm'
          }`}>
            <button
              onClick={() => setActiveGame('snake')}
              className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                activeGame === 'snake'
                  ? isDark 
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                    : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
                  : isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Grid size={18} className={activeGame === 'snake' ? 'text-white' : ''} />
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">Snake</span>
            </button>

            <button
              onClick={() => setActiveGame('fruit-ninja')}
              className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                activeGame === 'fruit-ninja'
                  ? isDark 
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                    : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
                  : isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Scissors size={18} className={activeGame === 'fruit-ninja' ? 'text-white' : ''} />
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">Slicer</span>
            </button>

            <button
              onClick={() => setActiveGame('brick-breaker')}
              className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                activeGame === 'brick-breaker'
                  ? isDark 
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                    : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
                  : isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Box size={18} className={activeGame === 'brick-breaker' ? 'text-white' : ''} />
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">Breaker</span>
            </button>

            <button
              onClick={() => setActiveGame('flappy-chip')}
              className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
                activeGame === 'flappy-chip'
                  ? isDark 
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                    : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
                  : isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Zap size={18} className={activeGame === 'flappy-chip' ? 'text-white' : ''} />
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">Flappy</span>
            </button>
          </div>
        </nav>

        {/* ACTIVE GAME CANVAS CONTAINER */}
        <div className={`rounded-2xl border p-4 sm:p-6 transition-all ${
          isDark ? 'bg-zinc-950/60 border-zinc-800/90' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          {activeGame === 'snake' && <SnakeGame isDark={isDark} />}
          {activeGame === 'fruit-ninja' && <FruitNinjaGame isDark={isDark} />}
          {activeGame === 'brick-breaker' && <BrickBreakerGame isDark={isDark} />}
          {activeGame === 'flappy-chip' && <FlappyChipGame isDark={isDark} />}
        </div>

        {/* SUBTLE FOOTER */}
        <footer className="flex items-center justify-between text-xs text-zinc-500 pt-4">
          <p>© {new Date().getFullYear()} Probal Khanra</p>
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

/* =========================================================================
   GAME 1: PCB SNAKE GAME (POLISHED WITH DETAILED IC CHIP ICON)
   ========================================================================= */
function SnakeGame({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; alpha: number; radius: number }[],
    score: 0,
    active: false,
    lastStepTime: 0,
  });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('arcade_snake_hs');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const spawnFood = useCallback((snake: { x: number; y: number }[], cols: number, rows: number) => {
    let newFood = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    while (snake.some(s => s.x === newFood.x && s.y === newFood.y)) {
      newFood = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    }
    return newFood;
  }, []);

  const handleDirection = useCallback((dx: number, dy: number) => {
    const g = gameRef.current;
    if (g.dir.x + dx !== 0 || g.dir.y + dy !== 0) {
      g.nextDir = { x: dx, y: dy };
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) > 20) {
      if (absDx > absDy) {
        handleDirection(dx > 0 ? 1 : -1, 0);
      } else {
        handleDirection(0, dy > 0 ? 1 : -1);
      }
    }
    touchStartRef.current = null;
  };

  const startGame = () => {
    const g = gameRef.current;
    g.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    g.dir = { x: 1, y: 0 };
    g.nextDir = { x: 1, y: 0 };
    g.score = 0;
    g.particles = [];
    g.food = spawnFood(g.snake, 25, 18);
    g.active = true;
    g.lastStepTime = performance.now();
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameRef.current.active) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') handleDirection(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') handleDirection(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handleDirection(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleDirection(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDirection]);

  // 60 FPS Smooth Render & Logic Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const cols = 25;
    const rows = 18;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const g = gameRef.current;
      if (!g.active) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const cellW = width / cols;
      const cellH = height / rows;

      // Logic Step (every ~110ms for smooth snappy grid ticks)
      const stepInterval = Math.max(90, 130 - Math.floor(g.score / 50) * 4);
      if (time - g.lastStepTime >= stepInterval) {
        g.lastStepTime = time;
        g.dir = g.nextDir;
        const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

        // Wall Collision
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
          g.active = false;
          setGameOver(true);
          ctx.restore();
          return;
        }

        // Self Collision
        if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
          g.active = false;
          setGameOver(true);
          ctx.restore();
          return;
        }

        g.snake.unshift(head);

        // Food Collision
        if (head.x === g.food.x && head.y === g.food.y) {
          g.score += 10;
          setScore(g.score);
          setHighScore(prev => {
            const nh = Math.max(prev, g.score);
            localStorage.setItem('arcade_snake_hs', nh.toString());
            return nh;
          });

          // 15 Burst Particles
          for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 4 + 1.5;
            g.particles.push({
              x: (g.food.x + 0.5) * cellW,
              y: (g.food.y + 0.5) * cellH,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              color: Math.random() > 0.4 ? '#10b981' : '#6ee7b7',
              alpha: 1.0,
              radius: Math.random() * 2.5 + 1.5,
            });
          }

          g.food = spawnFood(g.snake, cols, rows);
        } else {
          g.snake.pop();
        }
      }

      // Clear Screen
      ctx.fillStyle = isDark ? '#09090b' : '#f4f4f5';
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 1;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * cellW, 0); ctx.lineTo(c * cellW, height); ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * cellH); ctx.lineTo(width, r * cellH); ctx.stroke();
      }

      // PCB Via Dots
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      for (let c = 1; c < cols; c += 2) {
        for (let r = 1; r < rows; r += 2) {
          ctx.beginPath(); ctx.arc(c * cellW, r * cellH, 1.2, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Render Food (Polished IC Chip)
      const fx = g.food.x * cellW;
      const fy = g.food.y * cellH;

      // Pins
      ctx.fillStyle = '#94a3b8';
      for (let p = 0; p < 4; p++) {
        const pinY = fy + 3 + p * (cellH / 4);
        ctx.fillRect(fx + 1, pinY, 2.5, 2);
        ctx.fillRect(fx + cellW - 3.5, pinY, 2.5, 2);
      }

      // IC Body
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(fx + 3, fy + 2, cellW - 6, cellH - 4, 5);
      ctx.fill();
      ctx.shadowBlur = 0;

      // IC Top Notch
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.arc(fx + cellW / 2, fy + 2, 2, 0, Math.PI);
      ctx.fill();

      // Render Snake Body (PCB Copper Trace)
      g.snake.forEach((seg, idx) => {
        const sx = seg.x * cellW;
        const sy = seg.y * cellH;

        if (idx === 0) {
          // Head with LED Eyes
          ctx.fillStyle = '#3b82f6';
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.roundRect(sx + 2, sy + 2, cellW - 4, cellH - 4, 6);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(sx + 6, sy + 6, 2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(sx + cellW - 6, sy + 6, 2, 0, Math.PI * 2); ctx.fill();
        } else {
          // Trace Body
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.roundRect(sx + 3, sy + 3, cellW - 6, cellH - 6, 4);
          ctx.fill();
        }
      });

      // Update & Render Particles at 60 FPS
      const nextParticles: typeof g.particles = [];
      g.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= 0.025;
        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          nextParticles.push(p);
        }
      });
      g.particles = nextParticles;

      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isDark, spawnFood]);

  return (
    <div className="space-y-4">
      {/* MINIMAL SCORE BAR */}
      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold ${
        isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100/90 border-zinc-200 text-zinc-700'
      }`}>
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-500" />
          <span>BEST: <strong className="text-amber-500">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-white" />
          <span>SCORE: <strong className="text-white">{score}</strong></span>
        </div>
      </div>

      {/* RESPONSIVE VIEWPORT HEIGHT */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl border overflow-hidden bg-black border-zinc-800 touch-none select-none">
        <canvas 
          ref={canvasRef} 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          width={550} 
          height={420} 
          className="w-full h-full block cursor-pointer" 
        />

        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid size={20} className="text-emerald-500" /> PCB Trace Snake
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              {gameOver 
                ? `Game Over! Final Score: ${score}` 
                : 'Swipe anywhere or use D-pad / Arrow keys to navigate the PCB trace and eat IC chips!'}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              {gameOver ? <RotateCcw size={15} /> : <Play size={15} />}
              <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
            </button>
          </div>
        )}
      </div>

      {/* COMPACT MINIMAL MOBILE D-PAD */}
      <div className="flex justify-center items-center sm:hidden pt-1">
        <div className="grid grid-cols-3 gap-1.5 w-36">
          <div />
          <button 
            onClick={() => handleDirection(0, -1)} 
            aria-label="Up" 
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center active:bg-zinc-700 transition-colors"
          >
            <ChevronUp size={18} />
          </button>
          <div />
          <button 
            onClick={() => handleDirection(-1, 0)} 
            aria-label="Left" 
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center active:bg-zinc-700 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => handleDirection(0, 1)} 
            aria-label="Down" 
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center active:bg-zinc-700 transition-colors"
          >
            <ChevronDown size={18} />
          </button>
          <button 
            onClick={() => handleDirection(1, 0)} 
            aria-label="Right" 
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center active:bg-zinc-700 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   GAME 2: FRUIT SLICER GAME (BOUNCY FRUITS & JUICY POLISH)
   ========================================================================= */
function FruitNinjaGame({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(false);

  const gameRef = useRef({
    score: 0,
    lives: 3,
    active: false,
    fruits: [] as { id: number; x: number; y: number; vx: number; vy: number; radius: number; type: 'apple' | 'orange' | 'watermelon' | 'bomb'; sliced: boolean }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; alpha: number }[],
    trail: [] as { x: number; y: number; time: number }[],
    lastSpawn: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('arcade_fruit_hs');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    const g = gameRef.current;
    g.score = 0;
    g.lives = 3;
    g.fruits = [];
    g.particles = [];
    g.trail = [];
    g.active = true;
    setScore(0);
    setLives(3);
    setGameActive(true);
  };

  const handlePointerMove = (x: number, y: number) => {
    const g = gameRef.current;
    if (!g.active || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;

    g.trail.push({ x: px, y: py, time: Date.now() });

    // Check Slicing Collision
    g.fruits.forEach((fruit) => {
      if (fruit.sliced) return;
      const dist = Math.hypot(fruit.x - px, fruit.y - py);
      if (dist < fruit.radius + 14) {
        fruit.sliced = true;

        // Juice Sparks
        const sparkColor = fruit.type === 'watermelon' ? '#ef4444' : fruit.type === 'orange' ? '#f97316' : fruit.type === 'apple' ? '#22c55e' : '#ef4444';
        for (let i = 0; i < 14; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 4 + 2;
          g.particles.push({
            x: fruit.x,
            y: fruit.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            color: sparkColor,
            alpha: 1.0,
          });
        }

        if (fruit.type === 'bomb') {
          g.lives = 0;
          setLives(0);
          g.active = false;
          setGameActive(false);
        } else {
          g.score += 15;
          setScore(g.score);
          setHighScore(prev => {
            const nh = Math.max(prev, g.score);
            localStorage.setItem('arcade_fruit_hs', nh.toString());
            return nh;
          });
        }
      }
    });
  };

  // Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const g = gameRef.current;
      const now = Date.now();

      if (g.active) {
        // Spawn Floaty Bouncy Fruits Arc
        if (now - g.lastSpawn > 1400) {
          g.lastSpawn = now;
          const count = Math.floor(Math.random() * 2) + 1;
          for (let i = 0; i < count; i++) {
            const sx = Math.random() * (w - 140) + 70;
            const randType = Math.random();
            let type: 'apple' | 'orange' | 'watermelon' | 'bomb' = 'apple';
            if (randType < 0.20) type = 'bomb';
            else if (randType < 0.45) type = 'orange';
            else if (randType < 0.70) type = 'watermelon';

            g.fruits.push({
              id: Math.random(),
              x: sx,
              y: h + 20,
              vx: (w / 2 - sx) * 0.012 + (Math.random() - 0.5) * 1.8,
              vy: -(Math.random() * 2.5 + 8.5), // High floaty bounce arc
              radius: type === 'watermelon' ? 24 : type === 'bomb' ? 20 : 18,
              type,
              sliced: false,
            });
          }
        }

        // Update Fruits with Gentle Bouncy Gravity (0.18)
        const nextFruits: typeof g.fruits = [];
        g.fruits.forEach((f) => {
          f.x += f.vx;
          f.y += f.vy;
          f.vy += 0.18; // Soft float bounce

          if (f.y < h + 50) {
            nextFruits.push(f);
          } else if (!f.sliced && f.type !== 'bomb') {
            g.lives -= 1;
            setLives(Math.max(0, g.lives));
            if (g.lives <= 0) {
              g.active = false;
              setGameActive(false);
            }
          }
        });
        g.fruits = nextFruits;

        // Update Juice Splash Particles
        const nextParticles: typeof g.particles = [];
        g.particles.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.alpha -= 0.03;
          if (p.alpha > 0) {
            ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
            nextParticles.push(p);
          }
        });
        g.particles = nextParticles;
      }

      // Draw Fruits (Multi-Layer Rind & Seed Graphics)
      g.fruits.forEach((f) => {
        ctx.save();
        if (f.sliced) {
          ctx.fillStyle = f.type === 'watermelon' ? '#ef4444' : f.type === 'orange' ? '#f97316' : '#22c55e';
          ctx.beginPath(); ctx.arc(f.x - 14, f.y, f.radius * 0.75, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(f.x + 14, f.y, f.radius * 0.75, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.beginPath();
          if (f.type === 'apple') {
            ctx.fillStyle = '#ef4444'; ctx.shadowColor = '#f87171'; ctx.shadowBlur = 8;
            ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
            ctx.fillStyle = '#15803d'; ctx.fillRect(f.x - 1, f.y - f.radius - 4, 3, 5); // Stem
          } else if (f.type === 'orange') {
            ctx.fillStyle = '#f97316'; ctx.shadowColor = '#fb923c'; ctx.shadowBlur = 8;
            ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
          } else if (f.type === 'watermelon') {
            ctx.fillStyle = '#15803d'; ctx.shadowColor = '#4ade80'; ctx.shadowBlur = 8;
            ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = '#18181b'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
            ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px sans-serif'; ctx.fillText('💣 BOMB', f.x - 18, f.y + 4);
          }
        }
        ctx.restore();
      });

      // Draw Slice Blade Trail
      g.trail = g.trail.filter(t => now - t.time < 200);
      if (g.trail.length > 1) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(g.trail[0].x, g.trail[0].y);
        for (let i = 1; i < g.trail.length; i++) {
          ctx.lineTo(g.trail[i].x, g.trail[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-4">
      {/* MINIMAL SCORE BAR */}
      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold ${
        isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100/90 border-zinc-200 text-zinc-700'
      }`}>
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-500" />
          <span>BEST: <strong className="text-amber-500">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-white" />
          <span>SCORE: <strong className="text-white">{score}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-zinc-400">LIVES:</span>
          <span className="text-rose-500 tracking-widest font-bold">
            {'❤️'.repeat(lives)}
          </span>
        </div>
      </div>

      {/* RESPONSIVE VIEWPORT HEIGHT */}
      <div
        ref={containerRef}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl border overflow-hidden bg-black border-zinc-800 cursor-crosshair touch-none select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!gameActive && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scissors size={20} className="text-rose-500" /> Fruit Slicer
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Drag mouse or swipe finger across floating items! Avoid black bombs 💣!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Play size={15} /> <span>Start Slicing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   GAME 3: RETRO BRICK BREAKER
   ========================================================================= */
function BrickBreakerGame({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const gameRef = useRef({
    score: 0,
    active: false,
    paddleX: 250,
    ball: { x: 250, y: 350, vx: 2.2, vy: -2.5, radius: 7 },
    bricks: [] as { x: number; y: number; w: number; h: number; alive: boolean; color: string }[],
  });

  useEffect(() => {
    const saved = localStorage.getItem('arcade_brick_hs');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const initBricks = (w: number) => {
    const cols = 8;
    const rows = 4;
    const padding = 6;
    const brickW = (w - (cols + 1) * padding) / cols;
    const brickH = 20;
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

    const bricks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: padding + c * (brickW + padding),
          y: 40 + r * (brickH + padding),
          w: brickW,
          h: brickH,
          alive: true,
          color: colors[r % colors.length],
        });
      }
    }
    return bricks;
  };

  const startGame = () => {
    const g = gameRef.current;
    const canvas = canvasRef.current;
    const w = canvas ? canvas.getBoundingClientRect().width : 500;
    g.score = 0;
    g.paddleX = w / 2;
    g.ball = { x: w / 2, y: 350, vx: 2.2 * (Math.random() > 0.5 ? 1 : -1), vy: -2.5, radius: 7 };
    g.bricks = initBricks(w);
    g.active = true;
    setScore(0);
    setGameActive(true);
  };

  const handlePointerMove = (x: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    gameRef.current.paddleX = Math.max(50, Math.min(rect.width - 50, x - rect.left));
  };

  // Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const g = gameRef.current;
      const ball = g.ball;

      if (g.active) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > w) ball.vx *= -1;
        if (ball.y - ball.radius < 0) ball.vy *= -1;

        // Bottom collision (Game Over)
        if (ball.y + ball.radius > h) {
          g.active = false;
          setGameActive(false);
        }

        // Paddle Collision
        const paddleY = h - 35;
        const paddleW = 100;
        if (
          ball.y + ball.radius >= paddleY &&
          ball.y - ball.radius <= paddleY + 12 &&
          ball.x >= g.paddleX - paddleW / 2 &&
          ball.x <= g.paddleX + paddleW / 2
        ) {
          ball.vy = -Math.abs(ball.vy);
          ball.vx = (ball.x - g.paddleX) * 0.12;
        }

        // Brick Collisions
        g.bricks.forEach((brick) => {
          if (!brick.alive) return;
          if (
            ball.x + ball.radius > brick.x &&
            ball.x - ball.radius < brick.x + brick.w &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + brick.h
          ) {
            brick.alive = false;
            ball.vy *= -1;
            g.score += 20;
            setScore(g.score);
            setHighScore(prev => {
              const nh = Math.max(prev, g.score);
              localStorage.setItem('arcade_brick_hs', nh.toString());
              return nh;
            });
          }
        });
      }

      // Draw Bricks
      g.bricks.forEach((b) => {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.beginPath(); ctx.roundRect(b.x, b.y, b.w, b.h, 4); ctx.fill();
      });

      // Draw Paddle
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath(); ctx.roundRect(g.paddleX - 50, h - 35, 100, 12, 6); ctx.fill();

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-4">
      {/* MINIMAL SCORE BAR */}
      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold ${
        isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100/90 border-zinc-200 text-zinc-700'
      }`}>
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-500" />
          <span>BEST: <strong className="text-amber-500">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-white" />
          <span>SCORE: <strong className="text-white">{score}</strong></span>
        </div>
      </div>

      {/* RESPONSIVE VIEWPORT HEIGHT */}
      <div
        ref={containerRef}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX)}
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl border overflow-hidden bg-black border-zinc-800 cursor-crosshair touch-none select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!gameActive && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Box size={20} className="text-amber-500" /> Retro Brick Breaker
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Drag your paddle to bounce the ball and smash colorful resistor bricks!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Play size={15} /> <span>Start Game</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   GAME 4: FLAPPY CHIP GAME (EXTRA FEATHER FLOAT & BIGGER VIEWPORT)
   ========================================================================= */
function FlappyChipGame({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const gameRef = useRef({
    score: 0,
    active: false,
    chipY: 220,
    vy: 0,
    pipes: [] as { x: number; topH: number; bottomY: number; w: number; passed: boolean }[],
    lastSpawn: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('arcade_flappy_hs');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const flap = () => {
    if (!gameRef.current.active) return;
    gameRef.current.vy = -3.2; // Feather float flap
  };

  const startGame = () => {
    const g = gameRef.current;
    g.score = 0;
    g.chipY = 220;
    g.vy = 0;
    g.pipes = [];
    g.lastSpawn = Date.now();
    g.active = true;
    setScore(0);
    setGameActive(true);
  };

  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space') flap();
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  // Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const g = gameRef.current;

      if (g.active) {
        g.vy += 0.08; // Feather float gravity (Super soft & easy!)
        g.chipY += g.vy;

        // Spawn Pipe Obstacles (Relaxed 2000ms gap)
        if (Date.now() - g.lastSpawn > 2000) {
          g.lastSpawn = Date.now();
          const gap = 145; // Wide 145px obstacle opening
          const topH = Math.random() * (h - gap - 100) + 50;
          g.pipes.push({
            x: w + 20,
            topH,
            bottomY: topH + gap,
            w: 52,
            passed: false,
          });
        }

        // Update Pipes (Gentle Speed 1.1)
        const nextPipes: typeof g.pipes = [];
        g.pipes.forEach((p) => {
          p.x -= 1.1;

          // Score Check
          if (!p.passed && p.x + p.w < 100) {
            p.passed = true;
            g.score += 1;
            setScore(g.score);
            setHighScore(prev => {
              const nh = Math.max(prev, g.score);
              localStorage.setItem('arcade_flappy_hs', nh.toString());
              return nh;
            });
          }

          // Collision Check
          const chipX = 100;
          const chipRadius = 11;

          if (chipX + chipRadius > p.x && chipX - chipRadius < p.x + p.w) {
            if (g.chipY - chipRadius < p.topH || g.chipY + chipRadius > p.bottomY) {
              g.active = false;
              setGameActive(false);
            }
          }

          if (p.x + p.w > -20) nextPipes.push(p);
        });
        g.pipes = nextPipes;

        // Boundary Collision Check
        if (g.chipY < 0 || g.chipY > h) {
          g.active = false;
          setGameActive(false);
        }
      }

      // Draw Capacitor Obstacle Pipes
      g.pipes.forEach((p) => {
        ctx.fillStyle = '#0284c7';
        ctx.beginPath(); ctx.roundRect(p.x, 0, p.w, p.topH, 6); ctx.fill();
        ctx.beginPath(); ctx.roundRect(p.x, p.bottomY, p.w, h - p.bottomY, 6); ctx.fill();
      });

      // Draw Detailed Microchip Player Icon (DIP-8 Chip with Pins)
      const cx = 100;
      const cy = g.chipY;

      // Draw Silver IC Pins
      ctx.fillStyle = '#94a3b8';
      for (let p = 0; p < 4; p++) {
        const pinY = cy - 12 + p * 7;
        ctx.fillRect(cx - 16, pinY, 4, 3);
        ctx.fillRect(cx + 12, pinY, 4, 3);
      }

      // IC Body
      ctx.fillStyle = '#3b82f6'; ctx.shadowColor = '#60a5fa'; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.roundRect(cx - 13, cy - 14, 26, 28, 5); ctx.fill(); ctx.shadowBlur = 0;

      // Top IC Notch
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath(); ctx.arc(cx, cy - 14, 3, 0, Math.PI); ctx.fill();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="space-y-4">
      {/* MINIMAL SCORE BAR */}
      <div className={`flex justify-between items-center px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold ${
        isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100/90 border-zinc-200 text-zinc-700'
      }`}>
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-500" />
          <span>BEST: <strong className="text-amber-500">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-white" />
          <span>SCORE: <strong className="text-white">{score}</strong></span>
        </div>
      </div>

      {/* RESPONSIVE VIEWPORT HEIGHT */}
      <div
        ref={containerRef}
        onClick={flap}
        onTouchStart={flap}
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl border overflow-hidden bg-black border-zinc-800 cursor-pointer touch-none select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!gameActive && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={20} className="text-cyan-400" /> Flappy Microchip
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Tap screen, click, or press Spacebar to flap your microchip through capacitor gates!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Play size={15} /> <span>Start Game</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
