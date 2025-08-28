import React from 'react';
import { SunIcon, MoonIcon, DownloadIcon, PlusIcon } from './icons';

interface HeaderProps {
  onAddMember: () => void;
  onExportCSV: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddMember, onExportCSV, theme, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Team Directory
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-3">
           <button
            onClick={onExportCSV}
            className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
            aria-label="Export to CSV"
          >
            <DownloadIcon className="h-5 w-5" />
          </button>
           <button
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={onAddMember}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Add New Member</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;