import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, BookOpen, AlertCircle, Lightbulb, Table, List, Type } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NOTE_TOPICS, NoteTopic, NoteSubtopic, NoteContent } from '../data/notesData';

function ContentRenderer({ content, themeClasses, theme }: { content: NoteContent[]; themeClasses: any; theme: string }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3 key={i} className={`text-base mt-5 mb-2 ${themeClasses.text} border-b pb-1 ${themeClasses.divider}`} style={{ fontWeight: 700 }}>
                {block.text}
              </h3>
            );
          case 'paragraph':
            return (
              <p key={i} className={`text-sm ${themeClasses.text} leading-relaxed`}>{block.text}</p>
            );
          case 'important':
            return (
              <div key={i} className={`flex gap-3 p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
              }`}>
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className={`text-sm ${themeClasses.text} leading-relaxed`} style={{ fontWeight: 500 }}>{block.text}</p>
              </div>
            );
          case 'highlight':
            return (
              <div key={i} className={`flex gap-3 p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'
              }`}>
                <Lightbulb size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <div>
                  {block.label && <p className={`text-xs ${themeClasses.textMuted} mb-1 uppercase tracking-wide`} style={{ fontWeight: 600 }}>{block.label}</p>}
                  <p className={`text-sm ${themeClasses.text} leading-relaxed`}>{block.text}</p>
                </div>
              </div>
            );
          case 'list':
            return (
              <ul key={i} className="space-y-1.5 ml-1">
                {block.items.map((item, j) => (
                  <li key={j} className={`flex items-start gap-2 text-sm ${themeClasses.text}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border">
                <table className={`w-full text-sm border-collapse ${themeClasses.cardBorder}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}>
                      {block.headers.map((h, j) => (
                        <th key={j} className={`text-left p-3 border-b ${themeClasses.divider} ${themeClasses.textMuted} text-xs uppercase tracking-wide`} style={{ fontWeight: 600 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={`border-b last:border-b-0 ${themeClasses.divider} ${j % 2 === 0 ? '' : theme === 'dark' ? 'bg-white/2' : 'bg-black/2'}`}>
                        {row.map((cell, k) => (
                          <td key={k} className={`p-3 ${themeClasses.text} text-xs leading-relaxed`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'example':
            return (
              <div key={i} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'}`}>
                <p className={`text-xs uppercase tracking-wide text-emerald-500 mb-2`} style={{ fontWeight: 700 }}>Örnek: {block.title}</p>
                <p className={`text-sm ${themeClasses.text} leading-relaxed italic`} style={{ fontFamily: 'Georgia, serif' }}>{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function LessonNotesPage() {
  const { themeClasses, theme } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<NoteTopic>(NOTE_TOPICS[0]);
  const [selectedSubtopic, setSelectedSubtopic] = useState<NoteSubtopic>(NOTE_TOPICS[0].subtopics[0]);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set([NOTE_TOPICS[0].id]));

  const card = `rounded-2xl border ${themeClasses.card} ${themeClasses.cardBorder}`;

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const selectSubtopic = (topic: NoteTopic, sub: NoteSubtopic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(sub);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className={`text-2xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>Ders Notları</h1>
        <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
          9. Sınıf Türk Dili ve Edebiyatı tam müfredatı — tüm üniteler ve konular
        </p>
      </div>

      <div className="flex gap-6 min-h-[70vh]">
        {/* Sidebar */}
        <div className={`w-72 shrink-0 ${card} overflow-hidden flex flex-col`} style={{ height: 'fit-content', maxHeight: '80vh', overflowY: 'auto' }}>
          <div className={`p-4 border-b ${themeClasses.divider}`}>
            <p className={`text-xs ${themeClasses.textMuted} uppercase tracking-wide`} style={{ fontWeight: 600 }}>Konular</p>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {NOTE_TOPICS.map((topic) => {
              const isExpanded = expandedTopics.has(topic.id);
              return (
                <div key={topic.id}>
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${themeClasses.hover}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-sm shrink-0`}>
                      {topic.icon}
                    </div>
                    <span className={`flex-1 text-sm ${themeClasses.text} leading-tight`} style={{ fontWeight: 600 }}>{topic.title}</span>
                    {isExpanded ? (
                      <ChevronDown size={14} className={themeClasses.textMuted} />
                    ) : (
                      <ChevronRight size={14} className={themeClasses.textMuted} />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {topic.subtopics.map((sub) => {
                          const isActive = selectedSubtopic.id === sub.id && selectedTopic.id === topic.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => selectSubtopic(topic, sub)}
                              className={`w-full text-left px-4 pl-[3.25rem] py-2.5 text-xs transition-all ${
                                isActive
                                  ? theme === 'dark'
                                    ? 'text-purple-300 bg-purple-600/20 border-r-2 border-purple-500'
                                    : theme === 'sepia'
                                    ? 'text-amber-800 bg-amber-200/50 border-r-2 border-amber-600'
                                    : 'text-indigo-700 bg-indigo-50 border-r-2 border-indigo-500'
                                  : `${themeClasses.textMuted} ${themeClasses.hover}`
                              }`}
                              style={{ fontWeight: isActive ? 600 : 400 }}
                            >
                              {sub.title}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubtopic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`${card} p-6`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-6 pb-5 border-b" style={{ borderColor: 'inherit' }}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedTopic.color} flex items-center justify-center text-lg shrink-0`}>
                  {selectedTopic.icon}
                </div>
                <div>
                  <p className={`text-xs ${themeClasses.textMuted} mb-1`}>{selectedTopic.title}</p>
                  <h2 className={`text-xl ${themeClasses.text}`} style={{ fontWeight: 700 }}>{selectedSubtopic.title}</h2>
                </div>
              </div>

              {/* Content */}
              <ContentRenderer
                content={selectedSubtopic.content}
                themeClasses={themeClasses}
                theme={theme}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
