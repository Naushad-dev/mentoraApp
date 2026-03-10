export type Role = 'parent' | 'student' | 'mentor';

export interface User {
  userId: string;
  name: string;
  role: Role;
  email: string;
}

export interface MockUser extends User {
  password: string;
}

export interface Student {
  id: string;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  parentId: string;
  mentorId?: string;
}

export interface Lesson {
  id: string;
  subject: string;
  icon: string;
  color: string;
  description: string;
}

export interface Session {
  id: string;
  lessonId: string;
  sessionNumber: number;
  topic: string;
  date: string;
  summary: string;
  duration: string;
}

export interface DashboardSection {
  id: string;
  title: string;
  type: 'student-list' | 'lessons' | 'quick-actions' | 'stats';
  roles: Role[];
  config?: Record<string, any>;
}

export interface OnboardingSlide {
  id: string;
  illustration: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ParentDashboard: undefined;
  StudentDashboard: undefined;
  MentorDashboard: undefined;
  CreateStudent: undefined;
  LessonsList: { studentId?: string; studentName?: string };
  LessonDetail: { lessonId: string; lessonName: string };
  SessionDetail: { sessionId: string };
  StudentProfile: { studentId: string };
  MainTabs: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Profile: undefined;
};
