import { useReducer, useState } from 'react';

import { initialState } from '@/components/shared/VocabularyForm/vocabularyInitialState';
import vocabularyReducer from '@/components/shared/VocabularyForm/vocabularyReducer';
import type { VocabularyState } from '@/types';

type UseEditVocabularyReturn = {
  vocabularyInput: VocabularyState;
  dispatch: React.Dispatch<any>;
  isFormValid: boolean;
  vocabularyNotFound: boolean;
  loadVocabulary: (id: string) => void;
  updateVocabulary: (id: string) => void;
};

export const useEditVocabulary = (): UseEditVocabularyReturn => {
  const [vocabularyInput, dispatch] = useReducer(
    vocabularyReducer,
    initialState,
  );
  const [vocabularyNotFound, setVocabularyNotFound] = useState(false);

  const isFormValid = Boolean(
    vocabularyInput.kanji?.trim() &&
      vocabularyInput.roma?.trim() &&
      vocabularyInput.chinese?.trim(),
  );

  const loadVocabulary = (id: string) => {
    const allVocabulary: VocabularyState[] = JSON.parse(
      localStorage.getItem('vocabulary') || '[]',
    );
    const vocabularyToEdit = allVocabulary.find((v) => v.id === id);
    if (vocabularyToEdit) {
      dispatch({ type: 'loadData', payload: vocabularyToEdit });
      setVocabularyNotFound(false);
    } else {
      setVocabularyNotFound(true);
    }
  };

  const updateVocabulary = (id: string): void => {
    const allVocabulary: VocabularyState[] = JSON.parse(
      localStorage.getItem('vocabulary') || '[]',
    );
    const updatedVocabulary = allVocabulary.map((v) =>
      v.id === id ? { ...vocabularyInput, id } : v,
    );
    localStorage.setItem('vocabulary', JSON.stringify(updatedVocabulary));
  };

  return {
    vocabularyInput,
    dispatch,
    isFormValid,
    vocabularyNotFound,
    loadVocabulary,
    updateVocabulary,
  };
};
