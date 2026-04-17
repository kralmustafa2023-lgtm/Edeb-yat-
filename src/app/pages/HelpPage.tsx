import React from 'react';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../../styles/login.css';

export default function HelpPage() {
  const { navigate } = useApp();

  return (
    <div className="bg-surface-container-lowest min-h-screen relative selection:bg-amber-900/30 font-['Inter'] overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 library-bg scale-105 blur-[8px] z-0"></div>
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-8 z-50">
        <div className="text-2xl font-black tracking-tighter text-white cursor-pointer" onClick={() => navigate('login')}>
          Nizip Sosyal Bilimler Lisesi
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <button onClick={() => navigate('login')} className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Giriş</button>
          <button onClick={() => navigate('help')} className="text-white border-b-2 border-white pb-1 text-sm tracking-widest uppercase font-bold">Yardım</button>
          <button onClick={() => navigate('about')} className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Hakkında</button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-white/20">
              İletişim & Destek
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
              Bize Ulaşın: Bilginin ve Estetiğin <br className="hidden md:block"/>Buluşma Noktasında Yanınızdayız
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Nizip Sosyal Bilimler Lisesi ailesi olarak, sorularınız ve akademik destek ihtiyaçlarınız için buradayız.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              {/* Location Card */}
              <div className="glass-panel p-8 rounded-[2.5rem]">
                <div className="flex items-start gap-4">
                  <MapPin className="text-amber-900" size={32} />
                  <div className="w-full">
                    <h3 className="text-xl font-black text-amber-950 mb-2 tracking-tight">Okul Konumu</h3>
                    <p className="text-amber-900/70 leading-relaxed font-medium">Mimar Sinan Mah. Eğitim Sokak No:4<br/>27700 Nizip / Gaziantep</p>
                    <div className="mt-8 h-48 w-full rounded-2xl overflow-hidden bg-amber-900/5 relative border border-amber-900/10">
                      <img 
                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                        alt="Stylized map showing Nizip district" 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-amber-900 rounded-full animate-ping"></div>
                        <div className="absolute w-3 h-3 bg-amber-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded-3xl border border-white/20">
                  <Phone className="text-amber-900 mb-3" size={24} />
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-amber-900/50 mb-1">Telefon</h4>
                  <p className="text-amber-950 font-black text-sm">+90 (342) 517 00 00</p>
                </div>
                <div className="glass-panel p-6 rounded-3xl border border-white/20">
                  <Mail className="text-amber-900 mb-3" size={24} />
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-amber-900/50 mb-1">E-Posta</h4>
                  <p className="text-amber-950 font-black text-sm">info@nizipsbl.k12.tr</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-10 md:p-14 rounded-[2.5rem]">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Adınız Soyadınız</label>
                      <input className="w-full px-6 py-4 rounded-2xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all" placeholder="Örn. Selin Yılmaz" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">E-Posta Adresi</label>
                      <input className="w-full px-6 py-4 rounded-2xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all" placeholder="selin@example.com" type="email"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Konu</label>
                    <select className="w-full px-6 py-4 rounded-2xl input-ivory text-amber-950 appearance-none focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all">
                      <option>Genel Bilgi</option>
                      <option>Kayıt İşlemleri</option>
                      <option>Teknik Destek</option>
                      <option>Öğretmen Görüşmesi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/50 ml-4">Mesajınız</label>
                    <textarea className="w-full px-6 py-4 rounded-2xl input-ivory text-amber-950 placeholder-amber-900/30 focus:ring-2 focus:ring-amber-900/20 focus:border-transparent outline-none transition-all resize-none" placeholder="Nasıl yardımcı olabiliriz?" rows={4}></textarea>
                  </div>
                  <div className="pt-4">
                    <button className="w-full bg-amber-900 hover:bg-amber-950 text-amber-50 font-black tracking-[0.15em] py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-amber-950/20" type="submit">
                      GÖNDER
                      <Send className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                  </div>
                  <div className="text-center pt-4">
                    <p className="text-amber-900/40 text-[10px] uppercase tracking-widest font-black">Akademik başarıya giden ilk adım.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full flex justify-center items-center py-8 z-50">
        <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          © 2026 Nizip Sosyal Bilimler Lisesi
        </div>
      </footer>
    </div>
  );
}
