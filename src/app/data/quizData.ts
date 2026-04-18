export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
}

import { unit1Questions } from './quizData_u1';
import { unit2Questions } from './quizData_u2';
import { unit3Questions } from './quizData_u3';
import { unit4Questions } from './quizData_u4';
import { unit5Questions } from './quizData_u5';
import { unit6Questions } from './quizData_u6';
import { unit7Questions } from './quizData_u7';
import { unit8Questions } from './quizData_u8';
import { unit9Questions } from './quizData_u9';

export interface QuizTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'Giriş (Ünite 1)',
    title: 'Ünite 1: Giriş',
    icon: '📚',
    color: 'from-violet-600 to-purple-700',
    questions: unit1Questions,
  },
  {
    id: 'Hikâye (Ünite 2)',
    title: 'Ünite 2: Hikâye',
    icon: '📖',
    color: 'from-amber-600 to-yellow-700',
    questions: unit2Questions,
  },
  {
    id: 'Şiir (Ünite 3)',
    title: 'Ünite 3: Şiir',
    icon: '🎭',
    color: 'from-pink-600 to-rose-700',
    questions: unit3Questions,
  },
  {
    id: 'Masal & Fabl (Ünite 4)',
    title: 'Ünite 4: Masal ve Fabl',
    icon: '🦄',
    color: 'from-emerald-600 to-teal-700',
    questions: unit4Questions,
  },
  {
    id: 'Roman (Ünite 5)',
    title: 'Ünite 5: Roman',
    icon: '📘',
    color: 'from-blue-600 to-indigo-700',
    questions: unit5Questions,
  },
  {
    id: 'Tiyatro (Ünite 6)',
    title: 'Ünite 6: Tiyatro',
    icon: '🎭',
    color: 'from-orange-500 to-red-600',
    questions: unit6Questions,
  },
  {
    id: 'Biyografi/Otobiyografi (Ünite 7)',
    title: 'Ünite 7: Biyo / Otobiyo',
    icon: '📝',
    color: 'from-teal-600 to-cyan-700',
    questions: unit7Questions,
  },
  {
    id: 'Mektup/E-Posta (Ünite 8)',
    title: 'Ünite 8: Mektup ve E-Posta',
    icon: '📨',
    color: 'from-sky-500 to-blue-600',
    questions: unit8Questions,
  },
  {
    id: 'Günlük/Blog (Ünite 9)',
    title: 'Ünite 9: Günlük ve Blog',
    icon: '📅',
    color: 'from-slate-600 to-gray-800',
    questions: unit9Questions,
  }
];
