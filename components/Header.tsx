
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { AdminIcon } from './icons/AdminIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, onAdminClick }) => {
  return (
    <header className="p-4 sm:p-6 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/50 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-gray-800 dark:text-cyan-400 tracking-wider">
        Cyber Net <span className="text-cyan-500 dark:text-white">MBB</span>
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={onAdminClick}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Open Admin Panel"
        >
          <AdminIcon />
        </button>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
