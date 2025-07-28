export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  icon: string; // Icon name as string for API
  achievements?: string[];
  image?: string; // Optional image URL
}

export interface TeamResponse {
  members: TeamMember[];
}
