import React, { useState } from 'react';
import { SERVICES } from '../constants.tsx';
import { Service } from '../types.ts';
import { ArrowUpRight, X, Clock, CheckCircle, ArrowRight, Activity, Award } from 'lucide-react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-12 md:py-24 lg:py-32 bg-white dark:bg-dark relative overflow-hidden border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Pattern */}
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="w-full md:max-w-2xl relative">
            <div className="flex items-center gap-3 mb-3 pl-1">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Paslaugos</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-none tracking-tight">
              Saugus ir kokybiškas<br />
              <span className="relative inline-block text-primary">
                fizinis ugdymas
              </span>
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[300px]">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            // Bento 7/5 split
            const spanClass = index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-7' : 'md:col-span-1 lg:col-span-5';
            const gradientClass = index % 2 === 0 ? 'bg-gray-100 dark:bg-white/10' : 'bg-gray-50 dark:bg-white/5';

            return (
              <div
                key={index}
                className={`group relative ${spanClass} ${gradientClass} rounded-[2.5rem] border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedService(service)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:opacity-[0.05] transition-opacity duration-500"></div>

                <div className={`absolute text-primary/5 dark:text-white/5 group-hover:text-primary/10 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12 pointer-events-none
                  ${index === 0 || index === 3 ? '-right-10 -bottom-10' : '-right-8 -bottom-8'}
                `}>
                  <Icon size={index === 0 || index === 3 ? 240 : 180} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between p-6 md:p-8">
                  <div>
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100 dark:border-white/5">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <span className="text-5xl font-display font-bold text-gray-300 dark:text-white/5 group-hover:text-gray-400 dark:group-hover:text-white/10 transition-colors duration-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300 pr-10 leading-none">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 md:pt-6 flex items-center justify-between mt-auto">
                    <span className="font-bold text-sm text-gray-400 group-hover:text-primary uppercase tracking-widest transition-colors duration-300 flex items-center gap-2">
                      Plačiau
                      <div className="h-[1px] w-0 group-hover:w-8 bg-primary transition-all duration-300"></div>
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-secondary/30">
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimized Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedService(null)}
          ></div>

          <div className="bg-white dark:bg-neutralDark w-full max-w-5xl rounded-[2.5rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[85vh] md:max-h-[90vh] animate-in zoom-in-95 duration-300 border border-white/10">

            {/* Left Side: Visual & Quick Info */}
            <div className="relative min-h-[100px] md:h-auto md:w-[35%] shrink-0 overflow-hidden flex flex-col justify-between p-3 md:p-8">
              {/* Rich Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-800 to-indigo-900"></div>

              {/* Noise Texture for 'Grainy' Premium Feel */}
              <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

              {/* Ambient Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

              {/* Artistic Watermark Icon */}
              <div className="absolute -right-12 -bottom-12 text-white/5 transform -rotate-12 scale-150 pointer-events-none">
                {React.createElement(selectedService.icon, { size: 300, strokeWidth: 0.5 })}
              </div>

              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

              <div className="relative z-10 flex flex-col items-start h-full">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors md:hidden mb-2 self-end border border-white/10 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-lg mb-2 md:mb-6 mt-0 md:mt-0">
                  {React.createElement(selectedService.icon, { size: 28, className: "md:w-8 md:h-8" })}
                </div>
                <h3 className="text-2xl md:text-5xl font-display font-bold text-white mb-1 md:mb-2 leading-none pr-8 md:pr-0 drop-shadow-md">{selectedService.title}</h3>
                <div className="w-12 h-1 bg-secondary rounded-full mb-2 md:mb-4 shadow-sm shadow-secondary/50"></div>

                <div className="mt-auto">
                  {selectedService.duration && (
                    <div className="inline-flex items-center gap-2 text-white/90 font-medium bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/10 text-sm">
                      <Clock size={14} className="text-secondary md:w-4 md:h-4" />
                      <span>Trukmė: {selectedService.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 bg-white dark:bg-[#1a1a1a] flex flex-col relative min-h-0">
              {/* Desktop Close */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white rounded-full hidden md:flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-5 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                <div className="mb-8">

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {selectedService.fullDescription || selectedService.description}
                  </p>
                </div>

                {selectedService.features && (
                  <div className="mb-8">
                    <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Kodėl verta rinktis?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedService.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-secondary/20 transition-colors">
                          <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                            <CheckCircle className="text-secondary w-3 h-3" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 md:p-10 pt-5 md:pt-8 border-t border-gray-100 dark:border-white/5 mt-auto">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/30 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Registruotis treniruotei
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;