export const ROUTES = {
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  FORGOT_PASSWORD: 'ForgotPassword',
  PARENT_DASHBOARD: 'ParentDashboard',
  STUDENT_DASHBOARD: 'StudentDashboard',
  MENTOR_DASHBOARD: 'MentorDashboard',
  CREATE_STUDENT: 'CreateStudent',
  LESSONS_LIST: 'LessonsList',
  LESSON_DETAIL: 'LessonDetail',
  SESSION_DETAIL: 'SessionDetail',
  STUDENT_PROFILE: 'StudentProfile',
} as const;

export const STORAGE_KEYS = {
  ONBOARDING_DONE: '@mentora_onboarding_done',
  USER: '@mentora_user',
} as const;
