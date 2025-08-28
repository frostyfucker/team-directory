import React, { useMemo } from 'react';
import { TeamMember } from '../types';
import { UsersIcon, TagIcon } from './icons';

interface DashboardProps {
    members: TeamMember[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; children?: React.ReactNode }> = ({ title, value, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-full">
                {icon}
            </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ members }) => {
    const stats = useMemo(() => {
        const totalMembers = members.length;
        const allGroups = members.flatMap(m => m.groups);
        const uniqueGroups = new Set(allGroups);
        const membersPerGroup: { [key: string]: number } = {};
        allGroups.forEach(group => {
            membersPerGroup[group] = (membersPerGroup[group] || 0) + 1;
        });

        // Sort groups by member count descending
        const sortedGroups = Object.entries(membersPerGroup).sort(([, a], [, b]) => b - a);

        return {
            totalMembers,
            totalGroups: uniqueGroups.size,
            sortedGroups
        };
    }, [members]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Team Members" value={stats.totalMembers} icon={<UsersIcon className="h-6 w-6" />} />
                <StatCard title="Unique Groups" value={stats.totalGroups} icon={<TagIcon className="h-6 w-6" />} />
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Members per Group</h3>
                    <div className="mt-3 space-y-2">
                        {stats.sortedGroups.length > 0 ? stats.sortedGroups.slice(0, 4).map(([group, count]) => (
                            <div key={group} className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{group}</span>
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">{count}</span>
                            </div>
                        )) : (
                             <p className="text-sm text-gray-400 dark:text-gray-500">No groups assigned yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;