import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

interface MatchingPair {
  left: string;
  right: string;
}

interface MatchingGame {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  pairs: (MatchingPair & { id: string })[];
}

interface MatchItem {
  id: string;
  text: string;
  side: 'left' | 'right';
  matched: boolean;
}

export default function MatchingPage() {
  const { themeClasses, theme, incrementMatching } = useApp();
  const [games, setGames] = useState<MatchingGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<MatchingGame | null>(null);
  const [leftItems, setLeftItems] = useState<MatchItem[]>([]);
  const [rightItems, setRightItems] = useState<MatchItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const gamesRef = ref(db, 'matching');
    const unsubscribe = onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: MatchingGame[] = Object.entries(data).map(([key, val]: any) => ({
          id: key,
          ...val,
          color: val.color || 'from-indigo-500 to-purple-600',
          pairs: val.pairs.map((p: any, idx: number) => ({ ...p, id: `p-${idx}` }))
        }));
        setGames(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      checkMatch(selectedLeft, selectedRight);
    }
  }, [selectedLeft, selectedRight]);

  const startGame = (game: MatchingGame) => {
    setSelectedGame(game);
    const shuffledLeft = [...game.pairs]
      .sort(() => Math.random() - 0.5)
      .map(p => ({ id: p.id, text: p.left, side: 'left' as const, matched: false }));
    const shuffledRight = [...game.pairs]
      .sort(() => Math.random() - 0.5)
      .map(p => ({ id: p.id, text: p.right, side: 'right' as const, matched: false }));
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrong([]);
    setScore(0);
    setAttempts(0);
    setCompleted(false);
  };

  const checkMatch = (leftId: string, rightId: string) => {
    setAttempts(a => a + 1);
    if (leftId === rightId) {
      setLeftItems(prev => prev.map(i => i.id === leftId ? { ...i, matched: true } : i));
      setRightItems(prev => prev.map(i => i.id === rightId ? { ...i, matched: true } : i));
      setScore(s => s + 1);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 }, colors: ['#10b981', '#34d399'] });

      if (score + 1 >= selectedGame!.pairs.length) {
        setTimeout(() => {
          setCompleted(true);
          incrementMatching();
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        }, 300);
      }
    } else {
      setWrong([leftId + '_left', rightId + '_right']);
      setTimeout(() => setWrong([]), 600);
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className={`text-sm font-bold ${themeClasses.textMuted}`}>Oyunlar yükleniyor...</p>
    </div>
  );

  if (!selectedGame) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Eşleştirme</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Konuları seç ve bilgilerini eşleştir. +30 XP kazandırır!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game, i) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => startGame(game)}
            className={`${card} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-3 shadow-lg shadow-black/5`}>
              {game.icon}
            </div>
            <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{game.title}</p>
            <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{game.pairs.length} çift</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  if (completed) return (
    <div className="max-w-md mx-auto">
      <motion.div className={`${card} p-8 text-center`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
        <h2 className={`text-2xl ${themeClasses.text} mb-2`} style={{ fontWeight: 700 }}>Tebrikler!</h2>
        <div className="flex gap-4 justify-center my-6">
          <div>
            <p className="text-3xl text-emerald-400" style={{ fontWeight: 700 }}>{score}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Doğru</p>
          </div>
          <div className={`w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
          <div>
            <p className="text-3xl text-purple-400" style={{ fontWeight: 700 }}>{attempts}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Deneme</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => startGame(selectedGame)} className={`flex-1 py-3 rounded-xl border ${themeClasses.cardBorder} ${themeClasses.textMuted} flex items-center justify-center gap-2 ${themeClasses.hover}`}><RotateCcw size={14} /> Tekrar</button>
          <button onClick={() => setSelectedGame(null)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white" style={{ fontWeight: 600 }}>Oyunlar →</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setSelectedGame(null)} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}><ArrowLeft size={20} /></button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>{selectedGame.title}</span>
            <span className={`text-sm ${themeClasses.textMuted}`}>{score}/{selectedGame.pairs.length} eşleşti</span>
          </div>
          <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" animate={{ width: `${(score / selectedGame.pairs.length) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {leftItems.map(item => (
            <motion.button
              key={item.id}
              onClick={() => !item.matched && setSelectedLeft(selectedLeft === item.id ? null : item.id)}
              className={`w-full p-4 rounded-xl border text-sm text-left transition-all duration-200 ${
                item.matched ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                wrong.includes(item.id + '_left') ? 'bg-red-500/20 border-red-500 animate-pulse' :
                selectedLeft === item.id ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : `${themeClasses.card} ${themeClasses.cardBorder} ${themeClasses.text} ${themeClasses.hover}`
              }`}
            >
              {item.text}
            </motion.button>
          ))}
        </div>
        <div className="space-y-3">
          {rightItems.map(item => (
            <motion.button
              key={item.id}
              onClick={() => !item.matched && setSelectedRight(selectedRight === item.id ? null : item.id)}
              className={`w-full p-4 rounded-xl border text-sm text-left transition-all duration-200 ${
                item.matched ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                wrong.includes(item.id + '_right') ? 'bg-red-500/20 border-red-500 animate-pulse' :
                selectedRight === item.id ? 'bg-amber-100 border-amber-500 text-amber-700' : `${themeClasses.card} ${themeClasses.cardBorder} ${themeClasses.text} ${themeClasses.hover}`
              }`}
            >
              {item.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
