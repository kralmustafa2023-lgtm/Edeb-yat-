export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
}

export interface QuizTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}
