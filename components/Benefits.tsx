import React, { useState, useRef } from 'react';
import { Star, ShieldCheck, Users, ArrowRight, Volume2 } from 'lucide-react';

const Benefits: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-gray-50 dark:bg-neutralDark relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Video Side (Left) */}
          <div className="w-full lg:w-5/12 relative group">
            {/* Abstract Shape Behind */}
            <div className="absolute inset-0 bg-secondary rounded-[3rem] rotate-6 scale-95 opacity-20 group-hover:rotate-3 transition-transform duration-700 ease-in-out"></div>
            <div className="absolute inset-0 bg-primary rounded-[3rem] -rotate-3 scale-95 opacity-5 group-hover:-rotate-1 transition-transform duration-700 ease-in-out"></div>
            
            {/* Video Container - Modified aspect ratio for shorter height (was 9/16, now 3/4) */}
            <div className="relative aspect-[5/6] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-50 dark:bg-gray-100">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                controls
              >
                <source src="/SnapInsta.to_AQOJ_kjUhdaL2KEihrqa7Oa8CA8WDLtGiRcn2fLNeu1M4vDtt8FW_cFzFywOUDFJsmqEX_yFTyvlYB-8wxSCjKFrd38TQTBqtX7RiUY.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <style>{`
                video:fullscreen {
                  object-fit: contain !important;
                }
                video:-webkit-full-screen {
                  object-fit: contain !important;
                }
                video:-moz-full-screen {
                  object-fit: contain !important;
                }
                video:-ms-fullscreen {
                  object-fit: contain !important;
                }
              `}</style>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

              {/* Unmute Button Overlay */}
              {isMuted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={handleUnmute}
                    className="pointer-events-auto bg-white/95 backdrop-blur-md text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-2xl flex items-center gap-3 group animate-pulse hover:animate-none"
                  >
                    <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Įjungti garsą
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Side (Right) */}
          <div className="w-full lg:w-7/12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Apie Mus</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-8 leading-[1.1]">
              Auginame <span className="text-secondary italic">sveikus</span> ir pasitikinčius vaikus
            </h2>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
              <p>
                „SportoGalia" – tai daugiau nei būrelis. Tai saugi erdvė, kurioje profesionali kineziterapija susitinka su vaikystės džiaugsmu. Mes tikime, kad kiekvienas vaikas yra čempionas savo unikaliu būdu.
              </p>
              <p>
                Mūsų metodika sukurta taip, kad vaikai stiprintų kūną, gerintų laikyseną ir lavintų koordinaciją per žaidimą, o ne per prievartą. Čia sportas tampa geriausiu draugu.
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