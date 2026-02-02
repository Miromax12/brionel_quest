
export enum UserStatus {
  STARTER = '🌱 Стартер',
  ACTIVE = '⚡ Активний',
  LEADER = '🔥 Лідер потоку',
  MASTER = '💎 Майстер рекрутингу',
  LEGEND = '👑 Легенда BRIONEL'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  status: UserStatus;
  avatar: string;
  badges: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'CONTENT' | 'COMMUNICATION' | 'EDUCATION' | 'RESULT' | 'PROFILE';
  xpReward: number;
  isCompleted: boolean;
  requirementType: 'link' | 'screenshot' | 'auto';
}

export interface QuestStage {
  week: number;
  title: string;
  missions: Mission[];
}

export interface DailyTask {
  id: string;
  title: string;
  xp: number;
  type: 'NEW_PEOPLE' | 'STORY' | 'ENGAGEMENT' | 'REELS' | 'CONVERSION' | 'CALL';
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  type: 'INTERESTED' | 'SKEPTIC' | 'BUSY' | 'NEGATIVE' | 'ANALYST';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
}
