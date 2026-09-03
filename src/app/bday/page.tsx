"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  Lock,
  Volume2,
  VolumeX,
  PartyPopper,
  Calendar,
  Clock,
  Stars,
  Flame,
  Gift,
  Play,
  Pause,
  Music,
  RotateCcw,
  CheckCircle2,
  Smile,
} from "lucide-react";

// Recipient Name & Pet Name:
export const HER_NAME = "Soumi";
export const PET_NAME = "Baby";

// Target Date Configuration:
// Target: September 28 in Indian Standard Time (IST = UTC + 5:30)
// Month index: 8 (September, 0-indexed), Day: 28
const BDAY_MONTH_INDEX = 8; // September
const BDAY_DAY = 28;

// Love Note Letter Content (Easily customizable):
export const LOVE_NOTE = {
  heading: "A Letter for My Baby's 20th",
  subheading: "To My Sweetheart, My Whole World",
  salutation: "My Dearest Baby,",
  paragraphs: [
    "Happy 20th Birthday, my love! Welcoming this new decade of your life is such a magical milestone, and having the privilege to stand by your side and call you mine is the greatest gift of my life.",
    "You bring endless warmth, laughter, and light into every single day, baby. Your sweet kindness touches everyone around you, and your gorgeous smile has an effortless way of making everything feel alright.",
    "As you step into your twenties, sweetheart, I hope this year fills your heart with wild joy, gentle peace, huge adventures, and every dream you've ever whispered. I promise to be right here holding your hand and cheering for you every step of the way.",
    "Here is to you, my darling, your beautiful soul, and the sweetest 20th year ahead.",
  ],
  closing: "With all my love & whole heart,",
  signature: "Forever Yours, Baby",
};

// Dual-Music Playlist Configuration:
export interface AudioTrack {
  id: "birthday" | "meme";
  title: string;
  badge: string;
  src: string;
  hint: string;
}

const PLAYLIST_TRACKS: AudioTrack[] = [
  {
    id: "birthday",
    title: "Birthday Song",
    badge: "🎂 Birthday",
    src: "/song.mp3",
    hint: "/public/song.mp3",
  },
  {
    id: "meme",
    title: "Meme Vibe",
    badge: "🤪 Meme Vibe",
    src: "/meme.mp3",
    hint: "/public/meme.mp3",
  },
];

type PhaseType = "phase1" | "phase2" | "phase3";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

interface PolaroidPhoto {
  id: number;
  src: string;
  caption: string;
  date: string;
  rotation: string;
  emoji: string;
  fallbackGradient: string;
  backNote: string;
  backStamp: string;
}

const POLAROID_PHOTOS: PolaroidPhoto[] = [
  {
    id: 1,
    src: "/photo1.jpg",
    caption: "That precious smile that lights up my whole world ✨",
    date: "Forever my favorite sight",
    rotation: "-rotate-2",
    emoji: "🌸",
    fallbackGradient: "from-pink-300 via-rose-200 to-amber-100",
    backNote:
      "Out of everyone in this world, nobody has a smile as breathtaking as yours, baby. One look from you and everything feels alright.",
    backStamp: "Pure Magic 💌",
  },
  {
    id: 2,
    src: "/photo2.jpg",
    caption: "Every date with you is my favorite memory 💖",
    date: "Us, always",
    rotation: "rotate-2",
    emoji: "🌷",
    fallbackGradient: "from-purple-300 via-pink-200 to-rose-100",
    backNote:
      "Anywhere we go together becomes the best place in the world. Being by your side is the easiest kind of happiness, my love.",
    backStamp: "Our Dates ☕",
  },
  {
    id: 3,
    src: "/photo3.jpg",
    caption: "Right here in my arms — where you will always belong 🌿",
    date: "Peace & warmth",
    rotation: "-rotate-1",
    emoji: "🌺",
    fallbackGradient: "from-amber-200 via-pink-200 to-purple-200",
    backNote:
      "Whenever you rest your head on my shoulder, time stops. I promise to always protect you and be your safe place, sweetheart.",
    backStamp: "Safe Haven 🤍",
  },
  {
    id: 4,
    src: "/photo4.jpg",
    caption: "Happy 20th birthday to my girl, my best friend, my everything 🌸",
    date: "Into Chapter 20 Together",
    rotation: "rotate-1",
    emoji: "✨",
    fallbackGradient: "from-rose-300 via-purple-200 to-pink-100",
    backNote:
      "Thank you for filling my days with warmth, laughter, and endless light, baby. Here's to turning 20 and creating thousands more memories together.",
    backStamp: "Forever & Always 💍",
  },
];

// 20 Minimal Reasons Why I Love You
interface ReasonItem {
  id: number;
  tag: string;
  reason: string;
}

const TWENTY_REASONS: ReasonItem[] = [
  { id: 1, tag: "Your Smile", reason: "The effortless way your whole face lights up whenever you laugh." },
  { id: 2, tag: "Safe Place", reason: "How resting in your arms instantly quiets all the noise in my world." },
  { id: 3, tag: "Your Giggle", reason: "That cute little laugh that makes me fall in love all over again." },
  { id: 4, tag: "Pure Kindness", reason: "Your soft, caring heart that always looks out for everyone you love." },
  { id: 5, tag: "Little Details", reason: "How you remember every tiny thing I ever mention to you." },
  { id: 6, tag: "Inside Jokes", reason: "Our silly nonsense that nobody else on earth will ever understand." },
  { id: 7, tag: "Food Joy", reason: "Your adorable, childlike excitement whenever good food arrives." },
  { id: 8, tag: "Holding Hands", reason: "The way your fingers naturally interlock with mine wherever we go." },
  { id: 9, tag: "Your Voice", reason: "A single gentle whisper from you can calm my loudest storms." },
  { id: 10, tag: "Effortless", reason: "How stunning you look in messy hair, oversized tees, or anything at all." },
  { id: 11, tag: "Car Concerts", reason: "Blasting our favorite songs together completely out of tune." },
  { id: 12, tag: "Your Passion", reason: "How brightly your eyes shine whenever you talk about your dreams." },
  { id: 13, tag: "Patience", reason: "The calm, gentle, sweet way you always listen to me." },
  { id: 14, tag: "Everyday Magic", reason: "How ordinary walks and grocery runs feel like the best dates with you." },
  { id: 15, tag: "Warm Hugs", reason: "That tight, warm embrace that feels like coming home." },
  { id: 16, tag: "Your Faith", reason: "How you believe in me even on the days I doubt myself." },
  { id: 17, tag: "Late Nights", reason: "Those quiet midnight talks when the rest of the world is asleep." },
  { id: 18, tag: "Our Memories", reason: "Every little moment behind us, and all the thousands still ahead." },
  { id: 19, tag: "Your Soul", reason: "The genuine warmth, honesty, and sweetness you bring into my life." },
  { id: 20, tag: "Simply You", reason: "Because you are my favorite person in this universe, forever & always." },
];

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
}

