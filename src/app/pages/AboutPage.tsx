import React from 'react';
import { useNavigate, Link } from 'react-router';
import { Info, ShieldCheck, Sparkles, UserCircle } from 'lucide-react';
import okulBinasi from '../assets/okul_binasi.png';
import '../../styles/login.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest font-['Inter'] min-h-screen relative selection:bg-amber-900/30 overflow-x-hidden">
      {/* Background Image Container */}
      <div className="fixed inset-0 z-0 library-bg scale-105 blur-[8px]"></div>
      <div className="fixed inset-0 z-0 bg-black/40"></div>


      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-8 z-50">
        <div className="text-2xl font-black tracking-tighter text-white cursor-pointer" onClick={() => navigate('/')}>
          Nizip Sosyal Bilimler Lisesi
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/login" className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Giriş</Link>
          <Link to="/help" className="text-white/80 text-sm tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Yardım</Link>
          <Link to="/about" className="text-white text-sm tracking-widest uppercase font-bold border-b-2 border-white pb-1">Hakkında</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:bg-white/10 transition-all duration-300 p-2 rounded-full">
            <UserCircle size={28} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 min-h-screen pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Central Glassmorphism Panel */}
          <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden">
            {/* Hero Header */}
            <header className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-amber-950/5 border border-amber-950/10 text-amber-950 font-black text-[10px] uppercase tracking-[0.2em]">
                Kurumsal Kimlik
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-amber-950 tracking-tighter leading-tight mb-6">
                Nizip Sosyal Bilimler Lisesi:<br/>
                <span className="italic font-light opacity-80 text-3xl md:text-4xl">Bir Kültür ve İrfan Yuvası</span>
              </h1>
              <div className="w-24 h-1 bg-amber-900 mx-auto rounded-full opacity-20"></div>
            </header>

            {/* Bento-style Grid for Mission/Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <section className="card-ivory p-8 rounded-[2rem] hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <Sparkles className="text-amber-900" size={32} />
                  <h2 className="text-2xl font-black text-amber-950 tracking-tight">Vizyonumuz</h2>
                </div>
                <p className="text-amber-900/70 leading-relaxed text-lg font-medium">
                  Toplumun geleceğini şekillendiren, analitik düşünme yetisine sahip, sosyal bilimler alanında dünya standartlarında bilgi ve erdemle donatılmış lider bireyler yetiştiren bir ekol olmak. Sadece akademik başarıyı değil, karakterin ve entelektüel derinliğin de zirvesini hedefliyoruz.
                </p>
              </section>
              <section className="card-ivory p-8 rounded-[2rem] hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <ShieldCheck className="text-amber-900" size={32} />
                  <h2 className="text-2xl font-black text-amber-950 tracking-tight">Misyonumuz</h2>
                </div>
                <p className="text-amber-900/70 leading-relaxed text-lg font-medium">
                  Öğrencilerimizi milli ve manevi değerlere bağlı, hür düşünceli, araştıran ve sorgulayan sosyal bilimciler olarak hayata hazırlamak. Nizip'in köklü mirasını modern eğitim metotlarıyla harmanlayarak, evrensel kültüre katkı sunacak nesiller inşa etmek temel görevimizdir.
                </p>
              </section>
            </div>

            {/* History Section (Asymmetric) */}
            <section className="relative">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 space-y-6">
                  <h2 className="text-3xl font-black text-amber-950 tracking-tight">Tarihçemiz</h2>
                  <div className="space-y-4 text-amber-900/70 leading-relaxed text-lg font-medium">
                    <p>
                      Nizip Sosyal Bilimler Lisesi, bölgenin entelektüel ihtiyacını karşılamak amacıyla kurulduğu günden bu yana bir "irfan mektebi" olarak hizmet vermektedir. Kuruluşumuzdan bugüne, sadece bir eğitim kurumu değil, aynı zamanda şehrin kültürel hafızasının önemli bir parçası olduk.
                    </p>
                    <p>
                      Yıllar içerisinde mezun ettiğimiz her öğrenciyle, sosyal bilimlerin farklı dallarında söz sahibi olacak bir ağ kurduk. Edebiyattan tarihe, hukuktan uluslararası ilişkilere kadar her alanda mezunlarımızla gurur duyuyoruz.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-amber-900/5 rounded-[2rem] blur-xl group-hover:bg-amber-900/10 transition-all duration-500"></div>
                  <div className="relative bg-white/40 p-3 rounded-[2rem] shadow-2xl overflow-hidden aspect-video">
                    <img 
                      alt="Nizip Sosyal Bilimler Lisesi Binası" 
                      className="w-full h-full object-cover rounded-[1.5rem]" 
                      src={okulBinasi} 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Quote in Glass */}
            <footer className="mt-24 pt-12 border-t border-amber-950/5 text-center">
              <p className="text-amber-900/60 font-medium italic text-xl mb-4">
                "Geçmişin mirasıyla, geleceğin inşasına..."
              </p>
              <p className="text-amber-900/40 text-[10px] uppercase tracking-widest font-black">Akademik başarıya giden ilk adım.</p>
            </footer>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="fixed bottom-0 w-full flex flex-col md:flex-row justify-between items-center py-8 px-12 z-50 pointer-events-none">
        <div className="hidden md:block text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          Nizip Sosyal Bilimler Lisesi
        </div>
        <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          © 2026 Nizip Sosyal Bilimler Lisesi. Tüm Hakları Saklıdır.
        </div>
        <div className="hidden md:flex gap-6 pointer-events-auto">
          <a className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold" href="#">Gizlilik</a>
          <a className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold" href="#">Şartlar</a>
        </div>
      </footer>
    </div>
  );
}
