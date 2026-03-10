import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';
import { formatDate } from '../../utils/helpers';

type StudentNavProp = StackNavigationProp<RootStackParamList, 'StudentDashboard'>;

const StudentDashboard: React.FC = () => {
  const navigation = useNavigation<StudentNavProp>();
  const { user, logout } = useAuth();
  const { lessons, getRecentSessions, sessions } = useData();

  const recentSessions = getRecentSessions(3);

  const getSubjectName = (lessonId: string) =>
    lessons.find((l) => l.id === lessonId)?.subject ?? 'Unknown';
  const getSubjectIcon = (lessonId: string) =>
    lessons.find((l) => l.id === lessonId)?.icon ?? '📚';

  return (
    <ScreenWrapper>
      <Header
        title={`Hello, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Ready to learn today?"
        rightElement={
          <View style={styles.headerRight}>
            <Badge label="Student" color={theme.colors.roles.student} />
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Text style={styles.logoutIcon}>⏻</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Lessons Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Lessons</Text>
          <View style={styles.lessonsGrid}>
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                style={[styles.lessonCard, { backgroundColor: lesson.color }]}
                onPress={() =>
                  navigation.navigate('LessonDetail', {
                    lessonId: lesson.id,
                    lessonName: lesson.subject,
                  })
                }
              >
                <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                <Badge label="3 Sessions" color={theme.colors.primary} size="sm" />
              </Card>
            ))}
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {recentSessions.map((session) => (
            <Card
              key={session.id}
              style={styles.sessionCard}
              onPress={() => navigation.navigate('SessionDetail', { sessionId: session.id })}
              elevated
            >
              <View style={styles.sessionRow}>
                <Text style={styles.sessionIcon}>{getSubjectIcon(session.lessonId)}</Text>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionSubject}>{getSubjectName(session.lessonId)}</Text>
                  <Text style={styles.sessionTopic} numberOfLines={1}>
                    {session.topic}
                  </Text>
                  <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
                </View>
                <Badge label={session.duration} color={theme.colors.success} size="sm" />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: { paddingHorizontal: theme.spacing.md, marginTop: theme.spacing.lg },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  lessonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  lessonCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  lessonIcon: { fontSize: 40, marginBottom: theme.spacing.sm },
  lessonSubject: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  sessionCard: { marginBottom: theme.spacing.sm },
  sessionRow: { flexDirection: 'row', alignItems: 'center' },
  sessionIcon: { fontSize: 28, marginRight: theme.spacing.md },
  sessionInfo: { flex: 1 },
  sessionSubject: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sessionTopic: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: 2,
  },
  sessionDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
    marginTop: 2,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  logoutBtn: { padding: theme.spacing.xs },
  logoutIcon: { fontSize: 20 },
});

export default StudentDashboard;
