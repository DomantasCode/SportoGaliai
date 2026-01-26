import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Popup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    useEffect(() => {
        // Check local storage for view count
        const storedCount = localStorage.getItem('popupShownCount');
        const viewCount = storedCount ? parseInt(storedCount, 10) : 0;

        if (viewCount >= 3) {
            return; // Don't show if already shown 3 times
        }

        // Show popup after 2 seconds if not closed before
        const timer = setTimeout(() => {
            if (!hasBeenClosed) {
                setIsVisible(true);
                // Increment view count
                localStorage.setItem('popupShownCount', (viewCount + 1).toString());
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [hasBeenClosed]);

    const handleClose = () => {
        setIsVisible(false);
        setHasBeenClosed(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose}></div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 animate-in zoom-in-95 duration-300 border border-primary/20">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center pt-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pirmoji treniruotė nieko nekainuos!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Registruokitės dabar ir išbandykite nemokamai.
                    </p>

                    <a
                        href="#registration"
                        onClick={handleClose}
                        className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02]"
                    >
                        Prisiregistruoti ir išbandyti
                    </a>

                    <p className="mt-4 text-xs text-gray-400">
                        * Pasiūlymas galioja tik naujiems klientams
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Popup;
