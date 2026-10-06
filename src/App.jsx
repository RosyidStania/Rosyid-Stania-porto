import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSvelte, SiTypescript, SiLaravel, SiPython, SiFastapi, SiPostgresql, SiReact, SiPhp, SiFlask, SiJavascript, SiFlutter, SiMysql, SiPostman } from 'react-icons/si';
import { FaPen, FaSync, FaBrain, FaProjectDiagram, FaGithub, FaRocket, FaHtml5, FaCss3Alt } from 'react-icons/fa';

function NetworkBackground({ isLightMode }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(isLightMode);

  useEffect(() => {
    modeRef.current = isLightMode;
  }, [isLightMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let w, h;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const numParticles = Math.floor((w * h) / 15000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 1.5 + 1
        });
      }
    }

    function update() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      
      const maxDist = 150; 
      const isLight = modeRef.current;
      const rgb = isLight ? '0, 31, 61' : '237, 152, 95';

      // Draw lines between connected particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const d1 = Math.sqrt((p1.x - mouse.x)**2 + (p1.y - mouse.y)**2);
            const d2 = Math.sqrt((p2.x - mouse.x)**2 + (p2.y - mouse.y)**2);
            
            let localMaxDist = maxDist;
            let opacityMultiplier = 0.5;
            
            // If both particles are inside the geometric star's gravity well, 
            // strictly limit their connection distance so they only trace the hollow outline!
            if (d1 < 225 && d2 < 225) {
               localMaxDist = 35; 
               opacityMultiplier = 1.0; // Make the star outline glow brighter
            }

            if (dist < localMaxDist) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              const alpha = 1 - (dist / localMaxDist);
              ctx.strokeStyle = `rgba(${rgb}, ${alpha * opacityMultiplier})`;
              ctx.lineWidth = d1 < 225 && d2 < 225 ? 1.5 : 1; // Thicker lines for the star
              ctx.stroke();
            }
          }
        }
      }

      // Draw lines to mouse and apply geometric formation force
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDist * 1.5) {
          // Draw thin connecting lines to center
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const alpha = 1 - (dist / (maxDist * 1.5));
          ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.2})`; // Thinner, less opaque lines to center so the shape stands out
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // GEOMETRIC STAR SWIRL EFFECT
          const angle = Math.atan2(dy, dx);
          const time = Date.now() * 0.002; // Rotate the star shape over time
          
          // Calculate a 5-pointed star radius
          // Base radius 90, variations of 40 pixels based on the 5 peaks
          const targetRadius = 90 + Math.cos((angle + time) * 5) * 40;
          
          // Force to pull/push the particle to the exact contour of the star
          const radialForce = (dist - targetRadius) * 0.05;
          const dirX = dx / dist;
          const dirY = dy / dist;
          
          p.x -= dirX * radialForce;
          p.y -= dirY * radialForce;
          
          // Tangential force to make them orbit and swirl
          p.x += dirY * 2.5;
          p.y -= dirX * 2.5;
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.8)`;
        ctx.fill();
      }

      // Draw flashlight glow
      if (mouse.x > -100 && mouse.y > -100) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        grad.addColorStop(0, `rgba(${rgb}, 0.15)`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function animate() {
      update();
      draw();
      animId = requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
      style={{ display: 'block' }}
    />
  );
}

