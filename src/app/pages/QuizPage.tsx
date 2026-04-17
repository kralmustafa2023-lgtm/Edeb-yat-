import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Timer, CheckCircle, XCircle, RotateCcw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { QUIZ_TOPICS } from '../data/quizData';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
  unit: string;
}

interface QuizTopic {
  id: string;
  title: string;
  color: string;
  icon: string;
  questions: QuizQuestion[];
}

type Screen = 'select' | 'quiz' | 'result';

const UNIT_MAP: Record<string, { title: string; color: string; icon: string }> = {
  'unit-1': { title: 'Dili ve Kültür', color: 'from-amber-400 to-orange-500', icon: '📝' },
  'unit-2': { title: 'Hikâye', color: 'from-blue-400 to-indigo-500', icon: '📖' },
  'unit-3': { title: 'Şiir', color: 'from-purple-400 to-pink-500', icon: '🎭' },
  'unit-4': { title: 'Masal/Fabl', color: 'from-emerald-400 to-teal-500', icon: '🦄' },
  'unit-5': { title: 'Roman', color: 'from-rose-400 to-red-500', icon: '📚' },
  'unit-6': { title: 'Tiyatro', color: 'from-sky-400 to-blue-500', icon: '🏛️' },
  'unit-7': { title: 'Biyografi/Otobiyografi', color: 'from-slate-400 to-slate-600', icon: '👤' },
  'unit-8': { title: 'Mektup/E-posta', color: 'from-yellow-400 to-amber-500', icon: '✉️' },
  'unit-9': { title: 'Günlük/Blog', color: 'from-indigo-400 to-purple-600', icon: '✍️' },
};

