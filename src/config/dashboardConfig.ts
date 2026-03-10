import { DashboardSection, OnboardingSlide } from '../types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    illustration: '🎓',
    title: 'Welcome to Mentora',
    subtitle: 'A smarter way to connect students, parents, and mentors together.',
    backgroundColor: '#EEF2FF',
  },
  {
    id: '2',
    illustration: '📚',
    title: 'Track Every Lesson',
    subtitle: 'Browse subjects, explore sessions, and never miss a learning moment.',
    backgroundColor: '#F0FDF4',
  },
  {
    id: '3',
    illustration: '🤝',
    title: 'Your Role, Your Dashboard',
    subtitle: "Whether you're a parent, student, or mentor — Mentora adapts to you.",
    backgroundColor: '#FFF7ED',
  },
];

export const dashboardSections: DashboardSection[] = [
  {
    id: 'my-students',
    title: 'My Students',
    type: 'student-list',
    roles: ['parent', 'mentor'],
  },
  {
    id: 'lessons',
    title: 'Browse Lessons',
    type: 'lessons',
    roles: ['student', 'parent'],
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    type: 'quick-actions',
    roles: ['parent'],
    config: {
      actions: [
        { label: 'Add Student', icon: '➕', route: 'CreateStudent' },
        { label: 'View Lessons', icon: '📚', route: 'LessonsList' },
      ],
    },
  },
  {
    id: 'stats',
    title: 'Overview',
    type: 'stats',
    roles: ['mentor'],
  },
];
