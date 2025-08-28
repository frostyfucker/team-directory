import { TeamMember } from './types';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Charlie Boyd',
    profession: 'Master Electrician',
    phone: '555-123-4567',
    email: 'charlie.b@example.com',
    website: 'https://example.com/charlie',
    description: 'Charlie is our lead Master Electrician, responsible for overseeing all electrical installations and ensuring compliance with safety standards. With over 20 years of experience, he is an invaluable asset to our team.',
    picUrl: 'https://picsum.photos/seed/charlie/400/400',
    groups: ['Field Operations', 'Safety Committee'],
  },
  {
    id: '2',
    name: 'Alicia Rodriguez',
    profession: 'Lead HVAC Technician',
    phone: '555-987-6543',
    email: 'alicia.r@example.com',
    description: 'Alicia leads our HVAC team, specializing in complex commercial systems. Her expertise in energy-efficient solutions helps our clients save on operational costs while maintaining optimal comfort.',
    picUrl: 'https://picsum.photos/seed/alicia/400/400',
    groups: ['Technical Services'],
  },
  {
    id: '3',
    name: 'Ben Carter',
    profession: 'Senior Plumber',
    phone: '555-555-5555',
    email: 'ben.c@example.com',
    website: 'https://example.com/ben',
    description: 'Ben is a seasoned plumbing professional who handles everything from emergency repairs to large-scale piping projects. His problem-solving skills and dedication are second to none.',
    picUrl: 'https://picsum.photos/seed/ben/400/400',
    groups: ['Field Operations'],
  },
  {
    id: '4',
    name: 'Maria Garcia',
    profession: 'Project Manager',
    phone: '555-867-5309',
    email: 'maria.g@example.com',
    description: 'Maria ensures all our projects run smoothly, on time, and within budget. She is the central point of communication between our clients and our technical teams, guaranteeing satisfaction.',
    picUrl: 'https://picsum.photos/seed/maria/400/400',
    groups: ['Management', 'Client Relations'],
  }
];