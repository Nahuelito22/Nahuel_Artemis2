import HeroSection from '../components/HeroSection';
import LaunchCountdown from '../components/LaunchCountdown';
import { mission } from '../data/missionData';

const Home = () => {
  return (
    <div>
      <HeroSection />
      
      {/* Launch Countdown Section */}
      <LaunchCountdown />
      
      {/* Intro Section */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-space-blue/10 text-space-blue text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-space-blue/20">
          Introducción a la Misión
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight">
          El Siguiente Gran Salto de la <span className="text-space-blue">Humanidad</span>
        </h2>
        <p className="text-xl md:text-2xl text-space-gray/70 leading-relaxed font-light">
          {mission.objective} Esta misión de 10 días pondrá a prueba los sistemas de soporte vital de la nave Orion, 
          allanando el camino para futuras misiones a la superficie lunar y, eventualmente, a Marte.
        </p>
        
        {/* Abstract metrics decoration */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">{mission.duration}</span>
            <span className="text-[10px] text-space-blue/50 uppercase tracking-widest">Duración</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">4</span>
            <span className="text-[10px] text-space-blue/50 uppercase tracking-widest">Astronautas</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">SLS</span>
            <span className="text-[10px] text-space-blue/50 uppercase tracking-widest">Cohete</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">Lunar</span>
            <span className="text-[10px] text-space-blue/50 uppercase tracking-widest">Destino</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
