import { useCallback, useState } from 'react';

import { VocabularyState } from '@/types';

import { shuffleVocabulary } from '../components/VocabularyQuiz/helpers/quizUtils';

interface UseVocabularyStorageReturn {
  vocabularyList: VocabularyState[];
  hasVocabulary: boolean;
  availableQuestionCount: number;
  loadVocabularyFromStorage: (questionLimit?: number) => void;
}

/**
 * 管理詞彙資料的 localStorage 操作
 */
export const useVocabularyStorage = (): UseVocabularyStorageReturn => {
  const [vocabularyList, setVocabularyList] = useState<VocabularyState[]>([]);
  const [hasVocabulary, setHasVocabulary] = useState(true);
  const [availableQuestionCount, setAvailableQuestionCount] = useState(0);

  const loadVocabularyFromStorage = useCallback((questionLimit?: number) => {
    try {
      const storedVocabulary = localStorage.getItem('vocabulary');
      if (storedVocabulary) {
        const vocabularyData: VocabularyState[] = JSON.parse(storedVocabulary);
        if (vocabularyData.length > 0) {
          setAvailableQuestionCount(vocabularyData.length);

          const shuffledList = shuffleVocabulary(vocabularyData);

          // 如果有限制題目數量，則只取前 N 題
          const finalList =
            questionLimit && questionLimit < shuffledList.length
              ? shuffledList.slice(0, questionLimit)
              : shuffledList;

          setVocabularyList(finalList);
          setHasVocabulary(true);
        } else {
          setAvailableQuestionCount(0);
          setHasVocabulary(false);
        }
      } else {
        setAvailableQuestionCount(0);
        setHasVocabulary(false);
      }
    } catch (error) {
      console.error('載入詞彙資料時發生錯誤：', error);
      setAvailableQuestionCount(0);
      setHasVocabulary(false);
    }
  }, []);

  return {
    vocabularyList,
    hasVocabulary,
    availableQuestionCount,
    loadVocabularyFromStorage,
  };
};
