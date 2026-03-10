import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';

type StudentProfileNavProp = StackNavigationProp<RootStackParamList, 'StudentProfile'>;
type StudentProfileRouteProp = RouteProp<RootStackParamList, 'StudentProfile'>;

const StudentProfileScreen: React.FC = () => {
  const navigation = useNavigation<StudentProfileNavProp>();
  const route = useRoute<StudentProfileRouteProp>();
  const { students, lessons, getSessionsByLesson } = useData();

  const { studentId } = route.params;
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <ScreenWrapper>
        <Header title="Student Profile" showBack onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <Text>Student not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scrollable>
      <Header
        title="Student Profile"
        showBack
        onBack={() => navigation.goBack()}
      />

      {/* Student Info Card */}
      <View style={styles.profileHeader}>
        <Avatar
          name={student.name}
          surname={student.surname}
          size={72}
          backgroundColor={theme.colors.roles.mentor}
        />
        <Text style={styles.fullName}>
          {student.name} {student.surname}
        </Text>
        <Text style={styles.email}>{student.email}</Text>
        <Badge label={`DOB: ${student.dateOfBirth}`} color={theme.colors.secondary} size="md" />
      </View>

      {/* Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {lessons.map((lesson) => {
          const count = getSessionsByLesson(lesson.id).length;
          return (
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
              <View style={styles.lessonRow}>
                <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                  <Text style={styles.lessonDesc}>{lesson.description}</Text>
                </View>
                <Badge label={`${count}`} color={theme.colors.primary} size="sm" />
              </View>
            </Card>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    ...theme.shadow.small,
    marginBottom: theme.spacing.sm,
  },
  fullName: {
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  lessonCard: { marginBottom: theme.spacing.sm },
  lessonRow: { flexDirection: 'row', alignItems: 'center' },
  lessonIcon: { fontSize: 32, marginRight: theme.spacing.md },
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
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudentProfileScreen;
