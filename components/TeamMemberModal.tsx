import React from 'react';
import { TeamMember } from '../types';
import { PhoneIcon, BriefcaseIcon, CloseIcon, EditIcon, TrashIcon, TagIcon, EnvelopeIcon, GlobeAltIcon } from './icons';

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-700 rounded-t-2xl">
            <img className="w-full h-full object-cover rounded-t-2xl" src={member.picUrl} alt={member.name} />
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 dark:bg-gray-900/70 rounded-full p-2 hover:bg-white dark:hover:bg-gray-900 transition-colors">
            <CloseIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{member.name}</h2>
          
          <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
              <span>{member.profession}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
              <a href={`tel:${member.phone}`} className="hover:underline">{member.phone}</a>
            </div>
            {member.email && (
                 <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                    <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                </div>
            )}
            {member.website && (
                <div className="flex items-center">
                    <GlobeAltIcon className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{member.website}</a>
                </div>
            )}
          </div>

          <div className="mt-6 flex items-center flex-wrap gap-2">
            {member.groups.map(group => (
                 <div key={group} className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-900/50 rounded-full px-2 py-1">
                    <TagIcon className="h-3 w-3 mr-1.5" />
                    <span>{group}</span>
                </div>
            ))}
        </div>

          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed border-t dark:border-gray-700 pt-6">{member.description}</p>
          
          <div className="mt-8 pb-4 sm:pb-0 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
            <button
              onClick={() => onEdit(member)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              <EditIcon className="h-5 w-5 mr-2" />
              Edit
            </button>
            <button
              onClick={() => onDelete(member.id)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-red-500"
            >
                <TrashIcon className="h-5 w-5 mr-2" />
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;