import { FC, useEffect } from 'react';

import NoVocabulary from './NoVocabulary';
import QuizComplete from './QuizComplete';
import QuizContent from './QuizContent';
import { useQuizLogic, useVocabularyStorage } from './hooks';

/**
 * 主要的日語詞彙測驗元件
 * 負責協調各個子元件和邏輯 hooks
 */
const VocabularyQuiz: FC = () => {
  const { vocabularyList, hasVocabulary, loadVocabularyFromStorage } =
    useVocabularyStorage();

  const quizLogic = useQuizLogic({
    vocabularyList,
  });

  const {
    currentQuestionIndex,
    userAnswer,
    isAnswered,
    isCorrect,
    score,
    isQuizCompleted,
    currentQuestion,
    handleSubmitAnswer,
    handleNextQuestion,
    resetQuiz,
    handleKeyPress,
    setUserAnswer,
  } = quizLogic;

  // 初次載入時讀取詞彙資料
  useEffect(() => {
    loadVocabularyFromStorage();
  }, [loadVocabularyFromStorage]);

  // 處理重新測驗
  const handleRestartQuiz = () => {
    resetQuiz();
    loadVocabularyFromStorage();
  };

  // 渲染邏輯
  if (!hasVocabulary || vocabularyList.length === 0) {
    return <NoVocabulary onReload={loadVocabularyFromStorage} />;
  }

  if (isQuizCompleted || currentQuestionIndex >= vocabularyList.length) {
    return <QuizComplete score={score} onRestart={handleRestartQuiz} />;
  }

  if (!currentQuestion) {
    return <NoVocabulary onReload={loadVocabularyFromStorage} />;
  }

  return (
    <QuizContent
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={vocabularyList.length}
      userAnswer={userAnswer}
      isAnswered={isAnswered}
      isCorrect={isCorrect}
      score={score}
      onAnswerChange={setUserAnswer}
      onSubmitAnswer={handleSubmitAnswer}
      onNextQuestion={handleNextQuestion}
      onKeyPress={handleKeyPress}
    />
  );
};

export default VocabularyQuiz;
