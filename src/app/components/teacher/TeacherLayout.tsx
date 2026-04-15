import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import TeacherSidebar from './TeacherSidebar';
import TeacherHeader from './TeacherHeader';

export default function TeacherLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('authenticated');
    const role = sessionStorage.getItem('userRole');
    if (auth !== 'true') {
      navigate('/login');
    } else if (role !== 'ogretmen') {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-scholarly-bg overflow-x-hidden selection:bg-secondary-container/30">
      {/* Decorative Background Layer */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <img 
          className="w-full h-full object-cover grayscale" 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
          alt="Atmospheric library" 
        />
      </div>

      <TeacherSidebar />

      <div className="ml-64 relative z-10 flex flex-col min-h-screen">
        <TeacherHeader />
        <main className="p-10 max-w-[1440px] mx-auto w-full flex-grow">
          <Outlet />
        </main>
        
        <footer className="py-10 px-10 border-t border-stone-200/20 text-center">
          <p className="font-serif italic text-primary opacity-40 text-sm">Nizip Sosyal Bilimler Lisesi Akademik Arşivi • 2024</p>
        </footer>
      </div>
    </div>
  );
}
