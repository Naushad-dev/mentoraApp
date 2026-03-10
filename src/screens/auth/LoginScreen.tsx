import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../types';
import { validateEmail } from '../../utils/helpers';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavProp>();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateFields = (): boolean => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    setLoginError('');
    if (!validateFields()) return;

    try {
      await login(email.trim().toLowerCase(), password);
    } catch {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <ScreenWrapper scrollable>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kav}
      >
        <View style={styles.inner}>
          {/* Logo */}
          <View style={styles.logoArea}>
            <Text style={styles.logoEmoji}>🎓</Text>
            <Text style={styles.appName}>Mentora</Text>
            <Text style={styles.tagline}>Learn. Grow. Connect.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {loginError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              onBlur={() => {
                if (email && !validateEmail(email)) setEmailError('Enter a valid email address');
                else setEmailError('');
              }}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              secureTextEntry={!showPassword}
              error={passwordError}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={styles.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              label="Login"
              onPress={handleLogin}
              fullWidth
              loading={isLoading}
              size="lg"
              style={styles.loginBtn}
            />
          </View>

          {/* Hint */}
          <View style={styles.hint}>
            <Text style={styles.hintText}>Demo: parent@test.com / 123456</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  kav: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  logoEmoji: { fontSize: 72 },
  appName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  form: { flex: 1 },
  errorBox: {
    backgroundColor: `${theme.colors.error}15`,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },
  forgotRow: { alignItems: 'flex-end', marginTop: -4, marginBottom: theme.spacing.lg },
  forgotText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  loginBtn: { marginTop: theme.spacing.sm },
  eyeIcon: { fontSize: 18 },
  hint: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  hintText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
