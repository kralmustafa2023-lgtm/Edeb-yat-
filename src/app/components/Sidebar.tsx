import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Brain, Zap, Table2, Shuffle, BarChart3,
  Settings, ChevronLeft, ChevronRight, Users, Home,
  Star, Flame, Trophy, LogOut, Sun, Moon, Coffee,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Ana Sayfa', exact: true },
  { to: '/sairler', icon: Users, label: 'Şairler' },
  { to: '/ders-notlari', icon: BookOpen, label: 'Ders Notları' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/flashcard', icon: Zap, label: 'Flashcard' },
  { to: '/tablo', icon: Table2, label: 'Tablo Doldurma' },
  { to: '/eslestirme', icon: Shuffle, label: 'Eşleştirme' },
  { to: '/istatistik', icon: BarChart3, label: 'İstatistik' },
];

const LEVEL_NAMES = ['Çaylak', 'Edebiyatsever', 'Edebiyatçı', 'Usta', 'Üstat'];

export function Sidebar() {
  const { themeClasses, theme, setTheme, progress, sidebarOpen, setSidebarOpen, getLevel, logout } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const level = getLevel();
  const nextLevelXP = level.maxXP === 99999 ? progress.totalXP + 500 : level.maxXP;
  const xpInLevel = progress.totalXP - level.minXP;
  const xpNeeded = nextLevelXP - level.minXP;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  const THEMES = [
    { id: 'dark', icon: Moon, label: 'Koyu' },
    { id: 'light', icon: Sun, label: 'Açık' },
    { id: 'sepia', icon: Coffee, label: 'Sepia' },
  ] as const;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r ${themeClasses.sidebar} transition-colors duration-300`}
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 68 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Logo & Toggle */}
        <div className={`flex items-center justify-between p-4 border-b ${themeClasses.divider}`}>
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm shrink-0">
                  📚
                </div>
                <div>
                  <p className={`text-sm leading-none ${themeClasses.text}`} style={{ fontWeight: 700 }}>Edebiyat</p>
                  <p className={`text-xs ${themeClasses.textMuted}`}>9. Sınıf</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm mx-auto">
              📚
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`${themeClasses.hover} rounded-lg p-1.5 ${themeClasses.textMuted} transition-colors shrink-0 ${!sidebarOpen ? 'mx-auto mt-3' : ''}`}
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* XP / Level Bar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`px-4 py-3 border-b ${themeClasses.divider}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={14} className="text-amber-400" />
                <span className={`text-xs ${level.color}`} style={{ fontWeight: 600 }}>{level.name}</span>
                <span className={`text-xs ${themeClasses.textMuted} ml-auto`}>{progress.totalXP} XP</span>
              </div>
              <div className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-orange-400" />
                  <span className={`text-xs ${themeClasses.textMuted}`}>{progress.streak} gün</span>
                </div>
                <span className={`text-xs ${themeClasses.textFaint}`}>{pct}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-1 px-2">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-purple-600/30 text-purple-300 shadow-sm'
                      : theme === 'sepia'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-indigo-100 text-indigo-700'
                    : `${themeClasses.hover} ${themeClasses.textMuted} hover:${themeClasses.text}`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={`shrink-0 ${isActive ? (theme === 'dark' ? 'text-purple-400' : theme === 'sepia' ? 'text-amber-700' : 'text-indigo-600') : ''}`}
                  />
                  <AnimatePresence mode="wait">
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-sm overflow-hidden whitespace-nowrap"
                        style={{ fontWeight: isActive ? 600 : 400 }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className={`border-t ${themeClasses.divider} p-2`}>
          <AnimatePresence>
            {showSettings && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-2 p-3 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}
              >
                <p className={`text-xs mb-2 ${themeClasses.textMuted}`} style={{ fontWeight: 600 }}>TEMA</p>
                <div className="grid grid-cols-3 gap-1">
                  {THEMES.map(({ id, icon: TIcon, label }) => (
                    <button
                      key={id}
                      onClick={() => setTheme(id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all ${
                        theme === id
                          ? 'bg-purple-600 text-white'
                          : `${themeClasses.hover} ${themeClasses.textMuted}`
                      }`}
                    >
                      <TIcon size={14} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <div className={`mt-2 pt-2 border-t ${themeClasses.divider}`}>
                  <button
                    onClick={() => navigate('/ayarlar')}
                    className={`w-full text-left text-xs ${themeClasses.textMuted} ${themeClasses.hover} px-2 py-1.5 rounded-lg flex items-center gap-2`}
                  >
                    <Settings size={12} />
                    <span>Tüm Ayarlar</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted} transition-colors`}
          >
            <Settings size={18} className="shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Ayarlar
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => {
              if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                logout();
              }
            }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors mt-1`}
          >
            <LogOut size={18} className="shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Çıkış
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}