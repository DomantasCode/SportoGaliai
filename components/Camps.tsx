import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  ArrowRight,
  ExternalLink,
  Users,
  Trophy,
  Sparkles,
  Leaf,
  ChevronDown
} from 'lucide-react';
import { CAMPS, CAMP_DESCRIPTION, CAMP_BENEFITS, CAMP_PROGRAM } from '../constants.tsx';
import { Camp, CampAccent } from '../types.ts';

type ModalMode = 'register' | 'program' | null;

const ACCENT: Record<CampAccent, {
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  hoverBorder: string;
  glow: string;
  from: string;
  to: string;
  btnBg: string;
  btnHover: string;
  chipBg: string;
  chipText: string;
}> = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary',
    bgSoft: 'bg-primary/10',
    border: 'border-primary/20',
    hoverBorder: 'hover:border-primary/50',
    glow: 'shadow-primary/30',
    from: 'from-primary',
    to: 'to-primary/70',
    btnBg: 'bg-primary',
    btnHover: 'hover:bg-primary/90',
    chipBg: 'bg-primary/15',
    chipText: 'text-primary'
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary',
    bgSoft: 'bg-secondary/10',
    border: 'border-secondary/30',
    hoverBorder: 'hover:border-secondary/60',
    glow: 'shadow-secondary/30',
    from: 'from-secondary',
    to: 'to-secondary/60',
    btnBg: 'bg-secondary',
    btnHover: 'hover:bg-secondary/90',
    chipBg: 'bg-secondary/15',
    chipText: 'text-[#3d8f00] dark:text-secondary'
  },
  accent: {
    text: 'text-accent',
    bg: 'bg-accent',
    bgSoft: 'bg-accent/10',
    border: 'border-accent/25',
    hoverBorder: 'hover:border-accent/60',
    glow: 'shadow-accent/30',
    from: 'from-accent',
    to: 'to-accent/70',
    btnBg: 'bg-accent',
    btnHover: 'hover:bg-accent/90',
    chipBg: 'bg-accent/15',
    chipText: 'text-accent'
  }
};

const BENEFIT_ICONS = [Users, Trophy, Sparkles, Leaf];

interface CampCardProps {
  camp: Camp;
  onRegister: (camp: Camp) => void;
  onProgram: (camp: Camp) => void;
}

