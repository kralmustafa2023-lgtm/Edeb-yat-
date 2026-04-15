import React from 'react';
import { Bell, History, Search } from 'lucide-react';

export default function TeacherHeader() {
  return (
    <header className="flex items-center justify-between px-8 w-full z-50 sticky top-0 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/20 dark:border-zinc-800/20 shadow-sm">
      <div className="flex items-center gap-8">
        <h2 className="font-serif italic text-xl text-violet-950">Scholarly Monograph</h2>
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            className="bg-stone-100/50 border-none rounded-full pl-10 pr-4 py-1.5 text-xs font-sans focus:ring-1 focus:ring-primary/20 w-64 outline-none" 
            placeholder="Arşivlerde ara..." 
            type="text" 
          />
        </div>
      </div>

      <nav className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-8 font-sans tracking-tight text-sm uppercase font-medium text-stone-400">
          <a className="hover:text-amber-800 transition-colors" href="#">Arşiv</a>
          <a className="hover:text-amber-800 transition-colors" href="#">Fakülte</a>
          <a className="hover:text-amber-800 transition-colors" href="#">Raporlar</a>
        </div>
        
        <div className="h-6 w-[1px] bg-stone-200/50 mx-2"></div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-violet-900 hover:opacity-70 transition-opacity">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full ring-2 ring-white"></span>
          </button>
          <button className="text-violet-900 hover:opacity-70 transition-opacity">
            <History size={20} />
          </button>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest hover:shadow-lg transition-shadow">
            Yeni Taslak
          </button>
        </div>
      </nav>
    </header>
  );
}
