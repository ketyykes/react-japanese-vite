export interface QuizScore {
  correct: number;
  total: number;
}

export interface QuizResult {
  date: string;
  score: QuizScore;
  percentage: number;
  totalQuestions: number;
  mode: string;
}

export interface AnswerResults {
  [vocabularyId: string]: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean;
  score: QuizScore;
  answerResults: AnswerResults;
  isQuizCompleted: boolean;
}

export type FamiliarityLevel = 'red' | 'orange' | 'yellow' | 'green';
