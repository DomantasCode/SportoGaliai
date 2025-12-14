import React, { useState } from 'react';
import { FAQ } from '../constants.tsx';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-dark relative">
      {/* Decorative background shape */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side - Sticky Header & CTA */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm mb-4">
                <HelpCircle size={18} />
                <span>Informacija</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Dažniausiai <br/> užduodami klausimai
              </h2>

              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Surinkome atsakymus į klausimus, kurie dažniausiai kyla tėveliams prieš pradedant lankyti mūsų akademiją.
              </p>

              {/* Contact CTA Card */}
              <div className="bg-neutralDark p-8 rounded-3xl shadow-xl shadow-black/20 border border-white/10 relative overflow-hidden group hover:bg-white hover:border-primary/20 transition-all duration-300">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 group-hover:bg-secondary/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-110"></div>

                 <div className="relative z-10">
                   <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary group-hover:text-primary mb-4 transition-colors">
                     <MessageCircle size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white group-hover:text-primary mb-2 transition-colors">Nerandate atsakymo?</h3>
                   <p className="text-gray-400 group-hover:text-gray-500 mb-6 text-sm transition-colors">
                     Mielai atsakysime į visus papildomus klausimus telefonu arba el. paštu.
                   </p>
                   <a
                    href="#contact-form"
                    className="inline-flex items-center text-secondary group-hover:text-primary font-bold border-b-2 border-secondary/30 hover:border-secondary transition-all pb-1"
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
                  className={`group rounded-2xl transition-all duration-300 ${
                      isOpen
                        ? 'bg-gray-100 shadow-lg ring-1 ring-white/10'
                        : 'bg-neutralDark hover:bg-gray-800 shadow-sm hover:shadow-md border border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-start p-6 md:p-8 text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                      {item.question}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-secondary rotate-180' : 'bg-white/10 text-secondary group-hover:bg-secondary group-hover:text-primary'}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  
                  <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
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