import { Rocket, Github, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-dark border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Rocket className="w-6 h-6 text-space-blue group-hover:rotate-45 transition-transform" />
              <span className="text-xl font-bold tracking-tighter text-white uppercase">
                Artemis <span className="text-space-blue">II</span>
              </span>
            </Link>
            <p className="text-space-gray/50 max-w-sm text-sm leading-relaxed">
              Iniciativa educativa para la divulgación de las misiones Artemis de la NASA. 
              Explorando las fronteras del espacio profundo para la próxima generación.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/nahuel-ghilardi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-space-gray hover:text-space-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/Nahuelito22/Nahuel_Artemis2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-space-gray hover:text-space-blue transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.nahuelghilardi.com.ar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-space-gray hover:text-space-blue transition-colors"
                aria-label="Portfolio"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">Inicio</Link></li>
              <li><Link to="/crew" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">Tripulación</Link></li>
              <li><Link to="/mission" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">La Misión</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Recursos NASA</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">Programa Artemis</a></li>
              <li><a href="#" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">Nave Orion</a></li>
              <li><a href="#" className="text-space-gray/50 hover:text-space-blue text-sm transition-colors uppercase tracking-wider">Noticias</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-space-gray/30 uppercase tracking-[0.4em]">
            © {currentYear} Proyecto Artemis II - Desarrollado por Nahuel Ghilardi
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-space-gray/30 uppercase tracking-[0.4em]">Desarrollado con React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
