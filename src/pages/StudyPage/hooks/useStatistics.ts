import { useMemo } from 'react';

import type { VocabularyState } from '@/types';

import { COLOR_OPTIONS } from '../constants';
import type { StatisticsData } from '../types';

/**
 * 計算統計資料的 hook
 */
export const useStatistics = (
  allVocabulary: VocabularyState[],
  filteredVocabulary: VocabularyState[],
): StatisticsData => {
  return useMemo(() => {
    const total = allVocabulary.length;
    const filtered = filteredVocabulary.length;
    const statistics = COLOR_OPTIONS.map((option) => ({
      ...option,
      count: allVocabulary.filter((v) => v.familiar === option.value).length,
    }));

    return { total, filtered, statistics };
  }, [allVocabulary, filteredVocabulary]);
};
