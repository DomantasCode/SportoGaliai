import React from 'react';
import { TESTIMONIALS } from '../constants.tsx';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-neutralDark transition-colors duration-300 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
            </div>
            <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ką kalba tėveliai?</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-bold text-primary">500+</span>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">šeimų pasirinko mus</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-bold text-primary">10 m.</span>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">patirties dirbant su vaikais</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="bg-white dark:bg-gray-100 p-8 rounded-3xl shadow-sm relative hover:bg-white transition-colors duration-300">
                                <Quote className="text-primary/20 absolute top-6 right-6" size={48} />
                                <div className="flex gap-1 mb-4 text-primary">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                                <div>
                                    <p className="font-bold text-primary">{t.author}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;