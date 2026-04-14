import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tripulación', path: '/crew' },
    { name: 'Misión', path: '/mission' },
    { name: 'Nave', path: '/spacecraft' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Rocket className="w-8 h-8 text-space-blue group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold tracking-tighter text-white uppercase">
              Artemis <span className="text-space-blue">II</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-space-blue ${
                    isActive ? 'text-space-blue' : 'text-space-gray/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-space-gray hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full glass border-b border-white/10 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 animate-in fade-in slide-in-from-top-4' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-space-dark/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-4 text-base font-medium tracking-widest uppercase border-l-2 transition-all ${
                  isActive
                    ? 'text-space-blue border-space-blue bg-space-blue/5'
                    : 'text-space-gray/70 border-transparent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