// Helper to get current time in IST (milliseconds)
function getNowIST(): { nowIST: Date; currentYear: number } {
  const nowUTC = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(nowUTC.getTime() + istOffsetMs);
  return { nowIST, currentYear: nowIST.getUTCFullYear() };
}

// Calculate the start & end timestamps of the birthday in IST
function getBirthdayWindowIST(year: number) {
  const startUTC = Date.UTC(year, BDAY_MONTH_INDEX, BDAY_DAY - 1, 18, 30, 0, 0);
  const endUTC = Date.UTC(year, BDAY_MONTH_INDEX, BDAY_DAY, 18, 29, 59, 999);
  return { startUTC, endUTC };
}

// Web Audio API chime sound on blowing out candles
function playCelebrationChime() {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.07);
      gain.gain.setValueAtTime(0.09, ctx.currentTime + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.07 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + index * 0.07);
      osc.stop(ctx.currentTime + index * 0.07 + 0.65);
    });
  } catch {
    // Graceful fallback
  }
}

export default function BirthdayPage() {
  // Live IST phase and countdown state
  const [currentPhase, setCurrentPhase] = useState<PhaseType>("phase1");
  const [revisitCelebration, setRevisitCelebration] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [rolloverTargetYear, setRolloverTargetYear] = useState<number>(
    new Date().getFullYear() + 1
  );

  // Dual Audio Playlist state
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST_TRACKS[selectedTrackIndex];

  // Interactive cake state
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeBounce, setCakeBounce] = useState(false);

  // Photo state (image errors & flip state)
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [flippedPolaroids, setFlippedPolaroids] = useState<Record<number, boolean>>({});

  // 20 Reasons State
  const [unlockedReasons, setUnlockedReasons] = useState<Record<number, boolean>>({ 0: true });

  // Floating Reactions State
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  // Active phase is the live IST phase (or revisit if viewing in future year)
  const activePhase = revisitCelebration && currentPhase === "phase3" ? "phase2" : currentPhase;

  // Trigger grand celebratory confetti blast
  const fireConfetti = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65, x: 0.15 },
        colors: ["#f43f5e", "#ec4899", "#d946ef", "#8b5cf6", "#fbbf24", "#38bdf8"],
      });
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65, x: 0.85 },
        colors: ["#f43f5e", "#ec4899", "#d946ef", "#8b5cf6", "#fbbf24", "#38bdf8"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 95,
          spread: 120,
          origin: { y: 0.45, x: 0.5 },
          shapes: ["circle"],
          colors: ["#f472b6", "#fb7185", "#c084fc", "#fde047", "#fed7aa"],
        });
      }, 200);
    } catch {
      // Ignored
    }
  }, []);

  // Compute live phase and countdown
  useEffect(() => {
    const updateCountdownAndPhase = () => {
      const nowUTC = Date.now();
      const { currentYear } = getNowIST();

      const { startUTC: thisYearStart, endUTC: thisYearEnd } =
        getBirthdayWindowIST(currentYear);

      let detectedPhase: PhaseType = "phase1";
      let targetTimestamp = thisYearStart;

      if (nowUTC < thisYearStart) {
        detectedPhase = "phase1";
        targetTimestamp = thisYearStart;
      } else if (nowUTC >= thisYearStart && nowUTC <= thisYearEnd) {
        detectedPhase = "phase2";
      } else {
        detectedPhase = "phase3";
        const nextYear = currentYear + 1;
        setRolloverTargetYear(nextYear);
        const { startUTC: nextYearStart } = getBirthdayWindowIST(nextYear);
        targetTimestamp = nextYearStart;
      }

      setCurrentPhase(detectedPhase);

      const diff = targetTimestamp - nowUTC;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining({ days, hours, minutes, seconds, isPast: false });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      }
    };

    updateCountdownAndPhase();
    const interval = setInterval(updateCountdownAndPhase, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto trigger confetti when entering Phase 2
  useEffect(() => {
    if (activePhase === "phase2") {
      const timer = setTimeout(() => {
        fireConfetti();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activePhase, fireConfetti]);

  // Handle Cake Click (Blow Out / Relight)
  const handleCakeClick = () => {
    setCakeBounce(true);
    setTimeout(() => setCakeBounce(false), 400);

    if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
      try {
        window.navigator.vibrate([50, 40, 60]);
      } catch {
        // Ignored
      }
    }

    if (!candlesBlown) {
      setCandlesBlown(true);
      playCelebrationChime();
      fireConfetti();
    } else {
      setCandlesBlown(false);
    }
  };

  // Safe Audio Toggle for Mobile Browsers
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Audio playback issue:", err);
            setAudioError(true);
            setIsPlaying(false);
          });
      }
    }
  };

  // Switch between Birthday Anthem and Meme Vibe
  const switchTrack = (index: number) => {
    if (index === selectedTrackIndex && isPlaying) return;
    setSelectedTrackIndex(index);
    setAudioError(false);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST_TRACKS[index].src;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Audio playback issue:", err);
            setAudioError(true);
            setIsPlaying(false);
          });
      }
    }
  };

  // Toggle Polaroid Card Flip
  const togglePolaroidFlip = (id: number) => {
    setFlippedPolaroids((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
      try {
        window.navigator.vibrate(25);
      } catch {}
    }
  };

  // Toggle 20 Reasons card
  const toggleReason = (index: number) => {
    setUnlockedReasons((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      // If unlocking a new card, check if all 20 are unlocked for special confetti!
      const totalUnlocked = Object.values(next).filter(Boolean).length;
      if (totalUnlocked === 20) {
        fireConfetti();
      }
      return next;
    });
    if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
      try {
        window.navigator.vibrate(30);
      } catch {}
    }
  };

  // Unlock all 20 reasons
  const unlockAllReasons = () => {
    const all: Record<number, boolean> = {};
    for (let i = 0; i < 20; i++) all[i] = true;
    setUnlockedReasons(all);
    fireConfetti();
  };

  // Spawn a floating reaction emoji (Live-Stream Style)
  const triggerReaction = (emoji: string) => {
    const newId = Date.now() + Math.random();
    const randomLeft = Math.floor(Math.random() * 70) + 15; // 15% to 85%
    setFloatingReactions((prev) => [
      ...prev.slice(-18),
      { id: newId, emoji, left: randomLeft },
    ]);

    if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
      try {
        window.navigator.vibrate(20);
      } catch {}
    }

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 2800);
  };

  // Floating background petal items
  const backgroundElements = useMemo(
    () => [
      { id: 1, emoji: "🌸", left: "8%", delay: "0s", duration: "12s", size: "text-2xl" },
      { id: 2, emoji: "✨", left: "22%", delay: "2s", duration: "9s", size: "text-xl" },
      { id: 3, emoji: "🌷", left: "42%", delay: "4s", duration: "14s", size: "text-2xl" },
      { id: 4, emoji: "💖", left: "62%", delay: "1s", duration: "11s", size: "text-xl" },
      { id: 5, emoji: "🌺", left: "82%", delay: "3s", duration: "13s", size: "text-2xl" },
      { id: 6, emoji: "✨", left: "72%", delay: "5s", duration: "10s", size: "text-lg" },
      { id: 7, emoji: "🌸", left: "32%", delay: "6s", duration: "15s", size: "text-xl" },
      { id: 8, emoji: "👑", left: "92%", delay: "7s", duration: "16s", size: "text-lg" },
    ],
    []
  );

  const totalReasonsUnlocked = Object.values(unlockedReasons).filter(Boolean).length;

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-rose-100/70 via-pink-50/90 to-purple-100/70 text-slate-800 font-sans selection:bg-pink-300 selection:text-pink-900 pb-36 pt-4">
      {/* Dynamic Audio Element pointing to current selected track */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="auto"
        onError={() => setAudioError(true)}
      />

      {/* Floating Animated Petals / Sparkles Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {backgroundElements.map((item) => (
          <div
            key={item.id}
            className={`absolute animate-float-drift opacity-70 select-none ${item.size}`}
            style={{
              left: item.left,
              bottom: "-40px",
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Ambient radial glows */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-pink-300/35 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="absolute bottom-10 left-6 w-80 h-80 rounded-full bg-rose-300/35 blur-3xl" />
      </div>

      {/* Floating Romantic Reaction Shower (Stream Particles) */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {floatingReactions.map((item) => (
          <div
            key={item.id}
            className="absolute text-3xl select-none animate-reaction-float filter drop-shadow-md"
            style={{ left: `${item.left}%`, bottom: "75px" }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Sticky Top Header with Non-Overlapping Music Player */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-pink-200/80 shadow-xs">
        <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between gap-2">
          {/* Brand/Title */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-sm select-none">🌸</span>
            <span className="font-black text-xs tracking-wider text-pink-700 truncate font-serif">
              SOUMI&apos;S 20TH
            </span>
          </div>

          {/* Dual Audio Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Play/Pause Button */}
            <button
              onClick={toggleAudio}
              type="button"
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black shadow-xs active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <div className="flex items-center gap-0.5 h-2.5">
                    <span className="w-0.5 h-2.5 bg-white rounded-full animate-pulse" />
                    <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" />
                    <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                  <Pause className="w-2.5 h-2.5 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 fill-white" />
                  <span>Music</span>
                </>
              )}
            </button>

            {/* Vibe 1: Birthday Song */}
            <button
              onClick={() => switchTrack(0)}
              type="button"
              className={`px-2 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                selectedTrackIndex === 0
                  ? "bg-pink-100 text-pink-700 border border-pink-300 shadow-xs"
                  : "text-slate-600 hover:text-pink-600"
              }`}
            >
              🎂 Song
            </button>

            {/* Vibe 2: Meme Track */}
            <button
              onClick={() => switchTrack(1)}
              type="button"
              className={`px-2 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                selectedTrackIndex === 1
                  ? "bg-amber-100 text-amber-800 border border-amber-300 shadow-xs"
                  : "text-slate-600 hover:text-amber-700"
              }`}
            >
              🤪 Meme
            </button>
          </div>
        </div>

        {/* Audio Missing Hint Toast */}
        {audioError && !isPlaying && (
          <div className="text-[10px] py-1 px-3 bg-rose-50 border-t border-rose-200 text-rose-800 text-center font-semibold">
            💡 Add audio track for <span className="font-bold">{currentTrack.title}</span> at{" "}
            <code className="bg-white/80 px-1 py-0.5 rounded font-mono">{currentTrack.hint}</code>
          </div>
        )}
      </header>

      {/* Main Mobile Screen Wrapper */}
      <main className="relative z-10 max-w-md mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* ========================================================= */}
        {/* PHASE 1: PRE-BIRTHDAY COUNTDOWN (< Sept 28, 00:00:00 IST) */}
        {/* ========================================================= */}
        {activePhase === "phase1" && (
          <div className="w-full flex flex-col items-center text-center pt-6 pb-10 space-y-6 animate-fade-in">
            {/* Top Romantic Lock Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/90 text-pink-700 shadow-md shadow-pink-100/60 backdrop-blur-md text-xs font-bold tracking-wide">
              <Lock className="w-3.5 h-3.5 text-pink-500" />
              <span>BIRTHDAY VAULT LOCKED</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            </div>

            {/* Grand Header with Soumi in HUGE font */}
            <div className="space-y-2 pt-2">
              <div className="text-4xl sm:text-5xl filter drop-shadow-sm select-none animate-bounce-slow">
                👑 🌸 💖
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-pink-500 flex items-center justify-center gap-1.5">
                  <Stars className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>COUNTING DOWN TO</span>
                  <Stars className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </p>
                <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm font-serif">
                  SOUMI&apos;S 20TH
                </h1>
              </div>
              <p className="text-sm font-semibold text-pink-800/80 max-w-xs mx-auto">
                Two decades of your beautiful soul, baby. Your magic unlocks at midnight!
              </p>
            </div>

            {/* ======================================================= */}
            {/* GRAND HERO COUNTDOWN CARD (DAYS on Top, H/M/S on Bottom)*/}
            {/* ======================================================= */}
            <div className="w-full relative backdrop-blur-2xl bg-white/85 border-2 border-pink-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-pink-200/70 space-y-5">
              <div className="absolute -top-10 inset-x-10 h-10 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-pink-400/20 blur-xl pointer-events-none" />

              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-pink-300" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-pink-500 flex items-center gap-1.5">
                  <Stars className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>TIME UNTIL YOUR MAGIC UNLOCKS, MY LOVE</span>
                  <Stars className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-pink-300" />
              </div>

              {/* TOP HERO: HUGE EYE-CATCHING DAYS */}
              <div className="relative bg-gradient-to-b from-pink-50/95 via-white/90 to-rose-50/95 border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-inner flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-pink-200/50 blur-lg" />
                <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-purple-200/40 blur-lg" />

                <div className="relative text-7xl sm:text-8xl font-black tracking-tight leading-none bg-gradient-to-br from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm tabular-nums">
                  {String(timeRemaining.days).padStart(2, "0")}
                </div>

                <div className="mt-2.5 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black tracking-widest uppercase shadow-md shadow-pink-300/50">
                  <span>🌸</span>
                  <span>DAYS TO GO</span>
                  <span>🌸</span>
                </div>
              </div>

              {/* BOTTOM ROW: HOURS, MINUTES, SECONDS */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-gradient-to-b from-white/95 to-pink-50/90 border border-pink-200/80 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center">
                  <div className="text-3xl sm:text-4xl font-black text-slate-800 tabular-nums tracking-tight">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-pink-500 mt-1">
                    Hours
                  </div>
                </div>

                <div className="bg-gradient-to-b from-white/95 to-pink-50/90 border border-pink-200/80 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center">
                  <div className="text-3xl sm:text-4xl font-black text-slate-800 tabular-nums tracking-tight">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-pink-500 mt-1">
                    Minutes
                  </div>
                </div>

                <div className="bg-gradient-to-b from-rose-50/95 to-pink-100/90 border border-rose-300/80 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="text-3xl sm:text-4xl font-black text-rose-600 tabular-nums tracking-tight animate-pulse flex items-center justify-center">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-rose-500 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-ping" />
                    <span>Seconds</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pink-700/90 pt-1">
                <Clock className="w-3.5 h-3.5 text-pink-500" />
                <span>Target: September 28, 00:00:00 IST</span>
              </div>
            </div>

            {/* Playful Cute Lock Notice */}
            <div className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl p-0.5 shadow-xl shadow-pink-200/60">
              <div className="bg-white/95 backdrop-blur-md rounded-[22px] p-4 sm:p-5 text-center space-y-1.5">
                <p className="text-sm sm:text-base font-extrabold text-pink-900 leading-snug">
                  “No peeking early, baby! Your 20th birthday magic unlocks at midnight, sweetheart.”
                </p>
                <p className="text-xs text-pink-700 font-medium flex items-center justify-center gap-1.5">
                  <span>Hold tight, the celebration of the century is waiting</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
                </p>
              </div>
            </div>

            {/* Romantic Teaser Card */}
            <div className="w-full backdrop-blur-md bg-white/60 border border-pink-200/80 rounded-3xl p-4 text-xs text-pink-900/80 space-y-1 shadow-sm">
              <div className="font-bold text-pink-950 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Two Whole Decades of Your Sunshine, Darling</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-slate-600">Every second brings us closer to the big 2-0 celebration.</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: BIRTHDAY CELEBRATION (Sept 28, 00:00:00 to 23:59:59 IST)        */}
        {/* ========================================================================= */}
        {activePhase === "phase2" && (
          <div className="w-full flex flex-col items-center text-center pt-4 space-y-8 animate-fade-in">
            {/* Festive Top Banner */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white shadow-lg shadow-pink-300/60 text-xs font-black tracking-widest uppercase animate-pulse">
              <span>🎉</span>
              <span>IT&apos;S OFFICIALLY SEPTEMBER 28!</span>
              <span>🥳</span>
            </div>

            {/* Headline Title with Soumi in HUGE font */}
            <div className="space-y-1 pt-1">
              <p className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-pink-500">
                HAPPY 20TH BIRTHDAY
              </p>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm font-serif">
                SOUMI! 💖
              </h1>
              <p className="text-sm font-semibold text-pink-800/90 flex items-center justify-center gap-1.5 pt-1">
                <span>🌸</span>
                <span>Two Decades of Pure Sunshine & Magic for My Baby</span>
                <span>🌺</span>
              </p>
            </div>

            {/* ================================================================= */}
            {/* BESPOKE LUXURY 3D VECTOR BIRTHDAY CAKE (7 Flickering Candles)    */}
            {/* ================================================================= */}
            <div className="w-full backdrop-blur-2xl bg-white/90 border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-pink-200/70 flex flex-col items-center space-y-4">
              <div className="text-xs font-black uppercase tracking-widest text-pink-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Make a 20th Birthday Wish</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </div>

              {/* The Grand Interactive Cake Platform */}
              <div
                onClick={handleCakeClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCakeClick()}
                aria-label="Interactive birthday cake. Tap to blow out candles."
                className={`relative cursor-pointer select-none group w-full max-w-[340px] mx-auto py-1 transition-transform duration-300 active:scale-95 ${
                  cakeBounce ? "scale-95" : "hover:scale-[1.02]"
                }`}
              >
                {/* Visual SVG Cake */}
                <svg
                  viewBox="0 0 320 280"
                  className="w-full h-auto drop-shadow-xl overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="cakeDropShadow" x="-15%" y="-15%" width="130%" height="135%">
                      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.16" />
                    </filter>
                    <filter id="flameGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="3.5" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Cake Stand Gradient */}
                    <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="35%" stopColor="#ffffff" />
                      <stop offset="70%" stopColor="#f1f5f9" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>

                    {/* Tier 2 (Bottom) Frosting Gradients */}
                    <linearGradient id="tier2Body" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fda4af" />
                      <stop offset="25%" stopColor="#fecdd3" />
                      <stop offset="60%" stopColor="#fff1f2" />
                      <stop offset="85%" stopColor="#fecdd3" />
                      <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                    <linearGradient id="tier2Top" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#ffe4e6" />
                    </linearGradient>

                    {/* Tier 1 (Top) Frosting Gradients */}
                    <linearGradient id="tier1Body" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbcfe8" />
                      <stop offset="30%" stopColor="#fdf2f8" />
                      <stop offset="70%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="tier1Top" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#fdf2f8" />
                    </linearGradient>

                    {/* Organic Strawberry Glaze Drip */}
                    <linearGradient id="strawberryGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="60%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>

                    {/* Metallic Gold Gradient */}
                    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="35%" stopColor="#facc15" />
                      <stop offset="65%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>

                    {/* Luminous Fire Gradients */}
                    <linearGradient id="flameOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="30%" stopColor="#f97316" />
                      <stop offset="70%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>

                    <linearGradient id="flameInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="55%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>

                  {/* 1. STAND */}
                  <ellipse cx="160" cy="265" rx="75" ry="7" fill="#f43f5e" fillOpacity="0.12" />
                  <ellipse cx="160" cy="260" rx="55" ry="6" fill="url(#pedestalGrad)" stroke="#cbd5e1" strokeWidth="1" />
                  <path d="M152 230 L152 258 Q160 262 168 258 L168 230 Z" fill="url(#pedestalGrad)" stroke="#cbd5e1" strokeWidth="1" />
                  <ellipse cx="160" cy="230" rx="125" ry="16" fill="url(#pedestalGrad)" stroke="#cbd5e1" strokeWidth="1.5" filter="url(#cakeDropShadow)" />
                  <ellipse cx="160" cy="228" rx="121" ry="13" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />

                  {/* 2. TIER 2 (BOTTOM TIER) */}
                  <path d="M55 170 C55 200 265 200 265 170 L265 218 C265 248 55 248 55 218 Z" fill="url(#tier2Body)" />
                  <ellipse cx="160" cy="170" rx="105" ry="16" fill="url(#tier2Top)" />

                  {/* Bottom Pearl Piping */}
                  {[65, 81, 97, 113, 129, 145, 160, 175, 191, 207, 223, 239, 255].map((cx, i) => (
                    <circle key={i} cx={cx} cy={217 + Math.sin((i / 12) * Math.PI) * 13} r="3.8" fill="#ffffff" stroke="#fecdd3" strokeWidth="0.8" />
                  ))}

                  {/* Embossed Gold Ribbon Plaque: "✨ SOUMI'S 20TH ✨" */}
                  <g transform="translate(160, 208)">
                    <rect x="-65" y="-9" width="130" height="18" rx="9" fill="url(#goldMetallic)" stroke="#fef08a" strokeWidth="1.2" filter="url(#cakeDropShadow)" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="900" letterSpacing="1.2">
                      ✨ SOUMI&apos;S 20TH ✨
                    </text>
                  </g>

                  {/* 3. TIER 1 (TOP TIER) */}
                  <path d="M90 115 C90 138 230 138 230 115 L230 162 C230 185 90 185 90 162 Z" fill="url(#tier1Body)" />
                  <ellipse cx="160" cy="115" rx="70" ry="12" fill="url(#tier1Top)" />

                  {/* Tier 1 Bottom Piping */}
                  {[98, 113, 129, 145, 160, 175, 191, 207, 222].map((cx, i) => (
                    <circle key={i} cx={cx} cy={161 + Math.sin((i / 8) * Math.PI) * 9} r="3.2" fill="#ffffff" stroke="#fbcfe8" strokeWidth="0.8" />
                  ))}

                  {/* Smooth Strawberry Ganache Glaze with organic drips */}
                  <path
                    d="M90 115
                       C96 132 101 138 106 128
                       C112 118 118 142 124 130
                       C130 118 136 138 142 128
                       C148 116 154 145 160 132
                       C166 118 172 138 178 126
                       C184 116 190 140 196 128
                       C202 118 208 134 214 125
                       C220 116 226 128 230 115
                       Z"
                    fill="url(#strawberryGlaze)"
                    opacity="0.92"
                  />

                  {/* Whipped Cream Rosettes & Strawberries on Top Tier */}
                  {[102, 125, 160, 195, 218].map((cx, i) => (
                    <g key={i}>
                      {/* Cream swirl */}
                      <ellipse cx={cx} cy={115} rx="6" ry="4" fill="#ffffff" stroke="#fce7f3" strokeWidth="0.8" />
                      <circle cx={cx} cy={113} r="2.5" fill="#ffffff" />
                      {/* Ruby Strawberry on alternate rosettes */}
                      {i % 2 === 0 && (
                        <g>
                          <path
                            d={`M${cx - 3.5} 113 C${cx - 4} 107 ${cx + 4} 107 ${cx + 3.5} 113 C${cx + 2} 116 ${cx} 118 ${cx - 3.5} 113 Z`}
                            fill="#ef4444"
                          />
                          {/* Leaf calyx */}
                          <path d={`M${cx - 2} 107 L${cx} 109 L${cx + 2} 107`} stroke="#22c55e" strokeWidth="1" fill="none" />
                        </g>
                      )}
                    </g>
                  ))}

                  {/* 4. CROWN OF CANDLES & TALL TEARDROP FLAMES */}

                  {/* Candle Left (Mint Pastel) */}
                  <g>
                    <rect x="114" y="80" width="4" height="28" rx="2" fill="#5eead4" stroke="#ccfbf1" strokeWidth="0.6" />
                    <line x1="114" y1="86" x2="118" y2="90" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="114" y1="94" x2="118" y2="98" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="116" y1="80" x2="116" y2="74" stroke="#475569" strokeWidth="1.2" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-1"}>
                      <circle cx="116" cy="65" r="10" fill="#fbbf24" fillOpacity="0.22" />
                      <path d="M 116 56 C 121 63 121 74 116 74 C 111 74 111 63 116 56 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 116 62 C 119 67 119 73 116 73 C 113 73 113 67 116 62 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="116" cy="73.5" rx="1.5" ry="0.8" fill="#60a5fa" opacity="0.8" />
                    </g>
                    {candlesBlown && (
                      <path d="M116 74 Q112 67 117 60 Q121 54 116 48" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeDasharray="2 2" className="animate-smoke" />
                    )}
                  </g>

                  {/* Candle Mid-Left (Lavender Pastel) */}
                  <g>
                    <rect x="128" y="75" width="4" height="33" rx="2" fill="#c084fc" stroke="#f3e8ff" strokeWidth="0.6" />
                    <line x1="128" y1="82" x2="132" y2="86" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="128" y1="91" x2="132" y2="95" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="130" y1="75" x2="130" y2="69" stroke="#475569" strokeWidth="1.2" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-2"}>
                      <circle cx="130" cy="59" r="11" fill="#fbbf24" fillOpacity="0.22" />
                      <path d="M 130 48 C 135.5 56 136 69 130 69 C 124 69 124.5 56 130 48 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 130 55 C 133 60 133.5 68 130 68 C 126.5 68 127 60 130 55 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="130" cy="68.5" rx="1.5" ry="0.8" fill="#60a5fa" opacity="0.8" />
                    </g>
                    {candlesBlown && (
                      <path d="M130 69 Q126 62 131 55 Q135 49 130 43" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeDasharray="2 2" className="animate-smoke" />
                    )}
                  </g>

                  {/* CENTERPIECE: 3D METALLIC GOLD CANDLE '2' */}
                  <g>
                    <g filter="url(#cakeDropShadow)">
                      <rect x="141" y="66" width="16" height="38" rx="4" fill="url(#goldMetallic)" stroke="#fef08a" strokeWidth="1.2" />
                      <text x="149" y="93" textAnchor="middle" fill="#78350f" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                        2
                      </text>
                    </g>
                    <line x1="149" y1="66" x2="149" y2="58" stroke="#475569" strokeWidth="1.4" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-1"}>
                      <circle cx="149" cy="45" r="16" fill="#fbbf24" fillOpacity="0.25" />
                      <path d="M 149 33 C 157 43 157 58 149 58 C 141 58 141 43 149 33 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 149 41 C 153.5 47 154 57 149 57 C 144 57 144.5 47 149 41 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="149" cy="57.5" rx="2" ry="1" fill="#60a5fa" opacity="0.85" />
                    </g>
                    {candlesBlown && (
                      <path d="M149 58 Q143 49 150 41 Q155 33 148 25" stroke="#94a3b8" strokeWidth="1.4" fill="none" className="animate-smoke" />
                    )}
                  </g>

                  {/* CENTERPIECE: 3D METALLIC GOLD CANDLE '0' */}
                  <g>
                    <g filter="url(#cakeDropShadow)">
                      <rect x="163" y="66" width="16" height="38" rx="4" fill="url(#goldMetallic)" stroke="#fef08a" strokeWidth="1.2" />
                      <text x="171" y="93" textAnchor="middle" fill="#78350f" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                        0
                      </text>
                    </g>
                    <line x1="171" y1="66" x2="171" y2="58" stroke="#475569" strokeWidth="1.4" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-3"}>
                      <circle cx="171" cy="45" r="16" fill="#fbbf24" fillOpacity="0.25" />
                      <path d="M 171 33 C 179 43 179 58 171 58 C 163 58 163 43 171 33 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 171 41 C 175.5 47 176 57 171 57 C 166 57 166.5 47 171 41 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="171" cy="57.5" rx="2" ry="1" fill="#60a5fa" opacity="0.85" />
                    </g>
                    {candlesBlown && (
                      <path d="M171 58 Q165 49 172 41 Q177 33 170 25" stroke="#94a3b8" strokeWidth="1.4" fill="none" className="animate-smoke" />
                    )}
                  </g>

                  {/* Candle Mid-Right (Rose Pastel) */}
                  <g>
                    <rect x="188" y="75" width="4" height="33" rx="2" fill="#f472b6" stroke="#fdf2f8" strokeWidth="0.6" />
                    <line x1="188" y1="82" x2="192" y2="86" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="188" y1="91" x2="192" y2="95" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="190" y1="75" x2="190" y2="69" stroke="#475569" strokeWidth="1.2" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-2"}>
                      <circle cx="190" cy="59" r="11" fill="#fbbf24" fillOpacity="0.22" />
                      <path d="M 190 48 C 195.5 56 196 69 190 69 C 184 69 184.5 56 190 48 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 190 55 C 193 60 193.5 68 190 68 C 186.5 68 187 60 190 55 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="190" cy="68.5" rx="1.5" ry="0.8" fill="#60a5fa" opacity="0.8" />
                    </g>
                    {candlesBlown && (
                      <path d="M190 69 Q186 62 191 55 Q195 49 190 43" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeDasharray="2 2" className="animate-smoke" />
                    )}
                  </g>

                  {/* Candle Right (Peach Pastel) */}
                  <g>
                    <rect x="202" y="80" width="4" height="28" rx="2" fill="#fb923c" stroke="#ffedd5" strokeWidth="0.6" />
                    <line x1="202" y1="86" x2="206" y2="90" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="202" y1="94" x2="206" y2="98" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line x1="204" y1="80" x2="204" y2="74" stroke="#475569" strokeWidth="1.2" />
                    <g className={candlesBlown ? "opacity-0 transition-opacity duration-300" : "animate-flicker-1"}>
                      <circle cx="204" cy="65" r="10" fill="#fbbf24" fillOpacity="0.22" />
                      <path d="M 204 56 C 209 63 209 74 204 74 C 199 74 199 63 204 56 Z" fill="url(#flameOuterGrad)" />
                      <path d="M 204 62 C 207 67 207 73 204 73 C 201 73 201 67 204 62 Z" fill="url(#flameInnerGrad)" />
                      <ellipse cx="204" cy="73.5" rx="1.5" ry="0.8" fill="#60a5fa" opacity="0.8" />
                    </g>
                    {candlesBlown && (
                      <path d="M204 74 Q200 67 205 60 Q209 54 204 48" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeDasharray="2 2" className="animate-smoke" />
                    )}
                  </g>

                  {/* Sparkle Stars around Cake */}
                  <g fill="#facc15" opacity="0.85">
                    <path d="M40 140 Q44 140 44 136 Q44 140 48 140 Q44 140 44 144 Q44 140 40 140 Z" />
                    <path d="M280 135 Q284 135 284 131 Q284 135 288 135 Q284 135 284 139 Q284 135 280 135 Z" />
                    <path d="M68 95 Q72 95 72 91 Q72 95 76 95 Q72 95 72 99 Q72 95 68 95 Z" />
                    <path d="M252 88 Q256 88 256 84 Q256 88 260 88 Q256 88 256 92 Q256 88 252 88 Z" />
                  </g>
                </svg>
              </div>

              {/* Cake Instruction / Wish Status */}
              <div className="pt-1">
                {candlesBlown ? (
                  <div className="space-y-1.5 animate-fade-in">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black tracking-wide">
                      <span>✨</span>
                      <span>20TH BIRTHDAY WISH SEALED!</span>
                      <span>✨</span>
                    </div>
                    <p className="text-sm font-black text-pink-600 animate-bounce">
                      May all your wildest dreams come true, baby! 💖
                    </p>
                    <p className="text-[11px] text-pink-500 font-medium">
                      (Tap the cake again to relight the candles & make another wish)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-black text-pink-700 animate-pulse flex items-center justify-center gap-1.5">
                      <span>💨</span>
                      <span>Tap the cake to blow out your candles & make a wish!</span>
                      <span>🎂</span>
                    </p>
                    <p className="text-[10px] text-pink-500/80 font-semibold">
                      (Includes real chime sound & celebration vibration!)
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={fireConfetti}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer border border-pink-300/70"
              >
                <PartyPopper className="w-4 h-4 text-pink-600" />
                <span>Shower More Confetti!</span>
              </button>
            </div>

            {/* ================================================================= */}
            {/* ROMANTIC POLAROID PHOTO GALLERY (With Tap-To-Flip Secret Notes)   */}
            {/* ================================================================= */}
            <div className="w-full space-y-4 pt-2">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-black text-pink-950 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Moments & Memories</span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </h2>
                <p className="text-xs font-semibold text-pink-700/80">
                  👆 Tap any photo to flip it over & read the secret note on the back!
                </p>
              </div>

              {/* Vertical Snap Feed of 3D Flip Polaroids */}
              <div className="space-y-6">
                {POLAROID_PHOTOS.map((photo, index) => {
                  const hasError = failedImages[photo.id];
                  const isFlipped = flippedPolaroids[photo.id];

                  return (
                    <div
                      key={photo.id}
                      onClick={() => togglePolaroidFlip(photo.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Flip photo ${index + 1}`}
                      className={`relative w-full max-w-[340px] mx-auto cursor-pointer select-none [perspective:1000px] ${photo.rotation} transition-transform duration-300 hover:scale-[1.02]`}
                    >
                      {/* Top Tape Accent */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-100/90 border-l border-r border-amber-200/60 shadow-sm backdrop-blur-sm -rotate-1 rounded-xs z-30 pointer-events-none" />

                      {/* 3D Flip Card Container */}
                      <div
                        className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                          isFlipped ? "[transform:rotateY(180deg)]" : ""
                        }`}
                      >
                        {/* ================= FRONT SIDE ================= */}
                        <div className="bg-white p-3.5 pb-5 rounded-sm shadow-2xl border border-slate-200/90 [backface-visibility:hidden]">
                          {/* Photo Container */}
                          <div className="relative aspect-[4/4.2] w-full bg-slate-100 overflow-hidden rounded-xs border border-slate-100 flex items-center justify-center">
                            {!hasError ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover"
                                onError={() => {
                                  setFailedImages((prev) => ({ ...prev, [photo.id]: true }));
                                }}
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-br ${photo.fallbackGradient} p-4 flex flex-col items-center justify-center text-center space-y-2`}
                              >
                                <span className="text-5xl filter drop-shadow-sm select-none">
                                  {photo.emoji}
                                </span>
                                <span className="text-xs font-black text-pink-900 tracking-wide">
                                  Photo Placeholder #{index + 1}
                                </span>
                                <span className="text-[10px] text-pink-800/80 font-mono bg-white/70 px-2 py-0.5 rounded-full font-bold">
                                  Place at {photo.src}
                                </span>
                              </div>
                            )}

                            {/* Flip Indicator Overlay Pill */}
                            <div className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1 opacity-90">
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>Flip</span>
                            </div>
                          </div>

                          {/* Handwritten-Style Front Caption */}
                          <div className="mt-3.5 text-center px-1">
                            <p className="font-serif italic text-sm text-slate-800 font-semibold leading-snug">
                              &ldquo;{photo.caption}&rdquo;
                            </p>
                            <p className="text-[10px] uppercase font-black tracking-widest text-pink-400 mt-1">
                              {photo.date}
                            </p>
                          </div>
                        </div>

                        {/* ================= BACK SIDE (SECRET NOTE) ================= */}
                        <div className="absolute inset-0 bg-[#fffdfa] border-2 border-dashed border-pink-300 rounded-sm p-5 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between text-left">
                          {/* Top Stamp & Postmark */}
                          <div className="flex items-center justify-between border-b border-pink-200/80 pb-2">
                            <div className="flex items-center gap-1.5 text-xs font-black text-pink-700 uppercase tracking-wider">
                              <span>📮</span>
                              <span>{photo.backStamp}</span>
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-rose-300 flex items-center justify-center text-[10px] text-rose-500 font-bold -rotate-12">
                              20th
                            </div>
                          </div>

                          {/* Handwritten Backside Note */}
                          <div className="py-3 text-slate-700 font-serif italic text-xs sm:text-sm leading-relaxed space-y-2">
                            <p className="font-bold text-pink-600 not-italic text-xs">
                              To My Dearest Baby,
                            </p>
                            <p>&ldquo;{photo.backNote}&rdquo;</p>
                          </div>

                          {/* Bottom Stamp */}
                          <div className="pt-2 border-t border-pink-200/70 flex items-center justify-between text-[10px] text-pink-600 font-sans font-bold">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                              <span>Forever & Always</span>
                            </span>
                            <span className="text-slate-400 font-normal">Tap to flip back</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================================================================= */}
            {/* 20 REASONS WHY I LOVE YOU (Interactive Envelope Deck)            */}
            {/* ================================================================= */}
            <div className="w-full backdrop-blur-2xl bg-white/90 border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-pink-200/70 space-y-4">
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold uppercase tracking-widest">
                  <span>💌</span>
                  <span>20 Reasons Why I Love You, Baby</span>
                  <span>💌</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Two Decades of Reasons to Adore You, My Love
                </h3>
                <p className="text-xs text-pink-700/80">
                  Tap each number to unlock a special reason why you mean the world to me
                </p>
              </div>

              {/* Progress Bar & Actions */}
              <div className="flex items-center justify-between text-xs font-bold text-pink-700 px-1 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
                  <span>
                    Unlocked: <span className="font-black text-pink-900">{totalReasonsUnlocked}</span> / 20
                  </span>
                </span>
                <button
                  onClick={unlockAllReasons}
                  type="button"
                  className="text-[11px] font-extrabold text-pink-600 hover:text-pink-800 bg-pink-100 hover:bg-pink-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  Reveal All ✨
                </button>
              </div>

              {/* Progress line */}
              <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${(totalReasonsUnlocked / 20) * 100}%` }}
                />
              </div>

              {/* 20 Cards Grid - Minimal & Aesthetic */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {TWENTY_REASONS.map((item, index) => {
                  const isUnlocked = unlockedReasons[index];

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleReason(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Reason ${item.id}: ${item.tag}`}
                      className="relative h-28 rounded-2xl cursor-pointer select-none [perspective:1000px] transition-transform active:scale-95"
                    >
                      <div
                        className={`relative w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                          isUnlocked ? "[transform:rotateY(180deg)]" : ""
                        }`}
                      >
                        {/* UNLOCKED FRONT - Minimal Frosted Style */}
                        <div className="absolute inset-0 bg-white/95 border border-pink-200/90 hover:border-pink-300 rounded-2xl p-2.5 shadow-xs flex flex-col justify-between items-center text-center [backface-visibility:hidden] transition-all">
                          <div className="w-full flex items-center justify-between text-[10px] text-pink-400 font-black">
                            <span className="bg-pink-100/80 text-pink-700 px-1.5 py-0.5 rounded-full">
                              #{String(item.id).padStart(2, "0")}
                            </span>
                            <span>💌</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs font-black text-slate-800 tracking-tight block">
                              {item.tag}
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-pink-500/80 tracking-wide uppercase">
                            Tap to reveal ✨
                          </span>
                        </div>

                        {/* REVEALED BACK - Soft Rose Gold Minimal Note */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 text-white border border-pink-300 rounded-2xl p-2.5 shadow-md flex flex-col justify-between text-left [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider opacity-90 border-b border-white/20 pb-1">
                            <span>#{String(item.id).padStart(2, "0")} · {item.tag}</span>
                            <span>💖</span>
                          </div>
                          <p className="text-[11px] leading-snug font-medium text-pink-50 py-0.5">
                            {item.reason}
                          </p>
                          <div className="text-[8px] text-pink-200 text-right">Tap to close</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================================================================= */}
            {/* HEARTFELT LOVE NOTE CARD                                         */}
            {/* ================================================================= */}
            <div className="w-full relative backdrop-blur-2xl bg-white/90 border-2 border-pink-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-pink-200/70 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-pink-100 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-serif text-sm font-bold shadow-md">
                    20
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{LOVE_NOTE.heading}</h3>
                    <p className="text-[11px] text-pink-600 font-semibold">{LOVE_NOTE.subheading}</p>
                  </div>
                </div>
                <span className="text-2xl">💌</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-serif">
                <p className="font-bold text-pink-700 not-italic">{LOVE_NOTE.salutation}</p>
                {LOVE_NOTE.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs">
                <span className="italic text-slate-500">{LOVE_NOTE.closing}</span>
                <span className="font-bold text-pink-600 flex items-center gap-1">
                  <span>{LOVE_NOTE.signature}</span>
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: POST-BIRTHDAY ROLLOVER (Starting Sept 29, 00:00:00 IST)          */}
        {/* ========================================================================= */}
        {activePhase === "phase3" && (
          <div className="w-full flex flex-col items-center text-center pt-8 pb-10 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-700 shadow-md text-xs font-bold">
              <Stars className="w-3.5 h-3.5 text-amber-500" />
              <span>Chapter 20 In Full Bloom</span>
              <Stars className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <div className="space-y-2">
              <span className="text-5xl select-none inline-block animate-bounce-slow">💖 🎂 ✨</span>
              <h1 className="text-3xl font-black text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
                Baby, You Made 20 Look Magical 💖
              </h1>
            </div>

            <div className="w-full backdrop-blur-2xl bg-white/90 border-2 border-pink-200/90 rounded-3xl p-6 shadow-2xl shadow-pink-100/60 space-y-3 text-center">
              <p className="text-base sm:text-lg font-black text-pink-900 leading-snug">
                “Hope your 20th was as incredible as you are, sweetheart. Counting down to 21!”
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you for filling this birthday with smiles and unforgettable memories. The best is yet to come!
              </p>
            </div>

            {/* Rollover Next Year Countdown Card */}
            <div className="w-full backdrop-blur-2xl bg-white/85 border-2 border-pink-200 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="text-xs font-black uppercase tracking-widest text-pink-600 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>Next Milestone: My Baby&apos;s 21st Birthday ({rolloverTargetYear})</span>
              </div>

              <div className="bg-gradient-to-b from-pink-50/95 to-white/90 border border-pink-200/80 rounded-2xl p-4 shadow-inner flex flex-col items-center">
                <div className="text-6xl font-black text-pink-600 tabular-nums">
                  {String(timeRemaining.days).padStart(2, "0")}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-pink-400 mt-1">
                  Days Left
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-pink-50/80 border border-pink-200/60 rounded-2xl p-2.5">
                  <div className="text-2xl font-black text-slate-800 tabular-nums">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-pink-400 mt-0.5">
                    Hours
                  </div>
                </div>
                <div className="bg-pink-50/80 border border-pink-200/60 rounded-2xl p-2.5">
                  <div className="text-2xl font-black text-slate-800 tabular-nums">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-pink-400 mt-0.5">
                    Mins
                  </div>
                </div>
                <div className="bg-pink-50/80 border border-pink-200/60 rounded-2xl p-2.5">
                  <div className="text-2xl font-black text-rose-500 tabular-nums animate-pulse">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-rose-400 mt-0.5">
                    Secs
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-pink-500 font-bold">
                Targeting: September 28, {rolloverTargetYear} (00:00:00 IST)
              </p>
            </div>

            <button
              onClick={() => setRevisitCelebration(true)}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-lg shadow-pink-300 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Revisit Birthday Celebrations & Photos</span>
            </button>
          </div>
        )}

        {/* Footer Love Seal */}
        <div className="w-full text-center pt-8 pb-12 text-slate-400 text-[11px] space-y-1">
          <p className="flex items-center justify-center gap-1 font-medium text-pink-400/80">
            <span>Crafted with endless love for my baby</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          </p>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FLOATING ROMANTIC REACTION DOCK (Tap Emojis to shower on screen)          */}
      {/* ========================================================================= */}
      <div className="fixed bottom-12 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-2xl bg-white/90 shadow-2xl border-2 border-pink-200/90">
          <span className="text-[10px] font-black text-pink-600 px-1 hidden sm:inline">
            Send Love:
          </span>
          {["💖", "🥺", "🎂", "🌹", "✨", "🤪"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              type="button"
              aria-label={`Send ${emoji} reaction`}
              className="w-8 h-8 flex items-center justify-center text-lg hover:scale-125 active:scale-90 transition-transform cursor-pointer rounded-full hover:bg-pink-100/60"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Preview mode toggle removed - ready for live 28th midnight reveal */}

      {/* Global Animation Keyframes Helper */}
      <style jsx global>{`
        @keyframes floatDrift {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes reactionFloat {
          0% {
            transform: translateY(0) scale(0.7) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-45vh) scale(1.3) rotate(-15deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-85vh) scale(1.6) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes flicker1 {
          0%, 100% {
            transform: scale(1, 1) skewX(0deg);
            opacity: 0.96;
          }
          50% {
            transform: scale(1.06, 1.15) skewX(1.8deg);
            opacity: 1;
          }
        }

        @keyframes flicker2 {
          0%, 100% {
            transform: scale(1.03, 1.08) skewX(1.2deg);
            opacity: 1;
          }
          50% {
            transform: scale(0.98, 1.02) skewX(-1.8deg);
            opacity: 0.94;
          }
        }

        @keyframes flicker3 {
          0%, 100% {
            transform: scale(0.98, 1.02) skewX(-1.2deg);
            opacity: 0.94;
          }
          50% {
            transform: scale(1.06, 1.16) skewX(2.2deg);
            opacity: 1;
          }
        }

        @keyframes smokePuff {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-20px) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-float-drift {
          animation-name: floatDrift;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-iteration-count: infinite;
        }

        .animate-reaction-float {
          animation: reactionFloat 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-flicker-1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flicker1 1.1s ease-in-out infinite;
        }

        .animate-flicker-2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flicker2 1.3s ease-in-out infinite 0.2s;
        }

        .animate-flicker-3 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flicker3 0.9s ease-in-out infinite 0.4s;
        }

        .animate-smoke {
          animation: smokePuff 1s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
