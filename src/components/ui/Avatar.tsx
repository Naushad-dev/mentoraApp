import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  name: string;
  surname?: string;
  size?: number;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  surname,
  size = 44,
  backgroundColor = theme.colors.primary,
}) => {
  const initials = getInitials(name, surname);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default Avatar;
