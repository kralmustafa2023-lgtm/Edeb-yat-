import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  School, 
  BookOpen, 
  CalendarDays, 
  Settings, 
  PlusCircle,
  UserCircle 
} from 'lucide-react';

export default function TeacherSidebar() {
  const teacherName = "Dr. Elif Yılmaz";
  const teacherTitle = "Akademik Küratör";

  const navItems = [
    { to: "/teacher/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/teacher/classes", icon: School, label: "Sınıflar" },
    { to: "/teacher/content", icon: BookOpen, label: "İçerik" },
    { to: "/teacher/calendar", icon: CalendarDays, label: "Takvim" },
    { to: "/teacher/settings", icon: Settings, label: "Ayarlar" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-40 flex flex-col p-6 bg-stone-50 dark:bg-zinc-950 font-serif text-slate-900 dark:text-slate-100 antialiased shadow-[12px_0_40px_rgba(27,28,21,0.04)]">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="font-serif text-2xl font-bold text-violet-950 dark:text-violet-200">Nizip S.S.H.S.</h1>
        <p className="text-xs font-sans tracking-widest text-secondary font-semibold uppercase">Academic Curator</p>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:translate-x-1 cursor-pointer active:scale-95
              ${isActive 
                ? 'border-l-4 border-amber-700 text-amber-900 bg-stone-200/50 font-semibold shadow-sm' 
                : 'text-stone-500 hover:text-violet-800'
              }
            `}
          >
            <item.icon size={20} />
            <span className="font-sans font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-stone-200/50">
        <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform shadow-sm mb-6">
          <PlusCircle size={18} />
          <span className="font-sans text-xs uppercase font-bold tracking-tight">Yeni Kayıt</span>
        </button>

        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden border-2 border-surface-variant">
             <UserCircle className="text-stone-400" size={40} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-primary truncate">{teacherName}</p>
            <p className="text-[10px] uppercase tracking-tighter text-stone-400 truncate">{teacherTitle}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
