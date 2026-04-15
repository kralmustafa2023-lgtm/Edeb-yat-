import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Lock, ArrowRight } from 'lucide-react';
import '../../styles/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'ogrenci' | 'ogretmen'>('ogrenci');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      sessionStorage.setItem('authenticated', 'true');
      navigate('/');
    } else {
      alert('Hatalı kullanıcı adı veya şifre! (İpucu: admin / 123456)');
    }
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen relative flex items-center justify-center overflow-hidden font-['Inter']">
      <div className="fixed inset-0 library-bg scale-105 blur-[8px]"></div>
      <div className="fixed inset-0 bg-black/40"></div>
      
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-8 z-50">
        <div className="text-2xl font-black tracking-tighter text-white">Nizip Sosyal Bilimler Lisesi</div>
        <div className="hidden md:flex gap-10 items-center">
          <span className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Giriş</span>
          <span className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Yardım</span>
          <span className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Hakkında</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-2xl px-6">
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-amber-950 leading-tight mb-4 tracking-tighter">
              Kelamın Gücüyle Geleceği İnşa Edin: Bilginin ve Estetiğin Buluşma Noktası
            </h1>
            <p className="text-amber-900/60 font-bold tracking-widest uppercase text-[10px]">Öğrenci ve Akademik Bilgi Sistemi</p>
          </header>

          <div className="flex bg-amber-950/5 p-1.5 rounded-full w-full max-w-md mb-10">
            <button 
              type="button"
              onClick={() => setRole('ogrenci')}
              className={lex-1 py-3 px-6 rounded-full font-bold text-sm shadow-sm transition-all duration-300 $}
            >
              Öğrenci
            </button>
            <button 
              type="button"
              onClick={() => setRole('ogretmen')}
              className={lex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 $}
            >
              Öğretmen
            </button>
          </div>

          <form className="w-full max-w-md space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={20} />
                <input 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all" 
                  placeholder="Kullanıcı adınızı giriniz" 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={20} />
                <input 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                className="w-full bg-amber-900 hover:bg-amber-950 text-amber-50 font-black tracking-[0.15em] py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-amber-950/20" 
                type="submit"
              >
                SİSTEME GİRİŞ YAP
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </form>

          <footer className="mt-10 text-center">
            <p className="text-amber-900/40 text-[10px] uppercase tracking-widest">Akademik başarıya giden ilk adım.</p>
          </footer>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full flex justify-center items-center py-8 z-50">
        <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          © 2026 Nizip Sosyal Bilimler Lisesi
        </div>
      </footer>
    </div>
  );
}
