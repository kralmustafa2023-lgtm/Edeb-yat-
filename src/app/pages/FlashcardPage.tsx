import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FLASHCARD_DECKS, FlashcardDeck } from '../data/flashcardData';

export default function FlashcardPage() {
  const { themeClasses, theme, incrementFlashcard } = useApp();
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<FlashcardDeck['cards']>([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

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
      setCurrent(c => c + 1);
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

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  // DECK SELECT
  if (!selectedDeck) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Flashcard</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>3D kart çevirme ile hızlı tekrar yap. Biliyorum / Bilmiyorum sistemi ile ilerle.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FLASHCARD_DECKS.map((deck, i) => (
          <motion.button
            key={deck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => startDeck(deck)}
            className={`${card} p-5 text-left hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-2xl mb-3`}>
              {deck.icon}
            </div>
            <p className={`${themeClasses.text} text-base`} style={{ fontWeight: 700 }}>{deck.title}</p>
            <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{deck.cards.length} kart</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // DONE SCREEN
  if (done) return (
    <div className="max-w-md mx-auto space-y-6">
      <motion.div
        className={`${card} p-8 text-center`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
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
        {unknown.length > 0 && (
          <p className={`text-xs ${themeClasses.textMuted} mb-4`}>
            {unknown.length} kart bilmiyorum olarak işaretlendi. Tekrar çalışmak ister misin?
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={restart}
            className={`flex-1 py-3 rounded-xl border ${themeClasses.cardBorder} ${themeClasses.textMuted} ${themeClasses.hover} text-sm flex items-center justify-center gap-2`}
          >
            <RotateCcw size={14} />
            {unknown.length > 0 ? `Tekrar (${unknown.length})` : 'Yenile'}
          </button>
          <button
            onClick={() => setSelectedDeck(null)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm"
            style={{ fontWeight: 600 }}
          >
            Demetler →
          </button>
        </div>
      </motion.div>
    </div>
  );

  // CARD VIEW
  const currentCard = cards[current];
  const progress = (current / cards.length) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => setSelectedDeck(null)} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted}`}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-sm ${themeClasses.textMuted}`}>{selectedDeck.title}</span>
            <span className={`text-sm ${themeClasses.textMuted}`} style={{ fontWeight: 600 }}>{Number(current) + 1}/{cards.length}</span>
          </div>
          <div className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 justify-center">
        <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle size={12} />{known.length} biliyorum</span>
        <span className="flex items-center gap-1 text-xs text-red-400"><XCircle size={12} />{unknown.length} bilmiyorum</span>
      </div>

      {/* Flashcard */}
      <div className="cursor-pointer" onClick={() => setFlipped(f => !f)} style={{ perspective: 1000 }}>
        <motion.div
          style={{ transformStyle: 'preserve-3d', position: 'relative', height: 280 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 ${card} p-8 flex flex-col items-center justify-center text-center`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className={`text-xs ${themeClasses.textMuted} mb-4 uppercase tracking-widest`}>Ön · Tıkla çevirmek için</div>
            <p className={`text-lg ${themeClasses.text} leading-relaxed`} style={{ fontWeight: 600 }}>
              {currentCard.front}
            </p>
            <div className={`mt-4 text-xs ${themeClasses.badge} px-2 py-1 rounded-full`}>{currentCard.category}</div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 rounded-2xl border p-8 flex flex-col items-center justify-center text-center overflow-auto ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30'
                : theme === 'sepia'
                ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300'
                : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
            }`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className={`text-xs ${themeClasses.textMuted} mb-4 uppercase tracking-widest`}>Arka · Cevap</div>
            <p className={`text-sm ${themeClasses.text} leading-relaxed whitespace-pre-line text-left`}>{currentCard.back}</p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-3"
          >
            <button
              onClick={() => handleKnow(false)}
              className="flex-1 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all"
              style={{ fontWeight: 600 }}
            >
              <XCircle size={18} />
              Bilmiyorum
            </button>
            <button
              onClick={() => handleKnow(true)}
              className="flex-1 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all"
              style={{ fontWeight: 600 }}
            >
              <CheckCircle size={18} />
              Biliyorum
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!flipped && (
        <p className={`text-center text-xs ${themeClasses.textFaint}`}>Kartı çevirmek için tıkla →</p>
      )}
    </div>
  );
}
