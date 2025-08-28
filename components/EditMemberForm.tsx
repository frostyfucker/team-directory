import React, { useState, useEffect, useRef } from 'react';
import { TeamMember } from '../types';
import { CloseIcon, MagicWandIcon, UploadIcon } from './icons';
import Spinner from './Spinner';
import { generateDescription, generateAvatar } from '../services/geminiService';

interface EditMemberFormProps {
  member: TeamMember | null;
  onSave: (member: TeamMember) => void;
  onClose: () => void;
}

const EditMemberForm: React.FC<EditMemberFormProps> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    profession: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    picUrl: '',
    groups: [],
  });
  const [id, setId] = useState<string>(member?.id || Date.now().toString());

  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [groupInput, setGroupInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        profession: member.profession,
        phone: member.phone,
        email: member.email || '',
        website: member.website || '',
        description: member.description,
        picUrl: member.picUrl,
        groups: member.groups,
      });
      setId(member.id);
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addGroup = (group: string) => {
    const newGroup = group.trim();
    if (newGroup && !formData.groups.includes(newGroup)) {
      setFormData(prev => ({ ...prev, groups: [...prev.groups, newGroup] }));
    }
    setGroupInput('');
  };

  const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addGroup(groupInput);
    }
  };

  const handleGroupInputBlur = () => {
    addGroup(groupInput);
  };
  
  const removeGroup = (groupToRemove: string) => {
    setFormData(prev => ({ ...prev, groups: prev.groups.filter(g => g !== groupToRemove) }));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, picUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.profession) {
      alert('Please enter a profession first.');
      return;
    }
    setIsGeneratingDesc(true);
    const description = await generateDescription(formData.profession);
    setFormData(prev => ({ ...prev, description }));
    setIsGeneratingDesc(false);
  };

  const handleGenerateAvatar = async () => {
    if (!formData.profession) {
        alert('Please enter a profession first.');
        return;
    }
    setIsGeneratingAvatar(true);
    const avatarUrl = await generateAvatar(formData.profession);
    if (avatarUrl) {
        setFormData(prev => ({ ...prev, picUrl: avatarUrl }));
    }
    setIsGeneratingAvatar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-50 flex justify-center items-start p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl my-4 sm:my-8 transform transition-all">
        <div className="p-4 sm:p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {member ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {isGeneratingAvatar ? (
                    <Spinner />
                ) : formData.picUrl ? (
                  <img src={formData.picUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">No Image</span>
                )}
              </div>
              <div className="w-full sm:w-auto flex-grow space-y-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <button 
                  type="button" 
                  onClick={handleImageUploadClick}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
                >
                  <UploadIcon className="h-5 w-5 mr-2" />
                  Upload Image
                </button>
                <button 
                  type="button" 
                  onClick={handleGenerateAvatar} 
                  disabled={isGeneratingAvatar || !formData.profession}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MagicWandIcon className="h-5 w-5 mr-2" />
                  {isGeneratingAvatar ? 'Generating...' : 'Generate AI Avatar'}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Upload an image or generate one based on the member's profession.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</label>
                <input type="text" name="profession" id="profession" value={formData.profession} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
               <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>

               <div className="md:col-span-2">
                    <label htmlFor="group-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Groups / Categories</label>
                    <div className="mt-1 flex flex-wrap items-center gap-2 p-2 w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 dark:bg-gray-700 dark:border-gray-600">
                        {formData.groups.map(group => (
                            <div key={group} className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium pl-2.5 pr-1 py-1 rounded-full">
                                {group}
                                <button type="button" onClick={() => removeGroup(group)} className="ml-1.5 flex-shrink-0 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white">
                                    <span className="sr-only">Remove {group}</span>
                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" /></svg>
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            id="group-input"
                            value={groupInput}
                            onChange={(e) => setGroupInput(e.target.value)}
                            onKeyDown={handleGroupKeyDown}
                            onBlur={handleGroupInputBlur}
                            placeholder={formData.groups.length === 0 ? "Type a group and press Enter" : "Add another group..."}
                            className="flex-grow bg-transparent border-none focus:ring-0 p-0 text-sm dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <div className="relative mt-1">
                <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDesc || !formData.profession}
                  className="absolute bottom-2 right-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isGeneratingDesc ? <Spinner size="sm" /> : <MagicWandIcon className="h-4 w-4 mr-1"/>}
                  {isGeneratingDesc ? '' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0 rounded-b-lg">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit" className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberForm;