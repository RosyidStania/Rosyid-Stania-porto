import React, { useState } from 'react';
import { editorialSound } from './EditorialSound';

/**
 * SystemArchitectureSheet - Technical Architecture & Benchmark Specification Sheet
 * Replaces the casual cat design sheet with a high-credibility engineering specification board,
 * maintaining the clean Japanese Bauhaus aesthetic and typography.
 */
export default function SystemArchitectureSheet() {
  const [copiedColor, setCopiedColor] = useState(null);
  const [activePillar, setActivePillar] = useState('frontend');

  const colorPalette = [
    { hex: '#111111', label: '111111', name: 'Hitam Obsidian' },
    { hex: '#1F1C19', label: '1F1C19', name: 'Arang Gelap' },
    { hex: '#2E2A24', label: '2E2A24', name: 'Batu Basalt' },
    { hex: '#D47A38', label: 'D47A38', name: 'Amber Terracotta' },
    { hex: '#BEB8AD', label: 'BEB8AD', name: 'Batu Hangat' },
    { hex: '#FAF8F3', label: 'FAF8F3', name: 'Kertas Terang' },
  ];

  const handleCopyColor = (hex) => {
    editorialSound.playPenTap();
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const pillars = {
    frontend: {
      title: 'Antarmuka Klien (Frontend)',
      tech: 'React 19 • SvelteKit • TypeScript',
      desc: 'Merancang UI reaktif dengan zero layout shift (CLS < 0.01), rendering sub-50ms, dan interaktivitas tingkat lanjut.',
      metric: '< 45ms P95 Latency',
    },
    backend: {
      title: 'Layanan Mikro (Backend & ML)',
      tech: 'Python FastAPI • Laravel 11 RESTful',
      desc: 'Pipeline event-loop asynchronous, kontrak tipe ketat dengan Pydantic, dan model machine learning Random Forest.',
      metric: '18ms Inference Latency',
    },
    database: {
      title: 'Lapisan Data (Storage & Cache)',
      tech: 'PostgreSQL • Indexing • Yjs CRDTs',
      desc: 'Integritas relasional ACID, optimasi query b-tree, skema time-series untuk histori penjualan, dan state CRDT realtime.',
      metric: '100% ACID Compliance',
    },
  };

  return (
    <div className="w-full bg-[#FAF8F3] border-t border-b border-[#DDD7CA] py-6 sm:py-8 px-4 sm:px-8 select-none font-sans-editorial">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* --- ROW 1: PILAR ARSITEKTUR, STATUS RUNTIME, & TOLOK UKUR PERFORMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start border-b border-[#E8E2D6] pb-8">

          {/* 1. PILAR ARSITEKTUR SISTEM (SYSTEM BOUNDARIES) - Cols 1-5 */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                PILAR ARSITEKTUR SISTEM
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">BOUNDARIES</span>
            </div>

            {/* Pillar Selector Buttons */}
            <div className="grid grid-cols-3 gap-1.5 bg-[#F2ECE1]/60 p-1 rounded-[6px] border border-[#DDD6C8]">
              <button
                type="button"
                onClick={() => {
                  editorialSound.playPenTap();
                  setActivePillar('frontend');
                }}
                className={`py-1.5 px-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                  activePillar === 'frontend'
                    ? 'bg-white text-[#111111] shadow-xs'
                    : 'text-[#777268] hover:text-[#111111]'
                }`}
              >
                Frontend
              </button>

              <button
                type="button"
                onClick={() => {
                  editorialSound.playPenTap();
                  setActivePillar('backend');
                }}
                className={`py-1.5 px-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                  activePillar === 'backend'
                    ? 'bg-white text-[#111111] shadow-xs'
                    : 'text-[#777268] hover:text-[#111111]'
                }`}
              >
                Backend/ML
              </button>

              <button
                type="button"
                onClick={() => {
                  editorialSound.playPenTap();
                  setActivePillar('database');
                }}
                className={`py-1.5 px-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                  activePillar === 'database'
                    ? 'bg-white text-[#111111] shadow-xs'
                    : 'text-[#777268] hover:text-[#111111]'
                }`}
              >
                Basis Data
              </button>
            </div>

            {/* Active Pillar Card */}
            <div className="p-3.5 bg-white rounded-[6px] border border-[#DDD6C8] shadow-2xs flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111]">
                  {pillars[activePillar].title}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#D47A38]">
                  {pillars[activePillar].metric}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#777777]">
                {pillars[activePillar].tech}
              </span>
              <p className="text-xs text-[#555048] leading-relaxed mt-0.5">
                {pillars[activePillar].desc}
              </p>
            </div>
          </div>

          {/* 2. STATUS RUNTIME & SPESIFIKASI (SPECS) - Cols 6-8 */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                STATUS RUNTIME SISTEM
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">SPECS</span>
            </div>

            <div className="flex flex-col gap-2 p-2.5 bg-[#F2ECE1]/50 rounded-[6px] border border-[#DDD6C8] text-xs font-mono">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E4DDCF]">
                <span className="text-[#666056]">Frontend Engine</span>
                <span className="font-bold text-[#111111]">React 19 / SvelteKit</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E4DDCF]">
                <span className="text-[#666056]">Inference Model</span>
                <span className="font-bold text-[#111111]">Random Forest ML</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E4DDCF]">
                <span className="text-[#666056]">Realtime Sync</span>
                <span className="font-bold text-[#111111]">Yjs CRDTs + WSS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666056]">State Management</span>
                <span className="font-bold text-[#111111]">Context API / Stores</span>
              </div>
            </div>
          </div>

          {/* 3. TOLOK UKUR PERFORMA (BENCHMARKS) - Cols 9-12 */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                TOLOK UKUR PERFORMA
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">METRICS</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-white rounded-[4px] border border-[#DDD6C8] shadow-2xs flex flex-col">
                <span className="text-[9px] font-mono text-[#777777] uppercase">Latensi Rata-rata</span>
                <span className="text-sm font-bold text-[#111111] font-mono mt-0.5">&lt; 35ms</span>
                <span className="text-[8px] text-[#57AB5A] font-mono">Sangat responsif</span>
              </div>

              <div className="p-2.5 bg-white rounded-[4px] border border-[#DDD6C8] shadow-2xs flex flex-col">
                <span className="text-[9px] font-mono text-[#777777] uppercase">Skor Akurasi ML</span>
                <span className="text-sm font-bold text-[#D47A38] font-mono mt-0.5">0.924 R²</span>
                <span className="text-[8px] text-[#57AB5A] font-mono">Toleransi rendah</span>
              </div>

              <div className="p-2.5 bg-white rounded-[4px] border border-[#DDD6C8] shadow-2xs flex flex-col">
                <span className="text-[9px] font-mono text-[#777777] uppercase">Bundle Overhead</span>
                <span className="text-sm font-bold text-[#111111] font-mono mt-0.5">&lt; 95 kB</span>
                <span className="text-[8px] text-[#777777] font-mono">Gzipped assets</span>
              </div>

              <div className="p-2.5 bg-white rounded-[4px] border border-[#DDD6C8] shadow-2xs flex flex-col">
                <span className="text-[9px] font-mono text-[#777777] uppercase">Transaksional</span>
                <span className="text-sm font-bold text-[#111111] font-mono mt-0.5">100% ACID</span>
                <span className="text-[8px] text-[#57AB5A] font-mono">Postgres safe</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- ROW 2: STANDAR REKAYASA, KATA KUNCI SISTEM, & PALET WARNA --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* 1. STANDAR REKAYASA (ENGINEERING STANDARDS) - Cols 1-4 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                STANDAR REKAYASA
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">STANDARDS</span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1 text-xs text-[#555048]">
              <div className="flex items-center gap-2">
                <span className="text-[#57AB5A] font-bold">✓</span>
                <span>Type-Safety End-to-End dengan TypeScript & Pydantic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#57AB5A] font-bold">✓</span>
                <span>Resilient Error Boundaries & Optimistic UI Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#57AB5A] font-bold">✓</span>
                <span>Sub-100ms TTFB & Zero Layout Shift (CLS &lt; 0.01)</span>
              </div>
            </div>
          </div>

          {/* 2. KATA KUNCI SISTEM (KEYWORDS) - Cols 5-8 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                KATA KUNCI SISTEM
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">TAGS</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Full-Stack',
                'FastAPI',
                'SvelteKit',
                'Machine Learning',
                'PostgreSQL',
                'Yjs CRDT',
                'RESTful API',
                'Tailwind CSS'
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

          {/* 3. PALET WARNA SISTEM (COLOR PALETTE) - Cols 9-12 */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#E0D9CC] pb-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#555048] uppercase">
                PALET WARNA SISTEM
              </span>
              <span className="text-[9px] text-[#8C8477] font-mono">
                {copiedColor ? `✓ Tersalin (${copiedColor})` : 'SYSTEM PALETTE'}
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
