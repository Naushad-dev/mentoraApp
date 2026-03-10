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

type MentorNavProp = StackNavigationProp<RootStackParamList, 'MentorDashboard'>;

const MentorDashboard: React.FC = () => {
  const navigation = useNavigation<MentorNavProp>();
  const { user, logout } = useAuth();
  const { getStudentsByMentor, lessons, sessions } = useData();

  const myStudents = user ? getStudentsByMentor(user.userId) : [];
  const totalSessions = sessions.length;

  const stats = [
    { label: 'Students', value: myStudents.length, icon: '👥' },
    { label: 'Subjects', value: lessons.length, icon: '📚' },
    { label: 'Sessions', value: totalSessions, icon: '🗓️' },
  ];

  return (
    <ScreenWrapper>
      <Header
        title={`Hello, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Your mentoring overview"
        rightElement={
          <View style={styles.headerRight}>
            <Badge label="Mentor" color={theme.colors.roles.mentor} />
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Text style={styles.logoutIcon}>⏻</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <Card key={stat.label} style={styles.statCard} elevated>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* My Students */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Students</Text>
          {myStudents.map((student) => (
            <Card
              key={student.id}
              style={styles.studentCard}
              onPress={() => navigation.navigate('StudentProfile', { studentId: student.id })}
              elevated
            >
              <View style={styles.studentRow}>
                <Avatar
                  name={student.name}
                  surname={student.surname}
                  size={48}
                  backgroundColor={theme.colors.roles.mentor}
                />
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>
                    {student.name} {student.surname}
                  </Text>
                  <Text style={styles.studentEmail}>{student.email}</Text>
                  <Text style={styles.studentDob}>DOB: {student.dateOfBirth}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  statIcon: { fontSize: 28, marginBottom: theme.spacing.sm },
  statValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
    fontWeight: '500',
  },
  studentCard: { marginBottom: theme.spacing.sm },
  studentRow: { flexDirection: 'row', alignItems: 'center' },
  studentInfo: { flex: 1, marginLeft: theme.spacing.md },
  studentName: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  studentEmail: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  studentDob: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.light,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: theme.colors.text.light,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  logoutBtn: { padding: theme.spacing.xs },
  logoutIcon: { fontSize: 20 },
});

export default MentorDashboard;