export default function QuizPage() {
  const { themeClasses, theme, addQuizScore } = useApp();
  const [screen, setScreen] = useState<Screen>('select');
  const [dynamicTopics, setDynamicTopics] = useState<QuizTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState<{ correct: boolean; selected: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. QUIZ_TOPICS'ten soruları yükle
    let allQuestions: QuizQuestion[] = [];
    QUIZ_TOPICS.forEach((topic) => {
      topic.questions.forEach((q) => {
        allQuestions.push({ ...q, unit: topic.id });
      });
    });

    // 2. Varsa yerel hafızadaki (Teacher panelden eklenen) soruları da ekle
    const saved = localStorage.getItem('custom_questions');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        allQuestions = [...allQuestions, ...custom];
      } catch (e) {}
    }

    // Üniteleri oluştur
    const topics = Object.entries(UNIT_MAP).map(([unitId, meta]) => ({
      id: unitId,
      ...meta,
      questions: allQuestions.filter(q => q.unit === unitId),
    })).filter(t => t.questions.length > 0);

    setDynamicTopics(topics);
    setLoading(false);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (screen !== 'quiz' || answered) return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, timeLeft, answered]);

  const startQuiz = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    const shuffled = [...topic.questions].sort(() => Math.random() - 0.5).slice(0, Math.min(10, topic.questions.length));
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(20);
    setAnswers([]);
    setScreen('quiz');
  };

  const handleAnswer = (optionIdx: number) => {
    if (answered) return;
    setSelected(optionIdx);
    setAnswered(true);
    const q = questions[current];
    const isCorrect = optionIdx === q.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, colors: ['#7c3aed', '#4f46e5', '#60a5fa'] });
    }
    setAnswers(prev => [...prev, { correct: isCorrect, selected: optionIdx }]);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      const finalScore = score + (answers[answers.length - 1]?.correct ? 1 : 0);
      addQuizScore(selectedTopic!.title, finalScore, questions.length);
      setScreen('result');
      if (finalScore === questions.length) {
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } }), 200);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(20);
    }
  };

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  // ── SELECT SCREEN ──────────────────────────────────────────────
  if (screen === 'select') return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Quiz</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Öğretmeniniz tarafından hazırlanan güncel sorularla bilginizi test edin.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className={`text-sm font-bold ${themeClasses.textMuted} animate-pulse`}>Sorular yükleniyor...</p>
        </div>
      ) : dynamicTopics.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border border-dashed ${themeClasses.cardBorder} ${themeClasses.card}`}>
          <div className="text-4xl mb-4">📭</div>
          <p className={`text-sm ${themeClasses.textMuted} font-bold`}>Şu an için yayında olan bir quiz bulunmuyor.</p>
          <p className={`text-xs ${themeClasses.textMuted} mt-2`}>Öğretmeniniz soru ekledikçe buraya yansıyacak.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dynamicTopics.map((topic, i) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => startQuiz(topic)}
              className={`${card} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl mb-4 shadow-lg shadow-black/5`}>
                {topic.icon}
              </div>
              <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{topic.title}</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-1 font-bold`}>{topic.questions.length} soru mevcut</p>
              <div className="flex items-center gap-1 mt-4">
                <span className={`text-xs ${themeClasses.textFaint} font-black uppercase tracking-widest`}>HEMEN BAŞLA</span>
                <ChevronRight size={12} className={`${themeClasses.textFaint} group-hover:translate-x-1 transition-transform`} />
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );

  // ── QUIZ SCREEN ────────────────────────────────────────────────
  if (screen === 'quiz' && questions.length > 0) {
    const q = questions[current];
    const progress = (current / questions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('select')} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm ${themeClasses.textMuted}`}>{selectedTopic?.title}</span>
              <div className="flex items-center gap-2">
                <Timer size={14} className={timeLeft <= 5 ? 'text-red-400' : themeClasses.textMuted} />
                <span className={`text-sm ${timeLeft <= 5 ? 'text-red-400' : themeClasses.textMuted}`} style={{ fontWeight: 600 }}>{timeLeft}s</span>
              </div>
            </div>
            <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
              <motion.div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>
          <span className={`text-sm ${themeClasses.textMuted}`} style={{ fontWeight: 600 }}>{current + 1}/{questions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className={`${card} p-6`}>
            <div className="flex items-start gap-3 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${themeClasses.badge} shrink-0`}>
                {q.difficulty === 'kolay' ? '🟢 Kolay' : q.difficulty === 'orta' ? '🟡 Orta' : '🔴 Zor'}
              </span>
            </div>
            <h2 className={`text-lg ${themeClasses.text} leading-relaxed mb-6`} style={{ fontWeight: 600 }}>{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                let btnClass = `w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${themeClasses.cardBorder}`;
                if (answered) {
                  if (i === q.correct) btnClass += ' bg-emerald-500/20 border-emerald-500 text-emerald-400';
                  else if (i === selected && i !== q.correct) btnClass += ' bg-red-500/20 border-red-500 text-red-400';
                  else btnClass += ` ${themeClasses.card} ${themeClasses.textMuted} opacity-50`;
                } else {
                  btnClass += ` ${themeClasses.card} ${themeClasses.text} ${themeClasses.hover} hover:border-purple-400 cursor-pointer`;
                }
                return (
                  <motion.button key={i} className={btnClass} onClick={() => handleAnswer(i)} disabled={answered} whileHover={!answered ? { scale: 1.01 } : {}} whileTap={!answered ? { scale: 0.99 } : {}}>
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center shrink-0 ${answered && i === q.correct ? 'bg-emerald-500 border-emerald-500 text-white' : answered && i === selected && i !== q.correct ? 'bg-red-500 border-red-500 text-white' : 'border-current'}`}>
                        {answered && i === q.correct ? '✓' : answered && i === selected && i !== q.correct ? '✗' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <div className={`p-4 rounded-xl ${selected === q.correct ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                    <p className={`text-xs leading-relaxed ${selected === q.correct ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <span style={{ fontWeight: 700 }}>{selected === q.correct ? '✅ Doğru! ' : '❌ Yanlış. '}</span>
                      {q.explanation}
                    </p>
                  </div>
                  <button onClick={nextQuestion} className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm transition-all hover:shadow-lg" style={{ fontWeight: 600 }}>
                    {current + 1 >= questions.length ? 'Sonucu Gör →' : 'Sonraki Soru →'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── RESULT SCREEN ──────────────────────────────────────────────
  if (screen === 'result') {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '📚' : '💪';
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className={`${card} p-8 text-center`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className={`text-2xl ${themeClasses.text} mb-2`} style={{ fontWeight: 700 }}>
            {pct === 100 ? 'Mükemmel!' : pct >= 70 ? 'Harika!' : pct >= 40 ? 'İyi!' : 'Daha Çok Çalış!'}
          </h2>
          <p className={`text-5xl mb-2 ${pct === 100 ? 'text-emerald-400' : pct >= 70 ? 'text-amber-400' : 'text-purple-400'}`} style={{ fontWeight: 800 }}>{score}/{total}</p>
          <p className={`text-sm ${themeClasses.textMuted}`}>Doğru Cevap • +{score * 20} XP kazandın!</p>

          <div className="mt-6 space-y-2 text-left">
            {questions.map((q, i) => {
              const ans = answers[i];
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${ans?.correct ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {ans?.correct ? <CheckCircle size={16} className="text-emerald-400 shrink-0" /> : <XCircle size={16} className="text-red-400 shrink-0" />}
                  <p className={`text-xs ${themeClasses.text} flex-1`}>{q.question.slice(0, 60)}...</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => startQuiz(selectedTopic!)} className={`flex-1 py-3 rounded-xl border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover} text-sm flex items-center justify-center gap-2`}>
              <RotateCcw size={14} /> Tekrar
            </button>
            <button onClick={() => setScreen('select')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm" style={{ fontWeight: 600 }}>
              Konular →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
