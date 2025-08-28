import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { TeamMember } from './types';
import { INITIAL_TEAM_MEMBERS } from './constants';
import Header from './components/Header';
import TeamMemberCard from './components/TeamMemberCard';
import TeamMemberModal from './components/TeamMemberModal';
import EditMemberForm from './components/EditMemberForm';
import DirectoryControls from './components/FilterControls';
import TeamMemberListItem from './components/TeamMemberListItem';
import Dashboard from './components/Dashboard';
import ConfirmationModal from './components/ConfirmationModal';
import EmptyState from './components/EmptyState';

type ViewMode = 'grid' | 'list';

const App: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSelectMember = useCallback((member: TeamMember) => {
    setSelectedMember(member);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  const handleOpenForm = useCallback((member: TeamMember | null) => {
    setSelectedMember(null);
    setEditingMember(member);
    setIsFormOpen(true);
  }, []);
  
  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingMember(null);
  }, []);

  const handleSaveMember = useCallback((memberToSave: TeamMember) => {
    setTeamMembers(prevMembers => {
      const existing = prevMembers.find(m => m.id === memberToSave.id);
      if (existing) {
        return prevMembers.map(m => m.id === memberToSave.id ? memberToSave : m);
      }
      return [memberToSave, ...prevMembers];
    });
    handleCloseForm();
  }, [handleCloseForm]);

  const handleRequestDelete = useCallback((id: string) => {
    setMemberToDelete(id);
    setIsDeleteModalOpen(true);
    setSelectedMember(null); // Close details modal when delete confirmation opens
  }, []);
  
  const handleConfirmDelete = useCallback(() => {
    if (memberToDelete) {
      setTeamMembers(prev => prev.filter(m => m.id !== memberToDelete));
    }
    setIsDeleteModalOpen(false);
    setMemberToDelete(null);
  }, [memberToDelete]);


  const handleExportCSV = useCallback(() => {
    if (teamMembers.length === 0) {
        alert("No team members to export.");
        return;
    }

    const headers = ["id", "name", "profession", "phone", "email", "website", "description", "groups"];
    const csvRows = [headers.join(',')];

    const escapeCSV = (str: string | undefined) => `"${(str || '').replace(/"/g, '""')}"`;

    teamMembers.forEach(member => {
        const row = [
            escapeCSV(member.id),
            escapeCSV(member.name),
            escapeCSV(member.profession),
            escapeCSV(member.phone),
            escapeCSV(member.email),
            escapeCSV(member.website),
            escapeCSV(member.description),
            escapeCSV(member.groups.join('; ')), // Join multiple groups
        ];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if(link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "team-directory.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }, [teamMembers]);

  const uniqueGroups = useMemo(() => {
    const allGroups = teamMembers.flatMap(m => m.groups);
    return ['All', ...Array.from(new Set(allGroups)).sort()];
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesGroup = filterGroup === 'All' || member.groups.includes(filterGroup);
      const lowerCaseQuery = searchQuery.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(lowerCaseQuery) ||
        member.profession.toLowerCase().includes(lowerCaseQuery) ||
        member.groups.some(g => g.toLowerCase().includes(lowerCaseQuery));
      return matchesGroup && matchesSearch;
    });
  }, [teamMembers, searchQuery, filterGroup]);

  const groupedMembers = useMemo(() => {
    if (viewMode !== 'list' || filterGroup !== 'All' || searchQuery !== '') {
        return null; // Only group when in list view with no filters active
    }
    const groups: { [key: string]: TeamMember[] } = {};
    const ungrouped: TeamMember[] = [];

    filteredMembers.forEach(member => {
        if(member.groups.length > 0) {
            const primaryGroup = member.groups[0];
            if (!groups[primaryGroup]) {
                groups[primaryGroup] = [];
            }
            groups[primaryGroup].push(member);
        } else {
            ungrouped.push(member);
        }
    });

     // Sort groups by name
    const sortedGroupKeys = Object.keys(groups).sort();
    const sortedGroups: { [key: string]: TeamMember[] } = {};
    sortedGroupKeys.forEach(key => {
        sortedGroups[key] = groups[key];
    });

    if (ungrouped.length > 0) {
        sortedGroups['Ungrouped'] = ungrouped;
    }

    return sortedGroups;
  }, [filteredMembers, viewMode, filterGroup, searchQuery]);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onAddMember={() => handleOpenForm(null)}
        onExportCSV={handleExportCSV}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Dashboard members={teamMembers} />
            <div className="mt-8">
                <DirectoryControls
                    searchQuery={searchQuery}
                    onSearchChange={(e) => setSearchQuery(e.target.value)}
                    groups={uniqueGroups}
                    selectedGroup={filterGroup}
                    onGroupChange={(e) => setFilterGroup(e.target.value)}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
            </div>
          
            <div className="mt-6">
                {filteredMembers.length === 0 ? (
                    <EmptyState />
                ) : groupedMembers ? (
                    <div className="space-y-8">
                        {Object.entries(groupedMembers).map(([group, members]) => (
                            <section key={group}>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 px-1 pb-2 border-b-2 border-gray-200 dark:border-gray-700">{group}</h2>
                                <div className="mt-4 space-y-4">
                                    {members.map(member => (
                                        <TeamMemberListItem key={member.id} member={member} onSelect={handleSelectMember} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredMembers.map(member => (
                        <TeamMemberCard 
                        key={member.id} 
                        member={member} 
                        onSelect={handleSelectMember} 
                        />
                    ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                    {filteredMembers.map(member => (
                        <TeamMemberListItem
                        key={member.id}
                        member={member}
                        onSelect={handleSelectMember}
                        />
                    ))}
                    </div>
                )}
            </div>
        </div>
      </main>

      {selectedMember && (
        <TeamMemberModal 
          member={selectedMember} 
          onClose={handleCloseModal}
          onEdit={() => handleOpenForm(selectedMember)}
          onDelete={handleRequestDelete}
        />
      )}

      {isFormOpen && (
        <EditMemberForm 
          member={editingMember}
          onClose={handleCloseForm}
          onSave={handleSaveMember}
        />
      )}

       <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </div>
  );
};

export default App;