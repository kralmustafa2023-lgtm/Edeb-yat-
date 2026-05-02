import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, BookOpen, Info, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POETS, ANALYSIS_META, AnalysisTag, AnnotatedWord } from '../data/poetsData';

const ANALYSIS_BUTTONS: AnalysisTag[] = ['redif', 'kafiye', 'olcu', 'nazimBirimi', 'edebiSanat', 'tema', 'konu'];

export default function PoetDetailPage() {
  const { themeClasses, theme, progress, toggleFavoritePoet, markPoetStudied, pageParam: id, navigate } = useApp();
  const [activeAnalyses, setActiveAnalyses] = useState<Set<AnalysisTag>>(new Set());
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(true);
  const [expandedInfo, setExpandedInfo] = useState<AnalysisTag | null>(null);
  const [showBio, setShowBio] = useState(false);
  const [activeTab, setActiveTab] = useState<'poem' | 'bio' | 'facts'>('poem');

  const poet = POETS.find(p => p.id === id);
  if (!poet) return (
    <div className={`text-center py-20 ${themeClasses.textMuted}`}>
      <div className="text-5xl mb-4">🔍</div>
      <p>Şair bulunamadı.</p>
      <button onClick={() => navigate('sairler')} className="text-purple-400 hover:underline mt-2 inline-block">← Şairlere Dön</button>
    </div>
  );

  const poem = poet.mainPoem;
  const isFav = progress.favoritePoets.includes(poet.id);
  const isStudied = progress.studiedPoets.includes(poet.id);

  const toggleAnalysis = (tag: AnalysisTag) => {
    setActiveAnalyses(prev => {
      const n = new Set(prev);
      if (n.has(tag)) {
        n.delete(tag);
        if (expandedInfo === tag) setExpandedInfo(null);
      } else {
        n.add(tag);
        setExpandedInfo(tag);
        if (!isStudied) markPoetStudied(poet.id);
      }
      return n;
    });
  };

  const getWordClass = (word: AnnotatedWord): string => {
    const activeTag = word.tags.find(t => activeAnalyses.has(t));
    if (!activeTag) return '';
    return ANALYSIS_META[activeTag].highlight;
  };

  const countTagInPoem = (tag: AnalysisTag): number => {
    let count = 0;
    poem.stanzas.forEach(s => s.lines.forEach(l => l.forEach(w => {
      if (w.tags.includes(tag)) count++;
    })));
    return count;
  };

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button onClick={() => navigate('sairler')} className={`p-2 rounded-xl ${themeClasses.hover} ${themeClasses.textMuted} transition-colors shrink-0`}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{poet.name}</h1>
                <span className={`text-xs px-2 py-1 rounded-full ${themeClasses.badge}`}>{poet.years}</span>
                {isStudied && (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                    <BookOpen size={10} /> İncelendi
                  </span>
                )}
              </div>
              <p className={`text-sm ${themeClasses.textMuted} mt-1`}>{poet.period} · {poet.movement}</p>
            </div>
            <button
              onClick={() => toggleFavoritePoet(poet.id)}
              className={`p-2 rounded-xl transition-all ${isFav ? 'bg-amber-500/20 text-amber-400' : `${themeClasses.hover} ${themeClasses.textMuted}`}`}
            >
              <Star size={20} fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {poet.tags.map(tag => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${themeClasses.badge}`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 p-1 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} w-fit`}>
        {([['poem', '📜 Şiir Analizi'], ['bio', '👤 Biyografi'], ['facts', '💡 Bilgi Kartları']] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === tab
                ? theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-white text-indigo-700 shadow-sm'
                : themeClasses.textMuted
            }`}
            style={{ fontWeight: activeTab === tab ? 600 : 400 }}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* POEM TAB */}
        {activeTab === 'poem' && (
          <motion.div
            key="poem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Poem Display */}
            <div className="lg:col-span-3">
              <div className={`${card} p-6`}>
                {/* Poem Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`text-xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{poem.title}</h2>
                    <p className={`text-xs ${themeClasses.textMuted} mt-1`}>{poem.form}</p>
                    <p className={`text-xs ${themeClasses.textFaint} mt-0.5`}>{poem.period}</p>
                  </div>
                </div>

                {/* Legend */}
                {activeAnalyses.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-current/10"
                  >
                    {Array.from(activeAnalyses).map(tag => (
                      <div key={tag} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded ${ANALYSIS_META[tag].bgColor}`} />
                        <span className={`text-xs ${themeClasses.textMuted}`}>{ANALYSIS_META[tag].title}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Poem Text */}
                <div className="space-y-6">
                  {poem.stanzas.map((stanza, si) => (
                    <motion.div
                      key={si}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.1 }}
                    >
                      {stanza.lines.map((line, li) => (
                        <div key={li} className={`leading-relaxed text-base ${themeClasses.text} mb-1`} style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8 }}>
                          {line.map((word, wi) => {
                            const cls = getWordClass(word);
                            const activeTag = word.tags.find(t => activeAnalyses.has(t));
                            return (
                              <span key={wi} className="relative group/word inline-block">
                                <span
                                  className={`${cls} transition-all duration-200 ${word.attach ? '' : 'mr-1.5'} ${activeAnalyses.size > 0 && word.tags.some(t => activeAnalyses.has(t)) ? 'cursor-help' : ''}`}
                                >
                                  {word.text}
                                </span>
                                {/* Tooltip */}
                                {word.tooltip && activeTag && (
                                  <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-xs whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover/word:opacity-100 transition-opacity
                                    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} shadow-lg max-w-xs`}
                                    style={{ whiteSpace: 'normal', maxWidth: 220, textAlign: 'center' }}
                                  >
                                    {word.tooltip}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>

                <div className={`mt-6 pt-4 border-t ${themeClasses.divider} flex items-center gap-2`}>
                  <span className={`text-xs ${themeClasses.textFaint}`}>Fare ile vurgulanan sözcüklerin üzerine gel → açıklama görürsün</span>
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-2 space-y-4">
              <div className={card}>
                <div className="p-5 pb-4">
                  <h3 className={`text-sm ${themeClasses.text} mb-4`} style={{ fontWeight: 700 }}>🔍 Analiz Butonları</h3>
                  <p className={`text-xs ${themeClasses.textMuted} mb-4`}>Bir butona tıkla → şiirdeki o unsurlar renkle vurgulanır</p>
                  <div className="space-y-2">
                    {ANALYSIS_BUTTONS.map((tag) => {
                      const meta = ANALYSIS_META[tag];
                      const isActive = activeAnalyses.has(tag);
                      const count = countTagInPoem(tag);
                      const info = poem.analysisDetails[tag];
                      return (
                        <div key={tag}>
                          <button
                            onClick={() => toggleAnalysis(tag)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                              isActive
                                ? `${meta.bgColor} text-white border-transparent shadow-md`
                                : `${themeClasses.cardBorder} border ${themeClasses.textMuted} ${themeClasses.hover}`
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : meta.bgColor}`} />
                              <span className="text-sm" style={{ fontWeight: 600 }}>{meta.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {count > 0 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : themeClasses.badge}`}>
                                  {count}
                                </span>
                              )}
                              {isActive ? (
                                expandedInfo === tag ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                              ) : (
                                <Eye size={14} className="opacity-50" />
                              )}
                            </div>
                          </button>

                          {/* Info panel */}
                          <AnimatePresence>
                            {isActive && expandedInfo === tag && info && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`overflow-hidden`}
                              >
                                <div className={`mt-1 p-3 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} border ${themeClasses.divider}`}>
                                  <p className={`text-xs ${themeClasses.text} leading-relaxed`}>{info.description}</p>
                                  <div className="flex items-center gap-1 mt-2">
                                    <div className={`w-2 h-2 rounded-full ${meta.bgColor}`} />
                                    <span className={`text-xs ${themeClasses.textMuted}`}>{info.count} işaret bulundu</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {activeAnalyses.size > 0 && (
                  <div className={`px-5 py-3 border-t ${themeClasses.divider}`}>
                    <button
                      onClick={() => { setActiveAnalyses(new Set()); setExpandedInfo(null); }}
                      className={`text-xs ${themeClasses.textMuted} hover:text-red-400 transition-colors flex items-center gap-1`}
                    >
                      <EyeOff size={12} /> Tüm vurguları kaldır
                    </button>
                  </div>
                )}
              </div>

              {/* Poem Bio */}
              <div className={card}>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={14} className={themeClasses.accent} />
                    <h3 className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>Şiir Hakkında</h3>
                  </div>
                  <p className={`text-xs ${themeClasses.textMuted} leading-relaxed`}>{poem.bio}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BIO TAB */}
        {activeTab === 'bio' && (
          <motion.div key="bio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={`${card} p-6 max-w-2xl`}>
              <div className="h-40 rounded-xl bg-black/10 flex items-center justify-center mb-6 relative overflow-hidden">
                <img src={poet.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay to make text readable */}
                <div className="text-center relative z-10">
                  <p className="text-white text-lg" style={{ fontWeight: 700 }}>{poet.name}</p>
                  <p className="text-white/80 text-sm">{poet.years}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className={`text-xs ${themeClasses.badge} px-2 py-0.5 rounded-full`}>{poet.period}</span>
                  <span className={`text-xs ${themeClasses.badge} px-2 py-0.5 rounded-full ml-2`}>{poet.movement}</span>
                </div>
                <p className={`${themeClasses.text} leading-relaxed`}>{poet.bio}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* FACTS TAB */}
        {activeTab === 'facts' && (
          <motion.div key="facts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {poet.facts.map((fact, i) => (
                <motion.div
                  key={i}
                  className={`${card} p-5`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-sm mb-3">
                    💡
                  </div>
                  <p className={`text-sm ${themeClasses.text} leading-relaxed`}>{fact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
