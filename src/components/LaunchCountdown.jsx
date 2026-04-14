import { useState, useEffect } from 'react';

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date('2025-09-01T00:00:00').getTime();

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Glow background */}
        <div className="absolute inset-0 bg-space-blue/20 blur-xl group-hover:bg-space-blue/30 transition-all duration-500 rounded-full" />
        
        {/* Digital display box */}
        <div className="relative w-20 md:w-32 h-24 md:h-36 glass border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden">
          <span className="text-4xl md:text-7xl font-black text-white tracking-widest leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {value.toString().padStart(2, '0')}
          </span>
          
          {/* Scanning line effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-space-blue/40 animate-[scan_3s_linear_infinite]" />
        </div>
      </div>
      <span className="mt-4 text-[10px] md:text-xs font-bold text-space-blue uppercase tracking-[0.4em] opacity-80">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-12 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 md:gap-10">
          <TimeUnit value={timeLeft.days} label="Días" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <div className="text-white/20 text-4xl mb-8 hidden md:block">:</div>
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
        
        <div className="mt-12 text-center">
          <span className="text-[10px] text-space-gray/40 uppercase tracking-[0.6em] animate-pulse">
            System Status: Counting down to launch
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
};

export default LaunchCountdown;
