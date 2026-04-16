import React, { useState, useEffect } from 'react';
import { Mail, Rocket, Youtube, Link as LinkIcon, Trash2 } from 'lucide-react';
import { db } from '../../firebase/config';
import { ref, push, onValue, serverTimestamp, remove } from 'firebase/database';

interface Message {
  id: string;
  title: string;
  content: string;
  type: string;
  youtubeUrl?: string;
  fileUrl?: string;
  timestamp: any;
}

export default function TeacherMessagesPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('🟢 Tüm Öğrenciler');
  const [fileUrl, setFileUrl] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const messagesRef = ref(db, 'announcements');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: Message[] = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as any)
        })).sort((a, b) => b.timestamp - a.timestamp);
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSend = async () => {
    if (!title || !content) {
      alert('Lütfen başlık ve mesaj içeriği giriniz.');
      return;
    }

    setSending(true);
    try {
      const ytId = extractYoutubeId(content);
      const newMessage = {
        title,
        content,
        type,
        fileUrl: fileUrl.trim() || null,
        youtubeUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : null,
        timestamp: serverTimestamp(),
      };

      await push(ref(db, 'announcements'), newMessage);
      
      setTitle('');
      setContent('');
      setFileUrl('');
      alert('Mesaj başarıyla gönderildi!');
    } catch (error) {
      console.error(error);
      alert('Mesaj gönderilirken bir hata oluştu.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      await remove(ref(db, `announcements/${id}`));
    }
  };

  return (
    <div className="space-y-8">
      {/* Compose Message Form */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100/50 shadow-sm">
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2 mb-6">
          <Mail size={24} strokeWidth={2.5} className="text-slate-800" />
          Yeni Mesaj & Duyuru Oluştur
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-indigo-900 mb-2">Gönderim Tipi</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
            >
              <option>🟢 Tüm Öğrenciler</option>
              <option>🟡 Belirli Bir Sınıf</option>
              <option>🟣 Tek Öğrenci</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-indigo-900 mb-2">Başlık</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Hafta Sonu Ödevi"
              className="w-full bg-slate-50 border border-slate-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-indigo-900 mb-2">Mesaj İçeriği (YouTube linki içerirse otomatik video eklenir)</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
            rows={4}
            className="w-full bg-slate-50 border border-slate-100 text-indigo-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 font-medium resize-none"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-indigo-900 mb-2">Dosya/Doküman Linki (Opsiyonel)</label>
          <div className="relative">
            <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="Örn: Google Drive veya Dropbox linki"
              className="w-full bg-slate-50 border border-slate-100 text-indigo-900 text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        <button 
          onClick={handleSend}
          disabled={sending}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
        >
          {sending ? 'Gönderiliyor...' : 'Hemen Gönder'} <Rocket size={20} strokeWidth={2.5} />
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* Message History */}
      <div>
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2 mb-6">
          <Mail size={24} strokeWidth={2.5} className="text-slate-800" />
          Geçmiş Duyurular ({messages.length})
        </h2>
        
        <div className="grid gap-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-medium">
              Henüz gönderilmiş bir duyuru bulunmuyor.
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1 block">
                      {msg.type} • {new Date(msg.timestamp).toLocaleDateString('tr-TR')}
                    </span>
                    <h3 className="text-lg font-black text-indigo-950">{msg.title}</h3>
                  </div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-rose-200 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{msg.content}</p>
                <div className="flex flex-wrap gap-3">
                  {msg.youtubeUrl && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-full">
                      <Youtube size={14} /> Video İçerir
                    </span>
                  )}
                  {msg.fileUrl && (
                    <a 
                      href={msg.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-full hover:bg-indigo-100 transition-colors"
                    >
                      <LinkIcon size={14} /> Dosya Eki
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

