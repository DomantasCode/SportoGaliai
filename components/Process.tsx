import React from 'react';
import { STEPS } from '../constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-12 md:py-24 bg-dark text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Atmosphere - Enhanced */}
      <div className="absolute inset-0 bg-dark pointer-events-none overflow-hidden">
        {/* Core Atmosphere */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute -bottom-24 left-1/2 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[200px] -translate-x-1/2 opacity-30"></div>

        {/* Additional Background Elements - All Purple */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 opacity-40"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 opacity-40"></div>

        {/* Extra Dense Accents */}
        <div className="absolute bottom-48 left-1/3 w-[600px] h-[600px] bg-primary/25 rounded-full blur-[130px] opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-32 right-10 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

        {/* CTA Hightlight Glow - Purple */}
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/4 opacity-60 pointer-events-none"></div>

        {/* Even MORE blobs */}
        <div className="absolute top-1/4 left-10 w-[200px] h-[200px] bg-primary/30 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-10 w-[250px] h-[250px] bg-primary/30 rounded-full blur-[90px] opacity-30"></div>

        {/* User Requested: Subtle Green on Left near CTA (Adjusted Position & Intensity) */}
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -translate-x-1/2 opacity-50 pointer-events-none"></div>

        {/* User Requested: Subtle Green on Top Right of Process (Adjusted Position & Intensity) */}
        <div className="absolute top-48 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 opacity-50 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full max-w-[1600px]">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-secondary"></span>
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Programos kelias</span>
            <span className="h-px w-12 bg-secondary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Kelionė nuo tikslo iki rezultato
          </h2>
        </div>

        <div className="relative h-auto lg:h-[450px] mb-24">
          <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1600 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="80%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M-200,225 C-100,225 100,165 200,165 C300,165 500,285 600,285 C700,285 900,165 1000,165 C1100,165 1300,285 1400,285 C1500,285 1700,225 1800,225"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 6"
                className="opacity-60"
              />
              {[200, 600, 1000, 1400].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={i % 2 === 0 ? 165 : 285}
                  r="4"
                  fill="#7C3AED"
                  className="animate-pulse"
                  style={{ animationDelay: `${i}s` }}
                />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 h-full">
            {STEPS.map((step, index) => {
              const isTop = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col group items-center px-4 ${isTop ? 'lg:justify-start' : 'lg:justify-end'}`}
                >
                  <div className="relative w-full p-6 lg:min-h-[160px] flex flex-col justify-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl z-10 text-center">
                    <div className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark/90 text-white border-2 border-primary/30 flex items-center justify-center shadow-lg group-hover:border-primary group-hover:bg-primary/20 transition-all duration-500 ${isTop ? '-top-6 lg:-top-auto lg:-bottom-6' : '-top-6'}`}>
                      <span className="font-display text-lg font-bold text-white/80 group-hover:text-primary transition-colors">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-display">{step.title}</h3>
                    <p className="text-gray-400 font-light text-sm line-clamp-2">{step.description}</p>
                  </div>
                  <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 w-[1px] bg-white/20 group-hover:bg-primary transition-colors duration-500 z-0`}
                    style={{
                      top: isTop ? '150px' : '285px',
                      height: isTop ? '15px' : '30px',
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merged CTA Section */}
        <div className="text-center relative z-10 animate-in fade-in slide-in-from-bottom duration-700 delay-300">

          <p className="text-purple-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Kviečiame į pirmąją nemokamą treniruotę. Susipažinkite su treneriais, pajuskite bendruomenės dvasią ir pradėkime kelionę tobulėjimo link.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#contact"
              className="relative bg-accent text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl hover:bg-secondary hover:text-primary transition-all transform hover:scale-105 group flex items-center gap-3 min-w-[280px] justify-center overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative flex items-center gap-3">
                Nemokama treniruotė
                <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
              </span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-white/70 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>Nemokama pirma treniruotė</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>Profesionalūs treneriai</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-secondary" />
              <span>Vietų skaičius ribotas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
