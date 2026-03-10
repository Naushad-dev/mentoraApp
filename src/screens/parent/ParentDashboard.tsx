import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { dashboardSections } from '../../config/dashboardConfig';
import { theme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';

type ParentNavProp = StackNavigationProp<RootStackParamList, 'ParentDashboard'>;

const ParentDashboard: React.FC = () => {
  const navigation = useNavigation<ParentNavProp>();
  const { user, logout } = useAuth();
  const { getStudentsByParent, lessons } = useData();

  const students = user ? getStudentsByParent(user.userId) : [];
  const sections = dashboardSections.filter((s) => s.roles.includes('parent'));

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'my-students':
        return (
          <View key="my-students" style={styles.section}>
            <Text style={styles.sectionTitle}>My Students</Text>
            {students.length === 0 ? (
              <EmptyState
                illustration="👨‍👧"
                title="No Students Yet"
                subtitle="Add a student to get started"
                actionLabel="Add Student"
                onAction={() => navigation.navigate('CreateStudent')}
              />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.addStudentBtn}
                  onPress={() => navigation.navigate('CreateStudent')}
                >
                  <Text style={styles.addStudentIcon}>➕</Text>
                  <Text style={styles.addStudentText}>Add</Text>
                </TouchableOpacity>
                {students.map((s) => (
                  <Card
                    key={s.id}
                    style={styles.studentCard}
                    onPress={() => navigation.navigate('LessonsList', { studentId: s.id, studentName: s.name })}
                  >
                    <Avatar name={s.name} surname={s.surname} size={52} backgroundColor={theme.colors.roles.parent} />
                    <Text style={styles.studentName}>{s.name} {s.surname}</Text>
                    <Text style={styles.studentDob}>DOB: {s.dateOfBirth}</Text>
                  </Card>
                ))}

              </ScrollView>
            )}
          </View>
        );

      case 'quick-actions': {
        const actions = sections.find((s) => s.id === 'quick-actions')?.config?.actions ?? [];
        return (
          <View key="quick-actions" style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {actions.map((action: any) => (
                <TouchableOpacity
                  key={action.label}
                  style={styles.actionBtn}
                  onPress={() => navigation.navigate(action.route as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      }

      case 'lessons':
        return (
          <View key="lessons" style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Lessons</Text>
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                style={[styles.lessonCard, { backgroundColor: lesson.color }]}
                onPress={() => navigation.navigate('LessonDetail', { lessonId: lesson.id, lessonName: lesson.subject })}
                elevated
              >
                <View style={styles.lessonRow}>
                  <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                    <Text style={styles.lessonDesc}>{lesson.description}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenWrapper>
      <Header
        title={`Hello, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Welcome back"
        rightElement={
          <View style={styles.headerRight}>
            <Badge label="Parent" color={theme.colors.roles.parent} />
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Text style={styles.logoutIcon}>⏻</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {sections.map((s) => renderSection(s.id))}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  section: { paddingHorizontal: theme.spacing.md, marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  studentCard: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 120,
    paddingVertical: theme.spacing.md,
  },
  studentName: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  studentDob: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  addStudentBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  addStudentIcon: { fontSize: 24 },
  addStudentText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  actionBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    // ...theme.shadow.small,
  },
  actionIcon: { fontSize: 32, marginBottom: theme.spacing.sm },
  actionLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  lessonCard: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  lessonRow: { flexDirection: 'row', alignItems: 'center' },
  lessonIcon: { fontSize: 36, marginRight: theme.spacing.md },
  lessonInfo: { flex: 1 },
  lessonSubject: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  lessonDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  logoutBtn: { padding: theme.spacing.xs },
  logoutIcon: { fontSize: 20 },
});

export default ParentDashboard;
