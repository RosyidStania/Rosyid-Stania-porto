import React from 'react';
import { FaGithub, FaVolumeMute, FaVolumeUp, FaArrowUp } from 'react-icons/fa';
import { editorialSound } from './EditorialSound';

/**
 * ChonkyHeader - Minimalist Japanese Game Concept Header
 * Features brand watermark, section navigation, audio toggle, and GitHub profile link.
 */
export default function ChonkyHeader({ activeSection, isMuted, onToggleSound }) {
  const scrollTo = (id) => {
    editorialSound.playPaperRustle();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-3 sm:p-5 flex justify-between items-center select-none font-sans-editorial">
      {/* Top Left: Logo & Japanese Watermark */}
      <div className="pointer-events-auto flex items-center gap-3 bg-[#FAF8F3]/90 backdrop-blur-xs border border-[#DDD6C8] px-3.5 py-1.5 rounded-full shadow-2xs">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 cursor-pointer text-left"
        >
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span className="font-bold text-xs tracking-wider text-[#111111] uppercase">
            ROSYID STANIA
          </span>
          <span className="text-[10px] text-[#777777] font-normal border-l border-[#DDD6C8] pl-2 hidden sm:inline">
            システム設計 // Arsitektur Sistem
          </span>
        </button>
      </div>

      {/* Center Nav Links (Desktop) */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-[#FAF8F3]/90 backdrop-blur-xs border border-[#DDD6C8] p-1 rounded-full shadow-2xs text-[11px] font-semibold text-[#555048]">
        <button
          onClick={() => scrollTo('hero')}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            activeSection === 'konsep' || activeSection === 'hero' ? 'bg-[#111111] text-white' : 'hover:text-[#111111]'
          }`}
        >
          Showcase Sistem
        </button>
        <button
          onClick={() => scrollTo('karakter')}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            activeSection === 'karakter' ? 'bg-[#111111] text-white' : 'hover:text-[#111111]'
          }`}
        >
          Profil Developer
        </button>
        <button
          onClick={() => scrollTo('proyek')}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            activeSection === 'proyek' ? 'bg-[#111111] text-white' : 'hover:text-[#111111]'
          }`}
        >
          Studi Kasus
        </button>
        <button
          onClick={() => scrollTo('keahlian')}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            activeSection === 'keahlian' ? 'bg-[#111111] text-white' : 'hover:text-[#111111]'
          }`}
        >
          Inventaris Keahlian
        </button>
        <button
          onClick={() => scrollTo('kontak')}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            activeSection === 'kontak' ? 'bg-[#111111] text-white' : 'hover:text-[#111111]'
          }`}
        >
          Hubungi
        </button>
      </nav>

      {/* Top Right: Sound Toggle, GitHub & Scroll to Top */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="w-8 h-8 rounded-full bg-[#FAF8F3]/90 backdrop-blur-xs border border-[#DDD6C8] shadow-2xs flex items-center justify-center text-[#333333] hover:text-black hover:border-[#111111] transition-all cursor-pointer"
          title={isMuted ? "Aktifkan Efek Suara" : "Matikan Efek Suara"}
        >
          {isMuted ? <FaVolumeMute className="w-3 h-3 text-stone-400" /> : <FaVolumeUp className="w-3 h-3 text-stone-700" />}
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com/RosyidStania"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-[#FAF8F3]/90 backdrop-blur-xs border border-[#DDD6C8] shadow-2xs flex items-center justify-center text-[#333333] hover:text-black hover:border-[#111111] transition-all"
          title="GitHub Rosyid Stania"
        >
          <FaGithub className="w-3.5 h-3.5" />
        </a>

        {/* Scroll to Top Button */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full bg-[#111111] text-white shadow-2xs flex items-center justify-center hover:bg-[#333333] transition-all cursor-pointer"
          title="Kembali ke Atas"
        >
          <FaArrowUp className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
