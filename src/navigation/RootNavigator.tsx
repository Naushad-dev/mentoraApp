import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { useAuth } from '../context/AuthContext';
import { STORAGE_KEYS } from '../config/routes';
import { theme } from '../config/theme';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { RootStackParamList } from '../types';


const SplashScreen: React.FC = () => (
  <View style={splashStyles.container}>
    <Text style={splashStyles.icon}>🎓</Text>
    <Text style={splashStyles.name}>Mentora</Text>
    <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 24 }} />
  </View>
);

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 72 },
  name: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: 12,
    letterSpacing: 1,
  },
});

const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const bootstrap = async () => {
      const onboarded = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
      setHasSeenOnboarding(onboarded === 'true');
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  if (isLoading) return <SplashScreen />;

  // Case 1: Fresh install — show onboarding
  if (!hasSeenOnboarding && !onboardingComplete) {
    return (
      <OnboardingScreen
        onComplete={() => {
          setHasSeenOnboarding(true);
          setOnboardingComplete(true);
        }}
      />
    );
  }

  // Case 3: User already logged in — go straight to app
  if (user) return <AppNavigator />;

  // Case 2: Has done onboarding but not logged in — show auth
  return <AuthNavigator />;
};

export default RootNavigator;
