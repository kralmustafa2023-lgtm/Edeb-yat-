import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
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

  const CardContent = ({ type }: { type: 'ogrenci' | 'ogretmen' }) => (
    <div className="glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col items-center shadow-2xl h-[480px]">
      <header className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-black text-amber-950 leading-tight mb-2 tracking-tighter">
          Kelamın Gücüyle Geleceği İnşa Edin
        </h1>
        <p className="text-amber-900/60 font-bold tracking-widest uppercase text-[9px]">Bilginin ve Estetiğin Buluşma Noktası</p>
      </header>

      <div className="flex bg-amber-950/5 p-1.5 rounded-full w-full max-w-[260px] mb-8 shrink-0 relative z-50">
        <button 
          type="button"
          onClick={() => {
            setUsername(''); setPassword('');
            setRole('ogrenci');
          }}
          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs shadow-sm transition-all duration-300 ${type === 'ogrenci' ? 'bg-white text-amber-950' : 'text-amber-900/40 hover:text-amber-900/60'}`}
        >
          Öğrenci
        </button>
        <button 
          type="button"
          onClick={() => {
            setUsername(''); setPassword('');
            setRole('ogretmen');
          }}
          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs transition-all duration-300 ${type === 'ogretmen' ? 'bg-slate-800 text-white shadow-sm' : 'text-amber-900/40 hover:text-amber-900/60'}`}
        >
          Öğretmen
        </button>
      </div>

      <form className="w-full space-y-4 flex-1 flex flex-col" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">
            {type === 'ogrenci' ? 'Öğrenci No / T.C.' : 'Personel Kodu / T.C.'}
          </label>
          <div className="relative">
            {type === 'ogrenci' ? (
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={16} />
            ) : (
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={16} />
            )}
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all text-sm font-medium" 
              placeholder={type === 'ogrenci' ? "Kullanıcı adınızı giriniz" : "Akademisyen kodunuzu giriniz"} 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Şifre</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={16} />
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all text-sm font-medium" 
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
            className={`w-full text-amber-50 font-black tracking-[0.1em] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl text-xs ${type === 'ogrenci' ? 'bg-amber-900 hover:bg-amber-950 shadow-amber-950/20' : 'bg-slate-800 hover:bg-slate-950 shadow-slate-950/20'}`}
            type="submit"
          >
            {type === 'ogrenci' ? 'SİSTEME GİRİŞ YAP' : 'AKADEMİK GİRİŞ'}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </button>
        </div>
      </form>

      <footer className="mt-6 text-center justify-self-end mt-auto w-full border-t border-amber-900/10 pt-4">
        <p className="text-amber-900/40 text-[9px] uppercase tracking-[0.15em]">{type === 'ogrenci' ? 'Akademik başarıya giden ilk adım.' : 'Eğitimin mimarları için.'}</p>
      </footer>
    </div>
  );

  return (
    <div className="bg-surface-container-lowest min-h-screen relative flex items-center justify-center overflow-hidden font-['Inter']">
      <div className="fixed inset-0 library-bg scale-105 blur-[8px]"></div>
      <div className="fixed inset-0 bg-black/40"></div>
      
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-8 z-50">
        <div className="text-xl md:text-2xl font-black tracking-tighter text-white">Nizip Sosyal Bilimler Lisesi</div>
        <div className="hidden md:flex gap-10 items-center">
          <span className="text-white/80 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Giriş</span>
          <span className="text-white/80 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Yardım</span>
          <span className="text-white/80 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Hakkında</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-[380px] px-4" style={{ perspective: 1800 }}>
        <motion.div
          className="w-full h-[480px] relative transition-transform"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: role === 'ogrenci' ? 0 : 180 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 220, damping: 25 }}
        >
          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} 
            className={`w-full h-full absolute inset-0 ${role === 'ogretmen' ? 'pointer-events-none' : ''}`}
          >
            <CardContent type="ogrenci" />
          </div>

          <div 
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} 
            className={`w-full h-full absolute inset-0 ${role === 'ogrenci' ? 'pointer-events-none' : ''}`}
          >
            <CardContent type="ogretmen" />
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
