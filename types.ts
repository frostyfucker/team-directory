export interface TeamMember {
  id: string;
  name: string;
  profession: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  picUrl: string; // Can be a URL or a base64 string
  groups: string[];
}