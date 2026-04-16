import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  icon: string;
  color: string;
  cards: Flashcard[];
}

export default function FlashcardPage() {
  const { themeClasses, theme, incrementFlashcard } = useApp();
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const decksRef = ref(db, 'flashcards');
    const unsubscribe = onValue(decksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: FlashcardDeck[] = Object.entries(data).map(([key, val]: any) => ({
          id: key,
          ...val,
          color: val.color || 'from-violet-500 to-purple-600',
          cards: (val.cards || []).map((c: any, idx: number) => ({ ...c, id: `c-${idx}` }))
        }));
        setDecks(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const startDeck = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setCards([...deck.cards].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setDone(false);
  };

  const handleKnow = (knows: boolean) => {
    const card = cards[current];
    if (knows) {
      setKnown(k => [...k, card.id]);
      incrementFlashcard();
    } else {
      setUnknown(u => [...u, card.id]);
    }
    if (current + 1 >= cards.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
      setFlipped(false);
    }
  };

  const restart = () => {
    const unknownCards = cards.filter(c => unknown.includes(c.id));
    if (unknownCards.length === 0) {
      setDone(false);
      setCards([...selectedDeck!.cards].sort(() => Math.random() - 0.5));
      setCurrent(0);
      setKnown([]);
      setUnknown([]);
    } else {
      setCards(unknownCards.sort(() => Math.random() - 0.5));
      setCurrent(0);
      setFlipped(false);
      setKnown([]);
      setUnknown([]);
      setDone(false);
    }
  };

  const cardStyle = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      <p className={`text-sm font-bold ${themeClasses.textMuted}`}>Demetler yükleniyor...</p>
    </div>
  );

  if (!selectedDeck) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Flashcard</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>Kartları çevirerek hızlı tekrar yap. +30 XP kazanırsın!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck, i) => (
          <motion.button
            key={deck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => startDeck(deck)}
            className={`${cardStyle} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-2xl mb-3 shadow-lg shadow-black/5`}>
              {deck.icon}
            </div>
            <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{deck.title}</p>
            <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{deck.cards.length} kart</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  if (done) return (
    <div className="max-w-md mx-auto space-y-6">
      <motion.div className={`${cardStyle} p-8 text-center`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="text-5xl mb-4">🃏</div>
        <h2 className={`text-xl ${themeClasses.text} mb-2`} style={{ fontWeight: 700 }}>Tur Bitti!</h2>
        <div className="flex gap-4 justify-center my-4">
          <div className="text-center">
            <p className="text-2xl text-emerald-400" style={{ fontWeight: 700 }}>{known.length}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Biliyorum</p>
          </div>
          <div className={`w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className="text-center">
            <p className="text-2xl text-red-400" style={{ fontWeight: 700 }}>{unknown.length}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Bilmiyorum</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className={`flex-1 py-3 rounded-xl border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover} text-sm flex items-center justify-center gap-2`}><RotateCcw size={14} /> Tekrar</button>
          <button onClick={() => setSelectedDeck(null)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm" style={{ fontWeight: 600 }}>Demetler →</button>
        </div>
      </motion.div>
    </div>
  );

  const currentCard = cards[current];
  const progress = (current / cards.length) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setSelectedDeck(null)} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}><ArrowLeft size={20} /></button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-sm ${themeClasses.textMuted}`}>{selectedDeck.title}</span>
            <span className={`text-sm ${themeClasses.textMuted}`} style={{ fontWeight: 600 }}>{current + 1}/{cards.length}</span>
          </div>
          <div className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}><div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setFlipped(f => !f)} style={{ perspective: 1000 }}>
        <motion.div style={{ transformStyle: 'preserve-3d', position: 'relative', height: 280 }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5 }}>
          <div className={`absolute inset-0 ${cardStyle} p-8 flex flex-col items-center justify-center text-center`} style={{ backfaceVisibility: 'hidden' }}>
            <p className={`text-lg ${themeClasses.text} leading-relaxed`} style={{ fontWeight: 600 }}>{currentCard.front}</p>
          </div>
          <div className={`absolute inset-0 rounded-2xl border p-8 flex flex-col items-center justify-center text-center overflow-auto bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className={`text-sm ${themeClasses.text} leading-relaxed text-left`}>{currentCard.back}</p>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {flipped && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex gap-3">
            <button onClick={() => handleKnow(false)} className="flex-1 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/20" style={{ fontWeight: 600 }}><XCircle size={18} /> Bilmiyorum</button>
            <button onClick={() => handleKnow(true)} className="flex-1 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2 hover:bg-emerald-500/20" style={{ fontWeight: 600 }}><CheckCircle size={18} /> Biliyorum</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
