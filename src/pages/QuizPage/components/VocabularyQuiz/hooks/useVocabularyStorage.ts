import { useCallback, useState } from 'react';

import { VocabularyState } from '@/types';

import { shuffleVocabulary } from '../helpers';

interface UseVocabularyStorageReturn {
  vocabularyList: VocabularyState[];
  hasVocabulary: boolean;
  loadVocabularyFromStorage: () => void;
}

/**
 * 管理詞彙資料的 localStorage 操作
 */
export const useVocabularyStorage = (): UseVocabularyStorageReturn => {
  const [vocabularyList, setVocabularyList] = useState<VocabularyState[]>([]);
  const [hasVocabulary, setHasVocabulary] = useState(true);

  const loadVocabularyFromStorage = useCallback(() => {
    try {
      const storedVocabulary = localStorage.getItem('vocabulary');
      if (storedVocabulary) {
        const vocabularyData: VocabularyState[] = JSON.parse(storedVocabulary);
        if (vocabularyData.length > 0) {
          const shuffledList = shuffleVocabulary(vocabularyData);
          setVocabularyList(shuffledList);
          setHasVocabulary(true);
        } else {
          setHasVocabulary(false);
        }
      } else {
        setHasVocabulary(false);
      }
    } catch (error) {
      console.error('載入詞彙資料時發生錯誤：', error);
      setHasVocabulary(false);
    }
  }, []);

  return {
    vocabularyList,
    hasVocabulary,
    loadVocabularyFromStorage,
  };
};
