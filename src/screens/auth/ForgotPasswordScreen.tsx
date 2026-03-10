import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { validateEmail } from '../../utils/helpers';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      return;
    }
    setEmailError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <ScreenWrapper scrollable>
      <Header
        title="Forgot Password"
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter your email address and we'll send you a reset link.
        </Text>

        {submitted ? (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successText}>
              If this email exists, a reset link has been sent.
            </Text>
          </View>
        ) : (
          <>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />
            <Button
              label="Send Reset Link"
              onPress={handleSend}
              fullWidth
              loading={loading}
              size="lg"
              style={styles.btn}
            />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { padding: theme.spacing.xl },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  btn: { marginTop: theme.spacing.sm },
  successBox: {
    backgroundColor: `${theme.colors.success}15`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.success,
  },
  successIcon: { fontSize: 36, marginBottom: theme.spacing.sm },
  successText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.success,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ForgotPasswordScreen;
