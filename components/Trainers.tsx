import React, { useState, useRef, useEffect } from 'react';
import { TRAINERS } from '../constants.tsx';
import { Trainer } from '../types.ts';
import { X, ChevronLeft, ChevronRight, Award, Star } from 'lucide-react';

const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Dynamically get card width for accurate scrolling
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth : 350;
      const gap = 32; // gap-8 is 2rem = 32px
      const scrollAmount = cardWidth + gap;

      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Find index of currently selected trainer
  const currentIndex = selectedTrainer ? TRAINERS.findIndex(t => t.name === selectedTrainer.name) : -1;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % TRAINERS.length;
    setSelectedTrainer(TRAINERS[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + TRAINERS.length) % TRAINERS.length;
    setSelectedTrainer(TRAINERS[prevIndex]);
  };

  // Initialize carousel to center position
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Wait for images to load and layout to settle
      setTimeout(() => {
        const scrollWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        const middlePosition = (scrollWidth - containerWidth) / 2;
        container.scrollLeft = middlePosition;
      }, 100);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedTrainer) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedTrainer(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTrainer]);

  return (
    <section id="trainers" className="py-32 bg-gray-50 dark:bg-neutralDark relative transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="w-full md:max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block">Komanda</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-2">Mūsų ekspertai</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Spustelėkite ant trenerio kortelės, kad sužinotumėte daugiau.</p>
          </div>
          
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-secondary hover:text-secondary transition-all active:scale-95 bg-white/5 text-gray-900 dark:text-white shadow-sm"
              aria-label="Previous trainer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-all active:scale-95 shadow-lg shadow-primary/20"
              aria-label="Next trainer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 px-4 -mx-4 hide-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRAINERS.map((trainer, index) => (
            <div 
              key={index} 
              className="group cursor-pointer min-w-[300px] md:min-w-[350px] snap-center select-none"
              onClick={() => setSelectedTrainer(trainer)}
            >
              <div className="relative mb-6">
                {/* Image Frame */}
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-out shadow-lg relative bg-gray-50 dark:bg-gray-100">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                    draggable={false}
                  />
                  
                  {/* Plus icon overlay */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                    <span className="text-2xl text-primary font-light">+</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{trainer.name}</h3>
                <span className="text-secondary text-sm tracking-wider uppercase font-medium">{trainer.role}</span>
              </div>
            </div>
          ))}
          {/* Padding div to allow last item to be centered/visible */}
          <div className="min-w-[1rem] md:min-w-[4rem]"></div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedTrainer(null)}
          ></div>
          
          <div className="bg-white dark:bg-gray-100 w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
            
            {/* Desktop Navigation Buttons (Outside Content) */}
            <button 
              onClick={handlePrev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white text-primary rounded-full items-center justify-center shadow-lg transition-all active:scale-95"
              aria-label="Previous trainer"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={handleNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white text-primary rounded-full items-center justify-center shadow-lg transition-all active:scale-95"
              aria-label="Next trainer"
            >
              <ChevronRight size={28} />
            </button>

            {/* Close Button */}
            <button 
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-40 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Image Side */}
            <div className="md:w-2/5 h-64 md:h-auto relative bg-gray-200 flex-shrink-0">
              <img 
                key={selectedTrainer.image} // Key forces re-render for animation
                src={selectedTrainer.image} 
                alt={selectedTrainer.name} 
                className="w-full h-full object-cover animate-in fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-primary/20 md:to-primary/90 md:hidden"></div>
              
              {/* Mobile Navigation Buttons (Overlay on Image) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:hidden z-30">
                 <button 
                  onClick={handlePrev}
                  className="w-10 h-10 bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center active:bg-white/50 transition-all"
                 >
                   <ChevronLeft size={24} />
                 </button>
                 <button 
                  onClick={handleNext}
                  className="w-10 h-10 bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center active:bg-white/50 transition-all"
                 >
                   <ChevronRight size={24} />
                 </button>
              </div>

              {/* Mobile Title Overlay */}
              <div className="absolute bottom-6 left-6 text-white md:hidden animate-in slide-in-from-bottom-2 fade-in duration-500" key={`mobile-title-${selectedTrainer.name}`}>
                <h3 className="font-serif text-3xl font-bold leading-none mb-1">{selectedTrainer.name}</h3>
                <p className="text-secondary uppercase tracking-widest text-xs font-bold">{selectedTrainer.role}</p>
              </div>
            </div>

            {/* Modal Content Side */}
            <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto">
              {/* Content Wrapper with Animation Key */}
              <div key={selectedTrainer.name} className="animate-in slide-in-from-right-4 fade-in duration-500 fill-mode-both">
                {/* Desktop Header */}
                <div className="hidden md:block mb-8">
                  <h3 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-2">{selectedTrainer.name}</h3>
                  <p className="text-secondary uppercase tracking-widest text-sm font-bold">{selectedTrainer.role}</p>
                </div>

                <div className="space-y-6">
                  {/* Motto */}
                  <div className="bg-secondary/10 p-6 rounded-3xl border border-secondary/20">
                    <h4 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <Star className="text-secondary" size={18} fill="#BEF400" fillOpacity={0.2} />
                      Gyvenimo moto
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-lg italic">
                      "{selectedTrainer.motto}"
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-100 p-5 rounded-2xl border border-gray-100">
                      <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">Išsilavinimas</h5>
                      <p className="text-gray-700 font-medium">{selectedTrainer.education}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-100 p-5 rounded-2xl border border-gray-100">
                      <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">Darbo vieta</h5>
                      <p className="text-gray-700 font-medium">{selectedTrainer.location}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-100 p-5 rounded-2xl border border-gray-100">
                        <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">Telefonas</h5>
                        <a href={`tel:${selectedTrainer.phone.replace(/\s/g, '')}`} className="text-primary font-medium hover:text-secondary transition-colors">
                          {selectedTrainer.phone}
                        </a>
                      </div>

                      <div className="bg-white dark:bg-gray-100 p-5 rounded-2xl border border-gray-100">
                        <h5 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-bold">El. paštas</h5>
                        <a href={`mailto:${selectedTrainer.email}`} className="text-primary font-medium hover:text-secondary transition-colors break-all">
                          {selectedTrainer.email}
                        </a>
                      </div>
                    </div>

                    {selectedTrainer.achievements && selectedTrainer.achievements.trim() !== '' && (
                      <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                        <h5 className="text-xs uppercase tracking-wider text-primary mb-3 font-bold flex items-center gap-2">
                          <Award className="text-secondary" size={16} />
                          Pasiekimai
                        </h5>
                        <p className="text-gray-700 leading-relaxed">{selectedTrainer.achievements}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                          setSelectedTrainer(null);
                          const contactSection = document.getElementById('contact');
                          contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-accent text-white font-bold py-4 rounded-2xl hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
                    >
                      Registruotis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trainers;