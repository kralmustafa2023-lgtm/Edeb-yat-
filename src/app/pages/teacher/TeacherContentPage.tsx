import React from 'react';
import { LayoutGrid, List, BookOpen, Download, FileText, PlayCircle, HelpCircle, GraduationCap, History, Globe, Brain, Languages, MoreVertical, Search } from 'lucide-react';

export default function TeacherContentPage() {
  const categories = [
    { title: "Türk Dili ve Ed.", count: 48, icon: BookOpen, color: "bg-violet-100 text-violet-900" },
    { title: "Tarih", count: 32, icon: History, color: "bg-amber-100 text-amber-900" },
    { title: "Coğrafya", count: 19, icon: Globe, color: "bg-emerald-100 text-emerald-900" },
    { title: "Felsefe", count: 24, icon: Brain, color: "bg-indigo-100 text-indigo-900" },
    { title: "Yabancı Dil", count: 65, icon: Languages, color: "bg-red-100 text-red-900" },
  ];

  const files = [
    { name: "Edebiyat Kuramları - Giriş.pdf", type: "PDF", tag: "Public", date: "12 Haz 2024", count: 42, icon: FileText, iconColor: "text-red-500", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=200" },
    { name: "Modernizm ve Şiir Semineri", type: "Video", tag: "12-A Sınıfı", date: "10 Haz 2024", count: 156, icon: PlayCircle, iconColor: "text-violet-500", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200" },
    { name: "Dönem Sonu Değerlendirme", type: "Quiz", tag: "Public", date: "08 Haz 2024", count: 89, icon: HelpCircle, iconColor: "text-amber-600", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200" },
    { name: "Okuma Listesi: Yaz Dönemi", type: "DOCX", tag: "Public", date: "05 Haz 2024", count: 214, icon: FileText, iconColor: "text-blue-500", img: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="space-y-10 pb-10">
      <section className="flex justify-between items-end">
        <div>
          <span className="text-amber-800 font-black tracking-[0.2em] uppercase text-xs">Arşiv Yönetimi</span>
          <h2 className="text-4xl font-serif font-bold text-violet-950 mt-2 tracking-tight">Ders Materyalleri</h2>
        </div>
        <div className="flex bg-white/50 p-1.5 rounded-xl border border-stone-200">
          <button className="p-2 rounded-lg bg-white shadow-sm text-violet-950"><LayoutGrid size={20}/></button>
          <button className="p-2 rounded-lg text-stone-400 hover:text-violet-950 transition-colors"><List size={20}/></button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Large Drag & Drop Area */}
        <div className="col-span-12 lg:col-span-8 rounded-[2.5rem] bg-violet-950 relative overflow-hidden group border border-violet-900 border-4 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(253,158,112,0.15),transparent_70%)] pointer-events-none"></div>
          <div className="relative p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/20 m-6 rounded-[2rem] min-h-[340px]">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 ring-4 ring-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
              <BookOpen className="text-amber-600" size={40} />
            </div>
            <h3 className="text-3xl font-serif text-white mb-3">Yeni Materyal Yükleyin</h3>
            <p className="text-white/60 font-body text-sm max-w-sm mb-8 font-medium">
              PDF, Video veya Quiz dosyalarını buraya sürükleyin ya da bilgisayarınızdan seçin.
            </p>
            <button className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-black tracking-widest text-xs uppercase shadow-lg shadow-amber-900/40 hover:-translate-y-0.5 transition-all outline-none">
              Dosya Seçin
            </button>
          </div>
        </div>

        {/* Categories / Quick View Column */}
        <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-stone-50 p-8 rounded-[2.5rem] flex flex-col justify-between border border-stone-100 shadow-sm border-2">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                <Search className="text-violet-900" size={24} />
              </div>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Haftalık Artış</span>
            </div>
            <div>
              <div className="text-5xl font-serif text-violet-950 font-black tracking-tighter">124</div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-widest mt-2">Yeni İçerik Eklendi</div>
            </div>
          </div>
          <div className="bg-amber-50 p-8 rounded-[2.5rem] flex flex-col justify-between border border-amber-100 shadow-sm border-2">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                <Download className="text-amber-800" size={24} />
              </div>
              <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest">Erişim</span>
            </div>
            <div>
              <div className="text-5xl font-serif text-amber-900 font-black tracking-tighter">8.2k</div>
              <div className="text-xs text-amber-800/60 font-bold uppercase tracking-widest mt-2">Öğrenci Görüntülemesi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-serif font-black text-violet-950 italic">Arşiv Gezgini</h3>
          <div className="h-px flex-1 bg-stone-200"></div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {files.map((file, idx) => (
            <div key={idx} className="col-span-12 md:col-span-4 lg:col-span-3 group">
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100 hover:shadow-2xl hover:shadow-violet-900/5 transition-all duration-500 cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl bg-stone-50 mb-5 relative overflow-hidden flex items-center justify-center border border-stone-100 italic font-black text-stone-300">
                  <img src={file.img} alt={file.name} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" />
                  <file.icon size={48} className={`${file.iconColor} relative z-10 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-violet-900 text-sm truncate pr-2 group-hover:text-amber-800 transition-colors uppercase tracking-tight">{file.name}</h4>
                    <MoreVertical size={16} className="text-stone-300 mt-0.5 cursor-pointer hover:text-stone-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-2.5 py-1 bg-stone-100 rounded text-stone-500 font-black uppercase tracking-widest">{file.type}</span>
                    <span className="text-[9px] px-2.5 py-1 bg-amber-100 rounded text-amber-900 font-black uppercase tracking-widest">{file.tag}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    <span>{file.date}</span>
                    <span className="flex items-center gap-1.5"><Download size={12}/> {file.count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Chips */}
      <section className="space-y-6 pt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif font-black text-violet-950 italic">Kategoriler</h3>
          <button className="text-amber-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-amber-800/20 hover:border-amber-800 transition-all pb-1">
            Tümünü Gör <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex-shrink-0 px-8 py-5 bg-white rounded-3xl flex items-center gap-4 border border-stone-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <div>
                <div className="text-sm font-black text-violet-950 uppercase tracking-tight">{cat.title}</div>
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{cat.count} Materyal</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
