import React from 'react';
import { createHashRouter } from 'react-router';
import { Layout } from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import PoetsPage from './pages/PoetsPage';
import PoetDetailPage from './pages/PoetDetailPage';
import QuizPage from './pages/QuizPage';
import FlashcardPage from './pages/FlashcardPage';
import MatchingPage from './pages/MatchingPage';
import LessonNotesPage from './pages/LessonNotesPage';
import FillTablePage from './pages/FillTablePage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import TeacherLayout from './components/teacher/TeacherLayout';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherClassesPage from './pages/teacher/TeacherClassesPage';
import TeacherCalendarPage from './pages/teacher/TeacherCalendarPage';
import TeacherContentPage from './pages/teacher/TeacherContentPage';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-6xl">🔍</div>
      <p className="text-xl opacity-60">Sayfa bulunamadı</p>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/help',
    Component: HelpPage,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'sairler', Component: PoetsPage },
      { path: 'sair/:id', Component: PoetDetailPage },
      { path: 'ders-notlari', Component: LessonNotesPage },
      { path: 'quiz', Component: QuizPage },
      { path: 'flashcard', Component: FlashcardPage },
      { path: 'tablo', Component: FillTablePage },
      { path: 'eslestirme', Component: MatchingPage },
      { path: 'istatistik', Component: StatsPage },
      { path: 'ayarlar', Component: SettingsPage },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/teacher',
    Component: TeacherLayout,
    children: [
      { index: true, Component: TeacherDashboardPage },
      { path: 'dashboard', Component: TeacherDashboardPage },
      { path: 'classes', Component: TeacherClassesPage },
      { path: 'calendar', Component: TeacherCalendarPage },
      { path: 'content', Component: TeacherContentPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
