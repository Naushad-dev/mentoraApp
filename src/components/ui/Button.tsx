import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { theme } from '../../config/theme';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`textVariant_${variant}`],
    styles[`textSize_${size}`],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : theme.colors.primary}
          size="small"
        />
      ) : (
        <View style={styles.row}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={textStyle}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 6, fontSize: 16 },
  text: { fontWeight: '600' },

  // Variants
  variant_primary: { backgroundColor: theme.colors.primary },
  variant_secondary: { backgroundColor: theme.colors.secondary },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  variant_ghost: { backgroundColor: 'transparent' },

  // Text variants
  textVariant_primary: { color: '#fff' },
  textVariant_secondary: { color: '#fff' },
  textVariant_outline: { color: theme.colors.primary },
  textVariant_ghost: { color: theme.colors.primary },

  // Sizes
  size_sm: { paddingHorizontal: theme.spacing.sm, paddingVertical: 6 },
  size_md: { paddingHorizontal: theme.spacing.md, paddingVertical: 12 },
  size_lg: { paddingHorizontal: theme.spacing.lg, paddingVertical: 16 },

  // Text sizes
  textSize_sm: { fontSize: theme.fontSize.sm },
  textSize_md: { fontSize: theme.fontSize.md },
  textSize_lg: { fontSize: theme.fontSize.lg },
});

export default Button;
