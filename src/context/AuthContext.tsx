import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockUsers } from '../mock/users';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const savedUser = await storage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const found = mockUsers.find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
      );

      if (!found) {
        throw new Error('Invalid email or password');
      }

      const { password: _pw, ...userWithoutPassword } = found;
      await storage.saveUser(userWithoutPassword);
      setUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    await storage.removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
