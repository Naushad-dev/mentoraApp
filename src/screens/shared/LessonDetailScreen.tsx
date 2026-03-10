import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';
import { truncateText, formatDate } from '../../utils/helpers';

type LessonDetailNavProp = StackNavigationProp<RootStackParamList, 'LessonDetail'>;
type LessonDetailRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;

const LessonDetailScreen: React.FC = () => {
  const navigation = useNavigation<LessonDetailNavProp>();
  const route = useRoute<LessonDetailRouteProp>();
  const { lessons, getSessionsByLesson } = useData();

  const { lessonId, lessonName } = route.params;
  const lesson = lessons.find((l) => l.id === lessonId);
  const sessions = getSessionsByLesson(lessonId);

  return (
    <ScreenWrapper scrollable>
      <Header
        title={lessonName}
        showBack
        onBack={() => navigation.goBack()}
      />
      {lesson ? (
        <View style={[styles.hero, { backgroundColor: lesson.color }]}>
          <Text style={styles.heroIcon}>{lesson.icon}</Text>
          <Text style={styles.heroCount}>{sessions.length} sessions available</Text>
          <Text style={styles.heroDesc}>{lesson.description}</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {sessions.map((session) => (
          <Card
            key={session.id}
            style={styles.sessionCard}
            onPress={() => navigation.navigate('SessionDetail', { sessionId: session.id })}
            elevated
          >
            <View style={styles.sessionRow}>
              <Badge label={`Session ${session.sessionNumber}`} color={theme.colors.secondary} size="sm" />
              <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
            </View>
            <Text style={styles.sessionTopic}>{session.topic}</Text>
            <Text style={styles.sessionPreview}>{truncateText(session.summary, 80)}</Text>
            <View style={styles.sessionFoot}>
              <Text style={styles.durationText}>⏱ {session.duration}</Text>
              <Text style={styles.viewMore}>View details ›</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  hero: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  heroIcon: { fontSize: 64 },
  heroCount: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    fontWeight: '500',
    marginTop: theme.spacing.sm,
  },
  heroDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  sessionCard: { gap: theme.spacing.sm },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
  },
  sessionTopic: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  sessionPreview: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  sessionFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  durationText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  viewMore: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default LessonDetailScreen;
