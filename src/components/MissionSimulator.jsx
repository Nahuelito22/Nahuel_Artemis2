import { useEffect, useRef, useState } from 'react';

const MissionSimulator = () => {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust Canvas to match its parent container's width
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientWidth * 0.6; // 16:9 approach roughly
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation Loop Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let progress = 0;

    const animate = (time) => {
      if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Placeholder for future Tareas: Draw background, bodies, and path
        ctx.fillStyle = '#0B0D17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Basic movement logic placeholder
        progress = (progress + (0.001 * speed)) % 1;

        // Visual test: Just a moving indicator for now
        ctx.fillStyle = '#00D4FF';
        ctx.beginPath();
        ctx.arc(canvas.width * progress, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '10px Courier New';
        ctx.fillStyle = 'rgba(211, 211, 211, 0.4)';
        ctx.fillText(`ENGINE_IDLE | PROC: ${Math.round(progress * 100)}%`, 20, canvas.height - 20);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, isPaused, zoom]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
          Simulador de <span className="text-space-blue">Trayectoria</span>
        </h2>
        <p className="text-space-gray/50 text-xs uppercase tracking-[0.3em]">Artemis II Flight Dynamics</p>
      </div>

      <div className="relative group">
        {/* Decorative Frame */}
        <div className="absolute -inset-1 bg-gradient-to-r from-space-blue/20 to-transparent blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        {/* Canvas Container */}
        <div className="relative glass border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl bg-black">
          <canvas 
            ref={canvasRef} 
            className="w-full h-auto block"
            style={{ cursor: 'crosshair' }}
          />

          {/* Controls Overlay - To be populated in Tarea 17 */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
             <div className="glass px-4 py-2 rounded-xl border border-white/5 pointer-events-auto">
                <span className="text-[10px] text-space-blue font-bold uppercase tracking-widest mr-4">Simulation Speed</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="5" 
                  step="0.1" 
                  value={speed} 
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="accent-space-blue w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
             </div>

             <div className="flex gap-4 pointer-events-auto">
               <button 
                onClick={() => setIsPaused(!isPaused)}
                className="glass px-6 py-2 rounded-xl border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest hover:bg-space-blue/10 transition-colors"
               >
                 {isPaused ? 'Resume' : 'Pause'}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSimulator;
