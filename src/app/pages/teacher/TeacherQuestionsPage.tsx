import React, { useState, useEffect } from 'react';
import { FileQuestion, Plus, Pencil, Trash2, Save, X, Search } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
  category: string;
}

const CATEGORIES = [
  { id: 'unit-1', title: 'Giriş (Ünite 1)' },
  { id: 'unit-2', title: 'Hikâye (Ünite 2)' },
  { id: 'unit-3', title: 'Şiir (Ünite 3)' },
  { id: 'unit-4', title: 'Masal & Fabl (Ünite 4)' },
  { id: 'unit-5', title: 'Roman (Ünite 5)' },
  { id: 'unit-6', title: 'Tiyatro (Ünite 6)' },
  { id: 'unit-7', title: 'Biyografi/Otobiyografi (Ünite 7)' },
  { id: 'unit-8', title: 'Mektup/E-Posta (Ünite 8)' },
  { id: 'unit-9', title: 'Günlük/Blog (Ünite 9)' }
];

export default function TeacherQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('Hepsi');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form State
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState(['', '', '', '']);
  const [formCorrect, setFormCorrect] = useState(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<'kolay' | 'orta' | 'zor'>('orta');
  const [formCategory, setFormCategory] = useState(CATEGORIES[0].id);

  useEffect(() => {
    // OFFLINE MODE: Load custom questions from localStorage
    const saved = localStorage.getItem('custom_questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      setQuestions([]);
    }
    setLoading(false);
  }, []);

  const resetForm = () => {
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrect(0);
    setFormExplanation('');
    setFormDifficulty('orta');
    setFormCategory(CATEGORIES[0].id);
    setEditingQuestion(null);
  };

  const handleSave = async () => {
    if (!formQuestion || formOptions.some(opt => !opt)) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const questionData = {
      id: editingQuestion ? editingQuestion.id : Date.now().toString(),
      question: formQuestion,
      options: formOptions,
      correct: formCorrect,
      explanation: formExplanation,
      difficulty: formDifficulty,
      category: formCategory,
      unit: formCategory
    };

    try {
      let updated: Question[];
      if (editingQuestion) {
        updated = questions.map(q => q.id === editingQuestion.id ? questionData : q);
      } else {
        updated = [...questions, questionData];
      }
      
      localStorage.setItem('custom_questions', JSON.stringify(updated));
      setQuestions(updated);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Soru kaydedilirken bir hata oluştu.');
    }
  };

  const handleEdit = (q: Question) => {
    setEditingQuestion(q);
    setFormQuestion(q.question);
    setFormOptions([...q.options]);
    setFormCorrect(q.correct);
    setFormExplanation(q.explanation);
    setFormDifficulty(q.difficulty);
    setFormCategory(q.category);
    setIsModalOpen(true);
  };

  const handleDelete = async (q: Question) => {
    if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      const updated = questions.filter(item => item.id !== q.id);
      localStorage.setItem('custom_questions', JSON.stringify(updated));
      setQuestions(updated);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = filterCategory === 'Hepsi' || q.category === filterCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-indigo-900 flex items-center gap-2">
          <FileQuestion size={28} className="text-indigo-600" />
          Soru Bankası Yönetimi
        </h2>
        
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} /> Yeni Soru Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Soru metninde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700"
        >
          <option value="Hepsi">Tüm Üniteler</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Sorular yükleniyor...</div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-slate-400 font-medium">
            Soru bulunamadı.
          </div>
        ) : (
          filteredQuestions.map(q => (
            <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                    {CATEGORIES.find(c => c.id === q.category)?.title || q.category}
                  </span>
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                    q.difficulty === 'kolay' ? 'bg-emerald-50 text-emerald-600' :
                    q.difficulty === 'orta' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(q)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(q)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4">{q.question}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {q.options.map((opt, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border text-sm font-medium ${
                      idx === q.correct ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="opacity-50 mr-2">{String.fromCharCode(65 + idx)})</span> {opt}
                  </div>
                ))}
              </div>
              
              {q.explanation && (
                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 leading-relaxed italic">
                  <span className="font-bold text-slate-700 not-italic block mb-1">Açıklama:</span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-indigo-900">
                {editingQuestion ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ünite / Kategori</label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Zorluk Seviyesi</label>
                <div className="flex gap-2">
                  {['kolay', 'orta', 'zor'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setFormDifficulty(d as any)}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold capitalize transition-all border-2 ${
                        formDifficulty === d 
                        ? (d === 'kolay' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : d === 'orta' ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-rose-50 border-rose-500 text-rose-600')
                        : 'bg-white border-slate-100 text-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Soru Metni</label>
                <textarea 
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium resize-none"
                  placeholder="Soruyu buraya yazın..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">Seçenekler</label>
                {formOptions.map((opt, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <button 
                      onClick={() => setFormCorrect(idx)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                        formCorrect === idx ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </button>
                    <input 
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...formOptions];
                        newOpts[idx] = e.target.value;
                        setFormOptions(newOpts);
                      }}
                      className="flex-1 p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                      placeholder={`${idx + 1}. seçenek...`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Çözüm / Açıklama (Opsiyonel)</label>
                <textarea 
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  rows={2}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium resize-none"
                  placeholder="Çözüm için ipucu veya açıklama..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all"
                >
                  İptal
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-3 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Save size={20} /> Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
