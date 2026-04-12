import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, CartesianGrid
} from 'recharts';
import {
  Trophy, Flame, Zap, BookOpen, Brain, Shuffle, Table2,
  Star, TrendingUp, Award, Target, Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POETS } from '../data/poetsData';

const DAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const COLORS = ['#7c3aed', '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function StatsPage() {
  const { themeClasses, theme, progress, getLevel } = useApp();
  const level = getLevel();

  const card = `rounded-2xl border p-5 ${themeClasses.card} ${themeClasses.cardBorder}`;

  const weeklyData = DAYS.map((day, i) => ({
    day,
    xp: progress.weeklyActivity[i] || 0,
  }));

  const totalQuizzes = progress.quizScores.length;
  const avgScore = totalQuizzes
    ? Math.round(progress.quizScores.reduce((a, b) => a + (b.score / b.total) * 100, 0) / totalQuizzes)
    : 0;
  const perfectQuizzes = progress.quizScores.filter(q => q.score === q.total).length;

  const studiedPoets = progress.studiedPoets.length;
  const totalPoets = POETS.length;
  const unlockedAch = progress.achievements.filter(a => a.unlocked).length;

  // Activity breakdown for pie chart
  const activityData = [
    { name: 'Flashcard', value: progress.flashcardsDone, color: '#f59e0b' },
    { name: 'Eşleştirme', value: progress.matchingDone * 10, color: '#0ea5e9' },
    { name: 'Tablo', value: progress.tableDone * 5, color: '#10b981' },
    { name: 'Quiz', value: totalQuizzes * 8, color: '#7c3aed' },
    { name: 'Şair', value: studiedPoets * 3, color: '#ec4899' },
  ].filter(d => d.value > 0);

  // Radar chart for skills
  const skillData = [
    { subject: 'Şiir Analizi', A: Math.min(100, studiedPoets * 8), fullMark: 100 },
    { subject: 'Quiz', A: Math.min(100, avgScore), fullMark: 100 },
    { subject: 'Flashcard', A: Math.min(100, progress.flashcardsDone * 2), fullMark: 100 },
    { subject: 'Eşleştirme', A: Math.min(100, progress.matchingDone * 20), fullMark: 100 },
    { subject: 'Tablo', A: Math.min(100, progress.tableDone * 25), fullMark: 100 },
    { subject: 'Seri', A: Math.min(100, progress.streak * 10), fullMark: 100 },
  ];

  // Quiz history
  const quizHistory = progress.quizScores.slice(-8).map((q, i) => ({
    name: q.topic.slice(0, 12),
    puan: Math.round((q.score / q.total) * 100),
  }));

  const tooltipStyle = {
    background: theme === 'dark' ? '#1a1a2e' : '#fff',
    border: 'none',
    borderRadius: 8,
    color: theme === 'dark' ? '#e2e2f0' : '#1a1a2e',
    fontSize: 12,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>İstatistikler</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Çalışma performansın ve gelişim grafiğin</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Günlük Seri', value: `${progress.streak}`, unit: 'gün', color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { icon: Trophy, label: 'Toplam XP', value: progress.totalXP.toLocaleString('tr-TR'), unit: 'XP', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: Brain, label: 'Quiz Ortalama', value: `%${avgScore}`, unit: '', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { icon: Award, label: 'Rozet', value: `${unlockedAch}/${progress.achievements.length}`, unit: '', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map(({ icon: Icon, label, value, unit, color, bg }, i) => (
          <motion.div
            key={label}
            className={card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{value}</p>
            <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>{label} {unit && <span className={themeClasses.textFaint}>({unit})</span>}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly XP Chart */}
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className={themeClasses.accent} />
            <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>Haftalık XP Aktivitesi</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barSize={24}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: theme === 'dark' ? '#8585a8' : '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} XP`, '']} />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <Bar dataKey="xp" fill="url(#grad1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Radar */}
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="flex items-center gap-2 mb-5">
            <Target size={16} className={themeClasses.accent} />
            <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>Beceri Haritası</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={skillData}>
              <PolarGrid stroke={theme === 'dark' ? '#ffffff15' : '#00000015'} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: theme === 'dark' ? '#8585a8' : '#6b7280' }} />
              <Radar name="Sen" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Breakdown Pie */}
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} className={themeClasses.accent} />
            <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>Aktivite Dağılımı</p>
          </div>
          {activityData.length === 0 ? (
            <div className={`h-[160px] flex items-center justify-center ${themeClasses.textMuted}`}>
              <p className="text-sm">Henüz aktivite yok</p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={160}>
                <PieChart>
                  <Pie data={activityData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {activityData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {activityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className={`text-xs ${themeClasses.textMuted} flex-1`}>{item.name}</span>
                    <span className={`text-xs ${themeClasses.text}`} style={{ fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Quiz History Line Chart */}
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center gap-2 mb-5">
            <Brain size={16} className={themeClasses.accent} />
            <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>Son Quiz Sonuçları</p>
          </div>
          {quizHistory.length === 0 ? (
            <div className={`h-[160px] flex items-center justify-center ${themeClasses.textMuted}`}>
              <p className="text-sm">Henüz quiz çözülmedi</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={quizHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#ffffff0a' : '#00000010'} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: theme === 'dark' ? '#8585a8' : '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: theme === 'dark' ? '#8585a8' : '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`%${v}`, 'Puan']} />
                <Line type="monotone" dataKey="puan" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Table */}
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <p className={`text-sm mb-4 ${themeClasses.text}`} style={{ fontWeight: 700 }}>📊 Aktivite Özeti</p>
          <div className="space-y-3">
            {[
              { icon: BookOpen, label: 'İncelenen Şair', value: `${studiedPoets}/${totalPoets}`, pct: Math.round((studiedPoets / totalPoets) * 100) },
              { icon: Brain, label: 'Çözülen Quiz', value: `${totalQuizzes}`, pct: Math.min(100, totalQuizzes * 10) },
              { icon: Zap, label: 'Flashcard', value: `${progress.flashcardsDone}`, pct: Math.min(100, progress.flashcardsDone * 2) },
              { icon: Shuffle, label: 'Eşleştirme', value: `${progress.matchingDone}`, pct: Math.min(100, progress.matchingDone * 20) },
              { icon: Table2, label: 'Tablo', value: `${progress.tableDone}`, pct: Math.min(100, progress.tableDone * 25) },
            ].map(({ icon: Icon, label, value, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className={themeClasses.textMuted} />
                    <span className={`text-xs ${themeClasses.textMuted}`}>{label}</span>
                  </div>
                  <span className={`text-xs ${themeClasses.text}`} style={{ fontWeight: 600 }}>{value}</span>
                </div>
                <div className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div className={`${card} lg:col-span-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-amber-400" />
            <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>Rozetler</p>
            <span className={`text-xs ${themeClasses.badge} px-2 py-0.5 rounded-full ml-auto`}>
              {unlockedAch}/{progress.achievements.length} açıldı
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {progress.achievements.map(a => (
              <div key={a.id} className="flex flex-col items-center gap-2 text-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  a.unlocked
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
                    : theme === 'dark' ? 'bg-white/5 grayscale opacity-30' : 'bg-black/5 grayscale opacity-30'
                }`}>
                  {a.icon}
                </div>
                <div>
                  <p className={`text-xs ${a.unlocked ? themeClasses.text : themeClasses.textFaint} leading-tight`} style={{ fontWeight: a.unlocked ? 600 : 400, fontSize: 10 }}>
                    {a.unlocked ? a.title : '???'}
                  </p>
                  {a.unlocked && (
                    <p className={`text-xs ${themeClasses.textFaint} mt-0.5`} style={{ fontSize: 9 }}>{a.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Quiz History */}
      {progress.quizScores.length > 0 && (
        <motion.div className={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className={`text-sm mb-4 ${themeClasses.text}`} style={{ fontWeight: 700 }}>📝 Son Quiz Geçmişi</p>
          <div className="space-y-2">
            {progress.quizScores.slice().reverse().slice(0, 10).map((qs, i) => {
              const pct = Math.round((qs.score / qs.total) * 100);
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-white/3' : 'bg-black/3'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    pct === 100 ? 'bg-amber-500/20 text-amber-400' : pct >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {pct === 100 ? '🏆' : pct >= 70 ? '⭐' : '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${themeClasses.text} truncate`} style={{ fontWeight: 600 }}>{qs.topic}</p>
                    <p className={`text-xs ${themeClasses.textFaint}`}>{qs.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${pct === 100 ? 'text-amber-400' : pct >= 70 ? 'text-emerald-400' : 'text-purple-400'}`} style={{ fontWeight: 700 }}>
                      {qs.score}/{qs.total}
                    </p>
                    <p className={`text-xs ${themeClasses.textFaint}`}>%{pct}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
