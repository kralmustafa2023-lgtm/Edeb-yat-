import React from 'react';
import { Mail, Rocket } from 'lucide-react';

export default function TeacherMessagesPage() {
  return (
    <div className="space-y-8">
      {/* Compose Message Form */}
      <div>
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2 mb-6">
          <Mail size={24} strokeWidth={2.5} className="text-slate-800" />
          Yeni Mesaj & Görev Gönder
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-indigo-900 mb-2">Gönderim Tipi</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-indigo-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium">
                <option>🟢 Tüm Öğrenciler</option>
                <option>🟡 Belirli Bir Sınıf</option>
                <option>🟣 Tek Öğrenci</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-indigo-900 mb-2">Başlık</label>
            <input 
              type="text" 
              placeholder="Örn: Hafta Sonu Ödevi"
              className="w-full bg-white border border-indigo-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-indigo-900 mb-2">Mesaj İçeriği</label>
            <textarea 
              placeholder="Mesajınızı..."
              rows={5}
              className="w-full bg-white border border-indigo-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 font-medium resize-none"
            />
          </div>

          <button className="w-full bg-teal-50 hover:bg-teal-100 text-teal-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            Gönder <Rocket size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <hr className="border-slate-200/50" />

      {/* Message History Table */}
      <div>
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2 mb-6">
          <Mail size={24} strokeWidth={2.5} className="text-slate-800" />
          Gönderilen Mesaj Geçmişi
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-sm">Tarih</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Alıcı</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Mesaj Özeti</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 text-sm font-medium">
                  Henüz gönderilmiş bir mesaj bulunmuyor.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
