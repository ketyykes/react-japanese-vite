import { useEffect, useState } from 'react';

import { PRESET_QUESTION_COUNTS } from '../../../../../constants';

interface UseQuizSettingsProps {
  availableQuestionCount: number;
  onStartQuiz: (questionCount: number) => void;
}

interface UseQuizSettingsReturn {
  selectedOption: string;
  customCount: string;
  error: string;
  hasEnoughVocabulary: boolean;
  presetCounts: typeof PRESET_QUESTION_COUNTS;
  setSelectedOption: (option: string) => void;
  handleCustomCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartQuiz: () => void;
  isOptionDisabled: (count: number) => boolean;
  isStartButtonDisabled: () => boolean;
}

/**
 * QuizSettings 相關邏輯的 hook
 */
export const useQuizSettings = ({
  availableQuestionCount,
  onStartQuiz,
}: UseQuizSettingsProps): UseQuizSettingsReturn => {
  const [selectedOption, setSelectedOption] = useState<string>('10');
  const [customCount, setCustomCount] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 檢查是否有足夠的詞彙
  const hasEnoughVocabulary = availableQuestionCount > 0;

  useEffect(() => {
    // 如果沒有足夠的詞彙，清除錯誤訊息
    if (!hasEnoughVocabulary) {
      setError('');
    }
  }, [hasEnoughVocabulary]);

  const handleCustomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setCustomCount(value);
    setError('');
  };

  const handleStartQuiz = () => {
    let questionCount: number;

    if (selectedOption === 'custom') {
      const customValue = parseInt(customCount, 10);

      if (!customCount || isNaN(customValue) || customValue <= 0) {
        setError('請輸入有效的題目數量');
        return;
      }

      if (customValue > availableQuestionCount) {
        setError(`最多只能設定 ${availableQuestionCount} 題`);
        return;
      }

      questionCount = customValue;
    } else {
      questionCount = parseInt(selectedOption, 10);

      if (questionCount > availableQuestionCount) {
        setError(`詞彙數量不足，無法設定 ${questionCount} 題`);
        return;
      }
    }

    onStartQuiz(questionCount);
  };

  const isOptionDisabled = (count: number) => {
    return !hasEnoughVocabulary || count > availableQuestionCount;
  };

  const isStartButtonDisabled = () => {
    if (!hasEnoughVocabulary) return true;

    if (selectedOption === 'custom') {
      const customValue = parseInt(customCount, 10);
      return (
        !customCount ||
        isNaN(customValue) ||
        customValue <= 0 ||
        customValue > availableQuestionCount
      );
    }

    const presetValue = parseInt(selectedOption, 10);
    return presetValue > availableQuestionCount;
  };

  return {
    selectedOption,
    customCount,
    error,
    hasEnoughVocabulary,
    presetCounts: PRESET_QUESTION_COUNTS,
    setSelectedOption,
    handleCustomCountChange,
    handleStartQuiz,
    isOptionDisabled,
    isStartButtonDisabled,
  };
};
