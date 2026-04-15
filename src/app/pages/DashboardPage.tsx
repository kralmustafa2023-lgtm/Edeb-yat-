import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Flame, Trophy, Zap, BookOpen, Brain, Shuffle, Table2,
  Star, ChevronRight, Target, TrendingUp, Award, Users, Bell, X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { useApp } from '../context/AppContext';
import { POETS } from '../data/poetsData';

const DAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const QUICK_LINKS = [
  { to: '/sairler', icon: Users, label: 'Şairler', desc: '12 şair ve şiirleri', color: 'from-purple-500 to-indigo-600' },
  { to: '/quiz', icon: Brain, label: 'Quiz', desc: 'Bilgini test et', color: 'from-emerald-500 to-teal-600' },
  { to: '/flashcard', icon: Zap, label: 'Flashcard', desc: 'Hızlı tekrar', color: 'from-amber-500 to-orange-600' },
  { to: '/eslestirme', icon: Shuffle, label: 'Eşleştirme', desc: 'Kavramları eşleştir', color: 'from-sky-500 to-blue-600' },
  { to: '/tablo', icon: Table2, label: 'Tablo Doldur', desc: 'Boşlukları doldur', color: 'from-rose-500 to-pink-600' },
  { to: '/ders-notlari', icon: BookOpen, label: 'Ders Notları', desc: 'Tüm konular', color: 'from-violet-500 to-purple-600' },
];

