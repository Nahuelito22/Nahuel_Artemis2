import { useEffect, useRef, useState } from 'react';

// Utility to calculate point on Cubic Bezier curve
const getBezierPoint = (t, p0, p1, p2, p3) => {
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;

  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  const x = (ax * Math.pow(t, 3)) + (bx * Math.pow(t, 2)) + (cx * t) + p0.x;
  const y = (ay * Math.pow(t, 3)) + (by * Math.pow(t, 2)) + (cy * t) + p0.y;

  return { x, y };
};

const MissionSimulator = () => {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(2);
  const [zoom, setZoom] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  const stateRef = useRef({
    progress: 0,
    startTime: Date.now()
  });

  const requestRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = Math.max(parent.clientWidth * 0.5, 400);
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
      const glow = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 1.5);
      glow.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
      glow.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2); ctx.fill();

      const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
      gradient.addColorStop(0, '#00D4FF'); gradient.addColorStop(0.5, '#0055FF'); gradient.addColorStop(1, '#0B0D17');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    };

    const drawMoon = (x, y, radius) => {
      const glow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, radius * 2, 0, Math.PI * 2); ctx.fill();

      const gradient = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius);
      gradient.addColorStop(0, '#D1D5DB'); gradient.addColorStop(1, '#4B5563');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    };

    const getShipPosition = (p, startX, startY, endX, endY) => {
      // Path parameters
      const moonArcRadius = 40;
      
      if (p < 0.4) {
        // Segment 1: Earth to Moon Top
        const t = p / 0.4;
        return getBezierPoint(t, 
          {x: startX, y: startY}, 
          {x: startX + (endX-startX)*0.4, y: startY - 200}, 
          {x: endX - 100, y: endY - 150}, 
          {x: endX, y: endY - moonArcRadius}
        );
      } else if (p < 0.6) {
        // Segment 2: Moon Arc
        const t = (p - 0.4) / 0.2;
        const angle = -Math.PI/2 + (t * Math.PI);
        return {
          x: endX + Math.cos(angle) * moonArcRadius,
          y: endY + Math.sin(angle) * moonArcRadius
        };
      } else {
        // Segment 3: Moon Bottom to Earth
        const t = (p - 0.6) / 0.4;
        return getBezierPoint(t,
          {x: endX, y: endY + moonArcRadius},
          {x: endX - 100, y: endY + 150},
          {x: startX + (endX-startX)*0.4, y: startY + 200},
          {x: startX, y: startY}
        );
      }
    };

    const drawShip = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Fire plume
      const fire = ctx.createRadialGradient(0, 5, 0, 0, 5, 10);
      fire.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
      fire.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = fire;
      ctx.beginPath(); ctx.moveTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(0, 12); ctx.fill();

      // Capsule body
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(4, 2);
      ctx.lineTo(-4, 2);
      ctx.closePath();
      ctx.fill();
      
      // Window
      ctx.fillStyle = '#0B0D17';
      ctx.beginPath(); ctx.arc(0, -1, 1.5, 0, Math.PI * 2); ctx.fill();
      
      // Ship Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00D4FF';
      ctx.strokeStyle = '#00D4FF';
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      if (!isPaused) {
        ctx.fillStyle = '#0B0D17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dist = canvas.width * 0.35;
        const earthPos = { x: centerX - dist, y: centerY };
        const moonPos = { x: centerX + dist, y: centerY };

        // Apply Zoom and Translate to center
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(zoom, zoom);
        ctx.translate(-centerX, -centerY);

        // Draw Cuerpos Celestes
        drawEarth(earthPos.x, earthPos.y, 40);
        drawMoon(moonPos.x, moonPos.y, 15);

        // Draw Path (Trajectory)
        ctx.beginPath();
        ctx.setLineDash([5, 10]);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;
        // Simple visualization of path
        for(let i=0; i<=1; i+=0.01) {
          const pt = getShipPosition(i, earthPos.x, earthPos.y, moonPos.x, moonPos.y);
          if(i===0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animate Orion
        stateRef.current.progress = (stateRef.current.progress + (0.0003 * speed)) % 1;
        const curr = getShipPosition(stateRef.current.progress, earthPos.x, earthPos.y, moonPos.x, moonPos.y);
        const next = getShipPosition((stateRef.current.progress + 0.005) % 1, earthPos.x, earthPos.y, moonPos.x, moonPos.y);
        const angle = Math.atan2(next.y - curr.y, next.x - curr.x) + Math.PI/2;
        
        drawShip(curr.x, curr.y, angle);

        ctx.restore();

        // Telemetry HUD
        ctx.font = '10px Courier New';
        ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
        ctx.fillText(`STATUS: OBT_NOMINAL`, 40, canvas.height - 60);
        ctx.fillText(`LUNAR_ALT: ${Math.round(Math.abs(curr.x - moonPos.x))} KM`, 40, canvas.height - 40);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, isPaused, zoom]);

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
          <canvas ref={canvasRef} className="w-full h-auto block" />

          {/* Controls UI Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-6 pointer-events-none">
             <div className="glass px-6 py-3 rounded-2xl border border-white/5 pointer-events-auto flex flex-wrap items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[9px] text-space-blue font-black uppercase tracking-widest mb-2">Simulation Speed</span>
                  <input 
                    type="range" min="1" max="15" step="1" 
                    value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="accent-space-blue w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[9px] text-space-blue font-black uppercase tracking-widest mb-2">Visual Zoom</span>
                  <input 
                    type="range" min="0.5" max="3" step="0.1" 
                    value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="accent-space-blue w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-white hover:text-space-blue transition-colors px-4 py-2 bg-white/5 rounded-xl border border-white/5"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {isPaused ? 'Resume' : 'Pause'}
                  </span>
                </button>
             </div>

             <div className="hidden lg:flex flex-col items-end opacity-25 font-mono text-[9px] text-white">
                <span>SYSTEM_CHECK: OK</span>
                <span>TRAJECTORY_LOCKED: TRUE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSimulator;
