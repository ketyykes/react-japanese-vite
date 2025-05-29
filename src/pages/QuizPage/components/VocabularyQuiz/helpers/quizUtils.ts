import { VocabularyState } from '@/types';

import {
  AnswerResults,
  FamiliarityLevel,
  QuizResult,
  QuizScore,
} from '../types';

/**
 * 隨機化詞彙列表順序
 */
export const shuffleVocabulary = (
  vocabulary: VocabularyState[],
): VocabularyState[] => {
  return [...vocabulary].sort(() => Math.random() - 0.5);
};

/**
 * 根據答題結果調整單字熟悉程度
 */
export const adjustFamiliarity = (
  currentLevel: FamiliarityLevel,
  isCorrect: boolean,
): FamiliarityLevel => {
  if (isCorrect) {
    // 答對了，提升熟悉度
    switch (currentLevel) {
      case 'red':
        return 'orange';
      case 'orange':
        return 'yellow';
      case 'yellow':
        return 'green';
      case 'green':
        return 'green'; // 已經是最高級
    }
  } else {
    // 答錯了，降低熟悉度
    switch (currentLevel) {
      case 'green':
        return 'yellow';
      case 'yellow':
        return 'orange';
      case 'orange':
        return 'red';
      case 'red':
        return 'red'; // 已經是最低級
    }
  }
};

/**
 * 更新詞彙熟悉程度
 */
export const updateVocabularyFamiliarity = (
  allVocabulary: VocabularyState[],
  answerResults: AnswerResults,
): VocabularyState[] => {
  return allVocabulary.map((vocab) => {
    const wasAnsweredCorrectly = answerResults[vocab.id];
    if (wasAnsweredCorrectly === undefined) return vocab; // 沒有測試到的單字保持原狀

    const newFamiliar = adjustFamiliarity(vocab.familiar, wasAnsweredCorrectly);
    return { ...vocab, familiar: newFamiliar };
  });
};

/**
 * 建立測驗結果物件
 */
export const createQuizResult = (
  score: QuizScore,
  totalQuestions: number,
  mode = 'chinese-to-kanji',
): QuizResult => {
  return {
    date: new Date().toISOString(),
    score,
    percentage: Math.round((score.correct / score.total) * 100),
    totalQuestions,
    mode,
  };
};

/**
 * 計算測驗完成百分比
 */
export const calculatePercentage = (correct: number, total: number): number => {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};
