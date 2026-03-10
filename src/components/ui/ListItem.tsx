import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../config/theme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  showChevron = false,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {leftElement ? <View style={styles.left}>{leftElement}</View> : null}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
      {showChevron && !rightElement ? (
        <Text style={styles.chevron}>›</Text>
      ) : null}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  left: { marginRight: theme.spacing.md },
  content: { flex: 1 },
  title: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  right: { marginLeft: theme.spacing.sm },
  chevron: {
    fontSize: 22,
    color: theme.colors.text.light,
    marginLeft: theme.spacing.sm,
  },
});

export default ListItem;
