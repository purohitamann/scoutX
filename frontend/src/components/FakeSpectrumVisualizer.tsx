'use client';

import { useEffect, useRef } from 'react';

export default function FakeSpectrumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Make canvas fill the container
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize and event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numBars = 128; // More bars for a fuller effect
    const barWidth = canvas.width / numBars;
    const spacing = 2;
    const cornerRadius = 3; // Smaller radius for more bars

    // Create a gradient of blue hues for ScoutX branding
    const colors = [
      'rgba(59, 130, 246, 0.7)', // blue-500
      'rgba(37, 99, 235, 0.7)',  // blue-600
      'rgba(29, 78, 216, 0.7)',  // blue-700
      'rgba(30, 64, 175, 0.7)',  // blue-800
      'rgba(17, 24, 39, 0.8)',   // gray-900 (darker)
    ];

    let spectrum = new Array(numBars).fill(0);
    let target = new Array(numBars).fill(0);

    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      fillStyle: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate dynamic heights based on canvas size
      const maxHeight = canvas.height * 0.8;
      const blockHeight = maxHeight / 20;

      for (let i = 0; i < numBars; i++) {
        // Smoothly interpolate toward target
        spectrum[i] += (target[i] - spectrum[i]) * 0.05;
        
        // Calculate height for this bar (percentage of max height)
        const barHeight = (spectrum[i] / 100) * maxHeight;
        
        if (barHeight > 0) {
          const x = i * barWidth + spacing;
          const y = canvas.height - barHeight;
          const color = colors[i % colors.length];
          
          // Draw single bar instead of blocks for a cleaner look
          drawRoundedRect(
            ctx, 
            x, 
            y, 
            barWidth - spacing * 2, 
            barHeight - spacing, 
            cornerRadius, 
            color
          );
        }
      }

      requestAnimationFrame(draw);
    };

    const generateNewTargets = () => {
      // Create wave-like patterns
      for (let i = 0; i < numBars; i++) {
        // Base amplitude varies slightly
        const baseAmplitude = 40 + Math.random() * 40;
        
        // Create wave pattern with some randomness
        const wave1 = Math.sin(i / (numBars / 8)) * 20;
        const wave2 = Math.cos(i / (numBars / 12)) * 15;
        const randomness = Math.random() * 25;
        
        target[i] = Math.max(0, Math.min(100, baseAmplitude + wave1 + wave2 + randomness));
      }
    };

    draw();
    generateNewTargets(); // Initial generation
    
    const targetInterval = setInterval(generateNewTargets, 2000);

    return () => {
      clearInterval(targetInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900"
    />
  );
}
