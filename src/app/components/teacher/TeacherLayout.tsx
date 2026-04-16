import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import { 
  BarChart2, Users, Mail, FileQuestion, Settings, LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TeacherLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useApp();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    } else if (user.role !== 'ogretmen') {
      navigate('/');
    }
  }, [user.isAuthenticated, user.role, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { name: 'Skor Tablosu', icon: BarChart2, path: '/teacher/dashboard' },
    { name: 'Öğrenciler', icon: Users, path: '/teacher/classes' },
    { name: 'Mesajlar', icon: Mail, path: '/teacher/messages' },
    { name: 'Sorular', icon: FileQuestion, path: '/teacher/questions' },
    { name: 'Ayarlar', icon: Settings, path: '/teacher/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-['Inter'] flex flex-col">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-50/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] w-full mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl shadow-sm border border-orange-200/50">
              👩‍🏫
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Edebiyat Kontrol Merkezi</h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-bold text-slate-700 text-sm">Yeliz Hoca</span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg text-xs hover:bg-red-100 transition-colors shadow-sm"
            >
              <LogOut size={14} />
              Çıkış
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-end h-16 gap-2">
          {tabs.map((tab) => {
            // Using includes to loosely match paths if nested
            const isActive = location.pathname.includes(tab.path) || (location.pathname === '/teacher' && tab.path === '/teacher/dashboard');
            
            return (
              <Link 
                key={tab.path} 
                to={tab.path}
                className={`flex items-center gap-2 px-6 pb-4 pt-4 font-bold text-sm transition-all border-t-4 border-b-0 ${
                  isActive 
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30' 
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
                }`}
              >
                <tab.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {tab.name}
              </Link>
            )
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
