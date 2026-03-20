import React from 'react';
import { NAV_ITEMS, SERVICES } from '../constants.tsx';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t-4 border-primary relative overflow-hidden">
      {/* Background decoration - Removed as requested */}

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 2xl:gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <a href="#" className="text-3xl font-bold tracking-tight block">
              Sporto<span className="text-primary">Galia</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Vaikų ir šeimos sporto akademija, kurioje auginame ne tik raumenis, bet ir asmenybes.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/p/Sporto-galia-100086300871342" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/sportogalia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/sporto-galia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-gray-400 text-sm mb-3">Prenumeruokite naujienlaiškį</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = (e.currentTarget.elements.namedItem('footer_email') as HTMLInputElement);
                  const email = input.value;
                  if (email && window.omnisend) {
                    window.omnisend.push(['track', '$contactIdentified', { email: email }]);
                    input.value = '';
                    const btn = e.currentTarget.querySelector('button');
                    if (btn) {
                      btn.innerHTML = '&#10003;';
                      btn.classList.add('bg-green-600', 'border-green-600');
                      setTimeout(() => {
                        btn.innerHTML = '&rarr;';
                        btn.classList.remove('bg-green-600', 'border-green-600');
                      }, 3000);
                    }
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="footer_email"
                  required
                  placeholder="El. paštas"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all text-sm font-bold"
                  aria-label="Prenumeruoti"
                >
                  &rarr;
                </button>
              </form>
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
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center group relative"
                  >
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
                  <a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center justify-between group max-w-[200px]">
                    {service.title}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white font-serif">Kontaktai</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-center text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+37061837395" className="hover:text-white transition-colors">+370 618 37395</a>
                  <a href="tel:+37065787837" className="hover:text-white transition-colors">+370 657 87837</a>
                </div>
              </li>
              <li className="flex gap-4 items-start text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-1">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-xs uppercase text-gray-500 mb-0.5">Bendri klausimai</span>
                  <a href="mailto:info@sportogalia.lt" className="hover:text-white transition-colors break-all">info@sportogalia.lt</a>
                </div>
              </li>
              <li className="flex gap-4 items-start text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors mt-1">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-xs uppercase text-gray-500 mb-0.5">Rinkodara ir partnerystės</span>
                  <a href="mailto:mantas@sportogalia.lt" className="hover:text-white transition-colors break-all">mantas@sportogalia.lt</a>
                </div>
              </li>
              <li className="flex gap-4 items-start text-gray-400 text-sm group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="block text-xs uppercase text-gray-500 mb-0.5">Adresas</span>
                  <span className="mt-1">Vilnius, Lietuva</span>
                </div>
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