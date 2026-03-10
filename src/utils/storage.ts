import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/routes';
import { User } from '../types';

export const storage = {
  async setOnboardingDone(): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
  },

  async getOnboardingDone(): Promise<boolean> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
    return value === 'true';
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (!value) return null;
      return JSON.parse(value) as User;
    } catch {
      return null;
    }
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  },
};
