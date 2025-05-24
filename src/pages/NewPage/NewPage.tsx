import { useEffect, useReducer, useState } from 'react';

import vocabularyReducer from '@/pages/NewPage/components/NewCard/vocabularyReducer';
import type { VocabularyState } from '@/types';
import { Container } from '@mui/material';

import NewCard from './components/NewCard/NewCard';
import { initialState } from './components/NewCard/vocabularyInitialState';
import StoreDialog from './components/StoreDialog';

const NewPage = () => {
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>(
    localStorage.getItem('vocabulary')
      ? JSON.parse(localStorage.getItem('vocabulary') as string)
      : [],
  );
  const [vocabularyInput, DVocabularyInput] = useReducer(
    vocabularyReducer,
    initialState,
  );
  const [open, setOpen] = useState(false);

  const handleDialogConfirm = () => {
    setAllVocabulary((prev) => [
      ...prev,
      {
        ...vocabularyInput,
        id: Date.now().toString(),
      },
    ]);
    DVocabularyInput({
      type: 'confirm',
    });
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(allVocabulary));
  }, [allVocabulary]);

  return (
    <Container maxWidth="md">
      <NewCard
        vocabularyData={vocabularyInput}
        onSave={handleClickOpen}
        DVocabularyInput={DVocabularyInput}
      />
      <StoreDialog
        vocabularyInput={vocabularyInput}
        open={open}
        onClose={handleClose}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />
    </Container>
  );
};

export default NewPage;
