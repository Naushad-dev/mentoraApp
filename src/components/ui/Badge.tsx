import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({
  label,
  color = theme.colors.primary,
  textColor = '#fff',
  size = 'md',
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${color}22` },
        size === 'sm' && styles.small,
        size === 'md' && styles.medium,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color },
          size === 'sm' && styles.textSmall,
          size === 'md' && styles.textMedium,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  small: { paddingHorizontal: 6, paddingVertical: 2 },
  medium: { paddingHorizontal: 10, paddingVertical: 4 },
  text: { fontWeight: '600' },
  textSmall: { fontSize: theme.fontSize.xs },
  textMedium: { fontSize: theme.fontSize.sm },
});

export default Badge;
