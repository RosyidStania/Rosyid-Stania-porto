import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ChonkyCatGame - Interactive 2D Canvas Rooftop Runner
 * An authentic realization of the Japanese "Muchi Neko" (Kucing Gembul) concept game screen.
 * Allows playing directly inside the smartphone mockup with Click / Tap / Spacebar controls.
 */
export default function ChonkyCatGame({ onWeightChange }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [weight, setWeight] = useState(42);
  const [treatsCount, setTreatsCount] = useState(18);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Audio synthesizer for retro bleeps
  const playSound = useCallback((type) => {
    if (!isAudioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'eat') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isAudioEnabled]);

  // Jump trigger
  const jumpRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement.clientHeight || 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Game Variables
    let animId;
    let frame = 0;
    let speed = 2.4;

    // Cat character state
    const cat = {
      x: 120,
      y: height - 110,
      baseY: height - 110,
      vy: 0,
      gravity: 0.48,
      jumpForce: -10.5,
      isGrounded: true,
      scale: 1,
      rotation: 0,
      puffTimer: 0
    };

    jumpRef.current = () => {
      if (cat.isGrounded) {
        cat.vy = cat.jumpForce;
        cat.isGrounded = false;
        cat.puffTimer = 12;
        playSound('jump');
      }
    };

    // Parallax Skyline Layers
    const farBuildings = [];
    for (let i = 0; i < 12; i++) {
      farBuildings.push({
        x: i * 80,
        w: 60 + Math.random() * 40,
        h: 90 + Math.random() * 80,
        color: '#D4CFC4',
        antennas: Math.random() > 0.4
      });
    }

    const midBuildings = [];
    for (let i = 0; i < 10; i++) {
      midBuildings.push({
        x: i * 110,
        w: 80 + Math.random() * 50,
        h: 120 + Math.random() * 70,
        color: '#A8A193',
        sign: i % 3 === 0 ? 'KUCING' : i % 3 === 1 ? 'ROSYID' : null
      });
    }

    // Foreground Rooftop Platforms
    const platforms = [
      { x: 0, w: 320, h: 90 },
      { x: 380, w: 260, h: 90 },
      { x: 700, w: 340, h: 90 },
      { x: 1100, w: 280, h: 90 }
    ];

    // Collectibles (Kibbles & Cat Cans)
    const items = [
      { x: 280, y: height - 150, type: 'kibble', collected: false },
      { x: 320, y: height - 165, type: 'kibble', collected: false },
      { x: 360, y: height - 150, type: 'kibble', collected: false },
      { x: 550, y: height - 135, type: 'can', collected: false },
      { x: 800, y: height - 155, type: 'kibble', collected: false },
      { x: 840, y: height - 155, type: 'kibble', collected: false }
    ];

    // Floating particles (dust & "+10" score)
    const particles = [];

    // Main Game Loop
    const render = () => {
      frame++;

      // 1. Clear background with warm cream sky
      ctx.fillStyle = '#E8E4DA';
      ctx.fillRect(0, 0, width, height);

      // Subtle horizontal clouds / atmospheric lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 60);
      ctx.lineTo(width, 60);
      ctx.moveTo(0, 100);
      ctx.lineTo(width, 100);
      ctx.stroke();

      // 2. Far Skyline (Slow speed)
      farBuildings.forEach((b) => {
        b.x -= speed * 0.25;
        if (b.x + b.w < -50) b.x = width + 50;

        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, height - b.h - 40, b.w, b.h);

        // Windows
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        for (let r = 0; r < b.h - 20; r += 16) {
          ctx.fillRect(b.x + 8, height - b.h - 40 + r + 6, b.w - 16, 5);
        }

        // Antenna
        if (b.antennas) {
          ctx.strokeStyle = '#9C9588';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(b.x + b.w / 2, height - b.h - 40);
          ctx.lineTo(b.x + b.w / 2, height - b.h - 65);
          ctx.stroke();
        }
      });

      // 3. Mid Buildings with Signs
      midBuildings.forEach((b) => {
        b.x -= speed * 0.55;
        if (b.x + b.w < -60) b.x = width + 60;

        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, height - b.h - 30, b.w, b.h);

        // Architectural details
        ctx.fillStyle = '#6E6759';
        ctx.fillRect(b.x + 6, height - b.h - 30 + 12, b.w - 12, 4);

        // Windows grid
        ctx.fillStyle = 'rgba(244, 244, 238, 0.45)';
        for (let wx = 8; wx < b.w - 12; wx += 14) {
          for (let wy = 26; wy < b.h - 20; wy += 20) {
            ctx.fillRect(b.x + wx, height - b.h - 30 + wy, 8, 12);
          }
        }

        // Japanese/Indonesian Signboard on rooftop
        if (b.sign) {
          ctx.fillStyle = '#FAF8F4';
          ctx.fillRect(b.x + 10, height - b.h - 85, 34, 52);
          ctx.strokeStyle = '#333333';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(b.x + 10, height - b.h - 85, 34, 52);

          ctx.fillStyle = '#111111';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(b.sign, b.x + 27, height - b.h - 55);
        }
      });

      // 4. Foreground Rooftop Platforms
      platforms.forEach((p) => {
        p.x -= speed;
        if (p.x + p.w < -100) {
          const maxRight = Math.max(...platforms.map(pl => pl.x + pl.w));
          p.x = maxRight + 70 + Math.random() * 40;
          p.w = 240 + Math.random() * 120;
        }

        // Rooftop body
        ctx.fillStyle = '#33302B';
        ctx.fillRect(p.x, height - p.h, p.w, p.h);

        // Rooftop ledge / coping
        ctx.fillStyle = '#4A453E';
        ctx.fillRect(p.x - 2, height - p.h - 5, p.w + 4, 6);

        // Railing
        ctx.strokeStyle = '#24211D';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x + 10, height - p.h - 18);
        ctx.lineTo(p.x + p.w - 10, height - p.h - 18);
        for (let rx = 10; rx < p.w - 10; rx += 25) {
          ctx.moveTo(p.x + rx, height - p.h - 5);
          ctx.lineTo(p.x + rx, height - p.h - 18);
        }
        ctx.stroke();
      });

      // 5. Update & Draw Collectibles
      items.forEach((item) => {
        item.x -= speed;
        if (item.x < -40) {
          item.x = width + 80 + Math.random() * 180;
          item.collected = false;
        }

        if (!item.collected) {
          // Floating gentle bobbing
          const bob = Math.sin(frame * 0.08 + item.x) * 3;

          // Check collision with Cat
          const dist = Math.hypot(cat.x - item.x, (cat.y - 15) - (item.y + bob));
          if (dist < 34) {
            item.collected = true;
            playSound('eat');
            setTreatsCount(c => c + 1);
            setWeight(w => {
              const nw = Math.min(100, w + (item.type === 'can' ? 8 : 2));
              if (onWeightChange) onWeightChange(nw);
              return nw;
            });

            // Spawn floating text particle
            particles.push({
              x: item.x,
              y: item.y,
              text: item.type === 'can' ? 'Nyam! +8%' : '+2%',
              alpha: 1,
              vy: -1.2
            });
          }

          if (item.type === 'kibble') {
            // Draw Kibble Biscuit (Brown triangular pellet)
            ctx.fillStyle = '#735742';
            ctx.beginPath();
            ctx.arc(item.x, item.y + bob, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#9C7A5E';
            ctx.beginPath();
            ctx.arc(item.x - 1.5, item.y + bob - 1.5, 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.type === 'can') {
            // Draw Cat Food Can (Round tin with cat face)
            ctx.fillStyle = '#BEB8AD';
            ctx.fillRect(item.x - 9, item.y + bob - 6, 18, 12);
            ctx.fillStyle = '#333333';
            ctx.fillRect(item.x - 9, item.y + bob + 3, 18, 3);
            ctx.strokeStyle = '#111111';
            ctx.lineWidth = 1;
            ctx.strokeRect(item.x - 9, item.y + bob - 6, 18, 12);
            // Cute tiny cat face icon on can label
            ctx.fillStyle = '#FAF7F0';
            ctx.beginPath();
            ctx.arc(item.x, item.y + bob - 0.5, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 6. Physics: Cat Jumping & Ground Detection
      cat.vy += cat.gravity;
      cat.y += cat.vy;

      // Platform collision
      let onPlatform = false;
      const catFootX = cat.x;
      const catFootY = cat.y;

      for (const p of platforms) {
        if (catFootX >= p.x - 20 && catFootX <= p.x + p.w + 10) {
          const platTop = height - p.h - 5;
          if (catFootY >= platTop && catFootY <= platTop + 24 && cat.vy >= 0) {
            cat.y = platTop;
            cat.vy = 0;
            cat.isGrounded = true;
            onPlatform = true;
            break;
          }
        }
      }

      if (!onPlatform && cat.y > height + 40) {
        // Fall reset smoothly onto nearest platform
        cat.y = height - 160;
        cat.vy = 0;
        cat.isGrounded = false;
      }

      // Dust puff particles when jumping/landing
      if (cat.puffTimer > 0) {
        cat.puffTimer--;
        ctx.fillStyle = 'rgba(190, 184, 173, 0.4)';
        ctx.beginPath();
        ctx.arc(cat.x - 14, cat.y, 6 - cat.puffTimer * 0.4, 0, Math.PI * 2);
        ctx.arc(cat.x - 24, cat.y - 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Draw The Chonky Calico Cat (Muchi Neko)
      ctx.save();
      ctx.translate(cat.x, cat.y - 18);

      // Squish & Stretch based on jump velocity
      let sx = 1;
      let sy = 1;
      let rot = 0;

      if (!cat.isGrounded) {
        if (cat.vy < 0) {
          // Jumping up: stretched & tilted
          sx = 0.92;
          sy = 1.12;
          rot = -0.12;
        } else {
          // Falling down: horizontal squish
          sx = 1.08;
          sy = 0.94;
          rot = 0.08;
        }
      } else {
        // Running cycle bob
        const runCycle = Math.sin(frame * 0.28);
        sy = 1 + runCycle * 0.05;
        sx = 1 - runCycle * 0.03;
      }

      ctx.scale(sx, sy);
      ctx.rotate(rot);

      // Dynamic Cat Body Radius based on weight!
      const bodyRadiusX = 22 + (weight / 100) * 8;
      const bodyRadiusY = 16 + (weight / 100) * 7;

      // Drop shadow underneath cat
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, bodyRadiusY + 14, bodyRadiusX * 0.9, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Paws (Running animation)
      const legOffset = Math.sin(frame * 0.35) * 6;
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1.5;

      // Back paw
      ctx.beginPath();
      ctx.ellipse(-bodyRadiusX * 0.5 + legOffset, bodyRadiusY + 2, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Front paw
      ctx.beginPath();
      ctx.ellipse(bodyRadiusX * 0.5 - legOffset, bodyRadiusY + 2, 4.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Tail (Cute wagging behind)
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const tailWag = Math.sin(frame * 0.18) * 6;
      ctx.moveTo(-bodyRadiusX + 2, 2);
      ctx.quadraticCurveTo(-bodyRadiusX - 12, -8 + tailWag, -bodyRadiusX - 18, -4 + tailWag);
      ctx.stroke();

      // Main Chonky Cat Body (Warm White Cream)
      ctx.fillStyle = '#FAF7F2';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyRadiusX, bodyRadiusY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Calico Black Patch on the Back
      ctx.fillStyle = '#181614';
      ctx.beginPath();
      ctx.ellipse(-bodyRadiusX * 0.25, -bodyRadiusY * 0.45, bodyRadiusX * 0.5, bodyRadiusY * 0.45, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Calico Orange/Brown Patch on Head/Ear
      ctx.fillStyle = '#D47A38';
      ctx.beginPath();
      ctx.ellipse(bodyRadiusX * 0.4, -bodyRadiusY * 0.4, bodyRadiusX * 0.25, bodyRadiusY * 0.35, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Ears (Cute little triangular cat ears)
      // Left Ear (Black)
      ctx.fillStyle = '#181614';
      ctx.beginPath();
      ctx.moveTo(bodyRadiusX * 0.15, -bodyRadiusY + 2);
      ctx.lineTo(bodyRadiusX * 0.35, -bodyRadiusY - 10);
      ctx.lineTo(bodyRadiusX * 0.55, -bodyRadiusY + 3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Ear (Orange)
      ctx.fillStyle = '#D47A38';
      ctx.beginPath();
      ctx.moveTo(bodyRadiusX * 0.55, -bodyRadiusY + 3);
      ctx.lineTo(bodyRadiusX * 0.72, -bodyRadiusY - 9);
      ctx.lineTo(bodyRadiusX * 0.85, -bodyRadiusY + 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Ear Pink
      ctx.fillStyle = '#F2B8AA';
      ctx.beginPath();
      ctx.moveTo(bodyRadiusX * 0.25, -bodyRadiusY + 1);
      ctx.lineTo(bodyRadiusX * 0.35, -bodyRadiusY - 6);
      ctx.lineTo(bodyRadiusX * 0.45, -bodyRadiusY + 1);
      ctx.closePath();
      ctx.fill();

      // Cute Face (Eyes, Nose, Whiskers)
      ctx.fillStyle = '#111111';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1.5;

      // Happy curved anime eyes (^ ^)
      ctx.beginPath();
      ctx.arc(bodyRadiusX * 0.45, -bodyRadiusY * 0.1, 3, Math.PI, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bodyRadiusX * 0.72, -bodyRadiusY * 0.05, 3, Math.PI, 0);
      ctx.stroke();

      // Little pink nose & mouth (ω)
      ctx.fillStyle = '#F28E7E';
      ctx.beginPath();
      ctx.arc(bodyRadiusX * 0.62, bodyRadiusY * 0.12, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(bodyRadiusX * 0.58, bodyRadiusY * 0.22, 2.5, 0, Math.PI);
      ctx.arc(bodyRadiusX * 0.66, bodyRadiusY * 0.22, 2.5, 0, Math.PI);
      ctx.stroke();

      // Whiskers
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bodyRadiusX * 0.75, bodyRadiusY * 0.15);
      ctx.lineTo(bodyRadiusX * 0.95, bodyRadiusY * 0.1);
      ctx.moveTo(bodyRadiusX * 0.75, bodyRadiusY * 0.22);
      ctx.lineTo(bodyRadiusX * 0.95, bodyRadiusY * 0.25);
      ctx.stroke();

      ctx.restore();

      // 8. Render Floating Particles
      for (let pi = particles.length - 1; pi >= 0; pi--) {
        const pt = particles[pi];
        pt.y += pt.vy;
        pt.alpha -= 0.025;

        if (pt.alpha <= 0) {
          particles.splice(pi, 1);
          continue;
        }

        ctx.fillStyle = `rgba(17, 17, 17, ${pt.alpha})`;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(pt.text, pt.x, pt.y);
      }

      // Continue loop if playing
      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, weight, onWeightChange, playSound]);

  // Handle click or tap on canvas
  const handleInteraction = () => {
    if (jumpRef.current) {
      jumpRef.current();
    }
  };

  // Keyboard spacebar listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (jumpRef.current) {
          jumpRef.current();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onClick={handleInteraction}
      className="relative w-full h-full cursor-pointer select-none overflow-hidden bg-[#E8E4DA]"
      title="Klik / Tekan Spasi untuk Melompat!"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* --- HUD OVERLAY INSIDE THE PHONE (MATCHING IMAGE) --- */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none font-sans-editorial text-[#111111] z-20">

        {/* Top Left: BEBAN / WEIGHT GAUGE */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#333333]">
            <span>BERAT</span>
            <span className="font-mono text-[#777777]">{weight}%</span>
          </div>

          {/* Progress bar pill */}
          <div className="w-24 sm:w-32 h-2.5 bg-[#BEB8AD]/50 border border-[#777777]/40 rounded-full p-[1px] overflow-hidden">
            <div
              className="h-full bg-[#111111] rounded-full transition-all duration-300"
              style={{ width: `${weight}%` }}
            />
          </div>
        </div>

        {/* Top Right: Treat Count & Pause Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Treat counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F2]/90 border border-[#BEB8AD] rounded-full shadow-xs text-xs font-bold text-[#111111]">
            <span className="text-sm">🍪</span>
            <span className="font-mono">× {treatsCount}</span>
          </div>

          {/* Audio toggle button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsAudioEnabled(v => !v);
            }}
            className="w-7 h-7 bg-[#FAF8F2]/90 hover:bg-white border border-[#BEB8AD] rounded-full shadow-xs flex items-center justify-center text-[10px] text-[#333333] transition-colors cursor-pointer"
            title={isAudioEnabled ? "Matikan Suara" : "Aktifkan Suara"}
          >
            {isAudioEnabled ? "🔊" : "🔇"}
          </button>

          {/* Pause / Play button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(v => !v);
            }}
            className="w-7 h-7 bg-[#FAF8F2]/90 hover:bg-white border border-[#BEB8AD] rounded-full shadow-xs flex items-center justify-center text-xs font-bold text-[#111111] transition-colors cursor-pointer"
            title={isPlaying ? "Jeda Game" : "Lanjutkan Game"}
          >
            {isPlaying ? "||" : "▶"}
          </button>
        </div>
      </div>

      {/* Floating Jump Instruction Prompt */}
      <div className="absolute bottom-2.5 right-4 pointer-events-none bg-black/60 backdrop-blur-xs text-[#FAF8F2] px-2.5 py-0.5 rounded-full text-[9px] font-sans-editorial tracking-wider uppercase">
        Klik layar / Spasi = Lompat
      </div>
    </div>
  );
}