function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  
  useEffect(() => {
    let mouseX = -1000;
    let mouseY = -1000;
    let ringX = -1000;
    let ringY = -1000;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (cursorRingRef.current) {
        const scale = isHovering ? 1.5 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
        if (isHovering) {
            cursorRingRef.current.style.opacity = '0.5';
            cursorRingRef.current.style.borderWidth = '1px';
        } else {
            cursorRingRef.current.style.opacity = '1';
            cursorRingRef.current.style.borderWidth = '2px';
        }
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    const animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRingRef} 
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-current pointer-events-none z-[9999] transition-[opacity,border-width] duration-300 ease-out mix-blend-difference text-white hidden md:block" 
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block" 
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

function Navbar({ theme, isLightMode, onToggle }) {
  // theme specifies this layer's color scheme
  const isLightTheme = theme === 'light';
  
  // Icon color needs to contrast with the screen background
  // Light theme (Layer 2) has an orange background (#ED985F) -> Icon should be dark (#001F3D)
  // Dark theme (Layer 1) has a dark blue background (#001F3D) -> Icon should be orange (#ED985F)
  const iconColor = isLightTheme ? 'text-[#001F3D] hover:text-black' : 'text-[#ED985F] hover:text-white';

  return (
    <header className="absolute top-6 right-6 md:top-10 md:right-10 pointer-events-auto flex items-center gap-2 md:gap-4">
      <a 
        href="https://github.com/RosyidStania" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center ${iconColor} transition-all duration-500 cursor-pointer hover:scale-110`}
        aria-label="GitHub Profile"
      >
        <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
      </a>

      <button 
        onClick={onToggle}
        className={`relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center ${iconColor} transition-colors duration-500 cursor-pointer overflow-hidden rounded-full hover:scale-110`}
        aria-label="Toggle Theme"
      >
        <svg 
          className={`absolute inset-0 w-full h-full p-1.5 md:p-2 transition-all duration-500 ease-in-out transform ${isLightMode ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          {/* Moon path */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>

        <svg 
          className={`absolute inset-0 w-full h-full p-1.5 md:p-2 transition-all duration-500 ease-in-out transform ${!isLightMode ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          {/* Sun path */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </header>
  );
}

const IMAGES = [
  '/profile.png',
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg'
];

const ConstellationQuadrant = ({ title, nodes, lines, isLightMode }) => {
  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <div className="absolute top-[8vh] md:top-[10vh] w-full flex flex-col items-center justify-center gap-3 z-30">
        <div 
          className="flex items-center gap-4 opacity-60 transition-colors duration-700"
          style={{ color: isLightMode ? '#001F3D' : '#ED985F' }}
        >
          <div className="w-8 md:w-16 h-[1px] bg-current"></div>
          <span className="text-[9px] md:text-xs font-mono tracking-[0.3em] uppercase">Sector Navigation</span>
          <div className="w-8 md:w-16 h-[1px] bg-current"></div>
        </div>
        
        <h2 
          className="text-3xl md:text-6xl font-black tracking-[0.2em] uppercase transition-all duration-700 text-center px-4"
          style={{
            background: isLightMode 
               ? 'linear-gradient(to right, #001F3D, #00509E)'
               : 'linear-gradient(to right, #ED985F, #FBE0C9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: isLightMode 
               ? 'drop-shadow(0 4px 10px rgba(0, 31, 61, 0.15))' 
               : 'drop-shadow(0 0 20px rgba(237, 152, 95, 0.3))'
          }}
        >
          {title}
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <svg className="absolute inset-0 w-full h-full hidden md:block z-0 pointer-events-none transition-colors duration-700">
          {lines.desktop.map((line, i) => (
            <React.Fragment key={i}>
              <line 
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                stroke={isLightMode ? 'rgba(0, 31, 61, 0.15)' : 'rgba(237, 152, 95, 0.15)'} 
                strokeWidth="1"
              />
              <line 
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                stroke={isLightMode ? '#00509E' : '#FFD700'} 
                strokeWidth="1.5"
                className="animate-comet"
                style={{ 
                  filter: 'drop-shadow(0 0 5px currentColor)', 
                  animationDelay: `${i * 1.2}s` 
                }}
              />
            </React.Fragment>
          ))}
        </svg>
        <svg className="absolute inset-0 w-full h-full block md:hidden z-0 pointer-events-none transition-colors duration-700">
          {lines.mobile.map((line, i) => (
            <React.Fragment key={i}>
              <line 
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                stroke={isLightMode ? 'rgba(0, 31, 61, 0.15)' : 'rgba(237, 152, 95, 0.15)'} 
                strokeWidth="1"
              />
              <line 
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} 
                stroke={isLightMode ? '#00509E' : '#FFD700'} 
                strokeWidth="1.5"
                className="animate-comet"
                style={{ 
                  filter: 'drop-shadow(0 0 5px currentColor)', 
                  animationDelay: `${i * 1.2}s` 
                }}
              />
            </React.Fragment>
          ))}
        </svg>

        {nodes.map((node) => (
          <React.Fragment key={node.name}>
            <div 
              className="absolute hidden md:flex flex-col items-center justify-center z-20 transition-all duration-1000 group cursor-default -translate-x-1/2 -translate-y-1/2 hover:z-50"
              style={{ left: node.dx, top: node.dy }}
            >
              <div 
                className="relative flex items-center justify-center transition-all duration-500 group-hover:scale-125"
                style={{ color: isLightMode ? '#001F3D' : '#ED985F' }}
              >
                <div 
                  className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: isLightMode ? '#001F3D' : '#ED985F' }}
                ></div>
                <div className="relative z-10 drop-shadow-[0_0_10px_currentColor] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_currentColor]">
                  {node.icon}
                </div>
              </div>
              <span 
                className="absolute top-full mt-4 text-sm font-bold tracking-widest uppercase transition-all duration-500 opacity-0 group-hover:opacity-100 whitespace-nowrap drop-shadow-md group-hover:-translate-y-1"
                style={{ color: isLightMode ? '#001F3D' : '#ED985F' }}
              >
                {node.name}
              </span>
            </div>

            <div 
              className="absolute flex md:hidden flex-col items-center justify-center z-20 transition-all duration-1000 group cursor-default -translate-x-1/2 -translate-y-1/2 hover:z-50"
              style={{ left: node.mx, top: node.my }}
            >
              <div 
                className="relative flex items-center justify-center transition-all duration-500 hover:scale-125"
                style={{ color: isLightMode ? '#001F3D' : '#ED985F' }}
              >
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-20"
                  style={{ backgroundColor: isLightMode ? '#001F3D' : '#ED985F' }}
                ></div>
                <div className="relative z-10 drop-shadow-[0_0_8px_currentColor]">
                  {node.icon}
                </div>
              </div>
              <span 
                className="absolute top-full mt-2 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap drop-shadow-md"
                style={{ color: isLightMode ? '#001F3D' : '#ED985F' }}
              >
                {node.name}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [originPos, setOriginPos] = useState({ x: '85%', y: '8%' });
  const [scrollPhase, setScrollPhase] = useState(0);
  const [deck, setDeck] = useState(IMAGES);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const projectsDarkBgRef = useRef(null);
  const nodesRef = useRef([]);
  const constellationCanvasRef = useRef(null);
  const lineLengthRef = useRef(0);

  useEffect(() => {
    const updateMetrics = () => {
      if (!timelineRef.current || !progressLineRef.current || !nodesRef.current) return;
      
      const validNodes = nodesRef.current.filter(Boolean);
      if (validNodes.length === 0) return;
      
      const lineStart = progressLineRef.current.offsetLeft;
      
      const getCenter = (node) => {
        let left = 0;
        let curr = node;
        while (curr && curr !== timelineRef.current) {
          left += curr.offsetLeft;
          curr = curr.offsetParent;
        }
        return left + (node.offsetWidth / 2);
      };
      
      const lastNode = validNodes[validNodes.length - 1];
      const lineEnd = getCenter(lastNode);
      const lineLength = lineEnd - lineStart;
      
      lineLengthRef.current = lineLength;
      
      const bgLine = timelineRef.current.querySelector('.timeline-bg-line');
      if (bgLine) bgLine.style.width = `${lineLength}px`;
    };

    let ticking = false;
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      
      let phase = 0;
      if (y < 50) phase = 0;
      else if (y < vh * 1.2) phase = 1;
      else if (y < vh * 4.5) phase = 2; // Horizontal timeline ends at 4.5vh
      else phase = 3; // New skills section

      setScrollPhase(prev => {
        if (prev !== phase) return phase;
        return prev;
      });

      if (timelineRef.current || constellationCanvasRef.current) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // -- PHASE 2 LOGIC (Timeline) --
            if (timelineRef.current) {
              const phase2Start = vh * 1.2;
              const phase2End = vh * 4.5;
              const scrollRange = phase2End - phase2Start;
              const progress = scrollRange > 0 ? Math.max(0, Math.min(1, (y - phase2Start) / scrollRange)) : 0;
              
              const maxTranslate = lineLengthRef.current || vh * 2;
              timelineRef.current.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
              
              if (progressLineRef.current) {
                progressLineRef.current.style.width = `${progress * maxTranslate}px`;
                
                const lineRect = progressLineRef.current.getBoundingClientRect();
                const lineTipX = lineRect.right;
                const nodeRects = nodesRef.current.map(node => 
                  node ? node.getBoundingClientRect() : null
                );
                
                let anyNodeActive = false;
                const nodeStates = nodeRects.map(rect => {
                  if (rect && lineTipX >= rect.left + (rect.width / 2)) {
                    anyNodeActive = true;
                    return true;
                  }
                  return false;
                });
                
                const isDarkTheme = anyNodeActive;
                
                if (projectsDarkBgRef.current) {
                  projectsDarkBgRef.current.style.opacity = isDarkTheme ? '1' : '0';
                }
                
                timelineRef.current.style.setProperty('--timeline-text', isDarkTheme ? '#ED985F' : '#001F3D');
                timelineRef.current.style.setProperty('--timeline-line', isDarkTheme ? '#ED985F' : '#001F3D');
                timelineRef.current.style.setProperty('--timeline-bg-line', isDarkTheme ? 'rgba(237, 152, 95, 0.2)' : 'rgba(0, 31, 61, 0.2)');
                timelineRef.current.style.setProperty('--timeline-desc', isDarkTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 31, 61, 0.8)');
                timelineRef.current.style.setProperty('--timeline-sub', isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 31, 61, 0.5)');

                nodesRef.current.forEach((node, index) => {
                  if (node) {
                    if (nodeStates[index]) {
                      node.style.backgroundColor = '#FFD700';
                      node.style.boxShadow = '0 0 40px 20px rgba(255, 215, 0, 0.5), 0 0 20px 10px rgba(237, 152, 95, 0.8)';
                      node.style.transform = 'scale(1.5)';
                    } else {
                      node.style.backgroundColor = '#001F3D';
                      node.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      node.style.transform = 'scale(1)';
                    }
                  }
                });
              }
            }

             // -- PHASE 3 LOGIC (Constellation Panning) --
            if (constellationCanvasRef.current) {
              const p3Start = vh * 4.5;
              const p3Scroll = y - p3Start;
              let pX = 0; let pY = 0;
              
              if (y >= p3Start) {
                 if (p3Scroll < vh) { 
                    // Movement 1: Camera moves Right (Canvas Left) -> Reveal Backend
                    pX = (p3Scroll / vh) * 100;
                    pY = 0;
                 } else if (p3Scroll < vh * 2) {
                    // Movement 2: Camera moves Down (Canvas Up) -> Reveal Database
                    pX = 100;
                    pY = ((p3Scroll - vh) / vh) * 100;
                 } else if (p3Scroll < vh * 3) {
                    // Movement 3: Camera moves Left (Canvas Right) -> Reveal Tools
                    const prog = (p3Scroll - vh * 2) / vh;
                    pX = 100 - (prog * 100);
                    pY = 100;
                 } else {
                    // Movement 4: Camera moves Down (Canvas Up) -> Return to Earth!
                    const prog = Math.min(1, (p3Scroll - vh * 3) / vh);
                    pX = 0;
                    pY = 100 + (prog * 100);
                 }
              }
              constellationCanvasRef.current.style.transform = `translate3d(-${pX}vw, -${pY}vh, 0)`;
            }

            ticking = false;
          });
          ticking = true;
        }
      }
    };
    
    // Initial measurement
    setTimeout(updateMetrics, 100); // Wait for fonts/layout
    window.addEventListener('resize', updateMetrics);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOriginPos({ x: `${cx}px`, y: `${cy}px` });
    setIsLightMode(prev => !prev);
  };

  const handleCardClick = (clickedIndex) => {
    if (scrollPhase < 1) return;
    setDeck(prev => {
      const newDeck = [...prev];
      const clickedCard = newDeck.splice(clickedIndex, 1)[0];
      newDeck.unshift(clickedCard);
      return newDeck;
    });
  };

  const clipPathStyle = {
    clipPath: isLightMode 
      ? `circle(150vw at ${originPos.x} ${originPos.y})` 
      : `circle(0px at ${originPos.x} ${originPos.y})`,
    transition: 'clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
  };

  const frontendNodes = [
    { name: 'HTML', icon: <FaHtml5 className="w-8 h-8 md:w-12 md:h-12" />, dx: '15%', dy: '60%', mx: '25%', my: '15%' },
    { name: 'CSS', icon: <FaCss3Alt className="w-8 h-8 md:w-12 md:h-12" />, dx: '30%', dy: '35%', mx: '75%', my: '25%' },
    { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8 md:w-12 md:h-12" />, dx: '50%', dy: '55%', mx: '35%', my: '45%' },
    { name: 'React', icon: <SiReact className="w-8 h-8 md:w-12 md:h-12" />, dx: '65%', dy: '30%', mx: '80%', my: '60%' },
    { name: 'Svelte', icon: <SiSvelte className="w-8 h-8 md:w-12 md:h-12" />, dx: '80%', dy: '70%', mx: '25%', my: '75%' },
    { name: 'Flutter', icon: <SiFlutter className="w-8 h-8 md:w-12 md:h-12" />, dx: '90%', dy: '45%', mx: '65%', my: '90%' },
  ];

  const backendNodes = [
    { name: 'Python', icon: <SiPython className="w-8 h-8 md:w-12 md:h-12" />, dx: '20%', dy: '50%', mx: '25%', my: '15%' },
    { name: 'Flask', icon: <SiFlask className="w-8 h-8 md:w-12 md:h-12" />, dx: '35%', dy: '35%', mx: '75%', my: '40%' },
    { name: 'PHP', icon: <SiPhp className="w-8 h-8 md:w-12 md:h-12" />, dx: '55%', dy: '65%', mx: '25%', my: '65%' },
    { name: 'Laravel', icon: <SiLaravel className="w-8 h-8 md:w-12 md:h-12" />, dx: '80%', dy: '45%', mx: '75%', my: '90%' },
  ];

  const dbNodes = [
    { name: 'MySQL', icon: <SiMysql className="w-8 h-8 md:w-16 md:h-16" />, dx: '35%', dy: '45%', mx: '30%', my: '30%' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 md:w-16 md:h-16" />, dx: '65%', dy: '55%', mx: '70%', my: '70%' },
  ];

  const toolsNodes = [
    { name: 'GitHub', icon: <FaGithub className="w-8 h-8 md:w-12 md:h-12" />, dx: '25%', dy: '45%', mx: '50%', my: '20%' },
    { name: 'Postman', icon: <SiPostman className="w-8 h-8 md:w-12 md:h-12" />, dx: '50%', dy: '70%', mx: '20%', my: '60%' },
    { name: 'Antigravity', icon: <FaRocket className="w-8 h-8 md:w-12 md:h-12" />, dx: '75%', dy: '35%', mx: '80%', my: '80%' },
  ];

  // Generate fixed random stars once to prevent layout shifts on re-renders
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '3px' : '1px',
      opacity: Math.random() * 0.8 + 0.2,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <div className={`relative h-[1000vh] w-full font-sans select-none bg-[#001F3D] md:cursor-none overflow-x-hidden`}>
      
      <CustomCursor />

      {/* --- BACKGROUND LAYER 1: DARK THEME --- */}
      <div className="fixed inset-0 z-0">
        <NetworkBackground isLightMode={false} />
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none transition-opacity duration-1000 ${scrollPhase === 2 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="whitespace-nowrap animate-marquee flex w-max">
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(237, 152, 95, 0.6)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(237, 152, 95, 0.6)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(237, 152, 95, 0.6)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(237, 152, 95, 0.6)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
          </div>
        </div>
      </div>

      {/* --- BACKGROUND LAYER 2: LIGHT THEME (Toggle) --- */}
      <div 
        className="fixed inset-0 bg-[#ED985F] z-10"
        style={clipPathStyle}
      >
        <NetworkBackground isLightMode={true} />
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none transition-opacity duration-1000 ${scrollPhase === 2 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="whitespace-nowrap animate-marquee flex w-max">
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(0, 31, 61, 0.4)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(0, 31, 61, 0.4)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(0, 31, 61, 0.4)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
             <span className="text-[28vw] font-medium uppercase pr-24" style={{ WebkitTextStroke: '2px rgba(0, 31, 61, 0.4)', color: 'transparent', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.02em' }}>ROSYID STANIA</span>
          </div>
        </div>
      </div>

      {/* --- BACKGROUND LAYER 3: PROJECTS CROSSFADE --- */}
      <div 
        className={`fixed inset-0 bg-[#ED985F] z-10 pointer-events-none transition-opacity duration-[1500ms] ease-in-out ${scrollPhase === 2 && !isLightMode ? 'opacity-100' : 'opacity-0'}`}
      >
      </div>

      {/* --- BACKGROUND LAYER 4: PROJECTS DARK MODE (Triggered by Node Ignition) --- */}
      <div 
        ref={projectsDarkBgRef}
        className="fixed inset-0 bg-[#001F3D] z-10 pointer-events-none transition-opacity duration-[1500ms] ease-in-out opacity-0"
      >
      </div>
      
      {/* --- SCATTERED CARDS / PORTRAIT DECK --- */}
      <div className={`fixed inset-0 flex justify-center z-20 ${scrollPhase >= 1 ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {deck.map((src, index) => {
          const isProfile = src.includes('profile');
          const isHuge = scrollPhase === 0 && isProfile;

          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const m = isMobile ? 0.5 : 1;
          const scatterPositions = [
            { x: 0, y: 0, rot: 0, scale: 1 },           
            { x: -350 * m, y: -150 * m, rot: -12, scale: 0.85 },  
            { x: 350 * m, y: 150 * m, rot: 15, scale: 0.85 },     
            { x: 250 * m, y: -250 * m, rot: 8, scale: 0.75 },     
            { x: -250 * m, y: 250 * m, rot: -8, scale: 0.75 },    
            { x: 0, y: -350 * m, rot: -5, scale: 0.7 },      
          ];
          const layout = scatterPositions[index] || { x: 0, y: 0, rot: 0, scale: 0.5 };

          return (
            <div 
              key={src}
              className={`absolute flex flex-col transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                isHuge 
                  ? 'w-[100vw] h-[85vh] bottom-0 left-1/2 -ml-[50vw]' 
                  : 'w-[320px] h-[450px] top-1/2 left-1/2 -mt-[225px] -ml-[160px]'
              }`}
              style={{
                transform: isHuge 
                  ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)' 
                  : scrollPhase === 1
                    ? `translate3d(${layout.x}px, ${layout.y}px, 0) scale(${layout.scale}) rotate(${layout.rot}deg)`
                    : scrollPhase === 2
                      ? `translate3d(${layout.x}px, -150vh, 0) scale(${layout.scale * 0.8}) rotate(${layout.rot * 1.5}deg)` // Fly UP when phase 2
                      : 'translate3d(0, 100px, 0) scale(0.5) rotate(0deg)',
                zIndex: isHuge ? 40 : 60 - index,
                opacity: (scrollPhase === 1 || isHuge) ? 1 : 0,
                cursor: scrollPhase === 1 ? 'pointer' : 'default',
                pointerEvents: (isHuge || scrollPhase === 1) ? 'auto' : 'none',
              }}
              onClick={scrollPhase === 1 ? () => handleCardClick(index) : undefined}
            >
              {/* The Morphing Card Wrapper */}
              <div 
                className={`w-full h-full relative flex flex-col transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isHuge 
                    ? 'bg-transparent p-0 rounded-none shadow-none border-transparent' 
                    : 'bg-[#F8F9FA] p-3 rounded-[2rem] shadow-2xl border border-white/80'
                } ${scrollPhase === 1 ? 'hover:scale-[1.03]' : ''}`}
              >
                
                {/* The Image Container */}
                <div 
                  className={`w-full relative overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isHuge ? 'h-full rounded-none' : 'h-[85%] rounded-2xl bg-black/5'}`}
                  style={isHuge ? {
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'
                  } : {}}
                  onMouseMove={isHuge ? (e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  } : undefined}
                  onMouseLeave={isHuge ? (e) => {
                    e.currentTarget.style.setProperty('--mouse-x', `-1000px`);
                    e.currentTarget.style.setProperty('--mouse-y', `-1000px`);
                  } : undefined}
                >
                  <img 
                    src={src} 
                    className={`w-full h-full transition-all duration-[800ms] ease-out ${isHuge ? 'object-contain object-bottom drop-shadow-2xl' : 'object-cover'}`} 
                    alt="Card" 
                    style={{ 
                      mixBlendMode: isHuge ? 'multiply' : 'normal'
                    }} 
                  />
                  {isHuge && isProfile && (
                    <img 
                      src="/profile-suit.png"
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-2xl pointer-events-none"
                      alt="Suit Reveal"
                      style={{
                        mixBlendMode: 'multiply',
                        WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 40%, transparent 100%)',
                        maskImage: 'radial-gradient(circle 250px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 40%, transparent 100%)'
                      }}
                    />
                  )}
                </div>

                {/* The Card Footer (Empty space for polaroid bottom) */}
                <div className={`w-full flex items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isHuge ? 'h-0 opacity-0 overflow-hidden' : 'h-[15%] opacity-100'}`}>
                </div>

                {/* The Floating Signature (Overlaps photo and footer) */}
                {src.includes('profile') && scrollPhase >= 1 && (
                  <span 
                    className="absolute z-10 text-5xl text-[#001F3D] animate-signature drop-shadow-sm pointer-events-none"
                    style={{ 
                      fontFamily: "'Great Vibes', cursive", 
                      transform: 'rotate(-15deg)',
                      animationDelay: '600ms',
                      bottom: '80px',
                      right: '15px', 
                      padding: '0.2em 0.5em', 
                      transformOrigin: 'bottom right'
                    }}
                  >
                    Rosyid Stania
                  </span>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* --- PROJECTS SECTION (Phase 2) --- */}
      <div 
        className={`fixed inset-0 flex items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-20`}
        style={{
          transform: scrollPhase <= 1 ? 'translate3d(0, 100vh, 0)' : scrollPhase >= 3 ? 'translate3d(0, -100vh, 0)' : 'translate3d(0,0,0)',
          opacity: scrollPhase === 2 ? 1 : 0,
          pointerEvents: scrollPhase === 2 ? 'auto' : 'none',
        }}
      >
        <div className="w-full pl-[10vw] pr-[50vw] overflow-visible">
          <div className="flex flex-row items-center gap-16 will-change-transform relative" ref={timelineRef}>
            
            {/* The Solid Center Separator Line (Background) */}
            <div 
              className="absolute left-[50vw] md:left-[45vw] lg:left-[35vw] w-[250vw] h-[3px] top-1/2 -translate-y-1/2 z-0 timeline-bg-line transition-colors duration-700"
              style={{ backgroundColor: 'var(--timeline-bg-line, rgba(0, 31, 61, 0.2))' }}
            ></div>
            
            {/* The Animated Progress Line (Foreground) */}
            <div 
              ref={progressLineRef}
              className="absolute left-[50vw] md:left-[45vw] lg:left-[35vw] h-[3px] top-1/2 z-0 origin-left will-change-transform transition-colors duration-700"
              style={{ 
                backgroundColor: 'var(--timeline-line, #001F3D)',
                transform: 'translateY(-50%)' 
              }}
            ></div>

            {/* Timeline Header */}
            <div className="flex-shrink-0 w-[50vw] md:w-[45vw] lg:w-[35vw] z-10 relative flex items-center pr-8 md:pr-16">
              <h2 
                className="text-6xl md:text-8xl font-bold tracking-widest drop-shadow-sm whitespace-nowrap transition-colors duration-700" 
                style={{ 
                  color: 'var(--timeline-text, #001F3D)',
                  fontFamily: "'Mona Sans Variable', sans-serif" 
                }}
              >
                My project
              </h2>
            </div>

            {/* Timeline Items */}
            {[
              {
                id: 1,
                title: "MyCaffee",
                subtitle: "Sistem Point-of-Sale & Manajemen Kafe",
                date: "Okt - Des 2025 • 3 bulan",
                desc: "Merancang dasbor admin interaktif menggunakan React untuk memonitor KPI bisnis. Mengimplementasikan manajemen katalog produk dan kontrol hak akses. Mengintegrasikan frontend React dengan RESTful API Laravel dan Context API.",
                tags: ["React", "Laravel", "Context API"],
                isTop: true
              },
              {
                id: 2,
                title: "Sora Finance",
                subtitle: "Fitur Prediksi Penjualan • PT SORA ABADI INSPIRA",
                date: "Mar - Mei 2026 • 3 bulan",
                desc: "Membangun Sales Forecasting Service berbasis Python (FastAPI) untuk prediksi omzet harian, mingguan, dan bulanan per toko menggunakan Random Forest Regressor. Merancang pipeline feature engineering time-series dan evaluasi model.",
                tags: ["Python", "FastAPI", "ML", "PostgreSQL"],
                isTop: false,
                image: "/sora.png"
              },
              {
                id: 3,
                title: "TixLoop",
                subtitle: "Platform Resale Tiket Event • Kompetisi OLIVIA XI",
                date: "Mei - Juni 2026 • 1 bulan",
                desc: "Membangun antarmuka marketplace resale tiket berbasis SvelteKit & TypeScript dengan dashboard multi-role (buyer, seller, admin). Mengintegrasikan sistem backend (Laravel) menggunakan Axios guna memastikan keamanan akses data pengguna.",
                tags: ["SvelteKit", "TypeScript", "Laravel"],
                isTop: true,
                image: "/tixloop.png"
              },
              {
                id: 4,
                title: "ReviU",
                subtitle: "Platform Review & Manajemen Tugas • CODE 6.0",
                date: "Juli 2026 • 1 bulan",
                desc: "Membangun antarmuka platform peer-review berbasis SvelteKit & TypeScript dengan fitur PDF viewer terintegrasi, inline comment real-time, dan dashboard analitik revisi. Mengimplementasikan kolaborasi dokumen real-time menggunakan Tiptap dan Yjs.",
                tags: ["SvelteKit", "TypeScript", "Tiptap", "Yjs"],
                isTop: false,
                image: "/reviu.png"
              }
            ].map((proj, index) => (
              <div 
                key={proj.id} 
                className="flex-shrink-0 w-[100vw] md:w-[65vw] lg:w-[45vw] h-2 flex justify-center items-center relative z-10"
              >
                {/* The Timeline Node (Dot) */}
                <div 
                  ref={el => nodesRef.current[index] = el}
                  className="w-8 h-8 bg-[#001F3D] rounded-full z-20 shadow-md transition-all duration-300 ease-out will-change-transform flex items-center justify-center"
                >
                   <div className="w-2 h-2 rounded-full transition-colors duration-700" style={{ backgroundColor: 'var(--timeline-text, #001F3D)' }}></div>
                </div>

                {/* Vertical Stem connecting node to content */}
                <div 
                   className="absolute w-[1px] transition-colors duration-700 z-10"
                   style={{
                      backgroundColor: 'var(--timeline-line, #001F3D)',
                      height: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: proj.isTop ? 'auto' : '50%',
                      bottom: proj.isTop ? '50%' : 'auto',
                      opacity: 0.5
                   }}
                ></div>

                {/* The Floating Content (Blueprint Style) */}
                <div 
                  className="absolute w-[90vw] md:max-w-md lg:max-w-lg xl:max-w-xl group cursor-pointer z-10 flex px-2 md:px-8"
                  style={{
                    flexDirection: 'column-reverse',
                    bottom: proj.isTop ? 'calc(50% + 20px)' : 'auto',
                    top: proj.isTop ? 'auto' : 'calc(50% + 20px)',
                    gap: '0.75rem',
                  }}
                >
                  {/* Text Cluster with Left Border Ruler */}
                  <div 
                    className="flex flex-col gap-1 md:gap-1.5 border-l-[2px] pl-4 md:pl-6 transition-colors duration-700"
                    style={{ borderColor: 'var(--timeline-sub, rgba(255,255,255,0.2))' }}
                  >
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-1 gap-1 xl:gap-0">
                      <h3 
                        className="text-2xl md:text-4xl font-bold transition-colors duration-700 drop-shadow-sm tracking-tight leading-none" 
                        style={{ 
                          color: 'var(--timeline-text, #001F3D)',
                          fontFamily: "'Mona Sans Variable', sans-serif" 
                        }}
                      >
                        {proj.title}
                      </h3>
                      <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase transition-colors duration-700" style={{ color: 'var(--timeline-sub, rgba(255,255,255,0.5))' }}>
                         {proj.date}
                      </span>
                    </div>
                    
                    <p className="text-[9px] md:text-xs font-semibold tracking-widest uppercase transition-colors duration-700" style={{ color: 'var(--timeline-text, #001F3D)' }}>
                      {proj.subtitle}
                    </p>

                    <p className="text-[10px] md:text-sm leading-relaxed font-medium line-clamp-2 md:line-clamp-3 transition-colors duration-700 mt-1 mb-1" style={{ color: 'var(--timeline-desc, rgba(255,255,255,0.8))' }}>
                      {proj.desc}
                    </p>

                    {/* Tech Stack Floating */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {proj.tags.map(tag => {
                        let icon;
                        switch(tag) {
                          case 'SvelteKit': icon = <SiSvelte size={12} color="#FF3E00" />; break;
                          case 'TypeScript': icon = <SiTypescript size={12} color="#3178C6" />; break;
                          case 'Laravel': icon = <SiLaravel size={12} color="#FF2D20" />; break;
                          case 'Python': icon = <SiPython size={12} color="#3776AB" />; break;
                          case 'FastAPI': icon = <SiFastapi size={12} color="#009688" />; break;
                          case 'PostgreSQL': icon = <SiPostgresql size={12} color="#4169E1" />; break;
                          case 'React': icon = <SiReact size={12} color="#61DAFB" />; break;
                          case 'Tiptap': icon = <FaPen size={10} color="currentColor" />; break;
                          case 'Yjs': icon = <FaSync size={10} color="#FF8C00" />; break;
                          case 'ML': icon = <FaBrain size={10} color="#FFB6C1" />; break;
                          case 'Context API': icon = <FaProjectDiagram size={10} color="#61DAFB" />; break;
                          default: icon = <span className="text-[9px]">{tag}</span>;
                        }
                        return (
                          <div 
                            key={tag} 
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-current shadow-sm hover:scale-110 transition-transform cursor-help"
                            style={{ color: 'var(--timeline-text, #001F3D)' }}
                            title={tag}
                          >
                            {icon}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Blueprint Wireframe / Image Frame */}
                  <div 
                    className={`w-full overflow-hidden relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-lg 
                      h-20 md:h-28 group-hover:h-48 md:group-hover:h-64 lg:group-hover:h-72
                      ${proj.image ? 'border border-solid shadow-lg' : 'border-2 border-dashed bg-black/5'} 
                      group-hover:bg-[var(--timeline-line)] group-hover:border-solid group-hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]`}
                    style={{ borderColor: 'var(--timeline-sub)' }}
                  >
                     {proj.image ? (
                        <>
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-100 transition-opacity duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                        </>
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase opacity-40 transition-opacity group-hover:opacity-0" style={{ color: 'var(--timeline-text)' }}>
                              Image Placeholder
                           </span>
                        </div>
                     )}
                  </div>
                </div>
              </div>
            ))}

            {/* Timeline End */}
            <div className="flex-shrink-0 w-[20vw] flex justify-center items-center">
              <div 
                ref={el => {
                  if (nodesRef.current) {
                    nodesRef.current[4] = el;
                  }
                }}
                className="w-4 h-4 rounded-full transition-all duration-300 ease-out will-change-transform"
                style={{ backgroundColor: 'var(--timeline-line, #001F3D)' }}
              ></div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SKILLS SECTION & EARTH FOOTER (Phase 3 & 4) --- */}
      <div 
        className={`fixed inset-0 flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-20`}
        style={{
          transform: scrollPhase < 3 ? 'translate3d(0, 100vh, 0)' : 'translate3d(0, 0, 0)',
          opacity: scrollPhase === 3 ? 1 : 0,
          pointerEvents: scrollPhase === 3 ? 'auto' : 'none',
        }}
      >
        {/* The Mega Constellation Canvas */}
        <div 
          ref={constellationCanvasRef}
          className="absolute inset-0 w-[200vw] h-[300vh] will-change-transform pointer-events-none"
        >
          {/* Deep Space Background Stars */}
          <div className="absolute inset-0 z-0">
            {backgroundStars.map((star, i) => (
              <div 
                key={i} 
                className="absolute rounded-full transition-opacity duration-1000"
                style={{
                  width: star.size,
                  height: star.size,
                  backgroundColor: isLightMode ? '#001F3D' : '#ED985F',
                  left: star.left,
                  top: star.top,
                  opacity: isLightMode ? star.opacity * 0.5 : star.opacity,
                  boxShadow: '0 0 2px currentColor'
                }}
              />
            ))}
          </div>

          {/* Transition Comet Lines (Desktop) */}
          <svg className="absolute top-0 left-0 w-full h-[200vh] hidden md:block z-0 pointer-events-none">
             {/* 1. Frontend -> Backend */}
             <line x1="45%" y1="22.5%" x2="60%" y2="25%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="45%" y1="22.5%" x2="60%" y2="25%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }} />

             {/* 2. Backend -> Database */}
             <line x1="90%" y1="22.5%" x2="67.5%" y2="72.5%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="90%" y1="22.5%" x2="67.5%" y2="72.5%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)', animationDelay: '1.5s' }} />

             {/* 3. Database -> Tools */}
             <line x1="82.5%" y1="77.5%" x2="12.5%" y2="72.5%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="82.5%" y1="77.5%" x2="12.5%" y2="72.5%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)', animationDelay: '3s' }} />
          </svg>

          {/* Transition Comet Lines (Mobile) */}
          <svg className="absolute top-0 left-0 w-full h-[200vh] block md:hidden z-0 pointer-events-none">
             {/* 1. Frontend -> Backend */}
             <line x1="32.5%" y1="45%" x2="62.5%" y2="7.5%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="32.5%" y1="45%" x2="62.5%" y2="7.5%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }} />

             {/* 2. Backend -> Database */}
             <line x1="87.5%" y1="20%" x2="65%" y2="65%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="87.5%" y1="20%" x2="65%" y2="65%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)', animationDelay: '1.5s' }} />

             {/* 3. Database -> Tools */}
             <line x1="85%" y1="85%" x2="25%" y2="60%" stroke={isLightMode ? 'rgba(0,31,61,0.05)' : 'rgba(237,152,95,0.05)'} strokeWidth="1" />
             <line x1="85%" y1="85%" x2="25%" y2="60%" stroke={isLightMode ? '#00509E' : '#FFD700'} strokeWidth="1.5" className="animate-comet" style={{ filter: 'drop-shadow(0 0 5px currentColor)', animationDelay: '3s' }} />
          </svg>

          {/* Quadrant 1: Frontend (0, 0) */}
          <div className="absolute top-0 left-0 w-screen h-screen pointer-events-auto">
            <ConstellationQuadrant 
              title="Frontend Stack" 
              nodes={frontendNodes} 
              isLightMode={isLightMode}
              lines={{
                desktop: [
                  { x1: '15%', y1: '60%', x2: '30%', y2: '35%' },
                  { x1: '30%', y1: '35%', x2: '50%', y2: '55%' },
                  { x1: '50%', y1: '55%', x2: '65%', y2: '30%' },
                  { x1: '50%', y1: '55%', x2: '80%', y2: '70%' },
                  { x1: '65%', y1: '30%', x2: '90%', y2: '45%' },
                  { x1: '80%', y1: '70%', x2: '90%', y2: '45%' }
                ],
                mobile: [
                  { x1: '25%', y1: '15%', x2: '75%', y2: '25%' },
                  { x1: '75%', y1: '25%', x2: '35%', y2: '45%' },
                  { x1: '35%', y1: '45%', x2: '80%', y2: '60%' },
                  { x1: '35%', y1: '45%', x2: '25%', y2: '75%' },
                  { x1: '80%', y1: '60%', x2: '65%', y2: '90%' },
                  { x1: '25%', y1: '75%', x2: '65%', y2: '90%' }
                ]
              }}
            />
          </div>

          {/* Quadrant 2: Backend (100vw, 0) */}
          <div className="absolute top-0 left-[100vw] w-screen h-screen pointer-events-auto">
            <ConstellationQuadrant 
              title="Backend Stack" 
              nodes={backendNodes} 
              isLightMode={isLightMode}
              lines={{
                desktop: [
                  { x1: '20%', y1: '50%', x2: '35%', y2: '35%' },
                  { x1: '20%', y1: '50%', x2: '55%', y2: '65%' },
                  { x1: '55%', y1: '65%', x2: '80%', y2: '45%' }
                ],
                mobile: [
                  { x1: '25%', y1: '15%', x2: '75%', y2: '40%' },
                  { x1: '25%', y1: '15%', x2: '25%', y2: '65%' },
                  { x1: '25%', y1: '65%', x2: '75%', y2: '90%' }
                ]
              }}
            />
          </div>

          {/* Quadrant 3: Database (100vw, 100vh) */}
          <div className="absolute top-[100vh] left-[100vw] w-screen h-screen pointer-events-auto">
            <ConstellationQuadrant 
              title="Database" 
              nodes={dbNodes} 
              isLightMode={isLightMode}
              lines={{
                desktop: [
                  { x1: '35%', y1: '45%', x2: '65%', y2: '55%' }
                ],
                mobile: [
                  { x1: '30%', y1: '30%', x2: '70%', y2: '70%' }
                ]
              }}
            />
          </div>

          {/* Quadrant 4: Tools (0, 100vh) */}
          <div className="absolute top-[100vh] left-0 w-screen h-screen pointer-events-auto">
            <ConstellationQuadrant 
              title="Tools & Ecosystem" 
              nodes={toolsNodes} 
              isLightMode={isLightMode}
              lines={{
                desktop: [
                  { x1: '25%', y1: '45%', x2: '50%', y2: '70%' },
                  { x1: '50%', y1: '70%', x2: '75%', y2: '35%' }
                ],
                mobile: [
                  { x1: '50%', y1: '20%', x2: '20%', y2: '60%' },
                  { x1: '20%', y1: '60%', x2: '80%', y2: '80%' }
                ]
              }}
            />
          </div>

          {/* --- PHASE 4: RETURN TO EARTH --- */}
          <div className="absolute top-[200vh] left-0 w-screen h-screen pointer-events-auto flex flex-col justify-end overflow-hidden">
            {/* The Sky Gradient transition from Space to Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A192F] z-0 opacity-80"></div>

            {/* Massive glowing moon/planet setting */}
            <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#ED985F] blur-[2px] opacity-20 z-0"></div>
            <div className="absolute bottom-[22vh] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-[#ED985F] to-[#FBE0C9] shadow-[0_0_100px_#ED985F] z-10"></div>

            {/* Mountains Background */}
            <svg className="absolute bottom-[10vh] w-full h-[40vh] z-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
              <path fill={isLightMode ? '#003366' : '#0B203B'} d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>

            {/* Mountains Foreground */}
            <svg className="absolute bottom-[10vh] w-full h-[30vh] z-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
              <path fill={isLightMode ? '#001F3D' : '#061325'} d="M0,192L48,208C96,224,192,256,288,256C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>

            {/* Ground / City Base */}
            <div className="relative w-full h-[15vh] z-30 flex items-center justify-center" style={{ backgroundColor: isLightMode ? '#001529' : '#020C17' }}>
              
              {/* Abstract Buildings (Cityscape) */}
              <div className="absolute bottom-full left-[10%] w-12 h-32 border-t border-r border-[#ED985F]/30 opacity-80" style={{ backgroundColor: isLightMode ? '#003366' : '#0B203B' }}></div>
              <div className="absolute bottom-full left-[14%] w-16 h-48 border-t border-r border-[#ED985F]/20" style={{ backgroundColor: isLightMode ? '#001F3D' : '#061325' }}></div>
              <div className="absolute bottom-full left-[18%] w-10 h-24 border-t border-r border-[#ED985F]/40 opacity-90" style={{ backgroundColor: isLightMode ? '#003366' : '#0B203B' }}></div>

              <div className="absolute bottom-full right-[15%] w-20 h-56 border-t border-l border-[#ED985F]/20" style={{ backgroundColor: isLightMode ? '#001F3D' : '#061325' }}></div>
              <div className="absolute bottom-full right-[10%] w-14 h-32 border-t border-l border-[#ED985F]/30 opacity-80" style={{ backgroundColor: isLightMode ? '#003366' : '#0B203B' }}></div>
              
              {/* Abstract Pine Trees (Forest) */}
              <svg className="absolute bottom-full left-[35%] w-8 h-16 opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polygon points="50,0 100,100 0,100" fill={isLightMode ? '#003366' : '#0B203B'} />
              </svg>
              <svg className="absolute bottom-full left-[37%] w-12 h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polygon points="50,0 100,100 0,100" fill={isLightMode ? '#001F3D' : '#061325'} />
              </svg>
              <svg className="absolute bottom-full left-[39%] w-6 h-12 opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polygon points="50,0 100,100 0,100" fill={isLightMode ? '#003366' : '#0B203B'} />
              </svg>

              <svg className="absolute bottom-full right-[30%] w-10 h-20 opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polygon points="50,0 100,100 0,100" fill={isLightMode ? '#003366' : '#0B203B'} />
              </svg>
              
              {/* Touchdown Text */}
              <div className="text-center w-full relative z-40">
                <h2 className="text-xl md:text-3xl font-black tracking-[0.3em] uppercase mb-2" style={{ color: '#ED985F' }}>
                  Touchdown
                </h2>
                <p className="text-xs md:text-sm font-mono opacity-80" style={{ color: isLightMode ? '#003366' : '#FBE0C9' }}>
                  Mission Complete. Ready for new projects.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* --- NAVBAR LAYER 1: DARK THEME --- */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <Navbar theme="dark" isLightMode={isLightMode} onToggle={handleToggle} />
      </div>

      {/* --- NAVBAR LAYER 2: LIGHT THEME --- */}
      <div className="fixed inset-0 z-40 pointer-events-none" style={clipPathStyle}>
        <Navbar theme="light" isLightMode={isLightMode} onToggle={handleToggle} />
      </div>
      
    </div>
  );
}
