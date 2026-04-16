import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ref, get, set, child } from 'firebase/database';
import { db } from '../firebase/config';
import '../../styles/login.css';

interface CardContentProps {
  type: 'ogrenci' | 'ogretmen';
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  setRole: (val: 'ogrenci' | 'ogretmen') => void;
  handleLogin: (e: React.FormEvent) => void;
}

const CardContent = ({ type, username, setUsername, password, setPassword, setRole, handleLogin }: CardContentProps) => (
  <div className="glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col items-center shadow-2xl h-[520px]">
    <header className="text-center mb-6">
      <h1 className="text-2xl md:text-3xl font-black text-amber-950 leading-tight mb-2 tracking-tighter">
        Kelamın Gücüyle Geleceği İnşa Edin
      </h1>
      <p className="text-amber-900/60 font-bold tracking-widest uppercase text-[10px]">Bilginin ve Estetiğin Buluşma Noktası</p>
    </header>

    <div className="flex bg-amber-950/5 p-1.5 rounded-full w-full max-w-[300px] mb-8 shrink-0 relative z-50">
      <button 
        type="button"
        onClick={() => {
          setUsername(''); setPassword('');
          setRole('ogrenci');
        }}
        className={`flex-1 py-2 px-6 rounded-full font-bold text-sm shadow-sm transition-all duration-300 ${type === 'ogrenci' ? 'bg-white text-amber-950' : 'text-amber-900/40 hover:text-amber-900/60'}`}
      >
        Öğrenci
      </button>
      <button 
        type="button"
        onClick={() => {
          setUsername(''); setPassword('');
          setRole('ogretmen');
        }}
        className={`flex-1 py-2 px-6 rounded-full font-bold text-sm transition-all duration-300 ${type === 'ogretmen' ? 'bg-slate-800 text-white shadow-sm' : 'text-amber-900/40 hover:text-amber-900/60'}`}
      >
        Öğretmen
      </button>
    </div>

    <form className="w-full max-w-sm space-y-4 flex-1 flex flex-col" onSubmit={handleLogin}>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">
          Kullanıcı Adı
        </label>
        <div className="relative">
          {type === 'ogrenci' ? (
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
          ) : (
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
          )}
          <input 
            className="w-full pl-11 pr-5 py-3.5 rounded-xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all text-sm font-medium" 
            placeholder="Kullanıcı adınızı giriniz (örn: ali)" 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Şifre</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
          <input 
            className="w-full pl-11 pr-5 py-3.5 rounded-xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all text-sm font-medium" 
            placeholder="••••••••" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="pt-2 mt-auto">
        <button 
          className={`w-full text-amber-50 font-black tracking-[0.1em] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl text-sm ${type === 'ogrenci' ? 'bg-amber-900 hover:bg-amber-950 shadow-amber-950/20' : 'bg-slate-800 hover:bg-slate-950 shadow-slate-950/20'}`}
          type="submit"
        >
          {type === 'ogrenci' ? 'SİSTEME GİRİŞ YAP' : 'AKADEMİK GİRİŞ'}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </form>

    <footer className="mt-6 text-center justify-self-end mt-auto w-full border-t border-amber-900/10 pt-4">
      <p className="text-amber-900/40 text-[10px] uppercase tracking-[0.15em]">{type === 'ogrenci' ? 'Akademik başarıya giden ilk adım.' : 'Eğitimin mimarları için.'}</p>
    </footer>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'ogrenci' | 'ogretmen'>('ogrenci');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Admin bypass for local testing
      if (username === 'admin' && password === '123456') {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('userRole', role);
        navigate(role === 'ogretmen' ? '/teacher/dashboard' : '/');
        return;
      }

      // Türkçe karakterleri ve özel işaretleri İngilizce'ye çevirip standardize et
      const charMap: Record<string, string> = { 'ç':'c', 'ğ':'g', 'ı':'i', 'i':'i', 'ö':'o', 'ş':'s', 'ü':'u', 'Ç':'c', 'Ğ':'g', 'I':'i', 'İ':'i', 'Ö':'o', 'Ş':'s', 'Ü':'u' };
      const safeUsername = username
        .trim()
        .replace(/[çğıiöşüÇĞIİÖŞÜ]/g, m => charMap[m])
        .toLowerCase()
        .replace(/[\.\#\$\[\]\s]/g, '');
        
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${safeUsername}`));
      
      let userRole = role; 

      // Kullanıcı veritabanında var mı kontrol et
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password !== password) {
            alert('Hatalı şifre!');
            return;
        }
        userRole = userData.role;
      } else {
        alert(`Kullanıcı bulunamadı!\nSistemin aradığı ad: "${safeUsername}"\nLütfen öğretmeniniz ile iletişime geçin.`);
        return;
      }




      sessionStorage.setItem('authenticated', 'true');
      sessionStorage.setItem('userRole', userRole);
      sessionStorage.setItem('currentUsername', safeUsername);

      if (userRole === 'ogretmen') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/');
      }

    } catch (error: any) {
      alert('Giriş başarısız: ' + error.message);
    }
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen relative flex items-center justify-center overflow-hidden font-['Inter']">
      <div className="fixed inset-0 library-bg scale-105 blur-[8px]"></div>
      <div className="fixed inset-0 bg-black/40"></div>
      
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-8 z-50">
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-white">Nizip Sosyal Bilimler Lisesi</Link>
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/login" className="text-white text-xs tracking-widest uppercase font-bold border-b border-white/40 pb-0.5">Giriş</Link>
          <Link to="/help" className="text-white/80 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Yardım</Link>
          <Link to="/about" className="text-white/80 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Hakkında</Link>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[440px] px-4" style={{ perspective: 1800 }}>
        <motion.div
          className="w-full h-[520px] relative transition-transform"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: role === 'ogrenci' ? 0 : 180 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 220, damping: 25 }}
        >
          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} 
            className={`w-full h-full absolute inset-0 ${role === 'ogretmen' ? 'pointer-events-none' : ''}`}
          >
            <CardContent 
              type="ogrenci" 
              username={username} 
              setUsername={setUsername} 
              password={password} 
              setPassword={setPassword} 
              setRole={setRole}
              handleLogin={handleLogin}
            />
          </div>

          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} 
            className={`w-full h-full absolute inset-0 ${role === 'ogrenci' ? 'pointer-events-none' : ''}`}
          >
            <CardContent 
              type="ogretmen" 
              username={username} 
              setUsername={setUsername} 
              password={password} 
              setPassword={setPassword} 
              setRole={setRole}
              handleLogin={handleLogin}
            />
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 w-full flex justify-center items-center py-6 z-50 pointer-events-none">
        <div className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold">
          © 2026 Nizip Sosyal Bilimler Lisesi
        </div>
      </footer>
    </div>
  );
}
