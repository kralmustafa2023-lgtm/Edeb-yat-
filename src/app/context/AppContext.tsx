import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'sepia';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
  xp: number;
}

export interface Progress {
  studiedPoets: string[];
  quizScores: { topic: string; score: number; total: number; date: string }[];
  flashcardsDone: number;
  matchingDone: number;
  tableDone: number;
  totalXP: number;
  streak: number;
  lastStudyDate: string;
  weeklyActivity: number[];
  achievements: Achievement[];
  favoritePoets: string[];
  notes: { [key: string]: string };
}

interface User {
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  progress: Progress;
  user: User;
  login: (username: string, role: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  markPoetStudied: (id: string) => void;
  addQuizScore: (topic: string, score: number, total: number) => void;
  toggleFavoritePoet: (id: string) => void;
  incrementFlashcard: () => void;
  incrementMatching: () => void;
  incrementTable: () => void;
  updateNote: (key: string, value: string) => void;
  getLevel: () => { name: string; minXP: number; maxXP: number; color: string };
  themeClasses: ThemeClasses;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export interface ThemeClasses {
  bg: string;
  sidebar: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentBg: string;
  accentText: string;
  inputBg: string;
  inputBorder: string;
  hover: string;
  divider: string;
  badge: string;
}

const THEME_CLASSES: Record<Theme, ThemeClasses> = {
  dark: {
    bg: 'bg-[#0d0d1a]',
    sidebar: 'bg-[#11111f] border-purple-900/30',
    card: 'bg-[#1a1a2e] border-purple-900/20',
    cardBorder: 'border-purple-900/20',
    text: 'text-[#e2e2f0]',
    textMuted: 'text-[#8585a8]',
    textFaint: 'text-[#4a4a6a]',
    accent: 'text-purple-400',
    accentBg: 'bg-purple-600 hover:bg-purple-500',
    accentText: 'text-purple-400',
    inputBg: 'bg-[#1a1a2e] border-purple-900/30',
    inputBorder: 'border-purple-900/40',
    hover: 'hover:bg-purple-900/20',
    divider: 'border-purple-900/20',
    badge: 'bg-purple-900/40 text-purple-300',
  },
  light: {
    bg: 'bg-[#f0f0f8]',
    sidebar: 'bg-white border-indigo-100',
    card: 'bg-white border-indigo-100',
    cardBorder: 'border-indigo-100',
    text: 'text-[#1a1a2e]',
    textMuted: 'text-[#6b7280]',
    textFaint: 'text-[#9ca3af]',
    accent: 'text-indigo-600',
    accentBg: 'bg-indigo-600 hover:bg-indigo-500',
    accentText: 'text-indigo-600',
    inputBg: 'bg-white border-indigo-200',
    inputBorder: 'border-indigo-200',
    hover: 'hover:bg-indigo-50',
    divider: 'border-indigo-100',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  sepia: {
    bg: 'bg-[#f5f0e8]',
    sidebar: 'bg-[#ede7dc] border-amber-200',
    card: 'bg-[#faf5ed] border-amber-200',
    cardBorder: 'border-amber-200',
    text: 'text-[#3d2c1c]',
    textMuted: 'text-[#7c6b5a]',
    textFaint: 'text-[#a89880]',
    accent: 'text-amber-800',
    accentBg: 'bg-amber-700 hover:bg-amber-600',
    accentText: 'text-amber-800',
    inputBg: 'bg-[#faf5ed] border-amber-300',
    inputBorder: 'border-amber-300',
    hover: 'hover:bg-amber-100',
    divider: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
  },
};

const LEVELS = [
  { name: 'Çaylak', minXP: 0, maxXP: 150, color: 'text-gray-400' },
  { name: 'Edebiyatsever', minXP: 150, maxXP: 400, color: 'text-green-400' },
  { name: 'Edebiyatçı', minXP: 400, maxXP: 800, color: 'text-blue-400' },
  { name: 'Usta', minXP: 800, maxXP: 1500, color: 'text-purple-400' },
  { name: 'Üstat', minXP: 1500, maxXP: 99999, color: 'text-amber-400' },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_quiz', title: 'İlk Adım', desc: 'İlk quizi tamamladın!', icon: '🎯', unlocked: false, xp: 50 },
  { id: 'perfect_quiz', title: 'Mükemmel!', desc: 'Bir quizden tam puan aldın', icon: '⭐', unlocked: false, xp: 100 },
  { id: 'all_poets', title: 'Şair Aşığı', desc: 'Tüm şairleri inceledin', icon: '📚', unlocked: false, xp: 150 },
  { id: 'streak_3', title: 'Düzenli Çalışan', desc: '3 gün üst üste çalıştın', icon: '🔥', unlocked: false, xp: 80 },
  { id: 'flashcard_50', title: 'Kart Ustası', desc: '50 flashcard tamamladın', icon: '🃏', unlocked: false, xp: 100 },
  { id: 'matching_master', title: 'Eşleştirme Gurusu', desc: '5 eşleştirme oyunu bitirdin', icon: '🔗', unlocked: false, xp: 120 },
  { id: 'xp_500', title: 'XP Avcısı', desc: '500 XP kazandın', icon: '💎', unlocked: false, xp: 0 },
  { id: 'xp_1000', title: 'Edebiyat Uzmanı', desc: '1000 XP kazandın', icon: '🏆', unlocked: false, xp: 0 },
];

const getDefaultProgress = (): Progress => ({
  studiedPoets: [],
  quizScores: [],
  flashcardsDone: 0,
  matchingDone: 0,
  tableDone: 0,
  totalXP: 0,
  streak: 0,
  lastStudyDate: '',
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  achievements: DEFAULT_ACHIEVEMENTS.map(a => ({ ...a })),
  favoritePoets: [],
  notes: {},
});

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('edebiyat_theme') as Theme) || 'dark';
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Auth state - REVERTED TO LOCAL ONLY
  const [user, setUser] = useState<User>(() => {
    const data = sessionStorage.getItem('edebiyat_auth');
    return data ? JSON.parse(data) : { username: null, role: null, isAuthenticated: false };
  });

  const [progress, setProgress] = useState<Progress>(() => {
    if (user.username) {
      const saved = localStorage.getItem(`progress_${user.username}`);
      return saved ? JSON.parse(saved) : getDefaultProgress();
    }
    return getDefaultProgress();
  });

  // Reset progress when user changes
  useEffect(() => {
    if (user.username) {
      const saved = localStorage.getItem(`progress_${user.username}`);
      setProgress(saved ? JSON.parse(saved) : getDefaultProgress());
    } else {
      setProgress(getDefaultProgress());
    }
  }, [user.username]);

  const login = (username: string, role: string) => {
    const newUser = { username, role, isAuthenticated: true };
    setUser(newUser);
    sessionStorage.setItem('edebiyat_auth', JSON.stringify(newUser));
  };

  const logout = () => {
    sessionStorage.removeItem('edebiyat_auth');
    setUser({ username: null, role: null, isAuthenticated: false });
  };

  const updateProgress = useCallback((updater: (prev: Progress) => Progress) => {
    setProgress(prev => {
      const next = updater(prev);
      if (user.username) {
        localStorage.setItem(`progress_${user.username}`, JSON.stringify(next));
      }
      return next;
    });
  }, [user.username]);

  // Local storage for theme
  useEffect(() => {
    localStorage.setItem('edebiyat_theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const addXP = (amount: number) => {
    updateProgress(prev => {
      const newXP = prev.totalXP + amount;
      const today = new Date().toDateString();
      const dayIndex = new Date().getDay();
      const newWeekly = [...(prev.weeklyActivity || [0, 0, 0, 0, 0, 0, 0])];
      newWeekly[dayIndex] = (newWeekly[dayIndex] || 0) + amount;

      let newStreak = prev.streak;
      if (prev.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        newStreak = prev.lastStudyDate === yesterday.toDateString() ? prev.streak + 1 : 1;
      }

      const newAchievements = [...prev.achievements];
      if (newXP >= 500) {
        const idx = newAchievements.findIndex(a => a.id === 'xp_500');
        if (idx >= 0) newAchievements[idx] = { ...newAchievements[idx], unlocked: true };
      }
      if (newXP >= 1000) {
        const idx = newAchievements.findIndex(a => a.id === 'xp_1000');
        if (idx >= 0) newAchievements[idx] = { ...newAchievements[idx], unlocked: true };
      }
      if (newStreak >= 3) {
        const idx = newAchievements.findIndex(a => a.id === 'streak_3');
        if (idx >= 0) newAchievements[idx] = { ...newAchievements[idx], unlocked: true };
      }

      return {
        ...prev,
        totalXP: newXP,
        lastStudyDate: today,
        weeklyActivity: newWeekly,
        streak: newStreak,
        achievements: newAchievements
      };
    });
  };

  const markPoetStudied = (id: string) => {
    updateProgress(prev => {
      if (prev.studiedPoets.includes(id)) return prev;
      const newStudied = [...prev.studiedPoets, id];
      const newAchievements = [...prev.achievements];
      if (newStudied.length >= 12) {
        const idx = newAchievements.findIndex(a => a.id === 'all_poets');
        if (idx >= 0) newAchievements[idx] = { ...newAchievements[idx], unlocked: true };
      }
      return { ...prev, studiedPoets: newStudied, achievements: newAchievements };
    });
    addXP(30);
  };

  const addQuizScore = (topic: string, score: number, total: number) => {
    updateProgress(prev => {
      const entry = { topic, score, total, date: new Date().toLocaleDateString('tr-TR') };
      const newScores = [...prev.quizScores, entry];
      const newAchievements = [...prev.achievements];
      const firstIdx = newAchievements.findIndex(a => a.id === 'first_quiz');
      if (firstIdx >= 0 && !newAchievements[firstIdx].unlocked) {
        newAchievements[firstIdx] = { ...newAchievements[firstIdx], unlocked: true };
      }
      if (score === total) {
        const perfIdx = newAchievements.findIndex(a => a.id === 'perfect_quiz');
        if (perfIdx >= 0) newAchievements[perfIdx] = { ...newAchievements[perfIdx], unlocked: true };
      }
      return { ...prev, quizScores: newScores, achievements: newAchievements };
    });
    addXP(score * 20);
  };

  const toggleFavoritePoet = (id: string) => {
    updateProgress(prev => {
      const favs = prev.favoritePoets.includes(id)
        ? prev.favoritePoets.filter(f => f !== id)
        : [...prev.favoritePoets, id];
      return { ...prev, favoritePoets: favs };
    });
  };

  const incrementFlashcard = () => {
    updateProgress(prev => {
      const newCount = prev.flashcardsDone + 1;
      const newAch = [...prev.achievements];
      if (newCount >= 50) {
        const idx = newAch.findIndex(a => a.id === 'flashcard_50');
        if (idx >= 0) newAch[idx] = { ...newAch[idx], unlocked: true };
      }
      return { ...prev, flashcardsDone: newCount, achievements: newAch };
    });
    addXP(10);
  };

  const incrementMatching = () => {
    updateProgress(prev => {
      const newCount = prev.matchingDone + 1;
      const newAch = [...prev.achievements];
      if (newCount >= 5) {
        const idx = newAch.findIndex(a => a.id === 'matching_master');
        if (idx >= 0) newAch[idx] = { ...newAch[idx], unlocked: true };
      }
      return { ...prev, matchingDone: newCount, achievements: newAch };
    });
    addXP(30);
  };

  const incrementTable = () => {
    updateProgress(prev => ({ ...prev, tableDone: prev.tableDone + 1 }));
    addXP(25);
  };

  const updateNote = (key: string, value: string) => {
    updateProgress(prev => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
  };

  const getLevel = () => {
    const xp = progress.totalXP;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) return LEVELS[i];
    }
    return LEVELS[0];
  };

  return (
    <AppContext.Provider value={{
      theme, setTheme, progress, user, login, logout, addXP, markPoetStudied, addQuizScore,
      toggleFavoritePoet, incrementFlashcard, incrementMatching, incrementTable,
      updateNote, getLevel, themeClasses: THEME_CLASSES[theme],
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
