import React, { useState } from 'react';
import { Users, ClipboardList, Calendar, FileText, Megaphone, CheckSquare, GraduationCap, PlusCircle, X } from 'lucide-react';
import { ref, push, set } from 'firebase/database';
import { db } from '../../firebase/config';

export default function TeacherDashboardPage() {
  const teacherName = "Dr. Elif Yılmaz";
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  const handleSendAnnouncement = async () => {
    if (!announcementText.trim()) return;
    const newNotifRef = push(ref(db, 'notifications'));
    await set(newNotifRef, {
      message: announcementText,
      timestamp: Date.now(),
      sender: teacherName
    });
    setAnnouncementText("");
    setIsAnnouncing(false);
    alert('Duyuru başarıyla gönderildi!');
  };
  const stats = [
    { label: "Toplam Öğrenci", value: "124", icon: Users, color: "text-secondary", bg: "bg-surface-container-lowest" },
    { label: "Aktif Sınıf", value: "6", icon: Users, color: "text-surface-tint", bg: "bg-surface-container-low" },
    { label: "Bekleyen Ödev", value: "18", icon: ClipboardList, color: "text-secondary", bg: "bg-white/40 border-white/40 shadow-sm" },
    { label: "Planlanan Sınav", value: "2", icon: Calendar, color: "text-on-primary-container", bg: "bg-primary-container shadow-xl text-on-primary" },
  ];

  const activities = [
    { title: "Mert S. - \"Modernizm Üzerine\" Deneme", subtitle: "11-B Sınıfı • Yeni ödev teslim edildi.", time: "14 DK ÖNCE", icon: FileText, iconColor: "text-primary" },
    { title: "Sistem Duyurusu", subtitle: "Dönem sonu not girişleri için son 3 gün.", time: "2 SAAT ÖNCE", icon: Megaphone, iconColor: "text-secondary" },
    { title: "Ayşe K. - Edebiyat Projesi", subtitle: "Ödev başarıyla notlandırıldı: 95/100", time: "4 SAAT ÖNCE", icon: CheckSquare, iconColor: "text-surface-tint" },
    { title: "Veli Toplantısı Hatırlatıcısı", subtitle: "Yarın saat 15:00'te Zoom üzerinden gerçekleştirilecektir.", time: "1 GÜN ÖNCE", icon: GraduationCap, iconColor: "text-primary" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <section>
        <p className="text-secondary font-sans text-xs uppercase tracking-[0.3em] font-bold mb-2">Kurumsal Panel</p>
        <h1 className="text-5xl font-serif text-primary leading-tight">Hoş Geldiniz, <span className="italic">{teacherName}</span></h1>
        <p className="text-stone-500 font-body mt-4 max-w-xl leading-relaxed">
          Bugün akademik takviminizde 3 ders ve bir kurul toplantısı bulunuyor. Arşivdeki son güncellemeleri aşağıdan takip edebilirsiniz.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bg} p-8 flex flex-col justify-between h-44 group hover:-translate-y-1 transition-transform border border-outline-variant/10 rounded-xl`}>
            <div className="flex justify-between items-start">
              <stat.icon size={32} className={stat.color} />
              <span className={`text-[10px] font-bold tracking-tighter uppercase opacity-50 ${stat.color === 'text-on-primary' ? 'text-white' : 'text-outline'}`}>Active</span>
            </div>
            <div>
              <span className={`text-4xl font-serif font-bold ${stat.color === 'text-on-primary-container' ? 'text-white' : 'text-primary'}`}>{stat.value}</span>
              <p className={`text-xs font-sans uppercase tracking-wider mt-1 ${stat.color === 'text-on-primary-container' ? 'text-white/80' : 'text-on-surface-variant'}`}>{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Bento Grid Content Area */}
      <section className="grid grid-cols-12 gap-8">
        {/* Recent Activities */}
        <div className="col-span-12 lg:col-span-8 bg-white/70 p-8 rounded-2xl border border-white/50 backdrop-blur-md">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-serif text-primary">Son Aktiviteler</h3>
              <p className="text-xs text-on-surface-variant font-sans tracking-wide uppercase mt-1">Akademik Akış</p>
            </div>
            <button className="text-xs font-bold text-secondary border-b-2 border-secondary/20 hover:border-secondary transition-all pb-1">Tümünü Gör</button>
          </div>
          <div className="space-y-1">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-6 p-4 hover:bg-stone-50 rounded-xl transition-colors group cursor-pointer">
                <div className="w-12 h-12 flex-shrink-0 bg-stone-100 rounded-full flex items-center justify-center">
                  <activity.icon className={activity.iconColor} size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-primary">{activity.title}</h4>
                  <p className="text-xs text-on-surface-variant">{activity.subtitle}</p>
                </div>
                <span className="text-[10px] font-sans text-outline font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Quote */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-stone-100/50 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-serif text-primary mb-6">Hızlı İşlemler</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setIsAnnouncing(true)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-primary hover:text-white transition-all group shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-widest">Duyuru Oluştur</span>
                <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</div>
              </button>
              {[
                { label: "Kaynak Yükle", icon: "upload" },
                { label: "Yoklama Al", icon: "clipboard-check" }
              ].map((btn, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-primary hover:text-white transition-all group shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-widest">{btn.label}</span>
                  <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-scholarly-secondary/20 text-scholarly-secondary p-8 rounded-2xl flex-1 flex flex-col justify-center relative overflow-hidden bg-orange-100">
            <p className="font-serif italic text-lg relative z-10 leading-relaxed text-amber-900">
              "Eğitim, dünyayı değiştirmek için kullanabileceğiniz en güçlü silahtır."
            </p>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-60 text-amber-800">— Nelson Mandela</p>
          </div>
        </div>
      </section>

      {/* Upcoming Calendar (Strip Layout) */}
      <section className="bg-stone-200/30 p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Calendar className="text-primary" size={24} />
          <h3 className="text-xl font-serif text-primary">Akademik Takvim - Bugün</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border-l-4 border-secondary shadow-sm rounded-r-xl">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">09:00 - 10:30</span>
            <h4 className="text-md font-bold text-primary mt-1">Türk Dili ve Edebiyatı</h4>
            <p className="text-xs text-stone-500">Sınıf: 12-A • Konu: Divan Şiiri</p>
          </div>
          <div className="bg-white p-6 border-l-4 border-violet-900 shadow-sm rounded-r-xl">
            <span className="text-[10px] font-bold text-violet-900 uppercase tracking-widest">11:00 - 12:30</span>
            <h4 className="text-md font-bold text-primary mt-1">Dünya Klasikleri Seçmeli</h4>
            <p className="text-xs text-stone-500">Sınıf: 11-C • Konu: Rus Realizmi</p>
          </div>
          <div className="bg-primary/5 p-6 border-l-4 border-primary shadow-sm flex items-center justify-center border-dashed rounded-xl">
            <button className="flex flex-col items-center gap-2 group">
              <PlusCircle className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Etkinlik Ekle</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Announcement Modal */}
      {isAnnouncing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-bold text-primary">Yeni Duyuru</h3>
              <button onClick={() => setIsAnnouncing(false)} className="p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <textarea 
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Öğrencilere iletmek istediğiniz mesajı buraya yazın..."
              className="w-full h-32 p-4 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-4 text-sm"
            />
            <button 
              onClick={handleSendAnnouncement}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors"
            >
              Duyuruyu Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
