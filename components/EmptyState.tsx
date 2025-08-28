import React from 'react';
import { SearchIcon } from './icons';

interface EmptyStateProps {
    title?: string;
    message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
    title = "No Members Found", 
    message = "Try adjusting your search or filter to find what you're looking for." 
}) => {
    return (
        <div className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700">
                <SearchIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    );
};

export default EmptyState;