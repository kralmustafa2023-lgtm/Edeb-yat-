import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Timer, CheckCircle, XCircle, RotateCcw, ChevronRight, Star, Zap, Flame } from 'lucide-react';
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

type Difficulty = 'kolay' | 'orta' | 'zor' | 'karisik';
type Screen = 'select' | 'difficulty' | 'quiz' | 'result';

export default function QuizPage() {
  const { themeClasses, theme, addQuizScore } = useApp();
  const [screen, setScreen] = useState<Screen>('select');
  const [dynamicTopics, setDynamicTopics] = useState<QuizTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('karisik');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState<{ correct: boolean; selected: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // QUIZ_TOPICS'ten soruları yükle + teacher'ın eklediği custom soruları ekle
    const topics = QUIZ_TOPICS.map(topic => {
      let questions = topic.questions.map(q => ({ ...q, unit: topic.id }));
      // Custom sorular varsa ekle
      try {
        const saved = localStorage.getItem('custom_questions');
        if (saved) {
          const custom = JSON.parse(saved);
          const customForTopic = custom.filter((q: any) => q.category === topic.id || q.unit === topic.id);
          questions = [...questions, ...customForTopic];
        }
      } catch (e) {}
      return { ...topic, questions };
    });

    // Sadece sorusu olan konuları göster
    setDynamicTopics(topics.filter(t => t.questions.length > 0));
    setLoading(false);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (screen !== 'quiz' || answered) return;
    
    // Stabil bir zamanlayıcı için setInterval kullanıyoruz
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; // handleAnswer(-1) will be triggered by another effect
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, answered, current]);

  // Zaman dolduğunda cevapsız (-1) kabul et
  useEffect(() => {
    if (timeLeft === 0 && !answered && screen === 'quiz') {
      handleAnswer(-1);
    }
  }, [timeLeft, answered, screen]);

  const selectTopic = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setScreen('difficulty');
  };

  const getTimeForDifficulty = (diff: Difficulty): number => {
    if (diff === 'kolay') return 30;
    if (diff === 'orta') return 20;
    if (diff === 'zor') return 15;
    return 20; // karışık
  };

  const startQuiz = (difficulty: Difficulty) => {
    if (!selectedTopic) return;
    setSelectedDifficulty(difficulty);

    let filtered = [...selectedTopic.questions];
    if (difficulty !== 'karisik') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }

    // Karıştır ve en fazla 20 soru al
    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, Math.min(20, filtered.length));
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(getTimeForDifficulty(difficulty));
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
      // score değişkeni halihazırda güncel olduğu için +1 eklememize gerek yok
      addQuizScore(selectedTopic!.title, score, questions.length);
      setScreen('result');
      if (score === questions.length) {
        setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } }), 200);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(getTimeForDifficulty(selectedDifficulty));
    }
  };

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  const getDifficultyCount = (topic: QuizTopic, diff: string) => {
    return topic.questions.filter(q => q.difficulty === diff).length;
  };

  // ── SELECT SCREEN ──────────────────────────────────────────────
  if (screen === 'select') return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Quiz</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Bilginizi test edin. Konu seçin, zorluk belirleyin!</p>
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
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dynamicTopics.map((topic, i) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => selectTopic(topic)}
              className={`${card} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl mb-4 shadow-lg shadow-black/5`}>
                {topic.icon}
              </div>
              <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{topic.title}</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-1 font-bold`}>{topic.questions.length} soru mevcut</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold">🟢 {getDifficultyCount(topic, 'kolay')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold">🟡 {getDifficultyCount(topic, 'orta')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 font-bold">🔴 {getDifficultyCount(topic, 'zor')}</span>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <span className={`text-xs ${themeClasses.textFaint} font-black uppercase tracking-widest`}>KONU SEÇ</span>
                <ChevronRight size={12} className={`${themeClasses.textFaint} group-hover:translate-x-1 transition-transform`} />
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );

  // ── DIFFICULTY SELECT SCREEN ────────────────────────────────────
  if (screen === 'difficulty' && selectedTopic) {
    const difficulties: { id: Difficulty; label: string; icon: React.ReactNode; desc: string; color: string; time: string; count: number }[] = [
      {
        id: 'kolay', label: 'Kolay', icon: <Star size={28} />, desc: 'Temel bilgiler, basit sorular',
        color: 'from-emerald-500 to-green-600', time: '30 saniye', count: getDifficultyCount(selectedTopic, 'kolay')
      },
      {
        id: 'orta', label: 'Orta', icon: <Zap size={28} />, desc: 'Orta seviye, daha dikkat gerektirir',
        color: 'from-amber-500 to-orange-600', time: '20 saniye', count: getDifficultyCount(selectedTopic, 'orta')
      },
      {
        id: 'zor', label: 'Zor', icon: <Flame size={28} />, desc: 'İleri seviye, detaylı bilgi gerektirir',
        color: 'from-red-500 to-rose-600', time: '15 saniye', count: getDifficultyCount(selectedTopic, 'zor')
      },
      {
        id: 'karisik', label: 'Karışık', icon: <span className="text-2xl">🎲</span>, desc: 'Her seviyeden rastgele sorular',
        color: 'from-purple-500 to-indigo-600', time: '20 saniye', count: selectedTopic.questions.length
      },
    ];

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('select')} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{selectedTopic.title}</h1>
            <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Zorluk seviyesini belirleyin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {difficulties.map((diff, i) => (
            <motion.button
              key={diff.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => diff.count > 0 ? startQuiz(diff.id) : null}
              disabled={diff.count === 0}
              className={`${card} p-6 text-left transition-all duration-200 group ${diff.count > 0 ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${diff.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {diff.icon}
              </div>
              <p className={`${themeClasses.text} text-lg`} style={{ fontWeight: 700 }}>{diff.label}</p>
              <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{diff.desc}</p>
              <div className={`flex items-center justify-between mt-4 pt-3 border-t ${themeClasses.divider}`}>
                <span className={`text-xs ${themeClasses.textMuted} font-bold`}>{diff.count} soru</span>
                <span className={`text-xs ${themeClasses.textFaint} font-bold`}>⏱ {diff.time}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ────────────────────────────────────────────────
  if (screen === 'quiz' && questions.length > 0) {
    const q = questions[current];
    // Soru sayacı barının 0% yerine bulunduğumuz sorudan başlaması (örn 1/20 ise %5)
    const progress = ((current + 1) / questions.length) * 100;
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
            <button onClick={() => startQuiz(selectedDifficulty)} className={`flex-1 py-3 rounded-xl border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover} text-sm flex items-center justify-center gap-2`}>
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