export default function DashboardPage() {
  const { themeClasses, progress, theme, getLevel } = useApp();
  const level = getLevel();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const notifRef = ref(db, 'notifications');
    const unsubscribe = onValue(notifRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const notifList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(notifList);
      } else {
        setNotifications([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const weeklyData = DAYS.map((day, i) => ({
    day,
    xp: progress.weeklyActivity[i] || 0,
  }));

  const studiedCount = progress.studiedPoets.length;
  const totalPoets = POETS.length;
  const quizAvg = progress.quizScores.length
    ? Math.round(progress.quizScores.reduce((a, b) => a + (b.score / b.total) * 100, 0) / progress.quizScores.length)
    : 0;

  const unlockedAchievements = progress.achievements.filter(a => a.unlocked);

  const card = `rounded-2xl border p-5 ${themeClasses.card} ${themeClasses.cardBorder}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start relative z-50">
        <div>
          <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>
            Merhaba, Edebiyat Öğrencisi! 👋
          </h1>
          <p className={`${themeClasses.textMuted} mt-1`}>
            9. Sınıf Türk Dili ve Edebiyatı • {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${themeClasses.card} ${themeClasses.cardBorder} hover:bg-black/5 transition relative`}
          >
            <Bell size={22} className={themeClasses.text} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute right-0 top-14 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-2xl p-4 border ${themeClasses.card} ${themeClasses.cardBorder} z-50`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold ${themeClasses.text}`}>Duyurular</h3>
                <button onClick={() => setShowNotifications(false)} className={`${themeClasses.textMuted} hover:${themeClasses.text}`}>
                  <X size={16} />
                </button>
              </div>
              
              {notifications.length === 0 ? (
                <p className={`text-sm ${themeClasses.textMuted} text-center py-4`}>Henüz bir duyuru yok.</p>
              ) : (
                <div className="space-y-3">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{notif.sender}</span>
                        <span className={`text-[10px] ${themeClasses.textMuted}`}>
                          {new Date(notif.timestamp).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className={`text-sm text-stone-700 dark:text-stone-300`}>{notif.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Gün Serisi', value: `${progress.streak}`, unit: 'gün', color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { icon: Trophy, label: 'Toplam XP', value: progress.totalXP.toLocaleString(), unit: 'puan', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: Users, label: 'İncelenen Şair', value: `${studiedCount}/${totalPoets}`, unit: 'şair', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { icon: Target, label: 'Quiz Ortalaması', value: `${quizAvg}%`, unit: '', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map(({ icon: Icon, label, value, unit, color, bg }, i) => (
          <motion.div
            key={label}
            className={card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{value}</p>
            <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>{label} {unit && <span className={themeClasses.textFaint}>({unit})</span>}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level & Weekly Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Level Card */}
          <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={`text-xs ${themeClasses.textMuted} uppercase tracking-wide`}>Seviye</p>
                <p className={`text-lg ${level.color}`} style={{ fontWeight: 700 }}>{level.name}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs ${themeClasses.textMuted}`}>{progress.totalXP} / {level.maxXP === 99999 ? '∞' : level.maxXP} XP</p>
              </div>
            </div>
            <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, ((progress.totalXP - level.minXP) / (level.maxXP - level.minXP)) * 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {['Çaylak', 'Edebiyatsever', 'Edebiyatçı', 'Usta', 'Üstat'].map((l, i) => (
                <span key={l} className={`text-xs px-2 py-1 rounded-full ${themeClasses.badge}`}>
                  {l}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Weekly Chart */}
          <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className={themeClasses.accent} />
              <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>Haftalık Aktivite</p>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={weeklyData} barSize={20}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: theme === 'dark' ? '#8585a8' : '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: theme === 'dark' ? '#1a1a2e' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    color: theme === 'dark' ? '#e2e2f0' : '#1a1a2e',
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v} XP`, '']}
                />
                <Bar dataKey="xp" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className={`text-sm mb-3 ${themeClasses.textMuted}`} style={{ fontWeight: 600 }}>Hızlı Erişim</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_LINKS.map(({ to, icon: Icon, label, desc, color }) => (
                <Link key={to} to={to}>
                  <motion.div
                    className={`${card} hover:scale-[1.02] transition-all duration-200 cursor-pointer group`}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>{label}</p>
                    <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>{desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Achievements */}
          <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>Rozetler</p>
              </div>
              <span className={`text-xs ${themeClasses.badge} px-2 py-0.5 rounded-full`}>
                {unlockedAchievements.length}/{progress.achievements.length}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {progress.achievements.map(a => (
                <div key={a.id} className="flex flex-col items-center gap-1" title={a.unlocked ? a.title : '???'}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                    a.unlocked
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-md'
                      : theme === 'dark' ? 'bg-white/5 grayscale opacity-30' : 'bg-black/5 grayscale opacity-30'
                  }`}>
                    {a.icon}
                  </div>
                  {a.unlocked && (
                    <p className={`text-xs text-center ${themeClasses.textMuted} leading-tight`} style={{ fontSize: 9 }}>
                      {a.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Favorite Poets */}
          <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-amber-400" />
              <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>Favori Şairler</p>
            </div>
            {progress.favoritePoets.length === 0 ? (
              <p className={`text-xs ${themeClasses.textMuted}`}>
                Şair sayfasından ⭐ butonuna basarak favori ekle.
              </p>
            ) : (
              <div className="space-y-2">
                {POETS.filter(p => progress.favoritePoets.includes(p.id)).slice(0, 4).map(poet => (
                  <Link key={poet.id} to={`/sair/${poet.id}`}>
                    <div className={`flex items-center gap-2 py-1.5 px-2 rounded-lg ${themeClasses.hover} cursor-pointer`}>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${poet.gradientFrom} ${poet.gradientTo} flex items-center justify-center text-sm`}>
                        {poet.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs ${themeClasses.text} truncate`} style={{ fontWeight: 500 }}>{poet.name}</p>
                        <p className={`text-xs ${themeClasses.textMuted} truncate`}>{poet.period}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* Last Quizzes */}
          {progress.quizScores.length > 0 && (
            <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className={`text-sm mb-3 ${themeClasses.text}`} style={{ fontWeight: 600 }}>Son Quiz Sonuçları</p>
              <div className="space-y-2">
                {progress.quizScores.slice(-3).reverse().map((qs, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className={`text-xs ${themeClasses.textMuted} truncate flex-1`}>{qs.topic}</p>
                    <span className={`text-xs ml-2 ${qs.score === qs.total ? 'text-emerald-400' : qs.score >= qs.total / 2 ? 'text-amber-400' : 'text-red-400'}`} style={{ fontWeight: 600 }}>
                      {qs.score}/{qs.total}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
