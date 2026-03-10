import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../config/theme';

interface CardProps {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({ children, style, onPress, elevated = false }) => {
  const cardStyle = [styles.card, elevated && styles.elevated, style];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    // ...theme.shadow.medium,
  },
  elevated: {
    ...theme.shadow.medium,
  },
});

export default Card;
