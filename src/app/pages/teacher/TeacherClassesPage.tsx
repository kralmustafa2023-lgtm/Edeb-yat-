import React from 'react';
import { Users, TrendingUp, Send, Filter, Download, Eye, MessageSquare, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function TeacherClassesPage() {
  const students = [
    { name: "Emre Can Arslan", role: "Fen Bilimleri Odaklı", id: "#SSH-2024-081", gpa: 94.2, attendance: "0.5 Gün", status: "green", img: "https://images.unsplash.com/photo-1519085185758-29178b31a28a?auto=format&fit=crop&q=80&w=100" },
    { name: "Selin Demir", role: "Dil Bölümü Birincisi", id: "#SSH-2024-044", gpa: 89.7, attendance: "2.0 Gün", status: "amber", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: "Mert Öztürk", role: "Tarih Meraklısı", id: "#SSH-2024-112", gpa: 76.4, attendance: "4.5 Gün", status: "red", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-4xl font-bold text-primary tracking-tight">Sınıf Yönetimi</h2>
          <p className="text-secondary font-medium mt-1">Nizip Sosyal Bilimler Lisesi Akademik Kayıtları</p>
        </div>
        {/* Class Selection Tabs */}
        <div className="flex bg-stone-100 p-1.5 rounded-full border border-stone-200 shadow-sm">
          <button className="px-6 py-2 rounded-full text-sm font-semibold transition-all bg-white text-primary shadow-sm">11-C Sosyal Bilimler</button>
          <button className="px-6 py-2 rounded-full text-sm font-medium text-stone-500 hover:text-primary transition-all">11-B</button>
          <button className="px-6 py-2 rounded-full text-sm font-medium text-stone-500 hover:text-primary transition-all">10-A</button>
          <button className="px-6 py-2 rounded-full text-sm font-medium text-stone-500 hover:text-primary transition-all">9-F</button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Mevcut</span>
             <span className="text-amber-800">24/30</span>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-primary">24</p>
            <p className="text-xs text-stone-500">Kayıtlı Öğrenci</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">GPA Ortalaması</span>
            <div className="text-amber-800 text-xs font-bold">↑ 2.1</div>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-primary">88.4</p>
            <p className="text-xs text-stone-500">Sınıf Başarı Puanı</p>
          </div>
        </div>
        <div className="col-span-2 bg-violet-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between h-40 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Hızlı Eylemler</span>
            <h3 className="font-serif text-xl mt-2 italic">Akademik Bildirim Gönder</h3>
          </div>
          <button className="relative z-10 w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
             Veli Mesajı Gönder
          </button>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Student Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100">
          <h3 className="font-serif text-2xl text-primary italic">Öğrenci Listesi</h3>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200">
              Filtrele
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200">
              Dışa Aktar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">Öğrenci</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">Okul No</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">Akademik Durum</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">Devamsızlık</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img alt={student.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all border border-stone-200" src={student.img} />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full bg-${student.status === 'green' ? 'green-500' : student.status === 'amber' ? 'amber-500' : 'red-500'}`}></div>
                      </div>
                      <div>
                        <p className="font-serif text-base font-bold text-primary">{student.name}</p>
                        <p className="text-xs text-stone-500">{student.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono text-sm text-stone-600 font-medium">{student.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1 w-32">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-stone-400">
                        <span>GPA</span>
                        <span>{student.gpa}</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-700 rounded-full" style={{ width: `${student.gpa}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                      student.status === 'green' ? 'bg-green-50 text-green-700 border-green-100' :
                      student.status === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>{student.attendance}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-stone-400 hover:text-violet-900 transition-colors"><Eye size={20}/></button>
                      <button className="p-2 text-stone-400 hover:text-amber-700 transition-colors"><MessageSquare size={20}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 bg-stone-50 flex items-center justify-between border-t border-stone-100">
          <p className="text-xs text-stone-500">24 öğrenciden 1-3 arası gösteriliyor</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-stone-400 border border-stone-200 cursor-not-allowed">←</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-violet-950 text-white font-bold text-xs shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200 font-medium text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200 font-medium text-xs">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200">→</button>
          </div>
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="text-center py-12">
        <p className="font-serif italic text-stone-400 opacity-60">"Kültür, insanın tabiat üzerinde bıraktığı her türlü izdir."</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300 mt-2 font-bold">Nizip Sosyal Bilimler Lisesi Arşiv Sistemi</p>
      </div>
    </div>
  );
}
