import React, { useState } from 'react';
import {
  SiPython, SiReact, SiSvelte, SiTypescript
} from 'react-icons/si';
import {
  FaCheck, FaPlus, FaMinus, FaShieldAlt, FaComments
} from 'react-icons/fa';
import { editorialSound } from './EditorialSound';

/**
 * InteractiveSystemShowcase - Live Engineering Product Playground
 * Demonstrates real, working simulations of Rosyid's flagship software projects:
 * 1. Sora Finance (ML Sales Forecasting Engine)
 * 2. ReviU (Realtime Collaborative Document Editor)
 * 3. MyCaffee (Point-of-Sale Cashier Terminal)
 * 4. TixLoop (Resale Ticket Escrow & Verification)
 */
export default function InteractiveSystemShowcase() {
  const [activeTab, setActiveTab] = useState('sora');

  // --- SORA FINANCE SIMULATOR STATE ---
  const [forecastHorizon, setForecastHorizon] = useState(14);
  const [selectedBranch, setSelectedBranch] = useState('Sudirman');

  // --- MYCAFFEE POS SIMULATOR STATE ---
  const [cart, setCart] = useState([
    { id: 1, name: 'Espresso Single', price: 22000, qty: 1 },
    { id: 2, name: 'Caramel Macchiato', price: 34000, qty: 2 },
  ]);
  const [posSuccessMsg, setPosSuccessMsg] = useState(null);

  // --- REVIU REALTIME SIMULATOR STATE ---
  const [commentResolved, setCommentResolved] = useState(false);
  const [docContent, setDocContent] = useState(
    'Arsitektur peer-review dirancang menggunakan state CRDT (Conflict-free Replicated Data Types) dengan provider WebSocket guna memastikan latensi pertukaran patch dokumen di bawah 30 milidetik.'
  );

  // --- TIXLOOP SIMULATOR STATE ---
  const [ticketVerified, setTicketVerified] = useState(false);

  // Tab switch handler
  const handleTabChange = (tab) => {
    editorialSound.playPaperRustle();
    setActiveTab(tab);
  };

  // POS cart handlers
  const handleAddToCart = (item) => {
    editorialSound.playPenTap();
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    editorialSound.playPenTap();
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleCheckoutPOS = () => {
    editorialSound.playPaperRustle();
    setPosSuccessMsg('Transaksi berhasil dikirim ke RESTful API Laravel!');
    setTimeout(() => {
      setPosSuccessMsg(null);
      setCart([]);
    }, 2200);
  };

  // Subtotal POS
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  return (
    <div className="w-full bg-[#181614] rounded-[14px] sm:rounded-[18px] border border-[#2E2A24] shadow-2xl overflow-hidden font-sans-editorial flex flex-col">

      {/* --- TOP WINDOW BAR WITH TABS --- */}
      <div className="w-full bg-[#1F1C19] border-b border-[#2C2823] px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none">

        {/* Window controls (Mac style) & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5534B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCA33A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#57AB5A]" />
          </div>
          <span className="text-[11px] font-mono text-[#8C8477] uppercase tracking-wider hidden sm:inline">
            system_sandbox // live_runtime
          </span>
        </div>

        {/* Project Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#141210] p-1 rounded-[6px] border border-[#2A2621]">
          <button
            type="button"
            onClick={() => handleTabChange('sora')}
            className={`px-2.5 sm:px-3 py-1 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'sora'
                ? 'bg-[#2E2A24] text-white shadow-xs'
                : 'text-[#8C8477] hover:text-[#DDD6C8]'
            }`}
          >
            <SiPython className="text-[#3776AB] text-xs" />
            <span>01 Sora ML</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('reviu')}
            className={`px-2.5 sm:px-3 py-1 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'reviu'
                ? 'bg-[#2E2A24] text-white shadow-xs'
                : 'text-[#8C8477] hover:text-[#DDD6C8]'
            }`}
          >
            <SiSvelte className="text-[#FF3E00] text-xs" />
            <span>02 ReviU Editor</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('mycaffee')}
            className={`px-2.5 sm:px-3 py-1 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'mycaffee'
                ? 'bg-[#2E2A24] text-white shadow-xs'
                : 'text-[#8C8477] hover:text-[#DDD6C8]'
            }`}
          >
            <SiReact className="text-[#149ECA] text-xs" />
            <span>03 MyCaffee POS</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('tixloop')}
            className={`px-2.5 sm:px-3 py-1 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tixloop'
                ? 'bg-[#2E2A24] text-white shadow-xs'
                : 'text-[#8C8477] hover:text-[#DDD6C8]'
            }`}
          >
            <SiTypescript className="text-[#3178C6] text-xs" />
            <span>04 TixLoop</span>
          </button>
        </div>

      </div>

      {/* --- MAIN PLAYGROUND DISPLAY CANVAS --- */}
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between text-[#E8E4DA] bg-[#141210]">

        {/* =========================================================================
            TAB 1: SORA FINANCE (ML TIME-SERIES SALES FORECASTING ENGINE)
           ========================================================================= */}
        {activeTab === 'sora' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Header Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#26221D]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#2E2822] text-[#D47A38] text-[10px] font-mono font-bold rounded-xs border border-[#423A30]">
                    FASTAPI • RANDOM FOREST
                  </span>
                  <span className="text-xs text-[#8C8477] font-mono">
                    PT SORA ABADI INSPIRA
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white mt-1">
                  Sales Forecasting Microservice
                </h3>
              </div>

              {/* Interactive Controls: Branch & Horizon */}
              <div className="flex items-center gap-2.5 select-none">
                <div className="flex items-center gap-1.5 bg-[#1F1C19] border border-[#332E27] px-2.5 py-1 rounded-[4px] text-xs">
                  <span className="text-[#8C8477] text-[10px] uppercase font-mono">Cabang:</span>
                  <select
                    value={selectedBranch}
                    onChange={(e) => {
                      editorialSound.playPenTap();
                      setSelectedBranch(e.target.value);
                    }}
                    className="bg-transparent text-white font-semibold cursor-pointer outline-none"
                  >
                    <option value="Sudirman" className="bg-[#1F1C19]">Cabang Sudirman</option>
                    <option value="Senopati" className="bg-[#1F1C19]">Cabang Senopati</option>
                    <option value="Dago" className="bg-[#1F1C19]">Cabang Dago Bandung</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-[#1F1C19] border border-[#332E27] p-1 rounded-[4px] text-xs">
                  {[7, 14, 30].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        editorialSound.playPenTap();
                        setForecastHorizon(h);
                      }}
                      className={`px-2 py-0.5 rounded-[2px] font-mono text-[11px] transition-colors cursor-pointer ${
                        forecastHorizon === h
                          ? 'bg-[#D47A38] text-white font-bold'
                          : 'text-[#8C8477] hover:text-white'
                      }`}
                    >
                      {h}H
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live SVG Regression Chart */}
            <div className="w-full bg-[#1A1815] p-4 rounded-[8px] border border-[#2C2721] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#E8E4DA]">
                    <span className="w-3 h-0.5 bg-[#E8E4DA]" /> Omzet Aktual
                  </span>
                  <span className="flex items-center gap-1.5 text-[#D47A38]">
                    <span className="w-3 h-0.5 bg-[#D47A38] border-b border-dashed" /> Prediksi Model ({forecastHorizon} Hari)
                  </span>
                </div>
                <span className="text-[#8C8477]">
                  Waktu Eksekusi: <strong className="text-white">18.4ms</strong>
                </span>
              </div>

              {/* Dynamic SVG Waveform Chart */}
              <div className="w-full h-44 sm:h-52 relative">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="600" y2="50" stroke="#26221D" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="#26221D" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#26221D" strokeDasharray="3 3" />

                  {/* Confidence Interval Gradient Area for Prediction */}
                  <polygon
                    points="300,120 360,90 420,70 480,50 540,60 600,40 600,160 540,150 480,140 420,150 360,160 300,150"
                    fill="rgba(212, 122, 56, 0.12)"
                  />

                  {/* Actual Historical Line (Solid White/Cream) */}
                  <polyline
                    fill="none"
                    stroke="#E8E4DA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,140 60,130 120,110 180,125 240,95 300,110"
                  />

                  {/* Forecast Line (Dashed Terracotta Amber) */}
                  <polyline
                    fill="none"
                    stroke="#D47A38"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="300,110 360,105 420,85 480,70 540,75 600,55"
                  />

                  {/* Marker Points */}
                  <circle cx="300" cy="110" r="4.5" fill="#D47A38" stroke="#1A1815" strokeWidth="2" />
                  <circle cx="480" cy="70" r="4" fill="#D47A38" />
                  <circle cx="600" cy="55" r="4" fill="#D47A38" />
                </svg>

                {/* Simulated Floating Tooltip at Forecast Peak */}
                <div className="absolute right-4 top-2 bg-[#26221D] border border-[#3D352B] px-3 py-1.5 rounded-[4px] shadow-lg text-[11px] font-mono pointer-events-none">
                  <span className="text-[#8C8477]">Puncak Proyeksi: </span>
                  <span className="text-[#D47A38] font-bold">Rp 18.750.000 / hari</span>
                </div>
              </div>
            </div>

            {/* Model Evaluation Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#1A1815] p-3 rounded-[6px] border border-[#26221D] flex flex-col">
                <span className="text-[10px] font-mono text-[#8C8477] uppercase">Akurasi (R² Score)</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5">0.924</span>
                <span className="text-[9px] text-[#57AB5A] font-mono mt-0.5">Optimal fit</span>
              </div>

              <div className="bg-[#1A1815] p-3 rounded-[6px] border border-[#26221D] flex flex-col">
                <span className="text-[10px] font-mono text-[#8C8477] uppercase">Mean Absolute Error</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5">3.8%</span>
                <span className="text-[9px] text-[#8C8477] font-mono mt-0.5">Toleransi rendah</span>
              </div>

              <div className="bg-[#1A1815] p-3 rounded-[6px] border border-[#26221D] flex flex-col">
                <span className="text-[10px] font-mono text-[#8C8477] uppercase">Total Proyeksi ({selectedBranch})</span>
                <span className="text-lg font-bold text-[#D47A38] font-mono mt-0.5">
                  Rp {(forecastHorizon * 5.4).toFixed(1)} Juta
                </span>
                <span className="text-[9px] text-[#57AB5A] font-mono mt-0.5">+12.4% vs historis</span>
              </div>

              <div className="bg-[#1A1815] p-3 rounded-[6px] border border-[#26221D] flex flex-col">
                <span className="text-[10px] font-mono text-[#8C8477] uppercase">Database Cache</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5">PostgreSQL</span>
                <span className="text-[9px] text-[#8C8477] font-mono mt-0.5">Time-Series Partition</span>
              </div>
            </div>
          </div>
        )}


        {/* =========================================================================
            TAB 2: REVIU (REALTIME COLLABORATIVE DOCUMENT EDITOR)
           ========================================================================= */}
        {activeTab === 'reviu' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#26221D]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#2E2822] text-[#FF3E00] text-[10px] font-mono font-bold rounded-xs border border-[#423A30]">
                    SVELTEKIT • YJS CRDT • TIPTAP
                  </span>
                  <span className="text-xs text-[#8C8477] font-mono">
                    CODE 6.0 COMPETITION
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white mt-1">
                  Peer-Review & Real-Time Collaborative Workspace
                </h3>
              </div>

              {/* Active Users in Document */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#D47A38] border border-[#141210] flex items-center justify-center text-[10px] font-bold text-white" title="Rosyid Stania (Anda)">
                    RS
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#3178C6] border border-[#141210] flex items-center justify-center text-[10px] font-bold text-white" title="Peer Reviewer B">
                    PR
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#57AB5A] border border-[#141210] flex items-center justify-center text-[10px] font-bold text-white" title="Reviewer Dosen">
                    RD
                  </div>
                </div>
                <span className="text-xs font-mono text-[#57AB5A] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#57AB5A] animate-pulse" /> 3 User Terhubung
                </span>
              </div>
            </div>

            {/* Simulated Collaborative Document Canvas */}
            <div className="w-full bg-[#1A1815] p-5 sm:p-6 rounded-[8px] border border-[#2C2721] flex flex-col gap-4 relative">
              {/* Document Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2620]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C8477]">
                  <span>DOC // SPESIFIKASI_ARSITEKTUR_V2.MD</span>
                  <span className="text-[#57AB5A]">● TERSINKRON</span>
                </div>
                <span className="text-[11px] font-mono text-[#8C8477]">
                  Protokol: WebSocket + Y-CRDT
                </span>
              </div>

              {/* Editable Text Body */}
              <div className="relative">
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  className="w-full bg-transparent text-[#E8E4DA] text-sm sm:text-base leading-relaxed outline-none resize-none min-h-[90px] font-reading"
                />

                {/* Simulated Remote User Cursor */}
                <div className="absolute top-7 left-56 pointer-events-none flex flex-col items-start animate-pulse">
                  <div className="w-0.5 h-5 bg-[#3178C6]" />
                  <span className="px-1.5 py-0.5 bg-[#3178C6] text-white text-[9px] font-mono rounded-xs -mt-1 shadow-xs">
                    Reviewer B
                  </span>
                </div>
              </div>

              {/* Inline Review Comment Card */}
              <div className="w-full p-3.5 bg-[#24201A] border border-[#3D352B] rounded-[6px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <FaComments className="text-[#D47A38] text-sm mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Reviewer B</span>
                      <span className="text-[10px] font-mono text-[#8C8477]">2 menit lalu</span>
                      {commentResolved && (
                        <span className="text-[9px] font-mono px-1.5 bg-[#57AB5A]/20 text-[#57AB5A] rounded">
                          ✓ Teratasi
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#C8C2B5] mt-0.5">
                      “Tambahkan fallback cache lokal (IndexedDB) jika koneksi socket client terputus sesaat.”
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    editorialSound.playPenTap();
                    setCommentResolved((v) => !v);
                  }}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                    commentResolved
                      ? 'bg-[#2A2621] text-[#8C8477] border border-[#38332B]'
                      : 'bg-[#D47A38] hover:bg-[#B86326] text-white'
                  }`}
                >
                  <FaCheck className="text-[10px]" />
                  {commentResolved ? 'Buka Kembali' : 'Selesaikan Catatan'}
                </button>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#8C8477]">
              <div className="p-2.5 bg-[#1A1815] rounded border border-[#26221D] flex items-center gap-2">
                <span className="text-[#57AB5A]">✓</span> Zero Conflict Resolution (Yjs)
              </div>
              <div className="p-2.5 bg-[#1A1815] rounded border border-[#26221D] flex items-center gap-2">
                <span className="text-[#57AB5A]">✓</span> Integrated PDF Viewer Canvas
              </div>
              <div className="p-2.5 bg-[#1A1815] rounded border border-[#26221D] flex items-center gap-2">
                <span className="text-[#57AB5A]">✓</span> Latensi Broadcast &lt; 30ms
              </div>
            </div>
          </div>
        )}


        {/* =========================================================================
            TAB 3: MYCAFFEE (POINT-OF-SALE CASHIER TERMINAL)
           ========================================================================= */}
        {activeTab === 'mycaffee' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#26221D]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#2E2822] text-[#149ECA] text-[10px] font-mono font-bold rounded-xs border border-[#423A30]">
                    REACT 19 • LARAVEL 11 • CONTEXT API
                  </span>
                  <span className="text-xs text-[#8C8477] font-mono">
                    PRODUCTION SYSTEM
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white mt-1">
                  Point-of-Sale (POS) Terminal & Order Simulator
                </h3>
              </div>

              {posSuccessMsg && (
                <div className="px-3 py-1 bg-[#57AB5A]/20 border border-[#57AB5A]/40 text-[#57AB5A] text-xs font-mono rounded-[4px] animate-fade-in flex items-center gap-1.5">
                  <FaCheck /> {posSuccessMsg}
                </div>
              )}
            </div>

            {/* POS 2-Column Interface: Catalog & Bill */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

              {/* Menu Catalog (Left - 7 Cols) */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase text-[#8C8477]">
                  Katalog Menu Cepat (Klik untuk menambah ke tagihan)
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 1, name: 'Espresso Single', price: 22000, cat: 'Coffee' },
                    { id: 2, name: 'Caramel Macchiato', price: 34000, cat: 'Signature' },
                    { id: 3, name: 'Butter Croissant', price: 28000, cat: 'Bakery' },
                    { id: 4, name: 'Matcha Cream Latte', price: 38000, cat: 'Non-Coffee' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="p-3 bg-[#1A1815] hover:bg-[#25221E] border border-[#2A2620] hover:border-[#D47A38] rounded-[6px] text-left transition-all cursor-pointer flex flex-col justify-between h-20 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-[#D47A38] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-mono text-[#8C8477]">{item.cat}</span>
                      </div>
                      <span className="text-xs font-mono text-[#E8E4DA]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Order Receipt Bill (Right - 5 Cols) */}
              <div className="md:col-span-5 bg-[#1A1815] p-4 rounded-[8px] border border-[#2C2721] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between border-b border-[#2A2620] pb-2 font-mono text-xs">
                  <span className="text-white font-bold">Pesanan Meja #04</span>
                  <span className="text-[#8C8477]">{cart.length} Item</span>
                </div>

                {/* Cart items list */}
                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <span className="text-xs text-[#8C8477] font-mono italic py-4 text-center">
                      Keranjang kasir kosong
                    </span>
                  ) : (
                    cart.map((i) => (
                      <div key={i.id} className="flex items-center justify-between text-xs font-mono">
                        <div className="flex flex-col">
                          <span className="text-white">{i.name}</span>
                          <span className="text-[10px] text-[#8C8477]">
                            Rp {i.price.toLocaleString('id-ID')} × {i.qty}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(i.id, -1)}
                            className="w-5 h-5 bg-[#26221D] hover:bg-[#38322A] text-white rounded flex items-center justify-center cursor-pointer"
                          >
                            <FaMinus className="text-[8px]" />
                          </button>
                          <span className="w-4 text-center text-white">{i.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(i.id, 1)}
                            className="w-5 h-5 bg-[#26221D] hover:bg-[#38322A] text-white rounded flex items-center justify-center cursor-pointer"
                          >
                            <FaPlus className="text-[8px]" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bill Calculation */}
                <div className="border-t border-[#2A2620] pt-2 flex flex-col gap-1 font-mono text-xs">
                  <div className="flex justify-between text-[#8C8477]">
                    <span>Subtotal:</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[#8C8477]">
                    <span>PPN 11%:</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-[#2A2620]">
                    <span>Total Tagihan:</span>
                    <span className="text-[#D47A38]">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <button
                  type="button"
                  disabled={cart.length === 0}
                  onClick={handleCheckoutPOS}
                  className="w-full py-2 bg-[#D47A38] hover:bg-[#B86326] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaCheck /> Proses Transaksi & Simpan
                </button>
              </div>

            </div>
          </div>
        )}


        {/* =========================================================================
            TAB 4: TIXLOOP (EVENT RESALE TICKET ESCROW & VERIFICATION)
           ========================================================================= */}
        {activeTab === 'tixloop' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#26221D]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#2E2822] text-[#3178C6] text-[10px] font-mono font-bold rounded-xs border border-[#423A30]">
                    SVELTEKIT • TYPESCRIPT • LARAVEL ESCROW
                  </span>
                  <span className="text-xs text-[#8C8477] font-mono">
                    KOMPETISI OLIVIA XI
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white mt-1">
                  Ticket Resale Escrow & Anti-Fraud Verification Engine
                </h3>
              </div>

              <span className="text-xs font-mono text-[#57AB5A] flex items-center gap-1.5">
                <FaShieldAlt /> Escrow Security Active
              </span>
            </div>

            {/* Ticket Card & Validation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Ticket Preview Card */}
              <div className="md:col-span-7 bg-[#1A1815] p-5 rounded-[8px] border border-[#2C2721] flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D47A38] font-bold uppercase tracking-wider">
                    FESTIVAL MUSIC NUSANTARA 2026
                  </span>
                  <span className="px-2 py-0.5 bg-[#26221D] text-[#57AB5A] text-[9px] font-mono rounded">
                    VERIFIED TICKET ID: #TX-9842
                  </span>
                </div>

                <h4 className="text-xl font-serif-editorial font-bold text-white">
                  VIP Day Pass — Stage 01 Access
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#8C8477] pt-2 border-t border-[#2A2620]">
                  <div>
                    <span>Harga Tiket Resmi: </span>
                    <span className="line-through text-[#666056]">Rp 850.000</span>
                  </div>
                  <div>
                    <span>Harga Resale Aman: </span>
                    <span className="text-white font-bold">Rp 780.000 (-8%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#8C8477]">
                  <FaShieldAlt className="text-[#57AB5A]" />
                  <span>Dana ditahan di rekening bersama (escrow) sampai barcode tervalidasi di gerbang.</span>
                </div>
              </div>

              {/* Action Button & Live Validation Result */}
              <div className="md:col-span-5 bg-[#1F1C19] p-5 rounded-[8px] border border-[#2C2721] flex flex-col items-center justify-center gap-3 text-center">
                <span className="text-[10px] font-mono text-[#8C8477] uppercase">
                  Simulasi Verifikasi Barcode Tiket
                </span>

                <button
                  type="button"
                  onClick={() => {
                    editorialSound.playPenTap();
                    setTicketVerified((v) => !v);
                  }}
                  className={`w-full py-2.5 rounded-[4px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    ticketVerified
                      ? 'bg-[#57AB5A] text-white shadow-md'
                      : 'bg-[#D47A38] hover:bg-[#B86326] text-white'
                  }`}
                >
                  <FaShieldAlt />
                  {ticketVerified ? '✓ Tiket Tervalidasi Sah' : 'Uji Verifikasi Barcode'}
                </button>

                {ticketVerified && (
                  <p className="text-[11px] font-mono text-[#57AB5A] animate-fade-in">
                    Barcode QR sah • Tiket asli diterbitkan ulang untuk pembeli baru • Dana dilepas ke penjual.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- FOOTER STATUS STRIP OF THE RUNTIME --- */}
      <div className="w-full bg-[#1A1815] border-t border-[#26221D] px-4 py-2 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8C8477] select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#57AB5A] animate-pulse" />
            <span className="text-white font-semibold">SEMUA SISTEM NORMAL</span>
          </span>
          <span className="hidden sm:inline border-l border-[#2E2A24] pl-3">
            LATENSI RESPON: &lt; 25ms
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#DDD6C8]">
          <span>Gunakan tab di atas untuk menguji 4 modul sistem rekayasa</span>
        </div>
      </div>

    </div>
  );
}
