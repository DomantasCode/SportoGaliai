import React, { useState, useRef } from 'react';
import { Star, ShieldCheck, Users, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const Benefits: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling play when clicking mute
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // Reset video to start if unmuting
      if (newMutedState === false) {
        videoRef.current.currentTime = 0;
        if (!isPlaying) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="about" className="py-12 md:py-32 bg-gray-50 dark:bg-neutralDark relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* Video Side (Left) */}
          <div className="w-full md:w-5/12 relative group">
            {/* Abstract Shape Behind (Commented out per request)
            <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-6 scale-95 opacity-20 group-hover:rotate-3 transition-transform duration-700 ease-in-out"></div>
            <div className="absolute inset-0 bg-secondary rounded-[3rem] -rotate-3 scale-95 opacity-5 group-hover:-rotate-1 transition-transform duration-700 ease-in-out"></div>
            */}


            {/* Video Container */}
            <div className="relative aspect-[9/16] md:aspect-[3/4] max-w-sm mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-50 dark:bg-gray-100 border-4 border-white dark:border-white/10">
              <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                autoPlay
                muted={isMuted}
                playsInline
                onClick={togglePlay}
              >
                <source src="/benefits-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none transition-opacity duration-300"></div>

              {/* Controls */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                <button
                  onClick={toggleMute}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-white text-primary hover:bg-white/90 p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg"
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
              </div>

              {/* Central Play Button (only when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-[2px]">
                  <div className="bg-white/20 backdrop-blur-md p-6 rounded-full text-white animate-in zoom-in-50 duration-300">
                    <Play size={48} fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Large Unmute Button (only when playing and muted) */}
              {isPlaying && isMuted && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    onClick={toggleMute}
                    className="bg-white/90 backdrop-blur-md text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center gap-3 group animate-pulse hover:animate-none transform hover:scale-105"
                  >
                    <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Įjungti garsą
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Side (Right) */}
          <div className="w-full md:w-7/12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Apie Mus</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-none tracking-tight">
              Auginame <span className="text-primary">sveikus</span> ir savimi pasitikinčius vaikus
            </h2>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
              <p>
                „Sporto galia“ treniruotės – tai darbas su augančio vaiko judesiu: nuo kasdienių laikysenos įpročių iki tikslingo fizinio krūvio.
              </p>
              <p>
                Užsiėmimų metu stipriname raumenų balansą, stabilumą ir koordinaciją, formuojame taisyklingą judesį. Dirbame atsižvelgdami į vaiko amžių ir fizinį pasirengimą – tik taip judėjimas tampa saugus, o progresas – ilgalaikis. Čia sportas tampa geriausiu draugu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <ShieldCheck size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1">Saugumas</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Sertifikuota įranga ir kineziterapeutų priežiūra užtikrina saugų judėjimą.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <Users size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-1">Bendruomenė</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kuriame draugišką aplinką, kurioje šeimos susitinka ir auga kartu.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-accent/10 group min-w-[200px]"
            >
              Registruotis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;