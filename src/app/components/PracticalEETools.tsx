"use client";

import React, { useState } from 'react';
import { Wrench, Zap, Calculator, Sliders, Check, Activity, Cpu, Eye, Gauge, Battery, Binary, HardDrive } from 'lucide-react';

interface PracticalEEToolsProps {
  isDark: boolean;
}

export default function PracticalEETools({ isDark }: PracticalEEToolsProps) {
  const [activeTab, setActiveTab] = useState<'divider' | 'resistor' | 'smd' | 'battery' | 'logic' | 'ohms'>('divider');

  // --- 1. RESISTOR CALCULATOR STATE (THROUGH-HOLE) ---
  const [numBands, setNumBands] = useState<4 | 5>(4);
  const [band1, setBand1] = useState(4); // Yellow (4)
  const [band2, setBand2] = useState(7); // Violet (7)
  const [band3, setBand3] = useState(0); // Black (0) for 5-band
  const [multiplier, setMultiplier] = useState(2); // x100 (4.7k)
  const [tolerance, setTolerance] = useState(5); // Gold (5%)

  const digitColors = [
    { name: 'Black', val: 0, hex: '#171717', text: '#ffffff' },
    { name: 'Brown', val: 1, hex: '#78350f', text: '#ffffff' },
    { name: 'Red', val: 2, hex: '#dc2626', text: '#ffffff' },
    { name: 'Orange', val: 3, hex: '#ea580c', text: '#ffffff' },
    { name: 'Yellow', val: 4, hex: '#eab308', text: '#000000' },
    { name: 'Green', val: 5, hex: '#16a34a', text: '#ffffff' },
    { name: 'Blue', val: 6, hex: '#2563eb', text: '#ffffff' },
    { name: 'Violet', val: 7, hex: '#9333ea', text: '#ffffff' },
    { name: 'Grey', val: 8, hex: '#4b5563', text: '#ffffff' },
    { name: 'White', val: 9, hex: '#f3f4f6', text: '#000000' },
  ];

  const multiplierColors = [
    { name: 'Silver (x0.01)', pow: -2, hex: '#9ca3af', text: '#000000', label: 'x0.01' },
    { name: 'Gold (x0.1)', pow: -1, hex: '#eab308', text: '#000000', label: 'x0.1' },
    { name: 'Black (x1 Ω)', pow: 0, hex: '#171717', text: '#ffffff', label: 'x1' },
    { name: 'Brown (x10 Ω)', pow: 1, hex: '#78350f', text: '#ffffff', label: 'x10' },
    { name: 'Red (x100 Ω)', pow: 2, hex: '#dc2626', text: '#ffffff', label: 'x100' },
    { name: 'Orange (x1 kΩ)', pow: 3, hex: '#ea580c', text: '#ffffff', label: 'x1k' },
    { name: 'Yellow (x10 kΩ)', pow: 4, hex: '#eab308', text: '#000000', label: 'x10k' },
    { name: 'Green (x100 kΩ)', pow: 5, hex: '#16a34a', text: '#ffffff', label: 'x100k' },
    { name: 'Blue (x1 MΩ)', pow: 6, hex: '#2563eb', text: '#ffffff', label: 'x1M' },
    { name: 'Violet (x10 MΩ)', pow: 7, hex: '#9333ea', text: '#ffffff', label: 'x10M' },
  ];

  const toleranceColors = [
    { name: 'Brown (±1%)', tol: 1, hex: '#78350f', text: '#ffffff', label: '±1%' },
    { name: 'Red (±2%)', tol: 2, hex: '#dc2626', text: '#ffffff', label: '±2%' },
    { name: 'Green (±0.5%)', tol: 0.5, hex: '#16a34a', text: '#ffffff', label: '±0.5%' },
    { name: 'Blue (±0.25%)', tol: 0.25, hex: '#2563eb', text: '#ffffff', label: '±0.25%' },
    { name: 'Violet (±0.1%)', tol: 0.1, hex: '#9333ea', text: '#ffffff', label: '±0.1%' },
    { name: 'Gold (±5%)', tol: 5, hex: '#eab308', text: '#000000', label: '±5%' },
    { name: 'Silver (±10%)', tol: 10, hex: '#9ca3af', text: '#000000', label: '±10%' },
  ];

  const baseDigits = numBands === 4 ? band1 * 10 + band2 : band1 * 100 + band2 * 10 + band3;
  const rawResistance = baseDigits * Math.pow(10, multiplier);

  const formatResistance = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(2)} MΩ`;
    if (val >= 1000) return `${(val / 1000).toFixed(2)} kΩ`;
    return `${val.toFixed(1)} Ω`;
  };

  // --- 2. SMD CHIP RESISTOR DECODER STATE ---
  const [smdCode, setSmdCode] = useState<string>('103');

  const decodeSmd = (codeStr: string) => {
    const clean = codeStr.trim().toUpperCase();
    if (!clean) return { val: 0, text: 'Invalid Code', tol: '±5%' };

    if (/^\d{3}$/.test(clean)) {
      const d1 = parseInt(clean[0], 10);
      const d2 = parseInt(clean[1], 10);
      const exp = parseInt(clean[2], 10);
      const res = (d1 * 10 + d2) * Math.pow(10, exp);
      return { val: res, text: formatResistance(res), tol: '±5%' };
    }

    if (/^\d{4}$/.test(clean)) {
      const d1 = parseInt(clean[0], 10);
      const d2 = parseInt(clean[1], 10);
      const d3 = parseInt(clean[2], 10);
      const exp = parseInt(clean[3], 10);
      const res = (d1 * 100 + d2 * 10 + d3) * Math.pow(10, exp);
      return { val: res, text: formatResistance(res), tol: '±1%' };
    }

    if (clean.includes('R')) {
      const val = parseFloat(clean.replace('R', '.'));
      if (!isNaN(val)) return { val, text: `${val} Ω`, tol: '±5%' };
    }

    const eiaTable: Record<string, number> = {
      '01': 100, '02': 102, '03': 105, '04': 107, '05': 110, '10': 124, '20': 158, '30': 200, '40': 255, '47': 301, '68': 499, '88': 806, '96': 976
    };
    const eiaMult: Record<string, number> = {
      'Z': 0.001, 'Y': 0.01, 'X': 0.1, 'A': 1, 'B': 10, 'C': 100, 'D': 1000, 'E': 10000, 'F': 100000
    };
    if (clean.length === 3) {
      const digits = clean.substring(0, 2);
      const multLetter = clean.substring(2, 3);
      if (eiaTable[digits] && eiaMult[multLetter] !== undefined) {
        const res = eiaTable[digits] * eiaMult[multLetter];
        return { val: res, text: formatResistance(res), tol: '±1% (EIA-96)' };
      }
    }

    return { val: 0, text: 'Unknown Format', tol: 'N/A' };
  };

  const smdResult = decodeSmd(smdCode);

  // --- 3. BATTERY LIFE ESTIMATOR STATE ---
  const [batMode, setBatMode] = useState<'simple' | 'iot'>('simple');
  const [batCapacity, setBatCapacity] = useState<number>(2000);
  const [batCurrentMa, setBatCurrentMa] = useState<number>(50); // Simple mode continuous current (mA)
  const [iotActiveMa, setIotActiveMa] = useState<number>(150); // IoT mode awake current (mA)
  const [iotDutyFactor, setIotDutyFactor] = useState<number>(0.05); // Default 5% active duty cycle

  // Simple Mode Runtime
  const simpleHours = batCurrentMa > 0 ? (batCapacity * 0.85) / batCurrentMa : 0;
  const simpleDays = simpleHours / 24;

  // IoT Mode Runtime
  const effectiveIotMa = (iotActiveMa * iotDutyFactor) + (0.01 * (1 - iotDutyFactor)); // 10uA sleep baseline
  const iotHours = effectiveIotMa > 0 ? (batCapacity * 0.85) / effectiveIotMa : 0;
  const iotDays = iotHours / 24;

  const formatBatteryLifeText = (days: number, hours: number) => {
    if (days >= 365) return `${(days / 365).toFixed(1)} Years`;
    if (days >= 30) return `${(days / 30).toFixed(1)} Months`;
    if (days >= 1) return `${days.toFixed(1)} Days (${Math.round(hours)} hrs)`;
    return `${hours.toFixed(1)} Hours`;
  };

  // --- 4. LOGIC GATE SIMULATOR STATE ---
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT'>('AND');
  const [numGateInputs, setNumGateInputs] = useState<2 | 3>(2);
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);
  const [inputC, setInputC] = useState<boolean>(false);

  const computeGateOutput = (gate: string, a: boolean, b: boolean, c: boolean, numInputs: 2 | 3) => {
    if (gate === 'NOT') return !a;
    if (numInputs === 2) {
      switch (gate) {
        case 'AND': return a && b;
        case 'OR': return a || b;
        case 'NAND': return !(a && b);
        case 'NOR': return !(a || b);
        case 'XOR': return a !== b;
        default: return false;
      }
    } else {
      switch (gate) {
        case 'AND': return a && b && c;
        case 'OR': return a || b || c;
        case 'NAND': return !(a && b && c);
        case 'NOR': return !(a || b || c);
        case 'XOR': return ((a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0)) % 2 === 1;
        default: return false;
      }
    }
  };

  const gateOutput = computeGateOutput(gateType, inputA, inputB, inputC, numGateInputs);

  // --- 5. OHM'S LAW CALCULATOR STATE ---
  const [volts, setVolts] = useState<string>('5');
  const [amps, setAmps] = useState<string>('0.02');

  const vNum = parseFloat(volts) || 0;
  const iNum = parseFloat(amps) || 0;
  const rNum = iNum > 0 ? (vNum / iNum).toFixed(2) : '0';
  const pNum = (vNum * iNum).toFixed(3);
  const pWatts = parseFloat(pNum);

  // --- 6. VOLTAGE DIVIDER CALCULATOR STATE ---
  const [vin, setVin] = useState<number>(5.0);
  const [r1, setR1] = useState<number>(10000);
  const [r2, setR2] = useState<number>(10000);

  const vout = r1 + r2 > 0 ? vin * (r2 / (r1 + r2)) : 0;
  const dividerCurrentMa = r1 + r2 > 0 ? (vin / (r1 + r2)) * 1000 : 0;

  return (
    <section className="space-y-8 w-full">
      {/* MINIMAL WORKBENCH HEADER */}
      <div className={`flex flex-wrap justify-between items-center gap-2 border-b pb-4 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Workbench Tools
          </h2>
          <p className="text-xs text-zinc-500">Precision electronics engineering calculators & simulators</p>
        </div>
      </div>

      {/* MINIMAL RESPONSIVE TOOL TAB DOCK (LABELS UNDER ICONS) */}
      <div className={`p-1.5 rounded-2xl border backdrop-blur-xl grid grid-cols-3 sm:grid-cols-6 gap-1.5 transition-all ${
        isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-zinc-200 shadow-sm'
      }`}>
        <button
          onClick={() => setActiveTab('divider')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'divider'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <Calculator size={18} className={activeTab === 'divider' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">Divider</span>
        </button>

        <button
          onClick={() => setActiveTab('resistor')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'resistor'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <Sliders size={18} className={activeTab === 'resistor' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">Resistor</span>
        </button>

        <button
          onClick={() => setActiveTab('smd')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'smd'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <HardDrive size={18} className={activeTab === 'smd' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">SMD Chip</span>
        </button>

        <button
          onClick={() => setActiveTab('battery')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'battery'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <Battery size={18} className={activeTab === 'battery' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">Battery</span>
        </button>

        <button
          onClick={() => setActiveTab('logic')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'logic'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <Binary size={18} className={activeTab === 'logic' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">Logic</span>
        </button>

        <button
          onClick={() => setActiveTab('ohms')}
          className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-1 text-center select-none ${
            activeTab === 'ohms'
              ? isDark 
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' 
                : 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-sm'
              : isDark 
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
          }`}
        >
          <Zap size={18} className={activeTab === 'ohms' ? 'text-white' : ''} />
          <span className="text-[11px] font-medium tracking-tight">Ohm&apos;s Law</span>
        </button>
      </div>

      {/* FULL-WIDTH 2-COLUMN SPLIT CONTAINER */}
      <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all ${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
      }`}>
        {/* =========================================================================
           TOOL 1: VOLTAGE DIVIDER CALCULATOR
           ========================================================================= */}
        {activeTab === 'divider' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Calculator size={20} className="text-white" /> Voltage Divider Calculator
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Configure input voltage VIN and resistor divider network (R1, R2).</p>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border bg-white/[0.02] border-white/10 text-xs">
                <span className="text-[11px] font-bold text-zinc-500 mr-1">Presets:</span>
                {[
                  { name: '5V → 3.3V', pVin: 5, pR1: 1700, pR2: 3300 },
                  { name: '12V → 5V', pVin: 12, pR1: 14000, pR2: 10000 },
                  { name: '5V → 1.8V', pVin: 5, pR1: 3200, pR2: 1800 },
                  { name: '24V → 5V', pVin: 24, pR1: 38000, pR2: 10000 },
                  { name: '1:2 Halver', pVin: 5, pR1: 10000, pR2: 10000 },
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => { setVin(p.pVin); setR1(p.pR1); setR2(p.pR2); }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                      vin === p.pVin && r1 === p.pR1 && r2 === p.pR2
                        ? 'bg-white border-white text-zinc-950 font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-300">Input Voltage VIN:</span>
                  <span className="font-mono text-sm">{vin.toFixed(1)} V</span>
                </div>
                <input
                  type="range" min="1" max="400" step="1" value={vin}
                  onChange={(e) => setVin(parseFloat(e.target.value) || 0)}
                  className="w-full accent-white cursor-pointer h-2 bg-gray-700 rounded-lg"
                />
                <input
                  type="number" step="0.1" max="1000" value={vin}
                  onChange={(e) => setVin(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                  placeholder="Enter custom VIN up to 1000V..."
                />
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-300">Resistor R1 (Upper):</span>
                  <span className="font-mono text-sm">{formatResistance(r1)}</span>
                </div>
                <input
                  type="range" min="1" max="1000000" step="500" value={r1}
                  onChange={(e) => setR1(parseFloat(e.target.value) || 0)}
                  className="w-full accent-white cursor-pointer h-2 bg-gray-700 rounded-lg"
                />
                <input
                  type="number" value={r1}
                  onChange={(e) => setR1(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-emerald-400">Resistor R2 (Lower):</span>
                  <span className="font-mono text-sm">{formatResistance(r2)}</span>
                </div>
                <input
                  type="range" min="1" max="1000000" step="500" value={r2}
                  onChange={(e) => setR2(parseFloat(e.target.value) || 0)}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
                />
                <input
                  type="number" value={r2}
                  onChange={(e) => setR2(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase font-bold text-zinc-300 mb-4 block flex items-center gap-1.5">
                  <Eye size={14} /> Interactive Voltage Divider Schematic
                </span>

                <div className="w-full flex justify-center py-2">
                  <svg width="340" height="260" viewBox="0 0 340 260" className="w-full h-auto max-w-sm">
                    <circle cx="170" cy="24" r="7" fill="#ffffff" />
                    <text x="170" y="14" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">VIN ({vin}V)</text>
                    <line x1="170" y1="31" x2="170" y2="55" stroke="#ffffff" strokeWidth="3" />

                    <rect x="140" y="55" width="60" height="50" rx="8" fill={isDark ? "#27272a" : "#f4f4f5"} stroke="#ffffff" strokeWidth="2.5" />
                    <text x="170" y="76" fill={isDark ? "#ffffff" : "#09090b"} fontSize="12" fontWeight="bold" textAnchor="middle">R1</text>
                    <text x="170" y="92" fill={isDark ? "#d4d4d8" : "#27272a"} fontSize="11" textAnchor="middle">{formatResistance(r1)}</text>

                    <line x1="170" y1="105" x2="170" y2="155" stroke="#10b981" strokeWidth="3.5" />
                    <circle cx="170" cy="130" r="6" fill="#10b981" />

                    <line x1="170" y1="130" x2="250" y2="130" stroke="#10b981" strokeWidth="3.5" />
                    <circle cx="250" cy="130" r="6" fill="#10b981" />
                    <text x="260" y="134" fill="#10b981" fontSize="13" fontWeight="bold">VOUT ({vout.toFixed(2)}V)</text>

                    <rect x="140" y="155" width="60" height="50" rx="8" fill={isDark ? "#064e3b" : "#d1fae5"} stroke="#10b981" strokeWidth="2.5" />
                    <text x="170" y="176" fill={isDark ? "#6ee7b7" : "#065f46"} fontSize="12" fontWeight="bold" textAnchor="middle">R2</text>
                    <text x="170" y="192" fill={isDark ? "#a7f3d0" : "#047857"} fontSize="11" textAnchor="middle">{formatResistance(r2)}</text>

                    <line x1="170" y1="205" x2="170" y2="230" stroke="#6b7280" strokeWidth="3.5" />
                    <line x1="146" y1="230" x2="194" y2="230" stroke="#6b7280" strokeWidth="3.5" />
                    <line x1="156" y1="237" x2="184" y2="237" stroke="#6b7280" strokeWidth="3.5" />
                    <line x1="164" y1="244" x2="176" y2="244" stroke="#6b7280" strokeWidth="3.5" />
                    <text x="170" y="257" fill="#6b7280" fontSize="11" fontWeight="bold" textAnchor="middle">GND (0V)</text>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Output Voltage (VOUT):</span>
                  <div className="text-3xl font-extrabold text-emerald-500 font-mono mt-1">{vout.toFixed(2)} V</div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-1 block">Ratio: {(vout / (vin || 1)).toFixed(3)} × VIN</span>
                </div>

                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Current Draw:</span>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">{dividerCurrentMa.toFixed(3)} mA</div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-1 block">Power: {(vin * (dividerCurrentMa / 1000) * 1000).toFixed(1)} mW</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           TOOL 2: THROUGH-HOLE RESISTOR DECODER
           ========================================================================= */}
        {activeTab === 'resistor' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-3 border-white/10">
                <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Sliders size={18} className="text-white" /> Color Band Dials
                </h3>
                <div className="flex gap-2">
                  <button onClick={() => setNumBands(4)} className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all ${numBands === 4 ? 'bg-white text-zinc-950 shadow' : 'bg-white/5 text-gray-400'}`}>4-Band</button>
                  <button onClick={() => setNumBands(5)} className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all ${numBands === 5 ? 'bg-white text-zinc-950 shadow' : 'bg-white/5 text-gray-400'}`}>5-Band</button>
                </div>
              </div>

              {/* Band 1 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">Band 1 (1st Digit):</label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {digitColors.map((c) => (
                    <button key={c.val} onClick={() => setBand1(c.val)} className={`p-1.5 rounded-lg border font-semibold flex flex-col items-center transition-all ${band1 === c.val ? 'ring-2 ring-white font-bold scale-105' : 'opacity-80'}`} style={{ backgroundColor: c.hex, color: c.text }}>
                      <span>{c.val}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 2 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">Band 2 (2nd Digit):</label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {digitColors.map((c) => (
                    <button key={c.val} onClick={() => setBand2(c.val)} className={`p-1.5 rounded-lg border font-semibold flex flex-col items-center transition-all ${band2 === c.val ? 'ring-2 ring-white font-bold scale-105' : 'opacity-80'}`} style={{ backgroundColor: c.hex, color: c.text }}>
                      <span>{c.val}</span>
                    </button>
                  ))}
                </div>
              </div>

              {numBands === 5 && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 block">Band 3 (3rd Digit):</label>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    {digitColors.map((c) => (
                      <button key={c.val} onClick={() => setBand3(c.val)} className={`p-1.5 rounded-lg border font-semibold flex flex-col items-center transition-all ${band3 === c.val ? 'ring-2 ring-white font-bold scale-105' : 'opacity-80'}`} style={{ backgroundColor: c.hex, color: c.text }}>
                        <span>{c.val}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiplier */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">Multiplier Band:</label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {multiplierColors.map((m, idx) => (
                    <button key={idx} onClick={() => setMultiplier(m.pow)} className={`p-1.5 rounded-lg border font-semibold text-center transition-all ${multiplier === m.pow ? 'ring-2 ring-white scale-105' : 'opacity-80'}`} style={{ backgroundColor: m.hex, color: m.text }}>
                      <span className="text-[10px] block truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tolerance */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">Tolerance Band:</label>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  {toleranceColors.map((t, idx) => (
                    <button key={idx} onClick={() => setTolerance(t.tol)} className={`p-1.5 rounded-lg border font-semibold text-center transition-all ${tolerance === t.tol ? 'ring-2 ring-white scale-105 font-bold' : 'opacity-80'}`} style={{ backgroundColor: t.hex, color: t.text }}>
                      <span className="text-[10px] block truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: RESISTOR GRAPHIC WITH EMBEDDED TEXT */}
            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border flex flex-col items-center justify-center ${isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase font-bold text-gray-400 mb-6 flex items-center gap-1.5">
                  <Eye size={14} /> Resistor Rings Visualizer
                </span>

                <div className="w-full max-w-md flex justify-center py-4">
                  {(() => {
                    const b1Obj = digitColors[band1];
                    const b2Obj = digitColors[band2];
                    const b3Obj = digitColors[band3];
                    const multObj = multiplierColors.find((m) => m.pow === multiplier) || multiplierColors[2];
                    const tolObj = toleranceColors.find((t) => t.tol === tolerance) || toleranceColors[5];

                    return (
                      <svg width="360" height="110" viewBox="0 0 360 110" className="w-full h-auto">
                        <line x1="10" y1="55" x2="65" y2="55" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round" />
                        <line x1="295" y1="55" x2="350" y2="55" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round" />
                        <rect x="65" y="22" width="230" height="66" rx="14" fill="#d1d5db" stroke="#9ca3af" strokeWidth="3" />

                        <g>
                          <rect x="85" y="22" width="28" height="66" fill={b1Obj.hex} stroke="#000" strokeWidth="0.5" />
                          <text x="99" y="60" fill={b1Obj.text} fontSize="14" fontWeight="extrabold" textAnchor="middle">{b1Obj.val}</text>
                        </g>

                        <g>
                          <rect x="123" y="22" width="28" height="66" fill={b2Obj.hex} stroke="#000" strokeWidth="0.5" />
                          <text x="137" y="60" fill={b2Obj.text} fontSize="14" fontWeight="extrabold" textAnchor="middle">{b2Obj.val}</text>
                        </g>

                        {numBands === 5 && (
                          <g>
                            <rect x="161" y="22" width="28" height="66" fill={b3Obj.hex} stroke="#000" strokeWidth="0.5" />
                            <text x="175" y="60" fill={b3Obj.text} fontSize="14" fontWeight="extrabold" textAnchor="middle">{b3Obj.val}</text>
                          </g>
                        )}

                        <g>
                          <rect x={numBands === 5 ? "199" : "165"} y="22" width="34" height="66" fill={multObj.hex} stroke="#000" strokeWidth="0.5" />
                          <text x={numBands === 5 ? "216" : "182"} y="60" fill={multObj.text} fontSize="11" fontWeight="extrabold" textAnchor="middle">{multObj.label}</text>
                        </g>

                        <g>
                          <rect x="250" y="22" width="32" height="66" fill={tolObj.hex} stroke="#000" strokeWidth="0.5" />
                          <text x="266" y="60" fill={tolObj.text} fontSize="10" fontWeight="extrabold" textAnchor="middle">{tolObj.label}</text>
                        </g>
                      </svg>
                    );
                  })()}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Total Resistance Value:</span>
                <div className="text-4xl font-extrabold text-white font-mono mt-1">{formatResistance(rawResistance)}</div>
                <div className="flex justify-center items-center gap-4 text-xs font-mono text-zinc-400 mt-2">
                  <span>Tolerance: ±{tolerance}%</span>
                  <span>•</span>
                  <span>Range: {formatResistance(rawResistance * (1 - tolerance / 100))} - {formatResistance(rawResistance * (1 + tolerance / 100))}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           TOOL 3: SMD CHIP RESISTOR DECODER
           ========================================================================= */}
        {activeTab === 'smd' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <HardDrive size={20} className="text-white" /> SMD Marking Decoder
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Enter 3-digit, 4-digit, or EIA-96 codes printed on surface-mount chip components.</p>
              </div>

              {/* Quick Sample Code Chips */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border bg-white/[0.02] border-white/10 text-xs">
                <span className="text-[11px] font-bold text-zinc-500 mr-1">Examples:</span>
                {['103', '4701', '4R7', '01A', '68C', 'R05'].map((code) => (
                  <button
                    key={code}
                    onClick={() => setSmdCode(code)}
                    className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-semibold transition-all ${
                      smdCode.toUpperCase() === code
                        ? 'bg-white border-white text-zinc-950 font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <label className="text-xs font-bold text-zinc-300 block">SMD Resistor Marking Code:</label>
                <input
                  type="text"
                  maxLength={6}
                  value={smdCode}
                  onChange={(e) => setSmdCode(e.target.value)}
                  placeholder="e.g. 103, 4701, 01A, 4R7"
                  className={`w-full p-3.5 rounded-xl border font-mono text-base font-bold uppercase tracking-widest text-center ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <p className="font-bold text-zinc-200">Supported Formats:</p>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px]">
                  <li><strong className="text-white">3-Digit (5%):</strong> e.g. <code className="text-amber-400">103</code> = 10kΩ</li>
                  <li><strong className="text-white">4-Digit (1%):</strong> e.g. <code className="text-amber-400">4701</code> = 4.7kΩ</li>
                  <li><strong className="text-white">R-Decimal:</strong> e.g. <code className="text-amber-400">4R7</code> = 4.7Ω, <code className="text-amber-400">R05</code> = 0.05Ω</li>
                  <li><strong className="text-white">EIA-96 (1%):</strong> e.g. <code className="text-amber-400">01A</code> = 100Ω, <code className="text-amber-400">68C</code> = 49.9kΩ</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border flex flex-col items-center justify-center ${isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase font-bold text-gray-400 mb-6 flex items-center gap-1.5">
                  <Eye size={14} /> 0805 Surface-Mount Chip Resistor
                </span>

                <div className="w-full max-w-md flex justify-center py-4">
                  <svg width="300" height="140" viewBox="0 0 300 140" className="w-full h-auto">
                    <rect x="10" y="10" width="280" height="120" rx="8" fill="#064e3b" stroke="#047857" strokeWidth="2" />
                    <text x="150" y="28" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">PCB Trace Pad (0805 Package)</text>

                    <rect x="40" y="40" width="40" height="60" rx="4" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
                    <rect x="220" y="40" width="40" height="60" rx="4" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />

                    <rect x="75" y="40" width="150" height="60" rx="4" fill="#171717" stroke="#333333" strokeWidth="2" />

                    <text x="150" y="77" fill="#ffffff" fontSize="24" fontFamily="monospace" fontWeight="extrabold" letterSpacing="2" textAnchor="middle">
                      {smdCode.trim().toUpperCase() || '---'}
                    </text>
                  </svg>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Decoded Resistance:</span>
                <div className="text-4xl font-extrabold text-emerald-500 font-mono mt-1">{smdResult.text}</div>
                <span className="text-xs font-semibold text-zinc-300 mt-1 block">Tolerance: {smdResult.tol}</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           TOOL 4: BATTERY LIFE & POWER CONSUMPTION ESTIMATOR (SIMPLIFIED & HUMAN)
           ========================================================================= */}
        {activeTab === 'battery' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT SIDE: CONTROLS */}
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-3 border-white/10">
                <div>
                  <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Battery size={18} className="text-white" /> Battery Life Estimator
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Calculate how long your battery will power your project.</p>
                </div>
              </div>

              {/* MODE SWITCHER: SIMPLE VS IOT */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border bg-white/5 border-white/10">
                <button
                  onClick={() => setBatMode('simple')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    batMode === 'simple' ? 'bg-white text-zinc-950 font-bold shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ⚡ Simple Continuous Mode
                </button>
                <button
                  onClick={() => setBatMode('iot')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    batMode === 'iot' ? 'bg-white text-zinc-950 font-bold shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  💤 Smart IoT Sleep Mode
                </button>
              </div>

              {/* 1. BATTERY CAPACITY INPUT */}
              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-300">1. Battery Capacity (mAh):</span>
                  <span className="font-mono text-sm">{batCapacity} mAh</span>
                </div>
                <input
                  type="range" min="50" max="20000" step="50" value={batCapacity}
                  onChange={(e) => setBatCapacity(parseFloat(e.target.value) || 100)}
                  className="w-full accent-white cursor-pointer h-2 bg-gray-700 rounded-lg"
                />
                <input
                  type="number" min="1" max="500000" value={batCapacity}
                  onChange={(e) => setBatCapacity(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${
                    isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                  placeholder="Enter mAh..."
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-gray-500 self-center mr-1">Presets:</span>
                  {[
                    { name: 'CR2032', mah: 225 },
                    { name: 'LiPo', mah: 2000 },
                    { name: '18650', mah: 3000 },
                    { name: '2x AA', mah: 2400 },
                    { name: '10k Bank', mah: 10000 },
                  ].map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setBatCapacity(p.mah)}
                      className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold transition-all ${
                        batCapacity === p.mah
                          ? 'bg-white border-white text-zinc-950 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {p.name} ({p.mah})
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. MODE-SPECIFIC INPUTS */}
              {batMode === 'simple' ? (
                <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-emerald-400">2. Device Current Draw (mA):</span>
                    <span className="font-mono text-sm">{batCurrentMa >= 1000 ? `${(batCurrentMa / 1000).toFixed(2)} A` : `${batCurrentMa} mA`}</span>
                  </div>
                  <input
                    type="range" min="1" max="5000" step="10" value={batCurrentMa}
                    onChange={(e) => setBatCurrentMa(parseFloat(e.target.value) || 1)}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
                  />
                  <input
                    type="number" min="1" max="500000" value={batCurrentMa}
                    onChange={(e) => setBatCurrentMa(parseFloat(e.target.value) || 0)}
                    className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${
                      isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                    placeholder="Enter current draw in mA..."
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-400">2. Awake Working Current (mA):</span>
                      <span className="font-mono text-sm">{iotActiveMa} mA</span>
                    </div>
                    <input
                      type="range" min="10" max="1000" step="10" value={iotActiveMa}
                      onChange={(e) => setIotActiveMa(parseFloat(e.target.value) || 10)}
                      className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                    <label className="text-xs font-bold text-gray-400 block">3. How often does your device wake up?</label>
                    <select
                      value={iotDutyFactor}
                      onChange={(e) => setIotDutyFactor(parseFloat(e.target.value))}
                      className={`w-full p-3 rounded-xl border font-mono text-xs font-bold ${
                        isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300'
                      }`}
                    >
                      <option value={1.0}>⚡ Always Awake (100% duty cycle)</option>
                      <option value={0.166}>🚀 Frequent Activity (Awake 10s every 1 min)</option>
                      <option value={0.05}>🌐 Standard Sensor (Awake 3s every 1 min - 5% duty)</option>
                      <option value={0.01}>🔋 Power Saver (Awake 3s every 5 mins - 1% duty)</option>
                      <option value={0.0014}>💤 Ultra Sleep (Awake 5s every 1 hour - 0.1% duty)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: CLEAN BATTERY GRAPHIC VISUALIZER */}
            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border flex flex-col items-center justify-center ${
                isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'
              }`}>
                <span className="text-xs font-mono uppercase font-bold text-gray-400 mb-6 flex items-center gap-1.5">
                  <Eye size={14} /> Estimated Battery Runtime
                </span>

                <div className="w-full max-w-md flex justify-center py-4">
                  <svg width="280" height="130" viewBox="0 0 280 130" className="w-full h-auto">
                    {/* Outer Battery Body */}
                    <rect x="20" y="25" width="220" height="80" rx="12" fill="none" stroke="#ffffff" strokeWidth="4" />
                    <rect x="240" y="48" width="16" height="34" rx="4" fill="#ffffff" />

                    {/* Battery Fill Gauge */}
                    <rect x="28" y="33" width="204" height="64" rx="8" fill="#10b981" opacity="0.85" />
                    <text x="130" y="73" fill="#ffffff" fontSize="22" fontWeight="extrabold" textAnchor="middle">
                      {batMode === 'simple'
                        ? formatBatteryLifeText(simpleDays, simpleHours)
                        : formatBatteryLifeText(iotDays, iotHours)}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Total Usable Capacity:</span>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">{(batCapacity * 0.85).toFixed(0)} mAh</div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 block">(85% safe discharge limit)</span>
                </div>

                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Average Current Draw:</span>
                  <div className="text-3xl font-extrabold text-emerald-500 font-mono mt-1">
                    {batMode === 'simple'
                      ? (batCurrentMa >= 1000 ? `${(batCurrentMa / 1000).toFixed(2)} A` : `${batCurrentMa} mA`)
                      : `${effectiveIotMa.toFixed(2)} mA`}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                    {batMode === 'simple' ? 'Continuous draw' : `${(iotDutyFactor * 100).toFixed(1)}% duty cycle active`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           TOOL 5: INTERACTIVE LOGIC GATE SIMULATOR & TRUTH TABLE
           ========================================================================= */}
        {activeTab === 'logic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Binary size={20} className="text-white" /> Digital Logic Gates
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Toggle input switches (0/1) and gate logic.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 block">Gate Type:</label>
                  {gateType !== 'NOT' && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setNumGateInputs(2)}
                        className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-bold transition-all ${
                          numGateInputs === 2 ? 'bg-white text-zinc-950 border-white' : 'bg-white/5 text-gray-400 border-white/10'
                        }`}
                      >
                        2-Inputs
                      </button>
                      <button
                        onClick={() => setNumGateInputs(3)}
                        className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-bold transition-all ${
                          numGateInputs === 3 ? 'bg-white text-zinc-950 border-white' : 'bg-white/5 text-gray-400 border-white/10'
                        }`}
                      >
                        3-Inputs
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['AND', 'OR', 'NAND', 'NOR', 'XOR', 'NOT'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGateType(g as any)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all ${gateType === g ? 'bg-white text-zinc-950 border-white' : 'bg-white/5 text-gray-300'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setInputA(!inputA)}
                  className={`p-3.5 rounded-2xl border font-bold text-xs flex items-center justify-between ${
                    inputA ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  <span>Input A</span>
                  <span className="font-mono text-sm font-extrabold">{inputA ? '1' : '0'}</span>
                </button>

                {gateType !== 'NOT' && (
                  <button
                    onClick={() => setInputB(!inputB)}
                    className={`p-3.5 rounded-2xl border font-bold text-xs flex items-center justify-between ${
                      inputB ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <span>Input B</span>
                    <span className="font-mono text-sm font-extrabold">{inputB ? '1' : '0'}</span>
                  </button>
                )}

                {gateType !== 'NOT' && numGateInputs === 3 && (
                  <button
                    onClick={() => setInputC(!inputC)}
                    className={`p-3.5 rounded-2xl border font-bold text-xs flex items-center justify-between ${
                      inputC ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <span>Input C</span>
                    <span className="font-mono text-sm font-extrabold">{inputC ? '1' : '0'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border flex flex-col items-center justify-center ${isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase font-bold text-gray-400 mb-6 flex items-center gap-1.5">
                  <Eye size={14} /> Logic Gate Signal Wire Visualizer ({gateType !== 'NOT' ? `${numGateInputs}-Input Mode` : '1-Input Mode'})
                </span>

                <div className="w-full max-w-md flex justify-center py-2">
                  <svg width="340" height="150" viewBox="0 0 340 150" className="w-full h-auto">
                    {/* Wire A */}
                    <line x1="20" y1={numGateInputs === 3 && gateType !== 'NOT' ? "35" : "45"} x2="130" y2={numGateInputs === 3 && gateType !== 'NOT' ? "35" : "45"} stroke={inputA ? '#10b981' : '#ef4444'} strokeWidth="4" />
                    <circle cx="20" cy={numGateInputs === 3 && gateType !== 'NOT' ? "35" : "45"} r="5" fill={inputA ? '#10b981' : '#ef4444'} />
                    <text x="20" y={numGateInputs === 3 && gateType !== 'NOT' ? "22" : "32"} fill={inputA ? '#10b981' : '#ef4444'} fontSize="11" fontWeight="bold">A ({inputA ? '1' : '0'})</text>

                    {/* Wire B */}
                    {gateType !== 'NOT' && (
                      <>
                        <line x1="20" y1={numGateInputs === 3 ? "75" : "105"} x2="130" y2={numGateInputs === 3 ? "75" : "105"} stroke={inputB ? '#10b981' : '#ef4444'} strokeWidth="4" />
                        <circle cx="20" cy={numGateInputs === 3 ? "75" : "105"} r="5" fill={inputB ? '#10b981' : '#ef4444'} />
                        <text x="20" y={numGateInputs === 3 ? "62" : "122"} fill={inputB ? '#10b981' : '#ef4444'} fontSize="11" fontWeight="bold">B ({inputB ? '1' : '0'})</text>
                      </>
                    )}

                    {/* Wire C (Only for 3-Inputs) */}
                    {gateType !== 'NOT' && numGateInputs === 3 && (
                      <>
                        <line x1="20" y1="115" x2="130" y2="115" stroke={inputC ? '#10b981' : '#ef4444'} strokeWidth="4" />
                        <circle cx="20" cy="115" r="5" fill={inputC ? '#10b981' : '#ef4444'} />
                        <text x="20" y="132" fill={inputC ? '#10b981' : '#ef4444'} fontSize="11" fontWeight="bold">C ({inputC ? '1' : '0'})</text>
                      </>
                    )}

                    {/* Gate Symbol Box */}
                    <rect x="130" y="20" width="85" height="110" rx="16" fill={isDark ? '#27272a' : '#e4e4e7'} stroke="#ffffff" strokeWidth="2.5" />
                    <text x="172" y="72" fill="#ffffff" fontSize="17" fontWeight="extrabold" textAnchor="middle">{gateType}</text>
                    <text x="172" y="90" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">{gateType !== 'NOT' ? `${numGateInputs}-Input` : 'Inverter'}</text>

                    {/* Output Wire Q */}
                    <line x1="215" y1="75" x2="290" y2="75" stroke={gateOutput ? '#10b981' : '#ef4444'} strokeWidth="5" />
                    <circle cx="290" cy="75" r="7" fill={gateOutput ? '#10b981' : '#ef4444'} />
                    <text x="300" y="79" fill={gateOutput ? '#10b981' : '#ef4444'} fontSize="14" fontWeight="extrabold">Q ({gateOutput ? '1' : '0'})</text>
                  </svg>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Output Logic State Q:</span>
                <div className={`text-4xl font-extrabold font-mono mt-1 ${gateOutput ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {gateOutput ? '1 (HIGH / TRUE)' : '0 (LOW / FALSE)'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           TOOL 6: OHM'S LAW & POWER (DYNAMIC CIRCUIT SIMULATION VISUALIZER)
           ========================================================================= */}
        {activeTab === 'ohms' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT SIDE: INPUT DIALS */}
            <div className="space-y-5">
              <div>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Zap size={20} className="text-white" /> Voltage & Current Dials
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Adjust Voltage (V) and Current (I) to see dynamic circuit electron flow.</p>
              </div>

              {/* Quick Circuit Presets */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border bg-white/[0.02] border-white/10 text-xs">
                <span className="text-[11px] font-bold text-zinc-500 mr-1">Presets:</span>
                {[
                  { name: '3.3V MCU', v: '3.3', i: '0.02' },
                  { name: '5V USB', v: '5', i: '0.5' },
                  { name: '12V Relay', v: '12', i: '0.1' },
                  { name: '24V Sensor', v: '24', i: '0.02' },
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => { setVolts(p.v); setAmps(p.i); }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                      volts === p.v && amps === p.i
                        ? 'bg-white border-white text-zinc-950 font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-300">Voltage (V):</span>
                  <span className="font-mono text-sm">{vNum} V</span>
                </div>
                <input type="range" min="0.5" max="400" step="1" value={vNum} onChange={(e) => setVolts(e.target.value)} className="w-full accent-white cursor-pointer h-2 bg-gray-700 rounded-lg" />
                <input type="number" step="0.1" value={volts} onChange={(e) => setVolts(e.target.value)} className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300'}`} placeholder="Enter voltage up to 1000V..." />
              </div>

              <div className="space-y-2 p-4 rounded-2xl border bg-white/[0.02] border-white/10">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-emerald-400">Current (I in Amps):</span>
                  <span className="font-mono text-sm">{iNum} A</span>
                </div>
                <input type="range" min="0.001" max="100" step="0.1" value={iNum} onChange={(e) => setAmps(e.target.value)} className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-700 rounded-lg" />
                <input type="number" step="0.01" value={amps} onChange={(e) => setAmps(e.target.value)} className={`w-full p-2.5 rounded-xl border font-mono text-xs font-bold ${isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-100 border-slate-300'}`} placeholder="Enter current up to 500A..." />
              </div>
            </div>

            {/* RIGHT SIDE: ANIMATED CLOSED-LOOP CIRCUIT VISUALIZER */}
            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border flex flex-col items-center justify-center ${isDark ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                <span className="text-xs font-mono uppercase font-bold text-gray-400 mb-4 flex items-center gap-1.5">
                  <Eye size={14} /> Live Circuit & Current Flow Simulation
                </span>

                <div className="w-full max-w-md flex justify-center py-2">
                  <svg width="340" height="220" viewBox="0 0 340 220" className="w-full h-auto">
                    {/* Main Closed Loop Wire */}
                    <rect x="40" y="30" width="260" height="150" rx="16" fill="none" stroke="#ffffff" strokeWidth="3" />

                    {/* DC Battery Source Symbol (Left Wire) */}
                    <g>
                      <line x1="40" y1="90" x2="40" y2="70" stroke="#ffffff" strokeWidth="6" />
                      <line x1="30" y1="80" x2="50" y2="80" stroke="#ffffff" strokeWidth="4" />
                      <line x1="34" y1="95" x2="46" y2="95" stroke="#ffffff" strokeWidth="3" />
                      <text x="15" y="90" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="end">+{vNum}V</text>
                    </g>

                    {/* Resistor Block (Top Wire) */}
                    <g>
                      <rect x="130" y="16" width="80" height="28" rx="6" fill={pWatts > 0.25 ? "#b91c1c" : "#ca8a04"} stroke="#f59e0b" strokeWidth="2.5" />
                      <text x="170" y="35" fill="#ffffff" fontSize="11" fontWeight="extrabold" textAnchor="middle">R = {rNum}Ω</text>
                    </g>

                    {/* Glowing Current Arrow & Readout (Bottom Wire) */}
                    <g>
                      <text x="170" y="170" fill="#34d399" fontSize="13" fontWeight="extrabold" textAnchor="middle">Current Flow (I) = {iNum}A</text>
                    </g>

                    {/* Center Power Readout Badge */}
                    <g>
                      <rect x="110" y="85" width="120" height="40" rx="10" fill={isDark ? "#27272a" : "#f4f4f5"} stroke="#ffffff" strokeWidth="2" />
                      <text x="170" y="103" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">POWER DISSIPATION</text>
                      <text x="170" y="118" fill="#34d399" fontSize="12" fontWeight="extrabold" textAnchor="middle">{pNum} Watts</text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Calculated Resistance R:</span>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">{rNum} Ω</div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 block">Formula: R = V / I</span>
                </div>

                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-300'}`}>
                  <span className="text-xs font-mono uppercase text-gray-400 font-bold block">Power Dissipation P:</span>
                  <div className="text-3xl font-extrabold text-emerald-500 font-mono mt-1">{pNum} W</div>
                  <span className={`text-[10px] font-mono mt-1 block ${pWatts > 0.25 ? 'text-amber-400 font-bold' : 'text-gray-400'}`}>
                    {pWatts > 0.25 ? '⚠️ Power exceeds 1/4W resistor rating' : 'Standard 1/4W resistor safe range'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
