import React from 'react';
import { Download, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Milestone } from 'lucide-react';

export default function TeacherCalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-12">
      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-['Noto_Serif'] font-bold text-primary tracking-tight">Akademik Takvim</h2>
            <p className="text-secondary font-['Noto_Serif'] italic mt-2 text-xl">2023 - 2024 Eğitim Dönemi Planlaması</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-primary border border-stone-200 rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-1 transition-all shadow-sm">
              <Download size={18} />
              Dışa Aktar
            </button>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-1 transition-all shadow-md">
              <Plus size={18} />
              Yeni Etkinlik Ekle
            </button>
          </div>
        </div>
      </header>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Calendar Section */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-['Noto_Serif'] text-3xl font-bold text-primary">Mayıs 2024</h3>
              <div className="flex items-center gap-4 bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-stone-200"><ChevronLeft size={20}/></button>
                <span className="font-black text-xs uppercase tracking-widest px-4 text-primary">Bugün</span>
                <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-stone-200"><ChevronRight size={20}/></button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-stone-100 rounded-2xl overflow-hidden border border-stone-100">
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                <div key={day} className="bg-stone-50/50 py-4 text-center text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">{day}</div>
              ))}
              
              {/* Row 1 (Simulated) */}
              {[29, 30].map(d => (
                <div key={d} className="bg-stone-50/30 h-32 p-3 opacity-30 text-stone-300 font-medium text-sm">{d}</div>
              ))}
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer group text-stone-400 font-medium text-sm">1</div>
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">2</div>
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">
                3
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-amber-500/20 rounded-full"></div>
                </div>
              </div>
              <div className="bg-stone-50/20 h-32 p-3 text-stone-300 font-medium text-sm">4</div>
              <div className="bg-stone-50/20 h-32 p-3 text-stone-300 font-medium text-sm">5</div>
              
              {/* Row 2 */}
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">6</div>
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">7</div>
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">
                8
                <div className="mt-2 space-y-1">
                  <div className="px-2 py-0.5 text-[9px] font-bold bg-violet-100 text-violet-900 rounded truncate uppercase tracking-tighter border border-violet-200">Bölüm Toplantısı</div>
                </div>
              </div>
              <div className="bg-white h-32 p-3 border-2 border-amber-800 ring-4 ring-amber-800/10 z-10 rounded-lg">
                <span className="text-sm font-black text-amber-800">9</span>
                <div className="mt-2 space-y-1">
                  <div className="px-2 py-0.5 text-[9px] font-bold bg-amber-800 text-white rounded truncate uppercase tracking-tighter">Edebiyat Sınavı</div>
                  <div className="px-2 py-0.5 text-[9px] font-bold bg-violet-900 text-white rounded truncate uppercase tracking-tighter">Proje Teslimi</div>
                </div>
              </div>
              <div className="bg-white h-32 p-3 hover:bg-stone-50 transition-colors cursor-pointer text-stone-400 font-medium text-sm">10</div>
              <div className="bg-stone-50/20 h-32 p-3 text-stone-300 font-medium text-sm">11</div>
              <div className="bg-stone-50/20 h-32 p-3 text-stone-300 font-medium text-sm">12</div>
            </div>
          </div>
        </div>

        {/* Day Details Section */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-violet-950 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden h-48 flex flex-col justify-end">
             <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-7xl font-['Noto_Serif'] font-black opacity-20">09</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black bg-white/10 px-4 py-1.5 rounded-full border border-white/20">Perşembe</span>
              </div>
              <h4 className="text-2xl font-['Noto_Serif'] font-bold">Bugünün Gündemi</h4>
              <p className="text-white/60 text-xs mt-1 uppercase tracking-widest font-bold">3 Akademik Etkinlik</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600 opacity-20 blur-3xl -mr-10 -mt-10"></div>
          </div>

          <div className="space-y-4">
            {[
              { title: "YKS Deneme Sınavı", tag: "Sınav", time: "09:00 - 12:30", loc: "Konferans Salonu", color: "bg-amber-800" },
              { title: "TÜBİTAK Proje Teslimi", tag: "Son Tarih", time: "17:00", loc: "Online Portal", color: "bg-violet-900" },
              { title: "Zümre Öğretmenler Kurulu", tag: "Toplantı", time: "15:45", loc: "Kütüphane Arşivi", color: "bg-indigo-950" },
            ].map((ev, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-stone-200 shadow-sm hover:translate-x-2 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`w-1.5 h-12 ${ev.color} rounded-full mt-1`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-primary text-base group-hover:text-amber-800 transition-colors">{ev.title}</h5>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${ev.color} text-white`}>{ev.tag}</span>
                    </div>
                    <p className="text-stone-500 text-[10px] mt-2 flex items-center gap-2 font-semibold">
                      <Clock size={12}/> {ev.time} | <MapPin size={12}/> {ev.loc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <h6 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Ayın Özeti</h6>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-primary uppercase">Sınav Yükü</span>
              <span className="text-xs font-black text-amber-800 uppercase">%74</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-800 w-[74%] rounded-full shadow-sm shadow-amber-800/20"></div>
            </div>
            <p className="text-[11px] text-stone-500 mt-4 leading-relaxed italic font-medium">"Bu ay yoğunluk ortalamanın üzerinde. Planlanan 12 sınav ve 4 kurumsal toplantı bulunmaktadır."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
