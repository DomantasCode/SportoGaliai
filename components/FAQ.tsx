import React, { useState } from 'react';
import { FAQ } from '../constants.tsx';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white dark:bg-dark relative transition-colors duration-300 overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      {/* Additional Purple Accent */}
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

      {/* User Requested: Subtle Green Accent */}
      <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-[250px] h-[250px] bg-primary/10 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Side - Sticky Header & CTA */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-secondary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">DUK</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-6 leading-none tracking-tight">
                Dažniausiai <br /> užduodami klausimai
              </h2>



              {/* Contact CTA Card */}
              <div className="bg-gray-50 dark:bg-neutralDark p-8 rounded-3xl shadow-xl shadow-black/20 border border-gray-200 dark:border-white/10 relative overflow-hidden group hover:bg-white hover:border-primary/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 group-hover:bg-primary/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-110"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:text-primary mb-4 transition-colors">
                    <MessageCircle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary mb-2 transition-colors">Nerandate atsakymo?</h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-500 mb-6 text-sm transition-colors">
                    Mielai atsakysime į visus jums rūpimus klausimus telefonu, el. paštu arba kontaktine forma apačioje.
                  </p>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center text-primary group-hover:text-primary font-bold border-b-2 border-primary/30 hover:border-primary transition-all pb-1"
                  >
                    Susisiekti su mumis
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Accordion Items */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`group rounded-2xl transition-all duration-300 ${isOpen
                    ? 'bg-white dark:bg-gray-100 shadow-lg ring-1 ring-white/10'
                    : 'bg-gray-50 dark:bg-neutralDark hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                >
                  <button
                    className="w-full flex justify-between items-start p-6 md:p-8 text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-gray-900 dark:text-white group-hover:text-primary'}`}>
                      {item.question}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 md:p-8 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;