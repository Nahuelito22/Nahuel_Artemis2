const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-space-dark">
      {/* Star Field Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `
            radial-gradient(1px 1px at 10% 20%, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 20% 40%, #ffffff, transparent),
            radial-gradient(1px 1px at 30% 60%, #ffffff, transparent),
            radial-gradient(2px 2px at 40% 10%, #ffffff, transparent),
            radial-gradient(1px 1px at 50% 80%, #ffffff, transparent),
            radial-gradient(2px 2px at 60% 30%, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 70% 50%, #ffffff, transparent),
            radial-gradient(1px 1px at 80% 90%, #ffffff, transparent),
            radial-gradient(2px 2px at 90% 20%, #ffffff, transparent),
            radial-gradient(25% 25% at 25% 75%, #ffffff, transparent)
          `,
          backgroundSize: '250px 250px'
        }}
      />

      {/* Blue Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-space-blue/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-9xl font-black tracking-[0.2em] text-white uppercase leading-none">
            Artemis <span className="text-space-blue drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">II</span>
          </h1>
          <p className="text-sm md:text-xl text-space-gray tracking-[0.4em] uppercase opacity-80">
            El regreso de la humanidad a la Luna
          </p>
        </div>
        
        <div className="mt-16">
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-transparent border border-space-blue/30 hover:border-space-blue overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-[0.3em] text-xs">Explorar la Misión</span>
            <div className="absolute inset-0 bg-space-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Decoration / Scroll Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.5em] text-space-blue/50 rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-space-blue via-space-blue/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
