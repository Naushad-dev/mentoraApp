import React, { createContext, useContext, useState } from 'react';
import { mockLessons } from '../mock/lessons';
import { mockSessions } from '../mock/sessions';
import { mockStudents } from '../mock/students';
import { Lesson, Session, Student } from '../types';
import { generateId } from '../utils/helpers';

interface DataContextType {
  students: Student[];
  lessons: Lesson[];
  sessions: Session[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  getStudentsByParent: (parentId: string) => Student[];
  getStudentsByMentor: (mentorId: string) => Student[];
  getSessionsByLesson: (lessonId: string) => Session[];
  getRecentSessions: (limit: number) => Session[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [lessons] = useState<Lesson[]>(mockLessons);
  const [sessions] = useState<Session[]>(mockSessions);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: generateId(),
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const getStudentsByParent = (parentId: string): Student[] =>
    students.filter((s) => s.parentId === parentId);

  const getStudentsByMentor = (mentorId: string): Student[] =>
    students.filter((s) => s.mentorId === mentorId);

  const getSessionsByLesson = (lessonId: string): Session[] =>
    sessions.filter((s) => s.lessonId === lessonId);

  const getRecentSessions = (limit: number): Session[] =>
    [...sessions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

  return (
    <DataContext.Provider
      value={{
        students,
        lessons,
        sessions,
        addStudent,
        getStudentsByParent,
        getStudentsByMentor,
        getSessionsByLesson,
        getRecentSessions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
