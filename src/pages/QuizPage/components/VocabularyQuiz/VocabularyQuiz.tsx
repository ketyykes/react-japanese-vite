import { FC, useEffect, useState } from 'react';

import NoVocabulary from './NoVocabulary';
import QuizComplete from './QuizComplete';
import QuizContent from './QuizContent';
import QuizSettings from './QuizSettings';
import { useQuizLogic, useVocabularyStorage } from './hooks';

/**
 * 主要的日語詞彙測驗元件
 * 負責協調各個子元件和邏輯 hooks
 */
const VocabularyQuiz: FC = () => {
  const {
    vocabularyList,
    hasVocabulary,
    availableQuestionCount,
    loadVocabularyFromStorage,
  } = useVocabularyStorage();

  const [isQuizStarted, setIsQuizStarted] = useState(false);

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

  // 初次載入時讀取詞彙資料（不限制數量，用於獲取可用題目總數）
  useEffect(() => {
    loadVocabularyFromStorage();
  }, [loadVocabularyFromStorage]);

  // 處理開始測驗
  const handleStartQuiz = (questionCount: number) => {
    setIsQuizStarted(true);
    // 重新載入詞彙，並限制題目數量
    loadVocabularyFromStorage(questionCount);
  };

  // 處理重新測驗
  const handleRestartQuiz = () => {
    setIsQuizStarted(false);
    resetQuiz();
    // 重新載入詞彙資料（不限制數量）
    loadVocabularyFromStorage();
  };

  // 處理回到設定
  const handleBackToSettings = () => {
    setIsQuizStarted(false);
    resetQuiz();
    // 重新載入詞彙資料（不限制數量）
    loadVocabularyFromStorage();
  };

  // 渲染邏輯
  // 如果詞彙資料載入中或沒有詞彙，顯示 NoVocabulary 組件
  if (!hasVocabulary || availableQuestionCount === 0) {
    return <NoVocabulary onReload={() => loadVocabularyFromStorage()} />;
  }

  // 如果還沒開始測驗，顯示設定頁面
  if (!isQuizStarted) {
    return (
      <QuizSettings
        onStartQuiz={handleStartQuiz}
        availableQuestionCount={availableQuestionCount}
      />
    );
  }

  // 如果測驗完成，顯示結果頁面
  if (isQuizCompleted || currentQuestionIndex >= vocabularyList.length) {
    return (
      <QuizComplete
        score={score}
        onRestart={handleRestartQuiz}
        onBackToSettings={handleBackToSettings}
      />
    );
  }

  // 如果當前題目不存在，返回 NoVocabulary 組件
  if (!currentQuestion) {
    return <NoVocabulary onReload={() => loadVocabularyFromStorage()} />;
  }

  // 顯示測驗內容
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