const CampCard: React.FC<CampCardProps> = ({ camp, onRegister, onProgram }) => {
  const a = ACCENT[camp.accent];

  return (
    <div
      className={`group relative bg-white dark:bg-white/5 rounded-[2rem] border ${a.border} ${a.hoverBorder} p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${a.glow}`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r ${a.from} ${a.to}`} />

      {/* Month chip */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest ${a.chipBg} ${a.chipText}`}>
          <Calendar size={11} />
          {camp.month}
        </span>
      </div>

      {/* Date range — big */}
      <div className="mb-6 md:mb-8">
        <div className={`font-display text-5xl md:text-6xl font-black leading-none tracking-tight text-gray-900 dark:text-white mb-2`}>
          {camp.dateRange.split('–')[0].trim()}
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-[2px] w-6 ${a.bg}`} />
          <div className="text-sm font-bold text-gray-500 dark:text-gray-400">iki</div>
          <div className={`font-display text-xl md:text-2xl font-black ${a.text}`}>
            {camp.dateRange.split('–')[1]?.trim()}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-2.5 mb-8 text-sm text-gray-600 dark:text-gray-300">
        <li className="flex items-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${a.bg} mt-1.5 flex-shrink-0`} />
          5 dienų programa, 08:30–17:00
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${a.bg} mt-1.5 flex-shrink-0`} />
          Futbolas, krepšinis, tenisas, atletika, HYROX Kids
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${a.bg} mt-1.5 flex-shrink-0`} />
          Maitinimas įskaičiuotas
        </li>
      </ul>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <button
          onClick={() => onRegister(camp)}
          className={`w-full ${a.btnBg} ${a.btnHover} text-white font-bold py-3.5 rounded-xl shadow-lg ${a.glow} transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
        >
          <span>Registruotis</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => onProgram(camp)}
          className={`w-full border ${a.border} ${a.hoverBorder} ${a.text} font-bold py-3 rounded-xl hover:${a.bgSoft} transition-all flex items-center justify-center gap-2`}
        >
          <span>Peržiūrėti programą</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

const Camps: React.FC = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  const openRegister = (camp: Camp) => {
    setSelectedCamp(camp);
    setModalMode('register');
  };

  const openProgram = (camp: Camp) => {
    setSelectedCamp(camp);
    setModalMode('program');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedCamp(null);
  };

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalMode]);

  // ESC to close
  useEffect(() => {
    if (!modalMode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalMode]);

  const accent = selectedCamp ? ACCENT[selectedCamp.accent] : ACCENT.primary;

  return (
    <section
      id="camps"
      className="py-16 md:py-32 bg-gray-50 dark:bg-neutralDark relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-secondary" />
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              Vasaros stovyklos
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
            Aktyvus vaikas –<br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              laimingas vaikas
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {CAMP_DESCRIPTION}
          </p>
        </div>

        {/* Camp cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {CAMPS.map((camp) => (
            <CampCard
              key={camp.id}
              camp={camp}
              onRegister={openRegister}
              onProgram={openProgram}
            />
          ))}
        </div>

        {/* Benefits row */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Ką vaikai lavina stovykloje?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CAMP_BENEFITS.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i] || Users;
              return (
                <div
                  key={benefit.title}
                  className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalMode && selectedCamp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeModal}
          />

          {/* Content */}
          <div className="relative z-10 bg-white dark:bg-gray-900 w-full md:w-[90vw] md:max-w-4xl h-[100dvh] md:h-auto md:max-h-[90vh] md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 flex flex-col">
            {/* Header */}
            <div className={`relative px-6 md:px-10 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-gray-200 dark:border-white/10 bg-gradient-to-br ${accent.from} ${accent.to}`}>
              <button
                onClick={closeModal}
                aria-label="Uždaryti"
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all hover:rotate-90 duration-300"
              >
                <X size={18} />
              </button>
              <div className="text-white/80 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                {modalMode === 'register' ? 'Registracija' : 'Stovyklos programa'}
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                {selectedCamp.month}
              </h3>
              <div className="text-white/90 font-bold text-base md:text-lg mt-1">
                {selectedCamp.dateRange}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {modalMode === 'register' ? (
                <div className="flex flex-col h-full">
                  <div className="px-6 md:px-10 py-4 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Registracija tvarkoma per <strong>ExoClass</strong> sistemą.
                    </p>
                    <a
                      href={selectedCamp.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${accent.text} font-bold text-sm hover:underline`}
                    >
                      Atidaryti naujame lange
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <iframe
                    src={selectedCamp.registerUrl}
                    title={`ExoClass registracija — ${selectedCamp.dateRange}`}
                    className="w-full flex-1 min-h-0 md:min-h-[600px] border-0 bg-white"
                    allow="payment"
                  />
                </div>
              ) : (
                <div className="px-6 md:px-10 py-6 md:py-10 space-y-6 md:space-y-8">
                  {CAMP_PROGRAM.map((day) => (
                    <div key={day.day} className="relative">
                      <div className="flex items-baseline gap-4 mb-4">
                        <div className={`font-display text-4xl md:text-5xl font-black ${accent.text} leading-none`}>
                          {day.day}
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            Diena
                          </div>
                          <h4 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            {day.title}
                          </h4>
                        </div>
                      </div>
                      <div className="pl-0 md:pl-16">
                        <ul className="space-y-2">
                          {day.slots.map((slot, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-4 py-2 border-b border-gray-100 dark:border-white/5 last:border-0"
                            >
                              <span className={`font-mono text-sm font-bold ${accent.text} min-w-[100px] md:min-w-[120px] pt-0.5`}>
                                {slot.time}
                              </span>
                              <span className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
                                {slot.activity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}

                  {/* CTA at bottom of program */}
                  <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                    <button
                      onClick={() => setModalMode('register')}
                      className={`w-full ${accent.btnBg} ${accent.btnHover} text-white font-bold py-4 rounded-xl shadow-lg ${accent.glow} transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2`}
                    >
                      <span>Registruotis į šią stovyklą</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Camps;
