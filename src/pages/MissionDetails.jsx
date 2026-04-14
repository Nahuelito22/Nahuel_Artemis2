import Timeline from '../components/Timeline';
import SpacecraftSpecs from '../components/SpacecraftSpecs';

const MissionDetails = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Phases Section */}
      <section className="px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Cronograma de <span className="text-space-blue">Vuelo</span>
          </h2>
          <p className="text-space-gray/50 uppercase tracking-[0.3em] font-medium text-xs">
            Desde el despegue hasta el amerizaje seguro.
          </p>
        </div>
        <Timeline />
      </section>

      {/* Hardware Section */}
      <section className="px-6 bg-white/[0.02] py-24 border-y border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Hardware de la <span className="text-space-blue">Misión</span>
          </h2>
          <p className="text-space-gray/50 uppercase tracking-[0.3em] font-medium text-xs">
            Tecnología de vanguardia para la exploración profunda.
          </p>
        </div>
        <SpacecraftSpecs />
      </section>
    </div>
  );
};

export default MissionDetails;
