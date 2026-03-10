import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Header from '../../components/shared/Header';
import ScreenWrapper from '../../components/shared/ScreenWrapper';
import { theme } from '../../config/theme';
import { useData } from '../../context/DataContext';
import { RootStackParamList } from '../../types';

type LessonsListNavProp = StackNavigationProp<RootStackParamList, 'LessonsList'>;
type LessonsListRouteProp = RouteProp<RootStackParamList, 'LessonsList'>;

const LessonsListScreen: React.FC = () => {
  const navigation = useNavigation<LessonsListNavProp>();
  const route = useRoute<LessonsListRouteProp>();
  const { lessons, getSessionsByLesson } = useData();

  const { studentName } = route.params ?? {};

  return (
    <ScreenWrapper scrollable>
      <Header
        title={studentName ? `${studentName}'s Lessons` : 'Browse Lessons'}
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.grid}>
        {lessons.map((lesson) => {
          const count = getSessionsByLesson(lesson.id).length;
          return (
            <Card
              key={lesson.id}
              style={[styles.card, { backgroundColor: lesson.color }]}
              onPress={() =>
                navigation.navigate('LessonDetail', {
                  lessonId: lesson.id,
                  lessonName: lesson.subject,
                })
              }
            >
              <Text style={styles.icon}>{lesson.icon}</Text>
              <Text style={styles.subject}>{lesson.subject}</Text>
              <Text style={styles.desc} numberOfLines={2}>{lesson.description}</Text>
              <Badge label={`${count} Sessions`} color={theme.colors.primary} size="sm" />
            </Card>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  icon: { fontSize: 40, marginBottom: theme.spacing.sm },
  subject: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  desc: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
});

export default LessonsListScreen;
