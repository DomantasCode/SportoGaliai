import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-secondary transition-all duration-300 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon - visible in dark mode */}
        <Sun
          className={`absolute inset-0 text-secondary transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          }`}
          size={20}
        />
        {/* Moon Icon - visible in light mode */}
        <Moon
          className={`absolute inset-0 text-primary transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
          size={20}
        />
      </div>
    </button>
  );
};
