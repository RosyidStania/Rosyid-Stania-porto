import React, { useState } from 'react';
import {
  FaEnvelope, FaGithub, FaLinkedin, FaCheck,
  FaCopy, FaArrowUp, FaPaperPlane, FaTerminal
} from 'react-icons/fa';
import { editorialSound } from './EditorialSound';

/**
 * EditorialContactColophon - Professional Engineering Inquiry & Colophon Section
 * Replaces the sterile floating card with an architectural, high-utility,
 * multi-column editorial contact dashboard inspired by Japanese Bauhaus monographs.
 */
export default function EditorialContactColophon() {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('fulltime');

  const email = 'contact@rosyidstania.me';

  const topics = {
    fulltime: {
      label: 'Peluang Kerja Full-Time',
      badge: 'REKRUTMEN',
      subject: 'Peluang Full-Stack Software Engineer — Rosyid Stania',
      placeholder: 'Halo Rosyid, kami tertarik dengan portofolio Anda dan ingin mendiskusikan peluang posisi Full-Stack Engineer di tim kami...',
    },
    kontrak: {
      label: 'Proyek Kontrak / MVP',
      badge: 'KONTRAK',
      subject: 'Inquiry Proyek Perangkat Lunak — Rosyid Stania',
      placeholder: 'Halo Rosyid, kami memiliki rencana pengembangan sistem aplikasi baru dan ingin berkonsultasi mengenai estimasi dan arsitekturnya...',
    },
    arsitektur: {
      label: 'Review & Optimasi Arsitektur',
      badge: 'KONSULTASI',
      subject: 'Konsultasi Arsitektur Sistem — Rosyid Stania',
      placeholder: 'Halo Rosyid, kami ingin berdiskusi mengenai integrasi microservice, model ML, atau optimasi latensi sistem kami...',
    },
    santai: {
      label: 'Diskusi Teknis & Jaringan',
      badge: 'NETWORKING',
      subject: 'Halo Rosyid — Networking & Diskusi Rekayasa',
      placeholder: 'Halo Rosyid, salam kenal! Saya menyukai arsitektur dan showcase produk di portofolio Anda...',
    },
  };

  const handleCopyEmail = () => {
    editorialSound.playPenTap();
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleTopicSelect = (key) => {
    editorialSound.playPenTap();
    setSelectedTopic(key);
  };

  const currentTopicData = topics[selectedTopic];
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(currentTopicData.subject)}&body=${encodeURIComponent(currentTopicData.placeholder)}`;

  const scrollToTop = () => {
    editorialSound.playPaperRustle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="kontak" className="w-full border-t border-[#DDD6C8] bg-[#FAF8F3] pt-16 pb-12 px-4 sm:px-8 font-sans-editorial select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* --- SECTION HEADER: JAPANESE EDITORIAL LABEL & TITLE --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#BEB8AD] pb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase">
                EPILOGUE // PINTU KOMUNIKASI
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#111111] tracking-tight">
                Hubungi & Kolaborasi Teknis
              </h2>
              <span className="text-xs font-mono text-[#8C8477] border-l border-[#BEB8AD] pl-3 hidden sm:inline">
                連絡先 // Kontak Pengembang
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#555048]">
            <span className="w-2 h-2 rounded-full bg-[#57AB5A] animate-pulse" />
            <span>KOTA BANDUNG / JAKARTA (WIB • UTC+7)</span>
          </div>
        </div>

        {/* --- MAIN 2-COLUMN ARCHITECTURAL INQUIRY BOARD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* KOLOM KIRI (5 COLS): Direct Channel, Status, & Quick Copy */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Headline Card */}
            <div className="bg-white p-6 sm:p-7 rounded-[8px] border border-[#DDD6C8] shadow-2xs flex flex-col gap-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D47A38] uppercase">
                KETERSEDIAAN RESMI // STATUS
              </span>

              <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#111111] leading-snug">
                Siap Berkontribusi pada Rekayasa Sistem yang Menantang.
              </h3>

              <p className="text-xs sm:text-sm text-[#555048] leading-relaxed">
                Terbuka untuk posisi <strong>Full-Stack Software Engineer</strong> (Full-Time / Kontrak) maupun perancangan produk digital berskala tinggi.
              </p>

              {/* Status Board Details */}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#EAE4D8] text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Status Penerimaan:</span>
                  <span className="text-[#57AB5A] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#57AB5A]" /> Aktif Terbuka
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Format Kerja:</span>
                  <span className="text-[#111111] font-semibold">Remote Global / On-Site</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Waktu Tanggap:</span>
                  <span className="text-[#111111] font-semibold">&lt; 12 Jam Kerja</span>
                </div>
              </div>
            </div>

            {/* Direct Email Click-to-Copy Card */}
            <div className="bg-white p-5 rounded-[8px] border border-[#DDD6C8] shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#777777]">
                  Alamat Surat Elektronik Utama
                </span>
                <span className="text-[9px] font-mono text-[#D47A38]">KLIK UNTUK MENYALIN</span>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 bg-[#FAF8F3] rounded-[6px] border border-[#E0D9CC]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FaEnvelope className="text-[#D47A38] text-sm flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#111111] truncate select-all">
                    {email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                    copied
                      ? 'bg-[#57AB5A] text-white shadow-xs'
                      : 'bg-[#111111] hover:bg-[#333333] text-white'
                  }`}
                  title="Salin alamat email ke clipboard"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-[10px]" /> Disalin!
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-[10px]" /> Salin
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Code Profiles */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://github.com/RosyidStania"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white hover:bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] transition-all flex flex-col justify-between h-20 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <FaGithub className="text-sm text-[#111111]" />
                  <span className="text-xs text-[#8C8477] group-hover:translate-x-0.5 transition-transform">↗</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111111]">GitHub</span>
                  <span className="text-[9px] font-mono text-[#777777]">Repositori</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rosyidstania"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white hover:bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] transition-all flex flex-col justify-between h-20 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <FaLinkedin className="text-sm text-[#0077B5]" />
                  <span className="text-xs text-[#8C8477] group-hover:translate-x-0.5 transition-transform">↗</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111111]">LinkedIn</span>
                  <span className="text-[9px] font-mono text-[#777777]">Koneksi</span>
                </div>
              </a>

              <a
                href="mailto:contact@rosyidstania.me?subject=Inquiry%20via%20Portfolio"
                className="p-3 bg-white hover:bg-[#FAF8F3] border border-[#DDD6C8] hover:border-[#111111] rounded-[6px] transition-all flex flex-col justify-between h-20 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <FaEnvelope className="text-sm text-[#D47A38]" />
                  <span className="text-xs text-[#8C8477] group-hover:translate-x-0.5 transition-transform">↗</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111111]">Email</span>
                  <span className="text-[9px] font-mono text-[#777777]">Kirim Draf</span>
                </div>
              </a>
            </div>

          </div>

          {/* KOLOM KANAN (7 COLS): Interactive Inquiry & Topic Dispatcher */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[8px] border border-[#DDD6C8] shadow-2xs flex flex-col gap-6">

            <div>
              <div className="flex items-center justify-between border-b border-[#EAE4D8] pb-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#555048] uppercase flex items-center gap-1.5">
                  <FaTerminal className="text-[#D47A38]" /> PENGIRIM PESAN CEPAT // INQUIRY DISPATCHER
                </span>
                <span className="text-[10px] font-mono text-[#8C8477]">
                  FORMAT TERARAH
                </span>
              </div>
              <p className="text-xs text-[#666056] mt-2">
                Pilih topik di bawah untuk menyiapkan draf surat yang disesuaikan secara otomatis:
              </p>
            </div>

            {/* Topic Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(topics).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTopicSelect(key)}
                  className={`p-2.5 rounded-[6px] border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                    selectedTopic === key
                      ? 'bg-[#1F1C19] text-white border-[#1F1C19] shadow-xs'
                      : 'bg-[#FAF8F3] hover:bg-white text-[#333333] border-[#DDD6C8]'
                  }`}
                >
                  <span className={`text-[8px] font-mono font-bold uppercase tracking-wider ${
                    selectedTopic === key ? 'text-[#D47A38]' : 'text-[#8C8477]'
                  }`}>
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Generated Message Draft Preview */}
            <div className="flex flex-col gap-2 bg-[#FAF8F3] p-4 rounded-[6px] border border-[#E0D9CC] font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#E4DDCF] pb-1.5 text-[11px]">
                <span className="text-[#777777]">SUBJEK EMAIL:</span>
                <span className="text-[#111111] font-bold truncate max-w-[280px] sm:max-w-md">
                  {currentTopicData.subject}
                </span>
              </div>

              <div className="pt-1">
                <span className="text-[10px] text-[#8C8477] uppercase block mb-1">
                  DRAF ISI PESAN:
                </span>
                <p className="text-[#444038] font-reading leading-relaxed italic bg-white p-3 rounded border border-[#E4DDCF]">
                  “{currentTopicData.placeholder}”
                </p>
              </div>
            </div>

            {/* Direct Send Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] font-mono text-[#777777]">
                Akan membuka aplikasi email favorit Anda
              </span>

              <a
                href={mailtoLink}
                className="w-full sm:w-auto px-6 py-3 bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold font-mono uppercase tracking-wider rounded-[4px] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPaperPlane className="text-xs" />
                Buka Email & Kirim Draf Ini
              </a>
            </div>

          </div>

        </div>

        {/* --- BOTTOM ARCHITECTURAL COLOPHON & METADATA --- */}
        <div className="w-full pt-8 border-t border-[#DDD6C8] flex flex-col gap-6">

          {/* 4-Column Technical Specifications Manifest */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-[#555048]">
            <div className="flex flex-col gap-1 p-3 bg-white/60 rounded border border-[#E2DBD0]">
              <span className="text-[9px] uppercase tracking-wider text-[#8C8477]">01. FRAMEWORK & ENGINE</span>
              <span className="font-bold text-[#111111]">React 19 • Vite 8</span>
              <span className="text-[10px] text-[#777777]">Zero Runtime Overhead</span>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-white/60 rounded border border-[#E2DBD0]">
              <span className="text-[9px] uppercase tracking-wider text-[#8C8477]">02. SISTEM SUARA TAKTIL</span>
              <span className="font-bold text-[#111111]">Web Audio API Synthesis</span>
              <span className="text-[10px] text-[#777777]">0 Aset MP3 Eksternal</span>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-white/60 rounded border border-[#E2DBD0]">
              <span className="text-[9px] uppercase tracking-wider text-[#8C8477]">03. GAYA & TIPOGRAFI</span>
              <span className="font-bold text-[#111111]">Japanese Bauhaus Grid</span>
              <span className="text-[10px] text-[#777777]">Newsreader & JetBrains</span>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-white/60 rounded border border-[#E2DBD0]">
              <span className="text-[9px] uppercase tracking-wider text-[#8C8477]">04. HAK CIPTA & LISENSI</span>
              <span className="font-bold text-[#111111]">© 2026 Rosyid Stania</span>
              <span className="text-[10px] text-[#777777]">Hak Cipta Dilindungi</span>
            </div>
          </div>

          {/* Final Baseline Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE4D8] text-[11px] font-mono text-[#777777]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">ROSYID STANIA</span>
              <span>// FULL-STACK SOFTWARE ENGINEER</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[#555048] hover:text-[#111111] transition-colors cursor-pointer py-1 px-2.5 rounded hover:bg-white"
            >
              <span>Kembali ke Atas</span>
              <FaArrowUp className="text-[10px]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
