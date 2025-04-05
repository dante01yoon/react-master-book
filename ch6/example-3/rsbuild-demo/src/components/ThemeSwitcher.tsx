import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-card shadow-sm">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md hover:bg-accent"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
      
      <div className="h-6 w-px bg-border"></div>
      
      <div className="flex space-x-1">
        <ThemeButton
          theme="light"
          currentTheme={theme}
          onClick={() => setTheme('light')}
          className="bg-[#f8fafc]"
          disabled={theme === 'dark'}
        />
        <ThemeButton
          theme="blue"
          currentTheme={theme}
          onClick={() => setTheme('blue')}
          className="bg-blue-500"
          disabled={theme === 'dark'}
        />
        <ThemeButton
          theme="green"
          currentTheme={theme}
          onClick={() => setTheme('green')}
          className="bg-green-500"
          disabled={theme === 'dark'}
        />
        <ThemeButton
          theme="purple"
          currentTheme={theme}
          onClick={() => setTheme('purple')}
          className="bg-purple-500"
          disabled={theme === 'dark'}
        />
      </div>
    </div>
  );
};

interface ThemeButtonProps {
  theme: string;
  currentTheme: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  currentTheme,
  onClick,
  className,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-6 h-6 rounded-full flex items-center justify-center
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-ring'}
        ${currentTheme === theme ? 'ring-2 ring-ring' : ''}
      `}
      aria-label={`Switch to ${theme} theme`}
    >
      {currentTheme === theme && (
        <CheckIcon className="h-3 w-3 text-foreground" />
      )}
    </button>
  );
};

// Simple icon components
const Sun = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const Moon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ThemeSwitcher; 