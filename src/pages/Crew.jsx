import CrewCard from '../components/CrewCard';
import { crew } from '../data/missionData';

const Crew = () => {
  return (
    <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
          La <span className="text-space-blue">Tripulación</span>
        </h2>
        <p className="text-space-gray/60 uppercase tracking-[0.4em] max-w-2xl mx-auto text-sm">
          Los pioneros de una nueva era de exploración espacial tripulada.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {crew.map((member) => (
          <CrewCard 
            key={member.id}
            name={member.name}
            role={member.role}
            bio={member.bio}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Crew;
