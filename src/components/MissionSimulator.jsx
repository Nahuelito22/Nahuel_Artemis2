import { useEffect, useRef, useState } from 'react';

const MissionSimulator = () => {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Ref to track progress and animation state without re-renders
  const stateRef = useRef({
    progress: 0,
    startTime: Date.now()
  });

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = Math.max(parent.clientWidth * 0.5, 400); // 18:9 or min height
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawEarth = (x, y, radius) => {
      // Glow atmosphere
      const glow = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 1.5);
      glow.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
      glow.addColorStop(1, 'rgba(0, 212, 255, 0)');
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Earth body
      const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
      gradient.addColorStop(0, '#00D4FF');
      gradient.addColorStop(0.5, '#0055FF');
      gradient.addColorStop(1, '#0B0D17');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle label
      ctx.font = 'bold 10px Inter';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('TIERRA', x, y + radius + 20);
    };

    const drawMoon = (x, y, radius) => {
      // Moon glow
      const glow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      const gradient = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius);
      gradient.addColorStop(0, '#D1D5DB');
      gradient.addColorStop(1, '#4B5563');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.font = 'bold 10px Inter';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('LUNA', x, y + radius + 20);
    };

    const drawTrajectory = (startX, startY, endX, endY) => {
      ctx.beginPath();
      ctx.setLineDash([5, 10]);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 1.5;

      // Figure-8 Path using Bezier Curves
      ctx.moveTo(startX, startY);
      
      // Upper curve towards Moon
      ctx.bezierCurveTo(
        startX + (endX - startX) * 0.4, startY - 200, // cp1
        endX - 100, endY - 150, // cp2
        endX, endY - 40 // target (top of Moon)
      );

      // Loop around Moon
      ctx.arc(endX, endY, 40, -Math.PI/2, Math.PI/2, false);

      // Return curve below Moon
      ctx.bezierCurveTo(
        endX - 100, endY + 150, // cp1
        startX + (endX - startX) * 0.4, startY + 200, // cp2
        startX, startY // back to Earth
      );

      ctx.stroke();
      ctx.setLineDash([]); // Reset
    };

    const animate = () => {
      if (!isPaused) {
        ctx.fillStyle = '#0B0D17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dist = canvas.width * 0.35; // Distance between bodies

        // Positions
        const earthPos = { x: centerX - dist, y: centerY };
        const moonPos = { x: centerX + dist, y: centerY };

        // Draw static elements
        drawEarth(earthPos.x, earthPos.y, 40);
        drawMoon(moonPos.x, moonPos.y, 15);
        drawTrajectory(earthPos.x, earthPos.y, moonPos.x, moonPos.y);

        // Movement logic
        stateRef.current.progress = (stateRef.current.progress + (0.0005 * speed)) % 1;
        
        // Data overlay HUD
        ctx.textAlign = 'left';
        ctx.font = '10px Courier New';
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        ctx.fillText(`VEL_VECT: ${Math.round(28000 + (Math.sin(stateRef.current.progress * Math.PI) * 12000))} KM/H`, 40, 50);
        ctx.fillText(`DIST_EARTH: ${Math.round(stateRef.current.progress * 384400)} KM`, 40, 70);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, isPaused]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
          Dinámica de <span className="text-space-blue">Misión</span>
        </h2>
        <p className="text-space-gray/50 text-[10px] uppercase tracking-[0.4em]">Simulación de Trayectoria Orbital y Telemetría</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-space-blue/10 blur opacity-20" />
        
        <div className="relative glass border border-white/10 rounded-[2.5rem] overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl">
          <canvas 
            ref={canvasRef} 
            className="w-full h-auto block"
          />

          {/* Controls UI Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-6 pointer-events-none">
             <div className="glass px-6 py-3 rounded-2xl border border-white/5 pointer-events-auto flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[9px] text-space-blue font-black uppercase tracking-widest mb-2">Warp Speed</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.5" 
                    value={speed} 
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="accent-space-blue w-32 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="w-px h-8 bg-white/10" />
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-white hover:text-space-blue transition-colors group/btn"
                >
                  {isPaused ? 
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">Play <div className="w-2 h-2 rounded-full bg-space-blue animate-pulse"/></span> : 
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Pause</span>
                  }
                </button>
             </div>

             <div className="hidden md:flex flex-col items-end opacity-40">
                <span className="text-[9px] font-mono text-white/50 mb-1 tracking-widest">REALTIME_SIMULATION_V1.0</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-space-blue/50" />)}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSimulator;
