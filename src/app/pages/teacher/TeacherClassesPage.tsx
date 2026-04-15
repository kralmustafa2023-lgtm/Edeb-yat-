import React from 'react';
import { Users, Pencil, KeyRound, Trash2 } from 'lucide-react';

export default function TeacherClassesPage() {
  const students = [
    { name: 'Mstfuygur', subclass: 'Mstfuygur', group: '-', score: 0, gold: 0, status: 'Aktif' },
    { name: 'mustafa', subclass: 'deneme', group: '9/A', score: 11, gold: 181, status: 'Aktif' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2">
          <Users size={24} strokeWidth={2.5} className="text-slate-800" />
          Öğrenci Yönetimi ({students.length} Kişi)
        </h2>
        
        <button className="px-5 py-2.5 bg-teal-100 text-teal-700 font-bold text-sm rounded-xl hover:bg-teal-200 transition-colors shadow-sm">
          + Yeni Öğrenci Ekle
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 border border-slate-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-sm">Öğrenci</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Grup</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Puan</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Altın</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Durum</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        👤
                      </div>
                      <div>
                        <p className="font-black text-indigo-950 text-[15px] leading-tight">{student.name}</p>
                        <p className="text-xs font-bold text-slate-400">{student.subclass}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 font-black text-indigo-900 text-sm">{student.group}</td>
                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <span className="font-black text-amber-500">{student.score}</span>
                      <span className="text-amber-500 text-sm">⭐</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <span className="font-black text-emerald-600">{student.gold}</span>
                      <span className="text-sm">💰</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 font-bold rounded-full text-[11px] uppercase tracking-wider">
                      {student.status}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100 transition-colors">
                        Detay
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                        <Pencil size={14} strokeWidth={2.5} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                        <KeyRound size={14} strokeWidth={2.5} />
                      </button>
                      <button className="px-4 py-1.5 bg-rose-50 text-rose-600 font-bold text-xs rounded-lg hover:bg-rose-100 transition-colors">
                        Kapat
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-orange-50 text-slate-600 rounded-lg hover:bg-orange-100 transition-colors">
                        <Trash2 size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
