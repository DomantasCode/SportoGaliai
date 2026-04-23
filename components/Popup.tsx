import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const EVENT_URL = 'https://forms.gle/sZ9T5utNqdnEip739';
const STORAGE_KEY = 'jududuPopupShownCount';
const MAX_VIEWS = 4;
const DELAY_MS = 4000;
// Hide popup after end of event day (local time)
const EVENT_END = new Date('2026-04-27T00:00:00');

const Popup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    useEffect(() => {
        if (Date.now() >= EVENT_END.getTime()) return;

        const storedCount = localStorage.getItem(STORAGE_KEY);
        const viewCount = storedCount ? parseInt(storedCount, 10) : 0;

        if (viewCount >= MAX_VIEWS) return;

        const timer = setTimeout(() => {
            if (!hasBeenClosed) {
                setIsVisible(true);
                localStorage.setItem(STORAGE_KEY, (viewCount + 1).toString());
            }
        }, DELAY_MS);

        return () => clearTimeout(timer);
    }, [hasBeenClosed]);

    const handleClose = () => {
        setIsVisible(false);
        setHasBeenClosed(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
                {/* Glow layers */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-secondary rounded-[2.5rem] blur-2xl opacity-50 animate-pulse" />
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-accent to-secondary rounded-[2.5rem] opacity-80" />

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#1a0b2e] via-[#2a1048] to-[#0f0620] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    {/* Decorative orbs */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        aria-label="Uždaryti"
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all hover:rotate-90 duration-300 border border-white/10"
                    >
                        <X size={18} />
                    </button>

                    {/* Content */}
                    <div className="relative px-7 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10">
                        {/* Brand strip */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[3px] w-10 bg-secondary rounded-full" />
                            <div className="flex items-center gap-2 text-secondary font-black tracking-[0.25em] text-[11px] uppercase">
                                <Sparkles size={12} />
                                <span>Jududu × Sporto galia</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tight mb-2">
                            Šeimos,
                        </h3>
                        <h3 className="font-display text-4xl md:text-5xl font-black leading-[0.95] tracking-tight mb-5">
                            <span className="bg-gradient-to-r from-secondary via-secondary to-accent bg-clip-text text-transparent">
                                judam kartu!
                            </span>{' '}
                            <span>💛</span>
                        </h3>

                        {/* Description */}
                        <p className="text-white/75 text-[15px] md:text-base leading-relaxed mb-7">
                            Aktyvus šeimų renginys, kuriame svarbiausia – judesys, bendrystė ir geras laikas
                            kartu. Estafetės, komandiniai iššūkiai, dovanos ir daug juoko.
                        </p>

                        {/* Event details grid */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-7">
                            <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-3 md:p-4 backdrop-blur-sm">
                                <Calendar size={16} className="text-secondary mb-2" />
                                <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-0.5">
                                    Data
                                </div>
                                <div className="text-white font-bold text-sm md:text-base leading-tight">
                                    Bal. 26 d.
                                </div>
                            </div>
                            <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-3 md:p-4 backdrop-blur-sm">
                                <Clock size={16} className="text-secondary mb-2" />
                                <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-0.5">
                                    Laikas
                                </div>
                                <div className="text-white font-bold text-sm md:text-base leading-tight">
                                    10:00
                                </div>
                            </div>
                            <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-3 md:p-4 backdrop-blur-sm">
                                <MapPin size={16} className="text-secondary mb-2" />
                                <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-0.5">
                                    Vieta
                                </div>
                                <div className="text-white font-bold text-sm md:text-base leading-tight">
                                    Aerottoria
                                </div>
                            </div>
                        </div>

                        {/* CTA button */}
                        <a
                            href={EVENT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClose}
                            className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-accent to-primary p-[2px] shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-[1.02]"
                        >
                            <div className="relative bg-gradient-to-r from-accent to-primary rounded-[14px] px-6 py-4 flex items-center justify-center gap-3">
                                <span className="text-white font-black text-base md:text-lg tracking-wide uppercase">
                                    Registruotis
                                </span>
                                <span className="text-xl group-hover:translate-x-1 transition-transform">
                                    🚀
                                </span>
                            </div>
                        </a>

                        {/* Footer note */}
                        <p className="mt-4 text-center text-white/40 text-xs">
                            * Vietų skaičius ribotas — registruokitės iš anksto
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
