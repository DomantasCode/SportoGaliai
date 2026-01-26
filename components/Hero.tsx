import React from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-8 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-dark transition-colors duration-300">

      {/* Background Ambience */}
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

          {/* Left Content Side */}
          <div className="md:col-span-6 flex flex-col justify-center animate-in slide-in-from-left duration-700 fade-in text-center md:text-left pt-6 md:pt-0">

            <div className="inline-flex items-center gap-3 bg-primary/90 dark:bg-primary border border-white/20 px-5 py-2.5 rounded-full shadow-lg shadow-primary/20 mb-8 w-fit mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 hover:scale-105 transition-all cursor-default relative z-20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="text-sm font-display font-bold text-secondary tracking-widest uppercase">VAIKŲ IR ŠEIMOS SPORTO AKADEMIJA</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-[1.0] tracking-tighter">
              Sportas, auginantis <br className="hidden lg:block" />
              <span className="text-primary">asmenybes</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Profesionali kineziterapija ir modernios treniruotės vaikams – taisyklingai laikysenai, saugiam judesiui ir raumenyno stiprinimui.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="bg-accent text-white px-8 py-4 rounded-[2rem] font-display font-bold text-xl hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-accent/10 flex items-center justify-center gap-3 group min-w-[200px]"
              >
                Registruotis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-600 dark:text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-secondary" size={20} />
                <span>Sertifikuoti treneriai</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-secondary" size={20} />
                <span>Individualus dėmesys</span>
              </div>
            </div>
          </div>

          {/* Right Visual Side - Collage */}
          <div className="hidden md:block md:col-span-6 relative mt-8 md:mt-0 h-[500px] md:h-[600px] lg:h-[700px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">

              {/* Main Large Image */}
              <div className="relative w-[80%] h-[80%] md:w-[70%] md:h-[90%] z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-primary rounded-[3rem] translate-x-4 translate-y-4 opacity-10"></div>
                <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-200 relative">
                  <img
                    src="/hero-new.jpg"
                    alt="Children doing sports exercises"
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
                </div>
              </div>

              {/* Floating Element 1 (Top Right) */}
              <div className="absolute top-[10%] right-0 md:right-[5%] z-20 animate-bounce-slow hidden sm:block">
                <div className="bg-white dark:bg-white/90 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 dark:border-gray-200 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-600 uppercase font-bold tracking-wider">Tėvų įvertinimas</p>
                    <p className="text-primary font-bold text-lg">5 / 5</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 (Bottom Left) */}
              <div className="absolute top-[5%] md:top-auto bottom-auto md:bottom-[15%] left-0 md:left-[5%] z-20 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <div className="bg-white dark:bg-white/90 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-200 transform -rotate-3 hover:rotate-0 transition-transform max-w-[180px]">
                  <p className="text-primary font-bold text-sm mb-1">Kineziterapija</p>
                  <p className="text-gray-500 dark:text-gray-600 text-xs leading-tight">Profesionali laikysenos korekcija vaikams</p>
                  <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-secondary rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/5 rounded-full z-0 animate-spin-slow pointer-events-none border-dashed"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;