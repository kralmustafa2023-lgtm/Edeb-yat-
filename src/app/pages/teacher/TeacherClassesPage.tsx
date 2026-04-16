import React, { useState, useEffect } from 'react';
import { Users, Pencil, KeyRound, Trash2, X, Plus, Save, TrendingUp, Award, ShieldCheck } from 'lucide-react';
import { db } from '../../firebase/config';
import { ref, onValue, remove, set, update } from 'firebase/database';
import { motion, AnimatePresence } from 'motion/react';

interface Student {
  id: string;
  name: string;
  username: string;
  role: string;
  email?: string;
  score?: number;
  gold?: number;
  createdAt?: string;
  status: string;
}

export default function TeacherClassesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // New student form state
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList: Student[] = [];
        Object.entries(data).forEach(([key, value]) => {
          const user = value as any;
          if (user.role === 'ogrenci') {
            studentList.push({
              id: key,
              name: user.name || user.username || 'İsimsiz',
              username: user.username || '',
              role: user.role,
              email: user.email || '',
              score: user.score || 0,
              gold: user.gold || 0,
              createdAt: user.createdAt || '',
              status: user.status || 'Aktif'
            });
          }
        });
        setStudents(studentList);
      } else {
        setStudents([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword || !newName) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const safeUsername = newUsername.replace(/[\.\#\$\[\]]/g, '');
    
    try {
      await set(ref(db, `users/${safeUsername}`), {
        name: newName,
        username: newUsername,
        password: newPassword,
        role: 'ogrenci',
        score: 0,
        gold: 100,
        status: 'Aktif',
        createdAt: new Date().toISOString()
      });
      
      setIsAddModalOpen(false);
      setNewName('');
      setNewUsername('');
      setNewPassword('');
      alert('Öğrenci başarıyla eklendi.');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const handleDelete = async (studentId: string) => {
    if (window.confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      try {
        await remove(ref(db, `users/${studentId}`));
        alert('Öğrenci başarıyla silindi.');
      } catch (error) {
        alert('Silme işlemi başarısız oldu.');
      }
    }
  };

  const handleResetPassword = async (studentId: string) => {
    const newPass = prompt('Yeni şifreyi giriniz:');
    if (newPass && newPass.length >= 6) {
      await update(ref(db, `users/${studentId}`), { password: newPass });
      alert('Şifre güncellendi.');
    } else if (newPass) {
      alert('Şifre en az 6 karakter olmalıdır.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-2">
          <Users size={24} strokeWidth={2.5} className="text-slate-800" />
          Öğrenci Yönetimi ({students.length} Kişi)
        </h2>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-teal-500 text-white font-bold text-sm rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Öğrenci Ekle
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 border border-slate-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-sm">Öğrenci Adı</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Kullanıcı Adı</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Puan</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Altın</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">Durum</th>
                <th className="pb-4 font-bold text-slate-400 text-sm">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium tracking-wide">
                    Veriler yükleniyor...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                    Kayıtlı öğrenci bulunamadı.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0">
                          👤
                        </div>
                        <div>
                          <p className="font-black text-indigo-950 text-[15px] leading-tight">{student.name}</p>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">Öğrenci Hesabı</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 font-black text-indigo-900 text-sm">@{student.username}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-1">
                        <span className="font-black text-amber-500">{student.score}</span>
                        <span className="text-amber-500 text-sm">⭐</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-1">
                        <span className="font-black text-emerald-600">{student.gold}</span>
                        <span className="text-sm">💰</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className={`px-3 py-1 font-bold rounded-full text-[10px] uppercase tracking-wider ${
                        student.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button 
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsDetailModalOpen(true);
                          }}
                          className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          Detay
                        </button>
                        <button 
                          onClick={() => handleResetPassword(student.id)}
                          className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                          title="Şifre Sıfırla"
                        >
                          <KeyRound size={14} strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)}
                          className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-indigo-950/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-indigo-950 tracking-tighter">Yeni Öğrenci Kaydı</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Öğrenci Ad Soyad</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Örn: Ali Yılmaz"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-indigo-950 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Kullanıcı Adı</label>
                    <input 
                      type="text" 
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="ali.yilmaz"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-indigo-950 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Şifre</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-indigo-950 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    KAYDI TAMAMLA <Save size={20} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsDetailModalOpen(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-4xl shadow-inner mb-4">
                  👤
                </div>
                <h3 className="text-2xl font-black text-indigo-950 tracking-tight">{selectedStudent.name}</h3>
                <p className="text-sm font-bold text-indigo-400">@{selectedStudent.username}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 flex flex-col items-center">
                  <TrendingUp className="text-amber-500 mb-2" size={24} />
                  <p className="text-2xl font-black text-amber-600">{selectedStudent.score}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40">Toplam XP</p>
                </div>
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 flex flex-col items-center">
                  <Award className="text-emerald-500 mb-2" size={24} />
                  <p className="text-2xl font-black text-emerald-600">{selectedStudent.gold}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/40">Toplam Altın</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statü</span>
                  <span className="text-xs font-bold text-indigo-950">{selectedStudent.status}</span>
                </div>
                <div className="flex justify-between items-center px-2 border-t border-slate-200/50 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kayıt Tarihi</span>
                  <span className="text-xs font-bold text-indigo-950">
                    {selectedStudent.createdAt ? new Date(selectedStudent.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                  </span>
                </div>
                <div className="flex justify-center pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> Doğrulanmış Öğrenci
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
