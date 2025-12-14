import React, { useState } from 'react';
import { SERVICES } from '../constants.tsx';
import { Service } from '../types.ts';
import { ArrowUpRight, X, Clock, CheckCircle, ArrowRight, Activity } from 'lucide-react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-dark relative overflow-hidden border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="w-full md:max-w-2xl relative">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block pl-1">
              Ką mes siūlome
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Aukščiausios kokybės<br/>
              <span className="relative inline-block">
                fizinis lavinimas
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 w-full md:max-w-md pb-2 text-base md:text-lg md:text-right">
            Suderiname medicinines žinias su smagia fizine veikla, kad vaikai augtų sveiki ir laimingi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-50 dark:bg-dark p-8 rounded-[2rem] border-2 border-gray-200 dark:border-primary/30 hover:border-secondary hover:bg-gray-100 dark:hover:bg-dark/90 transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-secondary/30 flex flex-col justify-between h-[380px]"
                onClick={() => setSelectedService(service)}
              >
                {/* Watermark Icon on Hover */}
                <div className="absolute -right-8 -bottom-8 text-gray-900 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 transform group-hover:scale-110 pointer-events-none">
                  <Icon size={180} strokeWidth={1} />
                </div>

                {/* Top Part */}
                <div>
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-gray-200 dark:bg-white/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-gray-300 dark:group-hover:bg-white/20 group-hover:text-secondary transition-colors duration-300">
                        <Icon size={26} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-serif font-bold text-gray-900/10 dark:text-white/10 group-hover:text-gray-900/20 dark:group-hover:text-white/20 transition-colors duration-300">
                        0{index + 1}
                      </span>
                   </div>

                   <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                       {service.title}
                   </h4>
                   <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white/90 transition-colors duration-300 line-clamp-4">
                     {service.description}
                   </p>
                </div>

                {/* Bottom Part */}
                <div className="pt-6 mt-auto border-t border-gray-200 dark:border-white/10 group-hover:border-gray-300 dark:group-hover:border-white/20 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-secondary group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                      Plačiau
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-secondary group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className="bg-white dark:bg-gray-100 w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90vh] flex flex-col">
             {/* Close Button */}
             <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur md:bg-gray-100 rounded-full flex items-center justify-center text-white md:text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Modal Header Image/Gradient */}
            <div className="bg-primary relative h-32 md:h-36 shrink-0 overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-[50px]"></div>
               <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-[40px]"></div>

               <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pb-4 md:pb-5">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary shadow-lg">
                        {React.createElement(selectedService.icon, { size: 20 })}
                     </div>
                     {selectedService.duration && (
                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                        <Clock size={11} className="text-secondary" />
                        <span>{selectedService.duration}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{selectedService.title}</h3>
               </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
               <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                 <div className="flex-1">
                   <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-3 border-b border-gray-100 dark:border-gray-200 pb-2">Apie paslaugą</h4>
                   <p className="text-gray-600 dark:text-gray-700 leading-relaxed text-base mb-4">
                     {selectedService.fullDescription || selectedService.description}
                   </p>
                 </div>

                 {selectedService.features && (
                   <div className="md:w-1/3 shrink-0">
                      <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-3 border-b border-gray-100 dark:border-gray-200 pb-2">Ką gausite?</h4>
                      <div className="space-y-2.5">
                        {selectedService.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={16} fill="#BEF400" fillOpacity={0.2} />
                            <span className="text-gray-700 dark:text-gray-800 text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                 )}
               </div>

               <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-200">
                 <button
                  onClick={() => {
                    setSelectedService(null);
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-accent text-white font-bold px-8 py-3.5 rounded-xl hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 group"
                 >
                   Registruotis
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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