
import { useThemeStore } from '../store/theme-store';
import { SunMedium, Moon } from 'lucide-react';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunMedium
          className='w-5 h-5'	
        />
      ) : (
        <Moon
          className='w-5 h-5'
        />
      )}
    </button>
  );
}

export default ThemeToggle;
