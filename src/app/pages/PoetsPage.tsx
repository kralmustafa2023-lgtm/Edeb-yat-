import React from 'react';
import { motion } from 'motion/react';
import { Star, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POETS } from '../data/poetsData';

export default function PoetsPage() {
  const { themeClasses, progress, toggleFavoritePoet, navigate } = useApp();

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl ${themeClasses.text}`} style={{ fontWeight: 800 }}>Şairler</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
          İncelediğin: {progress.studiedPoets.length} / {POETS.length} şair
        </p>
      </div>

      {/* Poets Grid — 3 large cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POETS.map((poet, i) => {
          const isFav = progress.favoritePoets.includes(poet.id);
          const isStudied = progress.studiedPoets.includes(poet.id);
          return (
            <motion.div
              key={poet.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div onClick={() => navigate('sair-detail', poet.id)} className="cursor-pointer">
                <div className={`${card} overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}>
                  {/* Cover Image — tall */}
                  <div className="relative h-72 overflow-hidden bg-black/10">
                    <img
                      src={poet.image}
                      alt={poet.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${poet.gradientFrom} ${poet.gradientTo} opacity-40`} />
                    {/* Period badge */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {poet.period}
                    </div>
                    {/* Studied badge */}
                    {isStudied && (
                      <div className="absolute top-3 right-12 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <BookOpen size={10} /> İncelendi
                      </div>
                    )}
                    {/* Emoji */}
                    <div className="absolute bottom-3 left-3 text-4xl">{poet.emoji}</div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h2 className={`text-xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{poet.name}</h2>
                    <p className={`text-sm ${themeClasses.textMuted} mt-1`}>{poet.years} · {poet.movement}</p>
                    <p className={`text-sm ${themeClasses.textFaint} mt-2 leading-relaxed line-clamp-3`}>{poet.bio}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {poet.tags.map(tag => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${themeClasses.badge}`}>{tag}</span>
                      ))}
                    </div>

                    {/* Poem title */}
                    <div className={`mt-4 pt-4 border-t ${themeClasses.divider} flex items-center gap-2`}>
                      <BookOpen size={14} className={themeClasses.accent} />
                      <span className={`text-sm ${themeClasses.textMuted}`}>{poet.mainPoem.title}</span>
                    </div>

                    {/* CTA */}
                    <div className={`mt-4 w-full py-3 rounded-xl text-center text-sm font-semibold bg-gradient-to-r ${poet.gradientFrom} ${poet.gradientTo} text-white opacity-90 group-hover:opacity-100 transition-opacity`}>
                      Şiiri İncele →
                    </div>
                  </div>
                </div>
              </div>

              {/* Fav button */}
              <button
                onClick={(e) => { e.preventDefault(); toggleFavoritePoet(poet.id); }}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isFav ? 'bg-amber-500 text-white' : 'bg-black/50 backdrop-blur-sm text-white/80 hover:bg-black/70'
                }`}
              >
                <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
