import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-24 bg-dark relative">
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6">

        {/* Registration Section - Top */}
        <div className="bg-neutralDark rounded-[3rem] shadow-xl overflow-hidden border border-white/10 mb-12">
          <div className="p-4 md:p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">Registracija</span>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Registruokitės internetu</h3>

            <div className="w-full">
              <iframe
                src="https://embed.exoclass.com/lt/embed/provider/cc909582-9556-49fb-ae29-4ded9b2fee2e/group-management?color=3d1172"
                width="100%"
                height="1000"
                style={{ border: 'none' }}
                title="Registracijos forma"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form & Info - Combined */}
        <div id="contact-form" className="bg-neutralDark rounded-[3rem] shadow-xl overflow-hidden border border-white/10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Contact Info Side */}
            <div className="lg:col-span-5 bg-dark p-10 md:p-12 text-white relative overflow-hidden order-2 lg:order-1 flex flex-col justify-between border-r border-white/10">
              {/* Decor */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/30 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>

              <div className="relative z-10">
                <div className="inline-block px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest">Kontaktai</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Susisiekite</h2>
                <p className="text-gray-400 text-lg mb-10">Esame čia, kad atsakytume į visus jūsų klausimus ir padėtume užsiregistruoti.</p>

                <div className="space-y-6">
                  <a href="tel:+37061240647" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-dark transition-all flex-shrink-0">
                      <Phone size={20} className="text-secondary group-hover:text-dark" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Telefonas</p>
                      <p className="text-xl font-medium text-white group-hover:text-secondary transition-colors">+370 612 40647</p>
                    </div>
                  </a>

                  <a href="mailto:info@sportogalia.com" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-dark transition-all flex-shrink-0">
                      <Mail size={20} className="text-secondary group-hover:text-dark" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">El. paštas</p>
                      <p className="text-xl font-medium break-all text-white group-hover:text-secondary transition-colors">info@sportogalia.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-dark transition-all flex-shrink-0">
                      <MapPin size={20} className="text-secondary group-hover:text-dark" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Adresas</p>
                      <p className="text-xl font-medium text-white group-hover:text-secondary transition-colors">Vilnius, Lietuva</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Sekite mus</p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/p/Sporto-galia-100086300871342" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:border-secondary text-secondary hover:text-dark transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/sportogalia/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:border-secondary text-secondary hover:text-dark transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.linkedin.com/company/sporto-galia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:border-secondary text-secondary hover:text-dark transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="lg:col-span-7 p-10 md:p-12 order-1 lg:order-2 bg-gray-100">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Parašykite mums</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-2">Turite klausimų?</h3>
              <p className="text-gray-600 mb-8">Užpildykite formą ir mes susisieksime su jumis artimiausiu metu.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Vardas *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Jūsų vardas"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Telefonas *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+370 XXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    El. paštas *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="jusu@email.lt"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Žinutė *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Jūsų žinutė..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary hover:text-dark transition-all shadow-lg shadow-primary/30 hover:shadow-secondary/30 hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group"
                >
                  Siųsti žinutę
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;