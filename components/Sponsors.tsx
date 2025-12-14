import React from 'react';
import { SPONSORS } from '../constants.tsx';

const Sponsors: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-3">
            Pasitikėjimas
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mūsų draugai ir partneriai</h2>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 items-center">
            {/* Render list twice for infinite loop */}
            {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
              <div
                key={index}
                className="group relative w-40 h-20 md:w-48 md:h-24 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl p-4 hover:bg-white/90 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-dark to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-dark to-transparent z-10"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Sponsors;