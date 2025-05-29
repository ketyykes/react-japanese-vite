import { useCallback, useState } from 'react';

import { VocabularyState } from '@/types';

import { createQuizResult, updateVocabularyFamiliarity } from '../helpers';
import { AnswerResults, QuizScore, QuizState } from '../types';

interface UseQuizLogicProps {
  vocabularyList: VocabularyState[];
  onQuizComplete?: () => void;
}

interface UseQuizLogicReturn extends QuizState {
  handleSubmitAnswer: () => void;
  handleNextQuestion: () => void;
  resetQuiz: () => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  setUserAnswer: (answer: string) => void;
  currentQuestion: VocabularyState | null;
}

/**
 * 測驗邏輯管理 hook
 */
export const useQuizLogic = ({
  vocabularyList,
  onQuizComplete,
}: UseQuizLogicProps): UseQuizLogicReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState<QuizScore>({ correct: 0, total: 0 });
  const [answerResults, setAnswerResults] = useState<AnswerResults>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQuestion =
    vocabularyList.length > 0 && currentQuestionIndex < vocabularyList.length
      ? vocabularyList[currentQuestionIndex]
      : null;

  // 更新詞彙熟悉程度並儲存到 localStorage
  const updateAndSaveVocabularyFamiliarity = useCallback(() => {
    try {
      const storedVocabulary = localStorage.getItem('vocabulary');
      if (!storedVocabulary) return;

      const allVocabulary: VocabularyState[] = JSON.parse(storedVocabulary);
      const updatedVocabulary = updateVocabularyFamiliarity(
        allVocabulary,
        answerResults,
      );
      localStorage.setItem('vocabulary', JSON.stringify(updatedVocabulary));
    } catch (error) {
      console.error('更新詞彙熟悉程度失敗：', error);
    }
  }, [answerResults]);

  // 儲存測驗記錄
  const saveQuizResult = useCallback(() => {
    try {
      const quizResult = createQuizResult(score, vocabularyList.length);
      const existingResults = localStorage.getItem('quizHistory');
      const quizHistory = existingResults ? JSON.parse(existingResults) : [];

      quizHistory.push(quizResult);

      // 只保留最近 50 次測驗記錄
      if (quizHistory.length > 50) {
        quizHistory.splice(0, quizHistory.length - 50);
      }

      localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
    } catch (error) {
      console.error('儲存測驗記錄失敗：', error);
    }
  }, [score, vocabularyList.length]);

  // 完成測驗
  const handleCompleteQuiz = useCallback(() => {
    updateAndSaveVocabularyFamiliarity();
    saveQuizResult();
    onQuizComplete?.();
  }, [updateAndSaveVocabularyFamiliarity, saveQuizResult, onQuizComplete]);

  // 處理答案提交
  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || isAnswered) return;

    const correctAnswer = currentQuestion.kanji.trim();
    const userAnswerTrimmed = userAnswer.trim();
    const correct = userAnswerTrimmed === correctAnswer;

    setIsCorrect(correct);
    setIsAnswered(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    setAnswerResults((prev) => ({
      ...prev,
      [currentQuestion.id]: correct,
    }));
  }, [currentQuestion, isAnswered, userAnswer]);

  // 下一題
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < vocabularyList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // 最後一題，觸發測驗完成
      setIsQuizCompleted(true);
      handleCompleteQuiz();
    }
  }, [currentQuestionIndex, vocabularyList.length, handleCompleteQuiz]);

  // 重置測驗
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0 });
    setAnswerResults({});
    setIsQuizCompleted(false);
  }, []);

  // 處理鍵盤事件
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!isAnswered) {
          handleSubmitAnswer();
        } else {
          handleNextQuestion();
        }
      }
    },
    [isAnswered, handleSubmitAnswer, handleNextQuestion],
  );

  return {
    currentQuestionIndex,
    userAnswer,
    isAnswered,
    isCorrect,
    score,
    answerResults,
    isQuizCompleted,
    currentQuestion,
    handleSubmitAnswer,
    handleNextQuestion,
    resetQuiz,
    handleKeyPress,
    setUserAnswer,
  };
};
