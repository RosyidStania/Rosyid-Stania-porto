import React, { useState } from 'react';
import {
  SiSvelte, SiLaravel, SiPython, SiFastapi,
  SiPostgresql, SiReact, SiPhp, SiJavascript,
  SiFlutter, SiMysql, SiPostman, SiGithub,
  SiTailwindcss, SiTypescript
} from 'react-icons/si';
import { FaEnvelope } from 'react-icons/fa';

import ChonkyHeader from './components/ChonkyHeader';
import InteractiveSystemShowcase from './components/InteractiveSystemShowcase';
import SystemArchitectureSheet from './components/SystemArchitectureSheet';
import EditorialContactColophon from './components/EditorialContactColophon';
import Tilt3D from './components/Tilt3D';
import EditorialCursor from './components/EditorialCursor';
import InkTrailCanvas from './components/InkTrailCanvas';
import { editorialSound } from './components/EditorialSound';

export default function App() {
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const toggleSound = () => {
    editorialSound.toggleMute();
    setIsSoundMuted(editorialSound.isMuted);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F4EE] text-[#111111] font-sans-editorial selection:bg-[#BEB8AD] selection:text-[#111111] overflow-x-hidden">
      {/* Interactive Cursor & Ink Canvas */}
      <EditorialCursor />
      <InkTrailCanvas />

      {/* Persistent Navigation Header */}
      <ChonkyHeader
        activeSection="konsep"
        isMuted={isSoundMuted}
        onToggleSound={toggleSound}
      />

      {/* Main Container */}
      <main className="w-full pt-16 sm:pt-20 pb-24">

        {/* =========================================================================
            BAGIAN 1: LEMBAR REKAYASA SISTEM // HERO & SHOWCASE PRODUK LANGSUNG
           ========================================================================= */}
        <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-8 flex flex-col gap-6">

          {/* --- TOP CONCEPT HEADER: ARSITEKTUR SISTEM & RINGKASAN REKAYASA --- */}
          <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 pt-4">

            {/* KIRI: Judul Utama, Subjudul, dan Kutipan */}
            <div className="flex flex-col items-start">
              {/* Kanji & Monogram Arsitektur */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-3xl sm:text-4xl tracking-tight text-[#111111]">
                  システム設計
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777777] border-l border-[#BEB8AD] pl-3">
                  Arsitektur Sistem
                </span>
              </div>

              {/* Sub-judul Desain Rekayasa */}
              <span className="text-xs font-bold tracking-[0.3em] text-[#555048] uppercase mt-1">
                REKAYASA SISTEM & SIMULASI PRODUK LANGSUNG
              </span>

              {/* Tagline Rekayasa Berkinerja Tinggi */}
              <p className="text-sm sm:text-base font-serif-editorial italic text-[#333333] mt-3">
                “Membangun antarmuka interaktif yang cepat, arsitektur backend andal, dan model prediktif berbasis data.”
              </p>

              {/* Garis Pembatas Hairline */}
              <div className="w-16 h-[2px] bg-[#111111] mt-2.5" />
            </div>

            {/* KANAN: Poin-Poin Arsitektur & Spesifikasi */}
            <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#555048] uppercase mb-1">
                SPESIFIKASI SISTEM // SYSTEM OVERVIEW
              </span>

              <ul className="text-xs sm:text-[13px] text-[#444038] flex flex-col gap-1 leading-relaxed">
                <li className="flex items-center md:justify-end gap-1.5">
                  <span className="text-[#777777]">•</span>
                  <span>Antarmuka Interaktif: Sub-50ms respons dengan React 19 & SvelteKit.</span>
                </li>
                <li className="flex items-center md:justify-end gap-1.5">
                  <span className="text-[#777777]">•</span>
                  <span>Layanan Mikro & ML: Microservice FastAPI & RESTful Laravel 11.</span>
                </li>
                <li className="flex items-center md:justify-end gap-1.5">
                  <span className="text-[#777777]">•</span>
                  <span>Integritas Data: Transaksi ACID PostgreSQL & sinkronisasi CRDT.</span>
                </li>
                <li className="flex items-center md:justify-end gap-1.5 pt-1 border-t border-[#DDD6C8] mt-1 text-[#111111] font-semibold">
                  <span className="text-[#D47A38]">★</span>
                  <span>Rosyid Stania — Full-Stack Software Engineer</span>
                </li>
              </ul>
            </div>

          </div>

          {/* --- CENTER: WORKSTATION RUNTIME DENGAN SHOWCASE SISTEM NYATA --- */}
          <div className="w-full flex justify-center py-2 sm:py-4">
            <Tilt3D maxTilt={4} perspective={1400} scale={1.005}>
              <div className="relative w-[92vw] max-w-5xl rounded-[18px] sm:rounded-[22px] bg-[#141210] p-2 sm:p-3 shadow-2xl border border-[#2C2721]">
                {/* Live Engineering Sandbox Playground */}
                <InteractiveSystemShowcase />

                {/* Specular Edge Highlight */}
                <div className="absolute inset-0 rounded-[18px] sm:rounded-[22px] pointer-events-none border border-white/5" />
              </div>
            </Tilt3D>
          </div>

          {/* --- LEMBAR SPESIFIKASI ARSITEKTUR & TOLOK UKUR PERFORMA --- */}
          <div className="w-full mt-2">
            <SystemArchitectureSheet />
          </div>

        </section>


        {/* =========================================================================
            BAGIAN 2: KARAKTER UTAMA // PROFIL PENGEMBANG (ROSYID STANIA)
           ========================================================================= */}
        <section id="karakter" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 border-t border-[#DDD6C8]">
          <div className="flex flex-col gap-8">

            {/* Section Eyebrow Header */}
            <div className="flex items-center justify-between border-b border-[#BEB8AD] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#111111] uppercase">
                  KARAKTER UTAMA // PROFIL PENGEMBANG
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#777777]">LEMBAR DATA PENGEMBANG</span>
            </div>

            {/* 2-Column Character Sheet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-[8px] border border-[#DDD6C8] shadow-sm">

              {/* Kolom Kiri: Foto Profil Kemeja & Dasi (TANPA JAS) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-64 sm:w-72 h-80 sm:h-92 bg-[#FAF8F3] rounded-[6px] border border-[#DDD6C8] overflow-hidden flex flex-col items-center justify-end p-2 shadow-inner">
                  {/* Watermark Angka */}
                  <span className="absolute top-3 left-4 text-xs font-mono font-bold text-[#BEB8AD]">
                    NO. 01 // ID
                  </span>

                  {/* Stamp Badge */}
                  <span className="absolute top-3 right-3 text-[9px] font-bold font-mono px-2 py-0.5 bg-[#FAF8F3] border border-[#BEB8AD] text-[#333333] rounded-xs uppercase">
                    KEMEJA & DASI
                  </span>

                  {/* Foto Rosyid Stania Asli */}
                  <img
                    src="/profile.png"
                    alt="Rosyid Stania"
                    className="w-full h-full object-contain object-bottom drop-shadow-md transition-transform duration-300 hover:scale-103"
                  />

                  {/* Tanda Tangan Halus */}
                  <div className="absolute bottom-2 right-4 font-serif-editorial italic text-base text-[#111111] pointer-events-none opacity-85">
                    Rosyid Stania
                  </div>
                </div>

                {/* Caption di Bawah Foto */}
                <div className="mt-3 flex items-center justify-between w-64 sm:w-72 font-mono text-[10px] text-[#777777]">
                  <span>STATUS: TERSEDIA</span>
                  <span className="text-[#D47A38]">● FULL-TIME / KONTRAK</span>
                </div>
              </div>

              {/* Kolom Kanan: Atribut Karakter & Deskripsi */}
              <div className="md:col-span-7 flex flex-col items-start gap-4">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#8C8477] uppercase tracking-wider">
                    REKAYASAWAN PERANGKAT LUNAK
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#111111] tracking-tight mt-1">
                    Rosyid Stania
                  </h3>
                  <p className="text-xs sm:text-sm font-sans-editorial font-semibold text-[#555048] mt-1">
                    Full-Stack Software Engineer • Creative Interface Developer
                  </p>
                </div>

                {/* Kutipan Filosofi Developer */}
                <div className="w-full p-4 bg-[#FAF8F3] border-l-3 border-[#111111] rounded-r-[4px]">
                  <p className="text-xs sm:text-sm text-[#333333] leading-relaxed italic">
                    “Rekayasa perangkat lunak adalah tentang ketahanan dan presisi: mengubah alur bisnis yang kompleks menjadi arsitektur modular yang ringan, andal, dan berkinerja tinggi di lingkungan produksi.”
                  </p>
                </div>

                {/* Spesifikasi Statistik Game-Style */}
                <div className="w-full grid grid-cols-3 gap-3 border-t border-b border-[#E8E2D6] py-3.5 my-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-[#777777]">Waktu Tanggap</span>
                    <span className="text-base font-bold text-[#111111]">&lt; 50ms</span>
                    <span className="text-[9px] text-[#8C8477]">Latensi Interaksi</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-[#777777]">Kualitas Kode</span>
                    <span className="text-base font-bold text-[#111111]">100%</span>
                    <span className="text-[9px] text-[#8C8477]">Arsitektur Modular</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-[#777777]">Fokus Disiplin</span>
                    <span className="text-base font-bold text-[#D47A38]">Full-Stack</span>
                    <span className="text-[9px] text-[#8C8477]">React • Python • Svelte</span>
                  </div>
                </div>

                {/* Ringkasan Kemampuan */}
                <p className="text-xs sm:text-sm text-[#555048] leading-relaxed">
                  Berpengalaman membangun aplikasi web responsif berkinerja tinggi, dasbor point-of-sale terintegrasi RESTful API, layanan prediksi penjualan berbasis machine learning, hingga platform kolaborasi dokumen waktu nyata.
                </p>

                {/* Tombol Aksi */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="mailto:contact@rosyidstania.me"
                    className="px-5 py-2.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider rounded-[3px] shadow-xs transition-all flex items-center gap-2"
                  >
                    <FaEnvelope className="text-xs" /> Hubungi Rosyid
                  </a>

                  <a
                    href="https://github.com/RosyidStania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#FAF8F3] hover:bg-white border border-[#DDD6C8] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-[3px] transition-all flex items-center gap-2"
                  >
                    <SiGithub className="text-xs" /> Profil GitHub
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            BAGIAN 3: TAHAP PETUALANGAN // ARSIP PROYEK (STAGE SELECT)
           ========================================================================= */}
        <section id="proyek" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 border-t border-[#DDD6C8]">
          <div className="flex flex-col gap-8">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#BEB8AD] pb-2">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#777777] uppercase block">
                  STAGE SELECT // TAHAP PETUALANGAN
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#111111] tracking-tight mt-0.5">
                  Arsip Proyek & Studi Kasus
                </h2>
              </div>
              <span className="text-xs font-mono text-[#555048]">
                4 Tahap Selesai • 2025 - 2026
              </span>
            </div>

            {/* 4-Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* TAHAP 01: MyCaffee */}
              <div className="bg-white border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE4D8] font-mono text-[10px] text-[#777777]">
                    <span className="font-bold uppercase text-[#111111] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#111111]" /> TAHAP 01
                    </span>
                    <span>Okt - Des 2025 • 3 Bulan</span>
                  </div>

                  <h3 className="text-2xl font-serif-editorial font-bold text-[#111111] group-hover:text-[#D47A38] transition-colors">
                    MyCaffee
                  </h3>
                  <p className="text-xs font-semibold text-[#555048] mt-0.5">
                    Sistem Point-of-Sale & Manajemen Operasional Kafe
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#555048] mt-3 leading-relaxed">
                    Merancang dasbor admin interaktif menggunakan React untuk memonitor KPI bisnis harian. Mengimplementasikan manajemen katalog menu, riwayat transaksi kasir, serta integrasi RESTful API Laravel dengan Context API.
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#EAE4D8]">
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      React
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Laravel
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Context API
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </div>

              {/* TAHAP 02: Sora Finance */}
              <div className="bg-white border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE4D8] font-mono text-[10px] text-[#777777]">
                    <span className="font-bold uppercase text-[#111111] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#111111]" /> TAHAP 02
                    </span>
                    <span>Mar - Mei 2026 • 3 Bulan</span>
                  </div>

                  <h3 className="text-2xl font-serif-editorial font-bold text-[#111111] group-hover:text-[#D47A38] transition-colors">
                    Sora Finance
                  </h3>
                  <p className="text-xs font-semibold text-[#555048] mt-0.5">
                    Mesin Prediksi Penjualan Berbasis ML • PT SORA ABADI INSPIRA
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#555048] mt-3 leading-relaxed">
                    Membangun Sales Forecasting Service berbasis Python (FastAPI) untuk prediksi omzet per toko menggunakan Random Forest Regressor. Merancang pipeline feature engineering time-series serta evaluasi akurasi model.
                  </p>

                  {/* Thumbnail Gambar */}
                  <div className="w-full h-32 rounded-[4px] overflow-hidden border border-[#E0D9CC] mt-3 bg-[#FAF8F3]">
                    <img
                      src="/sora.png"
                      alt="Sora Finance"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#EAE4D8]">
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Python
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      FastAPI
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Machine Learning
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

              {/* TAHAP 03: TixLoop */}
              <div className="bg-white border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE4D8] font-mono text-[10px] text-[#777777]">
                    <span className="font-bold uppercase text-[#111111] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#111111]" /> TAHAP 03
                    </span>
                    <span>Mei - Juni 2026 • 1 Bulan</span>
                  </div>

                  <h3 className="text-2xl font-serif-editorial font-bold text-[#111111] group-hover:text-[#D47A38] transition-colors">
                    TixLoop
                  </h3>
                  <p className="text-xs font-semibold text-[#555048] mt-0.5">
                    Platform Marketplace Resale Tiket Event • Kompetisi OLIVIA XI
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#555048] mt-3 leading-relaxed">
                    Membangun antarmuka marketplace resale tiket berbasis SvelteKit & TypeScript dengan dasbor multi-role (buyer, seller, admin). Mengintegrasikan backend Laravel dengan autentikasi data yang ketat.
                  </p>

                  {/* Thumbnail Gambar */}
                  <div className="w-full h-32 rounded-[4px] overflow-hidden border border-[#E0D9CC] mt-3 bg-[#FAF8F3]">
                    <img
                      src="/tixloop.png"
                      alt="TixLoop"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#EAE4D8]">
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      SvelteKit
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Laravel
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Axios
                    </span>
                  </div>
                </div>
              </div>

              {/* TAHAP 04: ReviU */}
              <div className="bg-white border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE4D8] font-mono text-[10px] text-[#777777]">
                    <span className="font-bold uppercase text-[#111111] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#111111]" /> TAHAP 04
                    </span>
                    <span>Juli 2026 • 1 Bulan</span>
                  </div>

                  <h3 className="text-2xl font-serif-editorial font-bold text-[#111111] group-hover:text-[#D47A38] transition-colors">
                    ReviU
                  </h3>
                  <p className="text-xs font-semibold text-[#555048] mt-0.5">
                    Platform Peer-Review & Manajemen Tugas • CODE 6.0
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#555048] mt-3 leading-relaxed">
                    Membangun antarmuka platform peer-review berbasis SvelteKit & TypeScript dengan fitur PDF viewer terintegrasi, komentar inline real-time, dan kolaborasi teks waktu nyata menggunakan Tiptap dan Yjs CRDT.
                  </p>

                  {/* Thumbnail Gambar */}
                  <div className="w-full h-32 rounded-[4px] overflow-hidden border border-[#E0D9CC] mt-3 bg-[#FAF8F3]">
                    <img
                      src="/reviu.png"
                      alt="ReviU"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#EAE4D8]">
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      SvelteKit
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Tiptap
                    </span>
                    <span className="px-2 py-0.5 bg-[#F4F4EE] border border-[#DDD6C8] text-[10px] font-semibold text-[#333333] rounded-xs">
                      Yjs (CRDT)
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            BAGIAN 4: INVENTARIS KEAHLIAN // SKILL INVENTORY
           ========================================================================= */}
        <section id="keahlian" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 border-t border-[#DDD6C8]">
          <div className="flex flex-col gap-8">

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-[#BEB8AD] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#111111] uppercase">
                  INVENTARIS KEAHLIAN // TOOLBOX SPECS
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#777777]">TEKNOLOGI & PERKAKAS</span>
            </div>

            {/* 4 Inventory Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* 1. Antarmuka Klien */}
              <div className="bg-white border border-[#DDD6C8] rounded-[6px] p-5 shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#EAE4D8] pb-1.5">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Antarmuka Klien
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8477]">FRONTEND</span>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-mono text-xs text-[#333333]">
                  <div className="flex items-center gap-2"><SiReact className="text-[#149ECA]" /> React</div>
                  <div className="flex items-center gap-2"><SiSvelte className="text-[#FF3E00]" /> SvelteKit</div>
                  <div className="flex items-center gap-2"><SiTypescript className="text-[#3178C6]" /> TypeScript</div>
                  <div className="flex items-center gap-2"><SiJavascript className="text-[#F7DF1E]" /> JavaScript (ES6+)</div>
                  <div className="flex items-center gap-2"><SiTailwindcss className="text-[#06B6D4]" /> Tailwind CSS</div>
                  <div className="flex items-center gap-2"><SiFlutter className="text-[#02569B]" /> Flutter</div>
                </div>
              </div>

              {/* 2. Mesin Server */}
              <div className="bg-white border border-[#DDD6C8] rounded-[6px] p-5 shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#EAE4D8] pb-1.5">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Mesin Server
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8477]">BACKEND</span>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-mono text-xs text-[#333333]">
                  <div className="flex items-center gap-2"><SiPython className="text-[#3776AB]" /> Python</div>
                  <div className="flex items-center gap-2"><SiFastapi className="text-[#05998B]" /> FastAPI</div>
                  <div className="flex items-center gap-2"><SiPhp className="text-[#777BB4]" /> PHP</div>
                  <div className="flex items-center gap-2"><SiLaravel className="text-[#FF2D20]" /> Laravel</div>
                  <div className="flex items-center gap-2"><span className="text-[#111111] font-bold">API</span> RESTful Services</div>
                </div>
              </div>

              {/* 3. Basis Data */}
              <div className="bg-white border border-[#DDD6C8] rounded-[6px] p-5 shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#EAE4D8] pb-1.5">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Basis Data
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8477]">DATABASE</span>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-mono text-xs text-[#333333]">
                  <div className="flex items-center gap-2"><SiPostgresql className="text-[#4169E1]" /> PostgreSQL</div>
                  <div className="flex items-center gap-2"><SiMysql className="text-[#4479A1]" /> MySQL</div>
                  <div className="flex items-center gap-2"><span className="text-[#111111] font-bold">SQL</span> Schema Modeling</div>
                  <div className="flex items-center gap-2"><span className="text-[#111111] font-bold">IDX</span> Indexing & Query Perf</div>
                </div>
              </div>

              {/* 4. Perkakas & Alur Kerja */}
              <div className="bg-white border border-[#DDD6C8] rounded-[6px] p-5 shadow-2xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#EAE4D8] pb-1.5">
                  <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Perkakas Kerja
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8477]">ECOSYSTEM</span>
                </div>

                <div className="flex flex-col gap-2 pt-1 font-mono text-xs text-[#333333]">
                  <div className="flex items-center gap-2"><SiGithub className="text-[#181717]" /> Git & GitHub</div>
                  <div className="flex items-center gap-2"><SiPostman className="text-[#FF6C37]" /> Postman API</div>
                  <div className="flex items-center gap-2"><span className="text-[#D47A38] font-bold">⚡</span> Antigravity</div>
                  <div className="flex items-center gap-2"><span className="text-[#111111] font-bold">🐧</span> Linux & Bash</div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            BAGIAN 5: EPILOG // HUBUNGI PENGEMBANG & MANIFESTO KOLOPHON
           ========================================================================= */}
        <EditorialContactColophon />

      </main>
    </div>
  );
}
