import React from 'react';
import { STEPS } from '../constants.tsx';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-28 bg-dark text-white relative overflow-hidden">
      {/* Decor */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-primary/10"></div>
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-primary/20"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Paprasti žingsniai pradėti</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Pradėkite sporto kelionę sklandžiai ir be rūpesčių.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/30 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, index) => (
              <div key={index} className="relative z-10 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 border-4 border-primary/50 rounded-full flex items-center justify-center mb-8 relative group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300 bg-primary shadow-lg shadow-primary/30">
                    <span className="text-4xl font-bold text-secondary font-serif">{step.number}</span>
                    <div className="absolute inset-0 rounded-full border border-secondary/30 scale-125 animate-pulse"></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm px-4">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 text-center">
             <a href="#contact" className="inline-block bg-accent text-white border-2 border-accent px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:border-secondary hover:text-dark transition-all hover:scale-105 shadow-xl shadow-accent/30">
                 Registruotis
             </a>
        </div>
      </div>
    </section>
  );
};

export default Process;