import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { saveProgress, getProgress, onProgressChange } from '../firebase/database';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizScore {
  topic: string;
  score: number;
  total: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export interface Progress {
  totalXP: number;
  streak: number;
  quizScores: QuizScore[];
  flashcardsDone: number;
  matchingDone: number;
  tableDone: number;
  studiedPoets: string[];
  favoritePoets: string[];
  achievements: Achievement[];
  weeklyActivity: number[];
  lastActiveDate?: string;
}

interface User {
  isAuthenticated: boolean;
  username: string;
  role: 'ogrenci' | 'ogretmen' | '';
  name: string;
}

interface Level {
  name: string;
  color: string;
  minXP: number;
  maxXP: number;
}

interface ThemeClasses {
  bg: string;
  text: string;
  textMuted: string;
  textFaint: string;
  card: string;
  cardBorder: string;
  sidebar: string;
  divider: string;
  hover: string;
  accent: string;
  badge: string;
  inputBg: string;
  inputBorder: string;
}

type ThemeId = 'dark' | 'light' | 'sepia';

interface AppContextType {
  user: User;
  progress: Progress;
  theme: ThemeId;
  themeClasses: ThemeClasses;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (id: ThemeId) => void;
  login: (username: string, role: 'ogrenci' | 'ogretmen', name: string) => void;
  logout: () => void;
  getLevel: () => Level;
  addQuizScore: (topic: string, score: number, total: number) => void;
  incrementFlashcard: () => void;
  incrementMatching: () => void;
  incrementTable: () => void;
  toggleFavoritePoet: (poetId: string) => void;
  markPoetStudied: (poetId: string) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_quiz', title: 'İlk Quiz', icon: '🧠', unlocked: false },
  { id: 'quiz_master', title: 'Quiz Ustası', icon: '🏆', unlocked: false },
  { id: 'first_flashcard', title: 'İlk Flashcard', icon: '⚡', unlocked: false },
  { id: 'first_matching', title: 'İlk Eşleştirme', icon: '🔀', unlocked: false },
  { id: 'first_table', title: 'İlk Tablo', icon: '📊', unlocked: false },
  { id: 'poet_lover', title: 'Şair Dostu', icon: '📚', unlocked: false },
  { id: 'streak_3', title: '3 Gün Seri', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: '7 Gün Seri', icon: '💎', unlocked: false },
  { id: 'xp_100', title: '100 XP', icon: '⭐', unlocked: false },
  { id: 'xp_500', title: '500 XP', icon: '🌟', unlocked: false },
  { id: 'xp_1000', title: '1000 XP', icon: '💫', unlocked: false },
  { id: 'all_poets', title: 'Tüm Şairler', icon: '👑', unlocked: false },
];

const DEFAULT_PROGRESS: Progress = {
  totalXP: 0,
  streak: 0,
  quizScores: [],
  flashcardsDone: 0,
  matchingDone: 0,
  tableDone: 0,
  studiedPoets: [],
  favoritePoets: [],
  achievements: DEFAULT_ACHIEVEMENTS,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  lastActiveDate: '',
};

const DEFAULT_USER: User = {
  isAuthenticated: false,
  username: '',
  role: '',
  name: '',
};

// ─── Levels ───────────────────────────────────────────────────────────────────

const LEVELS: Level[] = [
  { name: 'Çaylak', color: 'text-gray-400', minXP: 0, maxXP: 100 },
  { name: 'Edebiyatsever', color: 'text-emerald-400', minXP: 100, maxXP: 300 },
  { name: 'Edebiyatçı', color: 'text-blue-400', minXP: 300, maxXP: 600 },
  { name: 'Usta', color: 'text-purple-400', minXP: 600, maxXP: 1000 },
  { name: 'Üstat', color: 'text-amber-400', minXP: 1000, maxXP: 99999 },
];

// ─── Themes ───────────────────────────────────────────────────────────────────

const THEME_MAP: Record<ThemeId, ThemeClasses> = {
  dark: {
    bg: 'bg-[#0f0f1a]',
    text: 'text-white',
    textMuted: 'text-gray-400',
    textFaint: 'text-gray-600',
    card: 'bg-[#1a1a2e]',
    cardBorder: 'border-white/10',
    sidebar: 'bg-[#12121f] border-white/10',
    divider: 'border-white/10',
    hover: 'hover:bg-white/5',
    accent: 'text-purple-400',
    badge: 'bg-white/10 text-gray-300',
    inputBg: 'bg-white/5',
    inputBorder: 'border-white/10',
  },
  light: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    textFaint: 'text-gray-400',
    card: 'bg-white',
    cardBorder: 'border-gray-200',
    sidebar: 'bg-white border-gray-200',
    divider: 'border-gray-200',
    hover: 'hover:bg-gray-100',
    accent: 'text-indigo-600',
    badge: 'bg-gray-100 text-gray-600',
    inputBg: 'bg-gray-50',
    inputBorder: 'border-gray-200',
  },
  sepia: {
    bg: 'bg-amber-50',
    text: 'text-amber-950',
    textMuted: 'text-amber-700',
    textFaint: 'text-amber-500',
    card: 'bg-amber-100/50',
    cardBorder: 'border-amber-200',
    sidebar: 'bg-amber-100 border-amber-200',
    divider: 'border-amber-200',
    hover: 'hover:bg-amber-200/50',
    accent: 'text-amber-700',
    badge: 'bg-amber-200 text-amber-800',
    inputBg: 'bg-amber-50',
    inputBorder: 'border-amber-200',
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('edebiyat_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch { return DEFAULT_USER; }
  });

  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [theme, setThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem('edebiyat_theme') as ThemeId) || 'dark';
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Ref to track if we're currently saving, to avoid re-saving Firebase updates
  const isSaving = useRef(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // ── Load progress from Firebase on login ──
  useEffect(() => {
    if (!user.isAuthenticated || user.role !== 'ogrenci') {
      setLoaded(true);
      return;
    }

    // Listen to realtime changes from Firebase
    const unsub = onProgressChange(user.username, (fbProgress) => {
      if (isSaving.current) return; // Skip echo from our own save
      if (fbProgress) {
        // Merge with defaults to ensure all fields exist
        setProgress(prev => ({
          ...DEFAULT_PROGRESS,
          ...fbProgress,
          achievements: fbProgress.achievements?.length
            ? fbProgress.achievements
            : prev.achievements,
        }));
      }
      setLoaded(true);
    });

    return unsub;
  }, [user.isAuthenticated, user.username, user.role]);

  // ── Save progress to Firebase whenever it changes ──
  useEffect(() => {
    if (!user.isAuthenticated || user.role !== 'ogrenci' || !loaded) return;

    const timeout = setTimeout(() => {
      isSaving.current = true;
      saveProgress(user.username, progress)
        .catch(err => console.error('[Firebase save error]', err))
        .finally(() => {
          setTimeout(() => { isSaving.current = false; }, 1000);
        });
    }, 500); // Debounce 500ms

    return () => clearTimeout(timeout);
  }, [progress, user.isAuthenticated, user.username, user.role, loaded]);

  // ── Streak management ──
  const updateStreak = useCallback((prog: Progress): Progress => {
    const today = new Date().toISOString().slice(0, 10);
    if (prog.lastActiveDate === today) return prog;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newStreak = prog.lastActiveDate === yesterday ? prog.streak + 1 : 1;
    const dayIndex = new Date().getDay(); // 0=Sun
    const newWeekly = [...prog.weeklyActivity];
    newWeekly[dayIndex] = (newWeekly[dayIndex] || 0);

    return { ...prog, streak: newStreak, lastActiveDate: today, weeklyActivity: newWeekly };
  }, []);

  // ── Check achievements ──
  const checkAchievements = useCallback((prog: Progress): Progress => {
    const a = prog.achievements.map(ach => ({ ...ach }));
    const unlock = (id: string) => {
      const found = a.find(x => x.id === id);
      if (found) found.unlocked = true;
    };

    if (prog.quizScores.length >= 1) unlock('first_quiz');
    if (prog.quizScores.length >= 10) unlock('quiz_master');
    if (prog.flashcardsDone >= 1) unlock('first_flashcard');
    if (prog.matchingDone >= 1) unlock('first_matching');
    if (prog.tableDone >= 1) unlock('first_table');
    if (prog.favoritePoets.length >= 3) unlock('poet_lover');
    if (prog.streak >= 3) unlock('streak_3');
    if (prog.streak >= 7) unlock('streak_7');
    if (prog.totalXP >= 100) unlock('xp_100');
    if (prog.totalXP >= 500) unlock('xp_500');
    if (prog.totalXP >= 1000) unlock('xp_1000');
    if (prog.studiedPoets.length >= 12) unlock('all_poets');

    return { ...prog, achievements: a };
  }, []);

  // ── Add XP helper ──
  const addXP = useCallback((amount: number, updater: (prev: Progress) => Progress) => {
    setProgress(prev => {
      let next = updater(prev);
      next = { ...next, totalXP: next.totalXP + amount };
      // Update weekly activity
      const dayIndex = new Date().getDay();
      const newWeekly = [...next.weeklyActivity];
      newWeekly[dayIndex] = (newWeekly[dayIndex] || 0) + amount;
      next = { ...next, weeklyActivity: newWeekly };
      next = updateStreak(next);
      next = checkAchievements(next);
      return next;
    });
  }, [updateStreak, checkAchievements]);

  // ─── Actions ────────────────────────────────────────────────────────────────

  const login = useCallback((username: string, role: 'ogrenci' | 'ogretmen', name: string) => {
    const newUser: User = { isAuthenticated: true, username, role, name };
    setUser(newUser);
    localStorage.setItem('edebiyat_user', JSON.stringify(newUser));
    if (role === 'ogretmen') {
      setProgress(DEFAULT_PROGRESS);
      setLoaded(true);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(DEFAULT_USER);
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem('edebiyat_user');
    setLoaded(false);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem('edebiyat_theme', id);
  }, []);

  const getLevel = useCallback((): Level => {
    const xp = progressRef.current.totalXP;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) return LEVELS[i];
    }
    return LEVELS[0];
  }, []);

  const addQuizScore = useCallback((topic: string, score: number, total: number) => {
    addXP(score * 10, prev => ({
      ...prev,
      quizScores: [...prev.quizScores, { topic, score, total }],
    }));
  }, [addXP]);

  const incrementFlashcard = useCallback(() => {
    addXP(15, prev => ({ ...prev, flashcardsDone: prev.flashcardsDone + 1 }));
  }, [addXP]);

  const incrementMatching = useCallback(() => {
    addXP(20, prev => ({ ...prev, matchingDone: prev.matchingDone + 1 }));
  }, [addXP]);

  const incrementTable = useCallback(() => {
    addXP(20, prev => ({ ...prev, tableDone: prev.tableDone + 1 }));
  }, [addXP]);

  const toggleFavoritePoet = useCallback((poetId: string) => {
    setProgress(prev => {
      const favs = prev.favoritePoets.includes(poetId)
        ? prev.favoritePoets.filter(id => id !== poetId)
        : [...prev.favoritePoets, poetId];
      return checkAchievements({ ...prev, favoritePoets: favs });
    });
  }, [checkAchievements]);

  const markPoetStudied = useCallback((poetId: string) => {
    setProgress(prev => {
      if (prev.studiedPoets.includes(poetId)) return prev;
      const next = {
        ...prev,
        studiedPoets: [...prev.studiedPoets, poetId],
        totalXP: prev.totalXP + 25,
      };
      return checkAchievements(updateStreak(next));
    });
  }, [checkAchievements, updateStreak]);

  const themeClasses = THEME_MAP[theme];

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        theme,
        themeClasses,
        sidebarOpen,
        setSidebarOpen,
        setTheme,
        login,
        logout,
        getLevel,
        addQuizScore,
        incrementFlashcard,
        incrementMatching,
        incrementTable,
        toggleFavoritePoet,
        markPoetStudied,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
