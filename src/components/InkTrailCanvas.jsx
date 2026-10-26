import React, { useEffect, useRef } from 'react';

/**
 * InkTrailCanvas - Tactile Fountain Pen Ink Trail & Splatter Canvas
 * Produces organic, fading ink calligraphy lines and damp paper blotting ripples on interaction.
 */
export default function InkTrailCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const points = [];
    const ripples = [];
    let lastX = 0;
    let lastY = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const speed = Math.hypot(x - lastX, y - lastY);
      const radius = Math.max(1, Math.min(3.5, 4 - speed * 0.05));

      points.push({
        x,
        y,
        radius,
        alpha: 0.15,
        decay: 0.008,
      });

      lastX = x;
      lastY = y;
    };

    const handleClick = (e) => {
      // Spawn tactile ink paper ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 28,
        alpha: 0.22,
        decay: 0.012,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update ink points
      for (let i = points.length - 1; i >= 0; i--) {
        const pt = points[i];
        pt.alpha -= pt.decay;

        if (pt.alpha <= 0) {
          points.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(32, 28, 24, ${pt.alpha})`;
        ctx.fill();

        // Connect with previous point for smooth cursive stroke
        if (i > 0) {
          const prevPt = points[i - 1];
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = `rgba(32, 28, 24, ${pt.alpha * 0.7})`;
          ctx.lineWidth = pt.radius * 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // Render ink ripples
      for (let j = ripples.length - 1; j >= 0; j--) {
        const rip = ripples[j];
        rip.radius += (rip.maxRadius - rip.radius) * 0.08;
        rip.alpha -= rip.decay;

        if (rip.alpha <= 0) {
          ripples.splice(j, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 122, 56, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 w-full h-full"
    />
  );
}
