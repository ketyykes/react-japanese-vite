import { useReducer } from 'react';

import { initialState } from '@/components/shared/VocabularyForm/vocabularyInitialState';
import vocabularyReducer from '@/components/shared/VocabularyForm/vocabularyReducer';
import type { VocabularyState } from '@/types';

type UseVocabularyFormReturn = {
  vocabularyInput: VocabularyState;
  dispatch: React.Dispatch<any>;
  isFormValid: boolean;
  resetForm: () => void;
};

export const useVocabularyForm = (): UseVocabularyFormReturn => {
  const [vocabularyInput, dispatch] = useReducer(
    vocabularyReducer,
    initialState,
  );

  const isFormValid = Boolean(
    vocabularyInput.kanji?.trim() &&
      vocabularyInput.roma?.trim() &&
      vocabularyInput.chinese?.trim(),
  );

  const resetForm = () => {
    dispatch({ type: 'confirm' });
  };

  return {
    vocabularyInput,
    dispatch,
    isFormValid,
    resetForm,
  };
};
