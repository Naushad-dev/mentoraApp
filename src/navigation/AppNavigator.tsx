import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import CreateStudentScreen from '../screens/parent/CreateStudentScreen';
import ParentDashboard from '../screens/parent/ParentDashboard';
import StudentDashboard from '../screens/student/StudentDashboard';
import MentorDashboard from '../screens/mentor/MentorDashboard';
import LessonsListScreen from '../screens/shared/LessonsListScreen';
import LessonDetailScreen from '../screens/shared/LessonDetailScreen';
import SessionDetailScreen from '../screens/shared/SessionDetailScreen';
import StudentProfileScreen from '../screens/shared/StudentProfileScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';

import { useAuth } from '../context/AuthContext';
import { RootStackParamList, MainTabParamList } from '../types';
import { theme } from '../config/theme';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const ParentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
    <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
    <Stack.Screen name="LessonsList" component={LessonsListScreen} />
    <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
    <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
  </Stack.Navigator>
);

const StudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
    <Stack.Screen name="LessonsList" component={LessonsListScreen} />
    <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
    <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
  </Stack.Navigator>
);

const MentorStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MentorDashboard" component={MentorDashboard} />
    <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
    <Stack.Screen name="LessonsList" component={LessonsListScreen} />
    <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
    <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  const getDashboardStack = () => {
    if (user?.role === 'parent') return ParentStack;
    if (user?.role === 'student') return StudentStack;
    return MentorStack;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={getDashboardStack()}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
