import type { VocabularyState } from '@/types';

import { STORAGE_KEY } from '../constants';

/**
 * 從 localStorage 載入詞彙資料
 */
export const loadVocabularyFromStorage = (): VocabularyState[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('載入詞彙資料失敗:', error);
    return [];
  }
};

/**
 * 儲存詞彙資料到 localStorage
 */
export const saveVocabularyToStorage = (
  vocabulary: VocabularyState[],
): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabulary));
  } catch (error) {
    console.error('儲存詞彙資料失敗:', error);
  }
};

/**
 * 根據顏色篩選詞彙
 */
export const filterVocabularyByColors = (
  vocabulary: VocabularyState[],
  colors: string[],
): VocabularyState[] => {
  if (colors.length === 0) {
    return vocabulary;
  }
  return vocabulary.filter((item) => colors.includes(item.familiar));
};
