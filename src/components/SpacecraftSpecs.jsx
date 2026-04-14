import { spacecraftSpecs } from '../data/missionData';
import { Rocket, Shield, Ruler, Zap, Info, Activity } from 'lucide-react';

// Mapping icons to spec labels for a better visual representation
const iconMap = {
  "Altura": Ruler,
  "Altura Total": Ruler,
  "Diámetro": Ruler,
  "Volumen Habitable": Activity,
  "Escudo Térmico": Shield,
  "Empuje": Rocket,
  "Configuración": Info,
  "Peso Lanzamiento": Zap,
  "Capacidad": Activity
};

const SpacecraftSpecs = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-6 py-16">
      {spacecraftSpecs.map((craft) => (
        <div 
          key={craft.id} 
          className="relative glass border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-space-blue/20 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent"
        >
          {/* Section Header with technical look */}
          <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-2xl font-black text-white tracking-widest uppercase flex items-center gap-4">
              <span className="w-1.5 h-6 bg-space-blue shadow-[0_0_15px_rgba(0,212,255,1)]" />
              {craft.name}
            </h3>
            <span className="text-[10px] font-mono text-space-blue/30 uppercase tracking-[0.3em]">Status: Operational</span>
          </div>

          {/* Grid of technical details */}
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {craft.details.map((detail, idx) => {
                const Icon = iconMap[detail.label] || Info;
                return (
                  <div key={idx} className="flex flex-col gap-3 group/item">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-space-blue/5 text-space-blue/40 group-hover/item:text-space-blue transition-all duration-300 border border-space-blue/10">
                        <Icon size={18} />
                      </div>
                      <span className="text-space-gray/40 text-[10px] font-bold uppercase tracking-[0.2em]">{detail.label}</span>
                    </div>
                    <div className="pl-1">
                      <span className="text-2xl font-bold text-white tracking-tight group-hover/item:translate-x-1 transition-transform inline-block">
                        {detail.value}
                      </span>
                    </div>
                    {/* Subtle under-divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-white/5 to-transparent" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 p-8 flex flex-col items-end opacity-5 group-hover:opacity-10 transition-opacity">
            <div className="w-24 h-[1px] bg-space-blue mb-1" />
            <div className="w-12 h-[1px] bg-space-blue" />
          </div>
          
          {/* Tech Code Overlay */}
          <div className="absolute bottom-6 right-10 pointer-events-none opacity-[0.03]">
            <span className="text-5xl font-black italic select-none">NASA_ARTEMIS_PROJECT</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpacecraftSpecs;
