import { useThemeStore } from '../store/theme-store';
import { SunMedium, Moon } from 'lucide-react';
import { Button } from './ui/button';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <Button
      size={'icon'}
      onClick={toggleDarkMode}
      className='cursor-pointer'
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunMedium className='w-5 h-5' />
      ) : (
        <Moon className='w-5 h-5' />
      )}
    </Button>
  );
}

export default ThemeToggle;
