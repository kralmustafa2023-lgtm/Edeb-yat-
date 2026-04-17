import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Moon, Sun, Coffee, LogOut, Trash2, Trophy, Flame,
  BookOpen, Brain, Palette, RotateCcw, Shield, Info, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { themeClasses, theme, setTheme, progress, getLevel, logout } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const level = getLevel();
  const card = `rounded-2xl border p-5 ${themeClasses.card} ${themeClasses.cardBorder}`;

  const THEMES = [
    {
      id: 'dark' as const,
      icon: Moon,
      label: 'Koyu Tema',
      desc: 'Gece çalışması için ideal',
      preview: 'from-slate-900 to-purple-950',
    },
    {
      id: 'light' as const,
      icon: Sun,
      label: 'Açık Tema',
      desc: 'Gündüz kullanım için',
      preview: 'from-slate-100 to-indigo-100',
    },
    {
      id: 'sepia' as const,
      icon: Coffee,
      label: 'Sepia Tema',
      desc: 'Göz yorulmayan kitap modu',
      preview: 'from-amber-100 to-orange-100',
    },
  ];

  const handleLogout = () => {
    if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      logout();
    }
  };

  const handleReset = () => {
    if (confirmReset) {
      // With Firebase, reset can just be a logout or setting progress to default.
      alert('İlerleme sıfırlama işlemi güvenlik nedeniyle devre dışı bırakılmıştır. Lütfen hesap değiştiriniz.');
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Ayarlar</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Uygulamayı kişiselleştir ve tercihlerini yönet</p>
      </div>

      {/* Profile Card */}
      <motion.div
        className={`${card} bg-gradient-to-br relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg">
            📚
          </div>
          <div className="flex-1">
            <p className={`text-lg ${themeClasses.text}`} style={{ fontWeight: 700 }}>Edebiyat Öğrencisi</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm ${level.color}`} style={{ fontWeight: 600 }}>{level.name}</span>
              <span className={`text-xs ${themeClasses.textMuted}`}>·</span>
              <span className={`text-xs ${themeClasses.textMuted}`}>{progress.totalXP} XP</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Flame size={12} className="text-orange-400" />
                <span className={`text-xs ${themeClasses.textMuted}`}>{progress.streak} gün seri</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={12} className="text-purple-400" />
                <span className={`text-xs ${themeClasses.textMuted}`}>{progress.studiedPoets.length} şair incelendi</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={12} className="text-amber-400" />
                <span className={`text-xs ${themeClasses.textMuted}`}>{progress.achievements.filter(a => a.unlocked).length} rozet</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Theme Selection */}
      <motion.div className={card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-2 mb-5">
          <Palette size={16} className={themeClasses.accent} />
          <p className={`text-base ${themeClasses.text}`} style={{ fontWeight: 700 }}>Tema Seçimi</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEMES.map(({ id, icon: Icon, label, desc, preview }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                theme === id
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : `${themeClasses.cardBorder} ${themeClasses.hover} opacity-70 hover:opacity-100`
              }`}
            >
              {/* Preview */}
              <div className={`h-12 rounded-xl bg-gradient-to-br ${preview} mb-3 flex items-center justify-center border ${themeClasses.divider}`}>
                <Icon size={20} className={theme === id ? 'text-purple-600' : 'text-gray-500'} />
              </div>
              <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>{label}</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>{desc}</p>
              {theme === id && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div className={card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center gap-2 mb-5">
          <Brain size={16} className={themeClasses.accent} />
          <p className={`text-base ${themeClasses.text}`} style={{ fontWeight: 700 }}>Çalışma Özeti</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Quiz Çözüldü', value: progress.quizScores.length, color: 'text-purple-400' },
            { label: 'Flashcard', value: progress.flashcardsDone, color: 'text-amber-400' },
            { label: 'Eşleştirme', value: progress.matchingDone, color: 'text-sky-400' },
            { label: 'Tablo', value: progress.tableDone, color: 'text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} text-center`}>
              <p className={`text-2xl ${color}`} style={{ fontWeight: 700 }}>{value}</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hakkında */}
      <motion.div className={card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className={themeClasses.accent} />
          <p className={`text-base ${themeClasses.text}`} style={{ fontWeight: 700 }}>Uygulama Hakkında</p>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Uygulama Adı', value: '9. Sınıf Edebiyat' },
            { label: 'Versiyon', value: '1.0.0' },
            { label: 'Müfredat', value: 'MEB 9. Sınıf Türk Dili ve Edebiyatı' },
            { label: 'Şair Sayısı', value: '12 şair' },
            { label: 'Konu Sayısı', value: 'Tam müfredat kapsamı' },
          ].map(({ label, value }) => (
            <div key={label} className={`flex items-center justify-between py-2 border-b last:border-b-0 ${themeClasses.divider}`}>
              <span className={`text-sm ${themeClasses.textMuted}`}>{label}</span>
              <span className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div className={card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center gap-2 mb-5">
          <Shield size={16} className="text-red-400" />
          <p className={`text-base ${themeClasses.text}`} style={{ fontWeight: 700 }}>Tehlikeli Bölge</p>
        </div>
        <div className="space-y-3">
          {/* Reset Progress */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            theme === 'dark' ? 'border-amber-500/20 bg-amber-500/5' : 'border-amber-200 bg-amber-50'
          }`}>
            <div>
              <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>İlerlemeyi Sıfırla</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>XP, quiz sonuçları ve rozet verileri silinir</p>
            </div>
            <button
              onClick={handleReset}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                confirmReset
                  ? 'bg-red-500 text-white'
                  : 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
              }`}
              style={{ fontWeight: 600 }}
            >
              <RotateCcw size={14} />
              {confirmReset ? 'Emin misin?' : 'Sıfırla'}
            </button>
          </div>

          {/* Logout */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            theme === 'dark' ? 'border-red-500/20 bg-red-500/5' : 'border-red-200 bg-red-50'
          }`}>
            <div>
              <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>Çıkış Yap</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>Tüm veriler temizlenir ve uygulama yenilenir</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm transition-all"
              style={{ fontWeight: 600 }}
            >
              <LogOut size={14} />
              Çıkış
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
