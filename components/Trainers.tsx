import React, { useState, useRef, useEffect } from 'react';
import { api } from '../src/lib/api';
import { TRAINERS } from '../constants.tsx';
import { Trainer } from '../types.ts';
import { X, ChevronLeft, ChevronRight, Award, Star, Grid, ArrowRight, User } from 'lucide-react';

const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // New: State for dynamic trainers - Start empty to see if DB loads
  const [trainersList, setTrainersList] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await api.trainers.list();
        if (data && Array.isArray(data)) {
          const mapped = data.map((t: Trainer) => ({
            ...t,
            image_visible: typeof t.image_visible === 'string' ? t.image_visible === '1' : Boolean(t.image_visible)
          }));
          setTrainersList(mapped);
        } else {
          setError('Gauti neteisingi duomenys iš serverio');
        }
      } catch (err: any) {
        console.error('Error loading trainers:', err);
        setError(err.message || 'Nepavyko užkrauti duomenų');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      // Fallback width 300, gap 32 (2rem)
      const cardWidth = card?.offsetWidth || 300;
      const GAP_SIZE = 32;
      const scrollAmount = cardWidth + GAP_SIZE;

      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  // Find index of currently selected trainer
  const currentIndex = selectedTrainer ? trainersList.findIndex(t => t.name === selectedTrainer.name) : -1;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % trainersList.length;
    setSelectedTrainer(trainersList[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + trainersList.length) % trainersList.length;
    setSelectedTrainer(trainersList[prevIndex]);
  };

  // Initialize carousel to center position
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
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

  // Lock body scroll when Grid Modal is open
  useEffect(() => {
    if (showAll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showAll]);

  // Helper to determine if we should show the image
  const shouldShowImage = (t: Trainer) => t.image_visible && t.image_url;

  return (
    <section id="trainers" className="py-12 md:py-32 bg-gray-50 dark:bg-neutralDark relative transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="w-full md:max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Treneriai</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 leading-none tracking-tight">Mūsų ekspertai</h2>

          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0 flex-wrap">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all active:scale-95 bg-primary/5 shadow-sm"
              aria-label="Previous trainer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all active:scale-95 bg-primary/5 shadow-sm"
              aria-label="Next trainer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Grid View Toggle */}
            <button
              onClick={() => setShowAll(true)}
              className="w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
              aria-label="View all trainers"
              title="Visi treneriai"
            >
              <Grid size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 px-4 -mx-4 scrollbar-hidden md:scrollbar-visible scroll-smooth"
        >
          {trainersList.map((trainer, index) => {
            const hasImage = shouldShowImage(trainer);

            return (
              <div
                key={index}
                className="group cursor-pointer min-w-[300px] max-w-[300px] snap-center select-none"
                onClick={() => setSelectedTrainer(trainer)}
              >
                {/* Card Container */}
                <div className={`relative h-[400px] rounded-[2.5rem] border p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden
                ${hasImage
                    ? 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5'
                    : 'bg-neutralDark border-white/10' // Dark abstract theme for no image
                  }`}
                >

                  {/* Background: Image or Abstract Gradient */}
                  {hasImage ? (
                    <>
                      <div className="absolute inset-0 bg-white dark:bg-white/5 z-0"></div>
                      <div className="absolute inset-0 z-0">
                        <img
                          src={trainer.image_url}
                          alt={trainer.name}
                          className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Abstract Gradient for No Image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-neutralDark to-secondary/10 opacity-100 z-0"></div>

                      {/* Decorative Large Watermark Icon */}
                      <div className="absolute -right-12 -bottom-12 text-white/5 rotate-12 transform scale-150">
                        <User size={200} />
                      </div>

                      {/* Glowing orbs */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[50px]"></div>
                    </>
                  )}

                  {/* Card Content - Fixed Layout */}
                  <div className="relative z-10 flex flex-col items-center h-full w-full pt-6 pb-2">

                    {/* Top Area: Avatar or Spacer - Fixed Height */}
                    <div className="h-24 mb-4 flex items-center justify-center">
                      {!hasImage ? (
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/20">
                          <User size={40} />
                        </div>
                      ) : (
                        // Empty spacer to match avatar height, pushing text down to same level
                        <div className="w-24 h-24"></div>
                      )}
                    </div>

                    {/* Middle Area: Text Info - Start from top */}
                    <div className="flex-grow flex flex-col items-center justify-start w-full pt-2">
                      {/* Name - Fixed height to ensure alignment of text below despite line wrapping */}
                      <div className="h-16 mb-2 flex items-center justify-center w-full">
                        <h3 className={`font-display font-bold leading-none text-center px-2 ${hasImage ? 'text-2xl md:text-3xl text-white' : 'text-2xl md:text-3xl text-white'}`}>
                          {trainer.name}
                        </h3>
                      </div>

                      {/* Role removed as requested */}

                      <div className="px-2 w-full mt-2">
                        <p className={`text-sm italic line-clamp-3 leading-relaxed ${hasImage ? 'text-gray-300' : 'text-gray-400'}`}>
                          "{trainer.motto}"
                        </p>
                      </div>
                    </div>

                    {/* Bottom Area: Action Button */}
                    <div className={`mt-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all flex-shrink-0
                      ${hasImage
                        ? 'border-white/30 text-white group-hover:bg-primary group-hover:border-primary'
                        : 'border-white/10 text-gray-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white'
                      }`}>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Padding div to allow last item to be centered/visible */}
          <div className="min-w-[1rem] md:min-w-[4rem]"></div>
        </div>
      </div>

      {/* Grid Modal Overlay (Detailed View) */}
      {showAll && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-500"></div>

          <div className="bg-white dark:bg-gray-900 w-full h-full max-w-[95vw] max-h-[95vh] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/20 flex flex-col">
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-20 border-b border-gray-200 dark:border-white/10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Visi treneriai</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm hidden md:block">Susipažinkite su mūsų profesionalų komanda</p>
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8 pt-32 md:pt-40 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trainersList.map((trainer, index) => {
                  const hasImage = shouldShowImage(trainer);

                  return (
                    <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className={`group rounded-[2rem] p-6 border flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 cursor-pointer relative overflow-hidden
                        ${hasImage
                          ? 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5'
                          : 'bg-neutralDark border-white/5'
                        }`}
                        onClick={() => {
                          setSelectedTrainer(trainer);
                          setShowAll(false);
                        }}
                      >
                        {/* Grid Image (Conditional) */}
                        {hasImage ? (
                          <>
                            <div className="absolute inset-0 z-0">
                              <img src={trainer.image_url} alt={trainer.name} className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Grid Abstract BG */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-neutralDark to-secondary/5 opacity-100 z-0"></div>
                            <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12">
                              <User size={120} />
                            </div>
                          </>
                        )}

                        <div className="relative z-10 flex flex-col h-full">

                          {/* Header: User Icon / Arrow */}
                          <div className="flex items-start justify-between mb-4">
                            {!hasImage ? (
                              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-primary">
                                <User size={24} />
                              </div>
                            ) : (
                              // Spacer if image visible to allow arrow to be seen? 
                              // Actually if image visible, we might not want the user icon blocking the face.
                              // Let's just put the arrow top right.
                              <div className="w-12 h-12"></div>
                            )}

                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors
                                    ${hasImage
                                ? 'border-white/30 text-white bg-black/20 backdrop-blur-sm'
                                : 'border-white/10 text-gray-400 group-hover:bg-primary group-hover:text-white'
                              }`}>
                              <ArrowRight size={14} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="mt-auto">
                            <h3 className={`font-display text-2xl font-bold mb-1 leading-none ${hasImage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                              {trainer.name}
                            </h3>
                            <p className={`font-bold uppercase tracking-widest text-[10px] mb-4 ${hasImage ? 'text-secondary' : 'text-primary'}`}>
                              {trainer.role}
                            </p>

                            <div className={`mt-auto pt-4 border-t ${hasImage ? 'border-white/20' : 'border-gray-100 dark:border-white/5'}`}>
                              <p className={`text-sm italic line-clamp-2 ${hasImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                "{trainer.motto}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single Trainer Modal Overlay (Detail View) */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity animate-in fade-in duration-500"
            onClick={() => setSelectedTrainer(null)}
          ></div>

          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 flex flex-col border border-white/10 max-h-[85vh] md:max-h-[90vh]">

            <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-start z-50 pointer-events-none">
              <div className="pointer-events-auto">
                {/* Navigation controls could go here if needed */}
              </div>
              <button
                onClick={() => setSelectedTrainer(null)}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-lg group pointer-events-auto"
                aria-label="Close modal"
              >
                <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 md:p-16 flex flex-col items-center text-center relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Background Decor */}
              <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl w-full animate-in slide-in-from-bottom-4 duration-500 pt-8 md:pt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6">
                  {selectedTrainer.role}
                </div>

                <h3 className="font-display text-3xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-none tracking-tight mb-4 md:mb-8">
                  {selectedTrainer.name}
                </h3>

                <div className="relative mb-8 md:mb-12">
                  <p className="text-lg md:text-3xl text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed px-2">
                    "{selectedTrainer.motto}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left mb-8 md:mb-12">
                  <div className="bg-gray-50 dark:bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5">
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 md:mb-2 font-bold">Išsilavinimas</p>
                    <p className="text-gray-900 dark:text-white font-medium text-sm md:text-lg leading-snug">{selectedTrainer.education}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5">
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 md:mb-2 font-bold">Darbo vieta</p>
                    <p className="text-gray-900 dark:text-white font-medium text-sm md:text-lg leading-snug">{selectedTrainer.location}</p>
                  </div>
                </div>

                {selectedTrainer.achievements && (
                  <div className="text-left mb-8 md:mb-12 bg-gray-50 dark:bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5">
                    <h5 className="flex items-center gap-2 text-primary font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
                      <Award size={16} className="md:w-[18px] md:h-[18px]" /> Pasiekimai
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed">{selectedTrainer.achievements}</p>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedTrainer(null);
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-accent text-white text-base md:text-xl font-bold py-3 px-8 md:py-4 md:px-12 rounded-full hover:bg-accent/90 hover:scale-105 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center"
                  >
                    Registruotis treniruotei
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>

                {/* Nav Buttons (Hidden on mobile) */}
                <div className="absolute top-1/2 -left-24 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto">
                  <button onClick={handlePrev} className="w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group">
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="absolute top-1/2 -right-24 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto">
                  <button onClick={handleNext} className="w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group">
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Mobile Navigation (Visible only on mobile) */}
                <div className="flex md:hidden items-center justify-between w-full mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-medium text-xs p-2 -ml-2"
                  >
                    <ChevronLeft size={16} />
                    <span>Ankstesnis</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-medium text-xs p-2 -mr-2"
                  >
                    <span>Kitas</span>
                    <ChevronRight size={16} />
                  </button>
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