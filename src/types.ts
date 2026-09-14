export type MajorType = 'MIPA' | 'IPS' | 'Bahasa';

export interface Student {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  quote: string;
  fullQuote?: string;
  hobby: string;
  extracurricular: string;
  major: MajorType;
  bentoSize: 'normal' | 'tall' | 'wide' | 'large';
  funFacts: string[];
  dreamCareer: string;
  favoriteMemory: string;
  instagram: string;
  spotifyTrack?: {
    title: string;
    artist: string;
  };
}

export type TapeColor = 'orange' | 'pink' | 'blue' | 'yellow';

export interface MessageReaction {
  heart: number;
  party: number;
  laugh: number;
  tear: number;
  fire: number;
}

export interface BoardMessage {
  id: string;
  senderName: string;
  senderClass?: string;
  recipientName?: string;
  text: string;
  signatureDataUrl: string;
  createdAt: string;
  tapeColor: TapeColor;
  sticker?: string;
  reactions: MessageReaction;
  userReacted?: Record<string, boolean>;
}

export interface SuperlativeCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  votes: Record<string, number>; // studentId -> voteCount
}

export interface TimeCapsule {
  id: string;
  authorName: string;
  title: string;
  message: string;
  unlockDate: string; // ISO date string or YYYY-MM-DD
  createdAt: string;
  themeTag: string;
  recipientHint?: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  dateStr: string;
  location: string;
  description: string;
  photoUrl: string;
  tag: string;
  tagBg: string;
  highlightStory: string;
}

export interface ClassStatistics {
  totalStudents: number;
  totalMessages: number;
  totalVotes: number;
  totalCapsules: number;
  topHobbies: { label: string; count: number }[];
  topExtracurriculars: { label: string; count: number }[];
  majorDistribution: { label: MajorType; count: number; percentage: number }[];
}
