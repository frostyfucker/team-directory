import React from 'react';
import { TeamMember } from '../types';
import { BriefcaseIcon, TagIcon } from './icons';

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onSelect }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-blue-500/20 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden transform hover:-translate-y-1"
      onClick={() => onSelect(member)}
    >
      <div className="h-40 sm:h-48 w-full bg-gray-100 dark:bg-gray-700">
        <img className="object-cover h-full w-full" src={member.picUrl} alt={member.name} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
          <BriefcaseIcon className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
          <span>{member.profession}</span>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-3">
            {member.groups.map(group => (
                 <div key={group} className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-900/50 rounded-full px-2 py-0.5">
                    <TagIcon className="h-3 w-3 mr-1.5" />
                    <span>{group}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;