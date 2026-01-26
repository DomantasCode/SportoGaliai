import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visual Modes: Dark (Default) or Scrolled
  // We want the "Dark mode" aesthetic by default (transparent bg, white text).
  // When scrolled, we want standard "sticky dark navbar" or whatever the design calls for.
  // Actually, standard dark mode sticky is usually dark bg, white text.

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-md shadow-sm py-2 border-b border-white/10' : 'bg-transparent py-6'
    }`;

  // Text colors: White text on transparent (top), White text on dark (scrolled).
  const textClasses = 'text-white hover:text-secondary';
  const mobileToggleColor = 'text-white';
  const logoSrc = "/SG_logo_white.svg"; // Always use the white logo for Dark Mode

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 flex justify-between items-center h-full">
        {/* Logo Section - Increased width constraint to allow height growth */}
        <div className={`relative flex items-center transition-all duration-300 ${isScrolled ? 'w-32 md:w-40 h-20' : 'w-24 md:w-32 h-24'}`}>
          <a href="#" className={`absolute left-0 transition-all duration-300 ${isScrolled ? 'top-1/2 -translate-y-1/2' : '-top-8 md:-top-12'}`}>
            <img
              src={logoSrc}
              alt="SportoGalia logo"
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-28 md:h-32' : 'h-32 md:h-48 lg:h-56 scale-110 origin-top-left'}`}
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-8 transition-all duration-300 ${!isScrolled ? 'mt-6' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-display font-bold transition-colors text-lg uppercase tracking-wide ${textClasses}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent text-white px-6 py-2 rounded-full font-display font-bold hover:bg-secondary hover:text-primary transition-all transform hover:scale-105 shadow-md flex items-center justify-center"
          >
            Registruotis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className={`p-2 ${mobileToggleColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden flex flex-col p-4 animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="py-3 text-gray-900 font-medium border-b border-gray-50 last:border-0 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4">
            <a
              href="#contact"
              className="block w-full bg-accent text-white text-center py-3 rounded-xl font-medium active:scale-95 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              Registruotis
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;