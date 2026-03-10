import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';
import { formatDate } from '../../utils/helpers';

type SessionDetailRouteProp = RouteProp<RootStackParamList, 'SessionDetail'>;

const SessionDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SessionDetailRouteProp>();
  const { sessions, lessons } = useData();

  const { sessionId } = route.params;
  const session = sessions.find((s) => s.id === sessionId);
  const lesson = session ? lessons.find((l) => l.id === session.lessonId) : undefined;

  if (!session) {
    return (
      <ScreenWrapper>
        <Header title="Session" showBack onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Session not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scrollable>
      <Header
        title={lesson?.subject ?? 'Session Detail'}
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        {/* Session number label */}
        <Text style={styles.sessionLabel}>Session {session.sessionNumber}</Text>

        {/* Topic */}
        <Text style={styles.topic}>{session.topic}</Text>

        {/* Metadata row */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📅</Text>
            <Text style={styles.metaText}>{formatDate(session.date)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱</Text>
            <Text style={styles.metaText}>{session.duration}</Text>
          </View>
          {lesson ? (
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>{lesson.icon}</Text>
              <Text style={styles.metaText}>{lesson.subject}</Text>
            </View>
          ) : null}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Summary */}
        <Text style={styles.summaryHeading}>Session Summary</Text>
        <Text style={styles.summary}>{session.summary}</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.xl,
  },
  sessionLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  topic: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    lineHeight: 36,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    ...theme.shadow.small,
  },
  metaIcon: { fontSize: 16 },
  metaText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  summaryHeading: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summary: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 26,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
  },
});

export default SessionDetailScreen;
