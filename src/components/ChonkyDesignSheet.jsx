import React, { useState } from 'react';
import { editorialSound } from './EditorialSound';

/**
 * ChonkyDesignSheet - Interactive Game Design Specification Sheet
 * Directly reproduces the Japanese Bauhaus-style design system board from the reference image,
 * fully localized into Indonesian ("ganti tulisan jepang menjadi indo").
 */
export default function ChonkyDesignSheet({ currentWeight = 42, onSelectWeightState }) {
  const [copiedColor, setCopiedColor] = useState(null);
  const [activeSystem, setActiveSystem] = useState('Lompat');

  const colorPalette = [
    { hex: '#111111', label: '111111', name: 'Hitam Pekat' },
    { hex: '#333333', label: '333333', name: 'Abu Arang' },
    { hex: '#777777', label: '777777', name: 'Abu Sedang' },
    { hex: '#BEB8AD', label: 'BEB8AD', name: 'Batu Hangat' },
    { hex: '#E4E1D7', label: 'E4E1D7', name: 'Krem Pasir' },
    { hex: '#F4F4EE', label: 'F4F4EE', name: 'Kertas Terang' },
  ];

  const handleCopyColor = (hex) => {
    editorialSound.playPenTap();
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="w-full bg-[#FAF8F3] border-t border-b border-[#DDD7CA] py-6 sm:py-8 px-4 sm:px-8 select-none font-sans-editorial">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* --- ROW 1: SISTEM GERAKAN, STATUS KUCING, & ITEM KOLEKSI --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start border-b border-[#E8E2D6] pb-8">

          {/* 1. SISTEM GERAKAN (SYSTEM) - Cols 1-4 */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                SISTEM GERAKAN
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">SYSTEM</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Lari */}
              <button
                type="button"
                onClick={() => {
                  editorialSound.playPenTap();
                  setActiveSystem('Lari');
                }}
                className={`p-2.5 rounded-[4px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  activeSystem === 'Lari'
                    ? 'bg-white border-[#111111] shadow-sm scale-102'
                    : 'bg-[#F2ECE1]/60 hover:bg-white border-[#DDD6C8]'
                }`}
              >
                {/* SVG Lari */}
                <svg className="w-10 h-8 text-[#111111]" viewBox="0 0 50 36" fill="currentColor">
                  {/* Dust trail */}
                  <line x1="2" y1="28" x2="10" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  {/* Cat running */}
                  <ellipse cx="28" cy="18" rx="14" ry="10" />
                  <polygon points="34,8 38,15 31,14" />
                  <polygon points="38,10 43,16 36,15" fill="#D47A38" />
                  <circle cx="36" cy="16" r="1.5" fill="#FAF8F2" />
                  {/* Legs */}
                  <line x1="18" y1="24" x2="12" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="34" y1="24" x2="42" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-semibold text-[#111111]">Lari</span>
              </button>

              {/* Lompat */}
              <button
                type="button"
                onClick={() => {
                  editorialSound.playPaperRustle();
                  setActiveSystem('Lompat');
                }}
                className={`p-2.5 rounded-[4px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  activeSystem === 'Lompat'
                    ? 'bg-white border-[#111111] shadow-sm scale-102'
                    : 'bg-[#F2ECE1]/60 hover:bg-white border-[#DDD6C8]'
                }`}
              >
                {/* SVG Lompat */}
                <svg className="w-10 h-8 text-[#111111]" viewBox="0 0 50 36" fill="currentColor">
                  {/* Arc jump trail */}
                  <path d="M 8,30 Q 14,20 20,24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
                  {/* Cat jumping upward */}
                  <g transform="rotate(-15 28 16)">
                    <ellipse cx="26" cy="15" rx="13" ry="11" />
                    <polygon points="32,6 36,13 29,12" />
                    <polygon points="36,8 41,14 34,13" fill="#D47A38" />
                    <line x1="16" y1="20" x2="10" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="33" y1="20" x2="39" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
                <span className="text-xs font-semibold text-[#111111]">Lompat</span>
              </button>

              {/* Jatuh */}
              <button
                type="button"
                onClick={() => {
                  editorialSound.playPenTap();
                  setActiveSystem('Jatuh');
                }}
                className={`p-2.5 rounded-[4px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  activeSystem === 'Jatuh'
                    ? 'bg-white border-[#111111] shadow-sm scale-102'
                    : 'bg-[#F2ECE1]/60 hover:bg-white border-[#DDD6C8]'
                }`}
              >
                {/* SVG Jatuh / Mendarat Squish */}
                <svg className="w-10 h-8 text-[#111111]" viewBox="0 0 50 36" fill="currentColor">
                  {/* Downward force lines */}
                  <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="34" y1="2" x2="34" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Cat squished wide */}
                  <ellipse cx="25" cy="22" rx="16" ry="9" />
                  <polygon points="28,13 32,18 26,17" />
                  <polygon points="32,14 36,19 30,18" fill="#D47A38" />
                  <line x1="12" y1="28" x2="8" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="38" y1="28" x2="42" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-semibold text-[#111111]">Jatuh</span>
              </button>
            </div>
          </div>

          {/* 2. STATUS KUCING (CAT STATE) - Cols 5-8 */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                STATUS KUCING
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">CAT STATE</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-2 bg-[#F2ECE1]/50 rounded-[4px] border border-[#DDD6C8]">
              {/* Ringan */}
              <div
                onClick={() => {
                  editorialSound.playPenTap();
                  if (onSelectWeightState) onSelectWeightState('light');
                }}
                className="flex-1 flex flex-col items-center gap-1.5 p-1.5 bg-white/70 hover:bg-white rounded cursor-pointer transition-all hover:scale-103"
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] flex items-center justify-center">
                  <div className="w-5 h-6 rounded-full bg-[#111111] relative">
                    <div className="w-2 h-2 bg-[#D47A38] rounded-full absolute top-0 right-0" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#111111]">Ringan</span>
                <span className="text-[9px] font-mono text-[#777777]">0 - 33%</span>
              </div>

              {/* Arrow */}
              <span className="text-[#8C8477] font-bold text-xs">→</span>

              {/* Sedang */}
              <div
                onClick={() => {
                  editorialSound.playPenTap();
                  if (onSelectWeightState) onSelectWeightState('normal');
                }}
                className="flex-1 flex flex-col items-center gap-1.5 p-1.5 bg-white/70 hover:bg-white rounded cursor-pointer transition-all hover:scale-103"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#111111] relative">
                    <div className="w-2.5 h-2.5 bg-[#D47A38] rounded-full absolute top-0 right-0" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#111111]">Sedang</span>
                <span className="text-[9px] font-mono text-[#777777]">34 - 66%</span>
              </div>

              {/* Arrow */}
              <span className="text-[#8C8477] font-bold text-xs">→</span>

              {/* Gembul */}
              <div
                onClick={() => {
                  editorialSound.playPaperRustle();
                  if (onSelectWeightState) onSelectWeightState('chonky');
                }}
                className="flex-1 flex flex-col items-center gap-1.5 p-1.5 bg-white/70 hover:bg-white rounded cursor-pointer transition-all hover:scale-103"
              >
                <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] flex items-center justify-center">
                  <div className="w-9 h-8 rounded-full bg-[#111111] relative shadow-xs">
                    <div className="w-3.5 h-3 bg-[#D47A38] rounded-full absolute top-0 right-0" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#111111]">Gembul</span>
                <span className="text-[9px] font-mono text-[#D47A38] font-semibold">67 - 100%</span>
              </div>
            </div>
          </div>

          {/* 3. ITEM KOLEKSI (ITEMS) - Cols 9-12 */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                ITEM KOLEKSI
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">ITEMS</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Biskuit Kering (Kibble) */}
              <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded border border-[#DDD6C8] shadow-2xs">
                <div className="flex items-center gap-1 py-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#735742]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9C7A5E]" />
                  <span className="w-2 h-2 rounded-full bg-[#5C4533]" />
                </div>
                <span className="text-[10px] font-bold text-[#111111] text-center leading-tight">
                  Biskuit Kering
                </span>
                <span className="text-[8px] text-[#777777] font-mono">(Kibble)</span>
              </div>

              {/* Kaleng Makanan Kucing */}
              <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded border border-[#DDD6C8] shadow-2xs">
                <div className="w-6 h-5 bg-[#BEB8AD] border border-[#111111] rounded-xs flex items-center justify-center relative">
                  <div className="w-3.5 h-1.5 bg-[#FAF8F2] rounded-full" />
                </div>
                <span className="text-[10px] font-bold text-[#111111] text-center leading-tight">
                  Makanan Kaleng
                </span>
                <span className="text-[8px] text-[#777777] font-mono">(Cat Can)</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- ROW 2: INDIKATOR BERAT, KATA KUNCI, & PALET WARNA --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* 1. INDIKATOR BERAT (WEIGHT GAUGE) - Cols 1-4 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                INDIKATOR BERAT
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">
                AKTIF: {currentWeight}%
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[10px] text-[#777777]">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full h-2 bg-[#E4E1D7] rounded-full overflow-hidden border border-[#BEB8AD]/60">
                  <div className="h-full bg-[#111111] w-0" />
                </div>
                <span>0%</span>
              </div>

              <span className="text-[#8C8477]">→</span>

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full h-2 bg-[#E4E1D7] rounded-full overflow-hidden border border-[#BEB8AD]/60">
                  <div className="h-full bg-[#111111] w-[50%]" />
                </div>
                <span>50%</span>
              </div>

              <span className="text-[#8C8477]">→</span>

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full h-2 bg-[#E4E1D7] rounded-full overflow-hidden border border-[#BEB8AD]/60">
                  <div className="h-full bg-[#111111] w-[100%]" />
                </div>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* 2. KATA KUNCI (KEYWORDS) - Cols 5-8 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                KATA KUNCI
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">KEYWORDS</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Gembul',
                'Melompat',
                'Side-Scroll',
                'Sederhana',
                'Bauhaus',
                'Full-Stack',
                'TypeScript'
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white border border-[#DDD6C8] rounded-full text-[10px] font-semibold text-[#333333] shadow-2xs hover:border-[#111111] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. PALET WARNA (COLOR PALETTE) - Cols 9-12 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                PALET WARNA
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">
                {copiedColor ? `✓ Tersalin (${copiedColor})` : 'COLOR PALETTE'}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 pt-1">
              {colorPalette.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => handleCopyColor(col.hex)}
                  className="group flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110"
                  title={`Klik untuk salin ${col.hex} (${col.name})`}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-[8px] font-mono text-[#666056] group-hover:text-black">
                    {col.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
