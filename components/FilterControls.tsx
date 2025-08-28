import React from 'react';
import { SearchIcon, Squares2X2Icon, Bars3Icon } from './icons';

type ViewMode = 'grid' | 'list';

interface DirectoryControlsProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    groups: string[];
    selectedGroup: string;
    onGroupChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

const DirectoryControls: React.FC<DirectoryControlsProps> = ({
    searchQuery,
    onSearchChange,
    groups,
    selectedGroup,
    onGroupChange,
    viewMode,
    onViewModeChange
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by name or profession..."
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600"
                />
            </div>
            <div className="w-full md:w-auto flex items-center gap-4">
                 <select
                    value={selectedGroup}
                    onChange={onGroupChange}
                    className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 dark:border-gray-600"
                    aria-label="Filter by group"
                >
                    {groups.map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={`p-2.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        aria-label="List view"
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onViewModeChange('grid')}
                         className={`p-2.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                        aria-label="Grid view"
                    >
                        <Squares2X2Icon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DirectoryControls;