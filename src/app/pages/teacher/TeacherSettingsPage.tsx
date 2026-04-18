import React, { useState } from 'react';
import { Lock, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function TeacherSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    // Mevcut şifreyi kontrol et
    const savedPassword = localStorage.getItem('teacher_password') || 'test';
    if (currentPassword !== savedPassword) {
      setStatus('error');
      setMessage('Mevcut şifre yanlış!');
      return;
    }

    if (newPassword.length < 4) {
      setStatus('error');
      setMessage('Yeni şifre en az 4 karakter olmalıdır.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }

    if (newPassword === currentPassword) {
      setStatus('error');
      setMessage('Yeni şifre mevcut şifreden farklı olmalıdır.');
      return;
    }

    // Şifreyi güncelle
    localStorage.setItem('teacher_password', newPassword);
    setStatus('success');
    setMessage('Şifre başarıyla değiştirildi! ✅');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ayarlar</h1>
        <p className="text-sm text-slate-500 mt-1">Hesap ayarlarınızı buradan yönetin.</p>
      </div>

      {/* Password Change Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Lock size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Şifre Değiştir</h2>
              <p className="text-xs text-slate-400 mt-0.5">Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirin.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="p-8 space-y-5">
          {/* Mevcut Şifre */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Mevcut Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mevcut şifrenizi giriniz"
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-sm font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Yeni Şifre */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Yeni Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yeni şifrenizi giriniz (en az 4 karakter)"
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-sm font-medium"
                required
                minLength={4}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Şifre Tekrar */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Yeni Şifre (Tekrar)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yeni şifrenizi tekrar giriniz"
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all text-sm font-medium"
                required
                minLength={4}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {status !== 'idle' && (
            <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-bold ${
              status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {status === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-wider py-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 text-sm"
            >
              ŞİFREYİ GÜNCELLE
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">Güvenlik İpucu</p>
            <p className="text-xs text-amber-600 mt-1 leading-relaxed">
              Şifrenizi kimseyle paylaşmayın. Güçlü bir şifre için harf, rakam ve özel karakter kombinasyonu kullanmanız önerilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
