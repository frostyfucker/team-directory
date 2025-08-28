import React from 'react';
import { TeamMember } from '../types';
import { BriefcaseIcon, TagIcon } from './icons';

interface TeamMemberListItemProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

const TeamMemberListItem: React.FC<TeamMemberListItemProps> = ({ member, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(member)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-blue-500/20 border border-transparent dark:hover:border-blue-500/30 transition-all duration-300 ease-in-out cursor-pointer flex items-center p-3 sm:p-4 space-x-3 sm:space-x-4"
    >
      <img className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover flex-shrink-0" src={member.picUrl} alt={member.name} />
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">{member.name}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <BriefcaseIcon className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="truncate">{member.profession}</span>
        </div>
      </div>
       <div className="hidden sm:flex items-center flex-wrap gap-2 justify-end flex-shrink-0 max-w-xs">
          {member.groups.map(group => (
               <div key={group} className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-900/50 rounded-full px-2 py-0.5">
                  <TagIcon className="h-3 w-3 mr-1.5" />
                  <span>{group}</span>
              </div>
          ))}
      </div>
    </div>
  );
};

export default TeamMemberListItem;