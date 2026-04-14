import useScrollReveal from '../hooks/useScrollReveal';

const CrewCard = ({ name, role, bio, image }) => {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className="group relative flex flex-col md:flex-row bg-white/[0.03] backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-3xl transition-all duration-500 hover:border-space-blue/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(0,212,255,0.1)] overflow-hidden">
      {/* Astronaut Image - Positioned with a subtle offset effect */}
      <div className="relative w-full md:w-48 lg:w-56 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden mb-6 md:mb-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Details Section */}
      <div className="flex-1 md:pl-10 flex flex-col justify-center relative">
        {/* Background Text Decor */}
        <span className="absolute -top-4 -right-2 text-6xl font-black text-white/[0.02] select-none pointer-events-none uppercase">
          Artemis
        </span>

        <div className="space-y-4">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-space-blue/10 text-space-blue text-[10px] font-bold uppercase tracking-[.25em] mb-2 border border-space-blue/20">
              {role}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {name}
            </h3>
          </div>
          
          <p className="text-space-gray/70 leading-relaxed text-sm md:text-base max-w-lg">
            {bio}
          </p>
        </div>

        {/* Tactical element */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px w-8 bg-space-blue/50" />
          <span className="text-[10px] text-space-blue/50 uppercase tracking-[.4em]">Profile 00{Math.floor(Math.random() * 9) + 1}</span>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-space-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default CrewCard;
