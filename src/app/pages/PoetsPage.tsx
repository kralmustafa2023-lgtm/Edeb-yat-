import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, Star, BookOpen, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POETS, PERIOD_ORDER, getPeriodLabel } from '../data/poetsData';

const PERIOD_COLORS: Record<string, string> = {
  tekke: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  divan: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
  halk: 'from-red-500/20 to-rose-500/20 border-red-500/30',
  tanzimat: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  'servet-i-funun': 'from-slate-500/20 to-gray-500/20 border-slate-500/30',
  milli: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  cumhuriyet: 'from-violet-500/20 to-purple-500/20 border-violet-500/30',
};

export default function PoetsPage() {
  const { themeClasses, progress, toggleFavoritePoet, theme } = useApp();
  const [search, setSearch] = useState('');
  const [activePeriod, setActivePeriod] = useState<string>('all');

  const filtered = POETS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.period.toLowerCase().includes(search.toLowerCase()) ||
      p.movement.toLowerCase().includes(search.toLowerCase());
    const matchPeriod = activePeriod === 'all' || p.periodCode === activePeriod;
    return matchSearch && matchPeriod;
  });

  const periods = ['all', ...PERIOD_ORDER];
  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Şairler</h1>
          <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
            9. Sınıf müfredatındaki {POETS.length} şair — İncelediğin: {progress.studiedPoets.length}
          </p>
        </div>
        {/* Search */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${themeClasses.inputBg} ${themeClasses.inputBorder} w-full sm:w-64`}>
          <Search size={14} className={themeClasses.textMuted} />
          <input
            className={`bg-transparent flex-1 text-sm outline-none ${themeClasses.text} placeholder:${themeClasses.textMuted}`}
            placeholder="Şair ya da dönem ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2 flex-wrap">
        {periods.map(p => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              activePeriod === p
                ? 'bg-purple-600 text-white border-purple-600'
                : `${themeClasses.cardBorder} border ${themeClasses.textMuted} ${themeClasses.hover}`
            }`}
          >
            {p === 'all' ? 'Tümü' : getPeriodLabel(p)}
          </button>
        ))}
      </div>

      {/* Poets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((poet, i) => {
          const isFav = progress.favoritePoets.includes(poet.id);
          const isStudied = progress.studiedPoets.includes(poet.id);
          return (
            <motion.div
              key={poet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <Link to={`/sair/${poet.id}`}>
                <div className={`${card} overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
                  {/* Cover Image */}
                  <div className={`relative h-36 bg-gradient-to-br ${poet.gradientFrom} ${poet.gradientTo} overflow-hidden`}>
                    <img
                      src={poet.image}
                      alt={poet.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl mb-1">{poet.emoji}</div>
                      <div className="text-white/80 text-xs">{poet.years}</div>
                    </div>
                    {/* Studied badge */}
                    {isStudied && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <BookOpen size={10} />
                        İncelendi
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 700 }}>{poet.name}</p>
                    <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>{poet.period}</p>
                    <p className={`text-xs ${themeClasses.textFaint} mt-1`}>{poet.movement}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {poet.tags.slice(0, 2).map(tag => (
                        <span key={tag} className={`text-xs px-1.5 py-0.5 rounded ${themeClasses.badge}`}>{tag}</span>
                      ))}
                    </div>
                    <div className={`mt-3 pt-3 border-t ${themeClasses.divider} flex items-center gap-1`}>
                      <BookOpen size={12} className={themeClasses.textMuted} />
                      <span className={`text-xs ${themeClasses.textMuted}`}>{poet.mainPoem.title}</span>
                    </div>
                  </div>
                </div>
              </Link>
              {/* Fav button */}
              <button
                onClick={(e) => { e.preventDefault(); toggleFavoritePoet(poet.id); }}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isFav ? 'bg-amber-500 text-white' : 'bg-black/40 text-white/70 hover:bg-black/60'
                }`}
              >
                <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className={`text-center py-16 ${themeClasses.textMuted}`}>
          <div className="text-4xl mb-3">🔍</div>
          <p>Aranan şair bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
