'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
    >
      {theme === 'dark'
        ? <Sun size={14} strokeWidth={1.5} />
        : <Moon size={14} strokeWidth={1.5} />
      }
    </button>
  );
}
