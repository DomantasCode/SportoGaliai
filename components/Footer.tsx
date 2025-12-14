import React from 'react';
import { NAV_ITEMS, SERVICES } from '../constants.tsx';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t-4 border-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 2xl:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <a href="#" className="text-3xl font-bold tracking-tight block">
              Sporto<span className="text-secondary">Galia</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Vaikų ir šeimos sporto akademija, kurioje auginame ne tik raumenis, bet ir asmenybes.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/p/Sporto-galia-100086300871342" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/sportogalia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/sporto-galia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12 2xl:ml-16">
            <h3 className="text-lg font-bold mb-6 text-white font-serif">Nuorodos</h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-serif">Paslaugos</h3>
            <ul className="space-y-4">
              {SERVICES.slice(0, 4).map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center justify-between group max-w-[200px]">
                    {service.title}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-serif">Kontaktai</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start text-gray-400 text-sm group">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <MapPin size={16} />
                 </div>
                 <span className="mt-1">Vilnius, Lietuva</span>
              </li>
              <li className="flex gap-4 items-center text-gray-400 text-sm group">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Phone size={16} />
                 </div>
                 <a href="tel:+37061240647" className="hover:text-white transition-colors">+370 612 40647</a>
              </li>
              <li className="flex gap-4 items-center text-gray-400 text-sm group">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Mail size={16} />
                 </div>
                 <a href="mailto:info@sportogalia.com" className="hover:text-white transition-colors">info@sportogalia.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex justify-center items-center text-xs text-gray-500">
          <p>© {currentYear} SportoGalia. Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;