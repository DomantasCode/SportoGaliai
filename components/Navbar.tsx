import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img
              src={isScrolled ? "/SG_logo-01.png" : "/SG_logo_white.svg"}
              alt="SportoGalia logo"
              className={`w-auto transition-all ${
                isScrolled ? 'h-12 md:h-14' : 'h-20 md:h-24 lg:h-28 scale-125 origin-left'
              }`}
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors text-sm uppercase tracking-wide ${
                isScrolled ? 'text-textDark hover:text-primary' : 'text-white hover:text-secondary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent text-white px-6 py-2 rounded-full font-medium hover:bg-secondary hover:text-primary transition-all transform hover:scale-105 shadow-md"
          >
            Registruotis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${isScrolled ? 'text-primary' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden flex flex-col p-4 animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="py-3 text-textDark font-medium border-b border-gray-50 last:border-0 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 bg-accent text-white text-center py-3 rounded-xl font-medium"
            onClick={() => setIsOpen(false)}
          >
            Registruotis
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;