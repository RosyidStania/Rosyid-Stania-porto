import React, { useRef, useState, useCallback } from 'react';

/**
 * Tilt3D - High-performance physical 3D perspective tilt wrapper
 * Gives cards authentic tangible depth, dynamic specular glare, and Z-axis layering.
 */
export default function Tilt3D({
  children,
  className = '',
  maxTilt = 14,
  perspective = 1000,
  scale = 1.02,
  glare = true
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize to -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    setTransformStyle(
      `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      setGlareStyle({
        opacity: 0.18,
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100
      });
    }
  }, [maxTilt, perspective, scale, glare]);

  const handleMouseLeave = () => {
    setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlareStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform transition-transform duration-200 ease-out select-none ${className}`}
      style={{
        transform: transformStyle || `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Child Elements */}
      <div className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Dynamic Specular Paper Glare */}
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-50 overflow-hidden"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`
          }}
        />
      )}
    </div>
  );
}
