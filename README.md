# Mentora

A production-quality mobile app connecting students, parents, and mentors — built with React Native + Expo.

## Run the App

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iOS/Android) or press `a` for Android emulator / `i` for iOS simulator.

## Test Credentials

| Role    | Email               | Password |
|---------|---------------------|----------|
| Parent  | parent@test.com     | 123456   |
| Student | student@test.com    | 123456   |
| Mentor  | mentor@test.com     | 123456   |

## App Flow

- **First launch** → Onboarding (3 slides, shown only once)
- **After onboarding / returning user** → Login screen
- **After login** → Role-based dashboard (session persisted across restarts)
- **Logout** → Back to Login

## Project Structure

```
src/
├── config/          # Theme, route constants, dashboard config
├── components/
│   ├── ui/          # Button, Input, Card, ListItem, Avatar, Badge, EmptyState, LoadingSpinner
│   └── shared/      # Header, ScreenWrapper
├── navigation/      # RootNavigator, AuthNavigator, AppNavigator
├── screens/
│   ├── onboarding/  # 3-slide onboarding
│   ├── auth/        # Login, ForgotPassword
│   ├── parent/      # ParentDashboard, CreateStudentScreen
│   ├── student/     # StudentDashboard
│   ├── mentor/      # MentorDashboard
│   └── shared/      # LessonsList, LessonDetail, SessionDetail, StudentProfile
├── context/         # AuthContext (login/logout/session), DataContext (students/lessons/sessions)
├── mock/            # users.ts, students.ts, lessons.ts, sessions.ts
├── types/           # TypeScript interfaces and param lists
└── utils/           # storage.ts (AsyncStorage), helpers.ts
```

## Architecture Decisions

- **Stack Navigator Only** — React Navigation v6 `@react-navigation/stack` as required. No tabs or drawer.
- **Config-driven UI** — `dashboardConfig.ts` drives which sections each role sees. Dashboard sections render based on `roles` and `type` fields.
- **Session persistence** — `AsyncStorage` stores user JSON on login, restored on app launch. Onboarding shown once (`@mentora_onboarding_done`).
- **Role-based navigation** — `AppNavigator` renders a completely different screen stack depending on `user.role`.
- **No external swiper** — Onboarding uses `FlatList` with `pagingEnabled` and animated dot indicators.
- **Animated inputs** — Input borders animate from gray → primary color on focus using `Animated.Value`.

## Assumptions

1. Password stored in mock data only — no real auth backend; login validates against `mockUsers` array.
2. `CreateStudent` always assigns the created student to the logged-in parent and mentor ID `'3'` (Priya Kapoor).
3. Session data is static; `getRecentSessions` sorts by date descending.
4. `ForgotPassword` is UI-only — no actual email is sent.
5. Mentor dashboard shows students for `mentorId === user.userId`; the mock data uses `mentorId: '3'` which matches mentor user ID.
