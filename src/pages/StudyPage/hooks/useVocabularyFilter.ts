import { useMemo, useState } from 'react';

import type { VocabularyState } from '@/types';

import type { ColorOption } from '../types';
import { filterVocabularyByColors } from '../utils';

interface UseVocabularyFilterReturn {
  colors: string[];
  filteredVocabulary: VocabularyState[];
  handleAutocompleteChange: (_event: unknown, newValue: ColorOption[]) => void;
}

/**
 * 管理詞彙篩選的 hook
 */
export const useVocabularyFilter = (
  allVocabulary: VocabularyState[],
): UseVocabularyFilterReturn => {
  const [colors, setColors] = useState<string[]>([]);

  // 篩選後的詞彙
  const filteredVocabulary = useMemo(() => {
    return filterVocabularyByColors(allVocabulary, colors);
  }, [allVocabulary, colors]);

  // 處理篩選選項變化
  const handleAutocompleteChange = (
    _event: unknown,
    newValue: ColorOption[],
  ) => {
    setColors(newValue.map((option) => option.value));
  };

  return {
    colors,
    filteredVocabulary,
    handleAutocompleteChange,
  };
};
