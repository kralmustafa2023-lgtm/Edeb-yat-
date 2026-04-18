import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import type { PageId } from './context/AppContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
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
import TeacherLayout from './components/teacher/TeacherLayout';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherClassesPage from './pages/teacher/TeacherClassesPage';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherQuestionsPage from './pages/teacher/TeacherQuestionsPage';

const STUDENT_PAGES: Record<string, React.FC> = {
  'dashboard': DashboardPage,
  'sairler': PoetsPage,
  'sair-detail': PoetDetailPage,
  'ders-notlari': LessonNotesPage,
  'quiz': QuizPage,
  'flashcard': FlashcardPage,
  'tablo': FillTablePage,
  'eslestirme': MatchingPage,
  'istatistik': StatsPage,
  'ayarlar': SettingsPage,
};

const TEACHER_PAGES: Record<string, React.FC> = {
  'teacher-dashboard': TeacherDashboardPage,
  'teacher-classes': TeacherClassesPage,
  'teacher-messages': TeacherMessagesPage,
  'teacher-questions': TeacherQuestionsPage,
  'teacher-settings': () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-6xl">🔧</div>
      <p className="text-xl opacity-60">Ayarlar sayfası yakında</p>
    </div>
  ),
};

function AppRouter() {
  const { currentPage, user } = useApp();

  console.log('AppRouter - currentPage:', currentPage, 'user:', user);

  try {
    // Public pages (no layout)
    if (currentPage === 'login') return <LoginPage />;
    if (currentPage === 'about') return <AboutPage />;
    if (currentPage === 'help') return <HelpPage />;

    // Auth guard
    if (!user.isAuthenticated) {
      console.log('User not authenticated, showing LoginPage');
      return <LoginPage />;
    }

    // Teacher pages
    if (currentPage.startsWith('teacher')) {
      console.log('Rendering teacher page:', currentPage);
      const TeacherPage = TEACHER_PAGES[currentPage];
      return (
        <TeacherLayout>
          {TeacherPage ? <TeacherPage /> : <div className="p-8 text-center">Sayfa bulunamadı</div>}
        </TeacherLayout>
      );
    }

    // Student pages
    console.log('Rendering student page:', currentPage);
    const StudentPage = STUDENT_PAGES[currentPage];
    return (
      <Layout>
        {StudentPage ? <StudentPage /> : <DashboardPage />}
      </Layout>
    );
  } catch (error) {
    console.error('AppRouter error:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4 p-8">
        <div className="text-6xl">Hata</div>
        <p className="text-xl text-red-600">Bir hata oluştu. Sayfayı yenileyin.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Yenile
        </button>
      </div>
    );
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ErrorBoundary>
  );
}
