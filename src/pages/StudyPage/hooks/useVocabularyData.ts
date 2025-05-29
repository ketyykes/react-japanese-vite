import { useCallback, useEffect, useState } from 'react';

import type { VocabularyState } from '@/types';

import type { FamiliarityLevel } from '../types';
import { loadVocabularyFromStorage, saveVocabularyToStorage } from '../utils';

interface UseVocabularyDataReturn {
  allVocabulary: VocabularyState[];
  deleteVocabulary: (vocabulary: VocabularyState) => void;
  changeVocabularyColor: (
    vocabularyId: string,
    newColor: FamiliarityLevel,
  ) => void;
}

/**
 * 管理詞彙資料的 hook
 */
export const useVocabularyData = (): UseVocabularyDataReturn => {
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>([]);

  // 刪除詞彙
  const deleteVocabulary = useCallback((vocabulary: VocabularyState) => {
    setAllVocabulary((prev) => {
      const newVocabulary = prev.filter((v) => v.id !== vocabulary.id);
      saveVocabularyToStorage(newVocabulary);
      return newVocabulary;
    });
  }, []);

  // 變更詞彙熟悉度顏色
  const changeVocabularyColor = useCallback(
    (vocabularyId: string, newColor: FamiliarityLevel) => {
      setAllVocabulary((prev) => {
        const newVocabulary = prev.map((v) => {
          if (v.id === vocabularyId) {
            return { ...v, familiar: newColor };
          }
          return v;
        });
        saveVocabularyToStorage(newVocabulary);
        return newVocabulary;
      });
    },
    [],
  );

  // 載入詞彙資料
  useEffect(() => {
    const vocabulary = loadVocabularyFromStorage();
    setAllVocabulary(vocabulary);
  }, []);

  return {
    allVocabulary,
    deleteVocabulary,
    changeVocabularyColor,
  };
};
