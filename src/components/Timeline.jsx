import { phases } from '../data/missionData';

const Timeline = () => {
  return (
    <div className="relative max-w-4xl mx-auto px-6 py-24">
      {/* Vertical Connection Line */}
      <div className="absolute left-10 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-space-blue/50 to-transparent" />

      <div className="space-y-20">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative pl-20 md:pl-24 group">
            {/* Graphical indicator (Dot) */}
            <div className="absolute left-8 md:left-10 top-2 -translate-x-1/2 z-10">
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-space-dark border-2 border-space-blue shadow-[0_0_15px_rgba(0,212,255,0.6)] group-hover:bg-space-blue transition-all duration-500" />
                {/* Ping animation effect */}
                <div className="absolute inset-0 rounded-full border border-space-blue animate-ping opacity-20" />
              </div>
            </div>

            {/* Content Card */}
            <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/5 hover:border-space-blue/30 transition-all duration-500 group">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-space-blue/10 text-space-blue font-black text-xl border border-space-blue/20">
                  {index + 1}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-space-blue/20 to-transparent hidden md:block" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-space-blue transition-colors">
                {phase.title}
              </h3>
              
              <p className="text-space-gray/60 leading-relaxed text-lg max-w-2xl text-balance">
                {phase.description}
              </p>

              {/* Decorative tactical corner */}
              <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 40V30M40 40V30M0 0V10M40 0V10M0 40H10M30 40H40M0 0H10M30 0H40" stroke="#00D4FF" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
