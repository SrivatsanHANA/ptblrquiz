export interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizState {
  questions: Question[];
  selectedQuestion: Question | null;
  showAnswer: boolean;
}

export interface ExcelRow {
  Question: string;
  Answer: string;
  Topic: string;
  'Difficulty Level': string;
}