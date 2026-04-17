import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Lightbulb, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { TABLE_EXERCISES } from '../data/tableData';

interface TableCell {
  value: string;
  isBlank: boolean;
  hint?: string;
  id?: string;
}

interface TableRow {
  cells: TableCell[];
}

interface TableExercise {
  id: string;
  title: string;
  icon: string;
  color: string;
  headers: string[];
  rows: TableRow[];
}

interface CellState {
  cellId: string;
  userInput: string;
  revealed: boolean;
  correct: boolean | null;
}

export default function FillTablePage() {
  const { themeClasses, theme, incrementTable } = useApp();
  const [exercises, setExercises] = useState<TableExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<TableExercise | null>(null);
  const [cellStates, setCellStates] = useState<Record<string, CellState>>({});
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalBlanks, setTotalBlanks] = useState(0);

  useEffect(() => {
    setExercises(TABLE_EXERCISES);
    setLoading(false);
  }, []);

  const startExercise = (ex: TableExercise) => {
    setSelectedExercise(ex);
    setSubmitted(false);
    setScore(0);
    const states: Record<string, CellState> = {};
    let blanks = 0;
    ex.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlank && cell.id) {
          blanks++;
          states[cell.id] = { cellId: cell.id, userInput: '', revealed: false, correct: null };
        }
      });
    });
    setCellStates(states);
    setTotalBlanks(blanks);
    setShowHints(false);
  };

  const handleInput = (cellId: string, value: string) => {
    if (submitted) return;
    setCellStates(prev => ({ ...prev, [cellId]: { ...prev[cellId], userInput: value, correct: null } }));
  };

  const handleSubmit = () => {
    if (!selectedExercise) return;
    let correctCount = 0;
    const newStates = { ...cellStates };
    selectedExercise.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlank && cell.id) {
          const isCorrect = newStates[cell.id].userInput.trim().toLowerCase() === cell.value.toLowerCase();
          if (isCorrect) correctCount++;
          newStates[cell.id] = { ...newStates[cell.id], correct: isCorrect };
        }
      });
    });
    setCellStates(newStates);
    setScore(correctCount);
    setSubmitted(true);
    if (correctCount === totalBlanks) {
      incrementTable();
      setTimeout(() => confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } }), 200);
    } else if (correctCount >= totalBlanks / 2) {
      setTimeout(() => confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#7c3aed', '#60a5fa'] }), 200);
    }
  };

  const revealAll = () => {
    if (!selectedExercise) return;
    const newStates = { ...cellStates };
    selectedExercise.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlank && cell.id) {
          newStates[cell.id] = { ...newStates[cell.id], revealed: true, userInput: cell.value, correct: true };
        }
      });
    });
    setCellStates(newStates);
    setSubmitted(true);
    setScore(totalBlanks);
  };

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;
  const pct = totalBlanks > 0 ? Math.round((score / totalBlanks) * 100) : 0;

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      <p className={`text-sm font-bold ${themeClasses.textMuted}`}>Tablolar yükleniyor...</p>
    </div>
  );

  if (!selectedExercise) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Boş Tablo Doldurma</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Boş hücreleri doldur, bilgini pekiştir. +25 XP kazanırsın!</p>
      </div>
      {exercises.length === 0 ? (
        <div className={`${card} p-12 text-center`}>
          <p className={`${themeClasses.textMuted}`}>Henüz tablo eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exercises.map((ex, i) => (
            <motion.button
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => startExercise(ex)}
              className={`${card} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center text-2xl mb-4 shadow-lg shadow-black/5`}>
                {ex.icon}
              </div>
              <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{ex.title}</p>
              <div className="flex gap-4 mt-2">
                <span className={`text-xs ${themeClasses.textMuted}`}>{ex.headers.length} sütun</span>
                <span className={`text-xs ${themeClasses.textMuted}`}>{ex.rows.length} satır</span>
                <span className={`text-xs ${themeClasses.textMuted}`}>{ex.rows.reduce((acc, r) => acc + r.cells.filter(c => c.isBlank).length, 0)} boşluk</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setSelectedExercise(null)} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}><ArrowLeft size={20} /></button>
        <div>
          <h2 className={`text-xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{selectedExercise.title}</h2>
          <p className={`text-xs ${themeClasses.textMuted}`}>{totalBlanks} boşluk doldurulacak</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setShowHints(!showHints)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all border ${showHints ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : `${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover}`}`}>
            <Lightbulb size={14} /><span>İpucu</span>
          </button>
          {!submitted && <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm" style={{ fontWeight: 600 }}>Kontrol Et</button>}
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`${card} p-5 flex items-center gap-4`}>
            <Trophy size={32} className={pct === 100 ? 'text-amber-400' : pct >= 60 ? 'text-emerald-400' : 'text-purple-400'} />
            <div className="flex-1">
              <p className={`text-lg ${themeClasses.text}`} style={{ fontWeight: 700 }}>{pct === 100 ? '🏆 Mükemmel!' : pct >= 60 ? '⭐ Harika!' : '💪 Daha Çok Çalış!'}</p>
              <p className={`text-sm ${themeClasses.textMuted}`}>{score}/{totalBlanks} doğru · %{pct}</p>
            </div>
            <button onClick={() => startExercise(selectedExercise)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover}`}><RotateCcw size={14} /> Tekrar</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}>
                {selectedExercise.headers.map((h, j) => (
                  <th key={j} className={`text-left p-4 border-b ${themeClasses.divider} ${themeClasses.textMuted} text-xs uppercase tracking-wide`} style={{ fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedExercise.rows.map((row, ri) => (
                <tr key={ri} className={`border-b last:border-b-0 ${themeClasses.divider}`}>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="p-3">
                      {cell.isBlank && cell.id ? (
                        <div className="relative">
                          <input
                            type="text"
                            value={cellStates[cell.id]?.userInput || ''}
                            onChange={e => handleInput(cell.id!, e.target.value)}
                            disabled={submitted}
                            placeholder={showHints && cell.hint ? `${cell.hint}...` : '?'}
                            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${
                              submitted && cellStates[cell.id]?.correct === true ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                              submitted && cellStates[cell.id]?.correct === false ? 'bg-red-500/20 border-red-500 text-red-400' :
                              theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 placeholder:text-white/20' :
                              'bg-white border-indigo-200 text-gray-900 focus:border-indigo-500 placeholder:text-gray-300'
                            }`}
                          />
                          {submitted && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                              {cellStates[cell.id]?.correct ? <CheckCircle size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-red-400" />}
                            </div>
                          )}
                          {submitted && !cellStates[cell.id]?.correct && <p className="text-xs text-emerald-500 mt-1">✓ {cell.value}</p>}
                        </div>
                      ) : (
                        <span className={`text-sm ${themeClasses.text}`}>{cell.value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!submitted && (
        <div className="flex gap-3 justify-end">
          <button onClick={revealAll} className={`px-4 py-2 rounded-xl text-sm border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover}`}>Hepsini Göster</button>
          <button onClick={handleSubmit} className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm" style={{ fontWeight: 600 }}>Kontrol Et →</button>
        </div>
      )}
    </div>
  );
}
