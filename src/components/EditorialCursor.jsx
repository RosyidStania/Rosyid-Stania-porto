import React, { useEffect, useRef, useState } from 'react';

export default function EditorialCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.cursor-pointer') ||
        e.target.closest('label')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    let animId;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        const scale = isHovering ? 1.4 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isHovering]);

  return (
    <>
      {/* Outer Smooth Drafting Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#2D2A26]/30 pointer-events-none z-[9999] hidden md:block transition-all duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Center Fine Ink Point */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#1C1A18] pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
