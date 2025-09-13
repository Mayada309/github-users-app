import { useThemeStore } from '../store/theme-store';
import { SunMedium, Moon } from 'lucide-react';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className='p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors'
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunMedium className='w-5 h-5' />
      ) : (
        <Moon className='w-5 h-5' />
      )}
    </button>
  );
}

export default ThemeToggle;
