import React, { useMemo, useState, useEffect } from 'react';
import { SPONSORS } from '../constants.tsx';
import { Sponsor } from '../types.ts';

// --- Utils ---
/**
 * Fisher-Yates shuffle algorithm to randomize array elements.
 * @param array The array to shuffle.
 * @returns A new shuffled array instance.
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Sub-components ---

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => (
  <div
    className="group relative w-40 h-20 md:w-48 md:h-24 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl p-4 hover:bg-white/90 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer mr-8 md:mr-16"
  >
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className={`max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ${sponsor.name === 'MozeTech' ? 'scale-150' : ''}`}
      loading="lazy"
    />
  </div>
);

interface MarqueeGroupProps {
  sponsors: Sponsor[];
  scaleFactor?: number; // How calls we repeat the list to ensure width
  ariaHidden?: boolean;
}

const MarqueeGroup: React.FC<MarqueeGroupProps> = ({ sponsors, scaleFactor = 3, ariaHidden = false }) => {
  // Create a long list by repeating the sponsors list `scaleFactor` times
  const displayList = useMemo(() => {
    return Array(scaleFactor).fill(sponsors).flat();
  }, [sponsors, scaleFactor]);

  return (
    <div className="flex shrink-0" aria-hidden={ariaHidden}>
      {displayList.map((sponsor, index) => (
        <SponsorCard
          key={`${ariaHidden ? 'copy' : 'original'}-${index}`}
          sponsor={sponsor}
        />
      ))}
    </div>
  );
};

// --- Main Component ---

const Sponsors: React.FC = () => {
  const [randomizedSponsors, setRandomizedSponsors] = useState<Sponsor[]>(SPONSORS);

  useEffect(() => {
    setRandomizedSponsors(shuffleArray(SPONSORS));
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mūsų draugai ir partneriai</h2>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex w-max animate-marquee-fast md:animate-marquee whitespace-nowrap items-center">
            {/* First Set (Original) */}
            <MarqueeGroup sponsors={randomizedSponsors} />

            {/* Second Set (Duplicate for Loop) */}
            <MarqueeGroup sponsors={randomizedSponsors} ariaHidden={true} />
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-dark to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Sponsors;