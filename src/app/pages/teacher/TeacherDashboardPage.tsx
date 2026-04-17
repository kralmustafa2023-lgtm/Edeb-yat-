import React, { useState, useEffect } from 'react';
import { Users, Gamepad2, Trophy, BarChart3, Medal } from 'lucide-react';
import { onLeaderboardChange, type LeaderboardEntry } from '../../firebase/database';

export default function TeacherDashboardPage() {
  const [students, setStudents] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onLeaderboardChange((entries) => {
      setStudents(entries);
      setLoading(false);
    });
    return unsub;
  }, []);

  const totalStudents = students.length;
  const totalGamesPlayed = students.reduce((sum, s) => sum + s.quizCount + s.flashcardsDone + s.matchingDone + s.tableDone, 0);
  const topStudent = students.length > 0 ? students[0].name : '—';

  const cards = [
    { value: String(totalStudents), label: 'Toplam Öğrenci', icon: Users, bg: 'bg-indigo-50/80', iconColor: 'text-indigo-900', border: 'border-indigo-100/50' },
    { value: String(totalGamesPlayed), label: 'Oynanan Oyun', icon: Gamepad2, bg: 'bg-teal-50/80', iconColor: 'text-teal-900', border: 'border-teal-100/50' },
    { value: topStudent, label: 'Sınıf Birincisi', icon: Trophy, bg: 'bg-amber-50/80', iconColor: 'text-amber-600', border: 'border-amber-100/50' },
    { value: '1', label: 'Grup / Sınıf', icon: BarChart3, bg: 'bg-rose-50/80', iconColor: 'text-rose-900', border: 'border-rose-100/50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-6 shadow-sm border ${card.border} flex items-center gap-6`}>
            <div className={`w-14 h-14 rounded-full ${card.bg} flex items-center justify-center shrink-0`}>
              <card.icon strokeWidth={2.5} size={24} className={card.iconColor} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1 text-left">{card.value}</p>
              <p className="text-[13px] font-bold text-slate-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 border border-slate-100/50">
        <div className="flex items-center gap-2 mb-8">
          <BarChart3 className="text-indigo-900" size={24} strokeWidth={2.5} />
          <h2 className="text-xl font-black text-indigo-900">Skor Sıralaması</h2>
          <span className="ml-auto text-xs font-bold text-emerald-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Canlı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-sm w-16">Sıra</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Öğrenci</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">XP</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Oyun</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Doğruluk</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Seri</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500 font-medium">Yükleniyor...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-slate-500 font-medium">Kayıtlı öğrenci bulunamadı.</td></tr>
              ) : (
                students.map((student, idx) => (
                  <tr key={student.username} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5">
                      {idx === 0 ? <Medal className="text-amber-500 fill-amber-500" size={24} />
                        : idx === 1 ? <Medal className="text-slate-300 fill-slate-200" size={24} />
                        : idx === 2 ? <Medal className="text-amber-700 fill-amber-600" size={24} />
                        : <span className="font-bold text-slate-400 ml-2">{idx + 1}</span>}
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0">👤</div>
                        <div>
                          <p className="font-black text-slate-800 text-[15px] leading-tight">{student.name}</p>
                          <p className="text-xs font-bold text-slate-400">@{student.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-1">
                        <span className="font-black text-amber-500">{student.totalXP}</span>
                        <span className="text-amber-500 text-sm">⭐</span>
                      </div>
                    </td>
                    <td className="py-5 font-black text-indigo-900">
                      {student.quizCount + student.flashcardsDone + student.matchingDone + student.tableDone}
                    </td>
                    <td className="py-5 font-bold text-slate-600">{student.accuracy}</td>
                    <td className="py-5 font-bold text-orange-500">{student.streak > 0 ? `🔥 ${student.streak}` : '—'}</td>
                    <td className="py-5">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 font-bold rounded-full text-xs">Aktif</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
