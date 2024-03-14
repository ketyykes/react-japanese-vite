import { useState, useReducer, useEffect, useMemo } from 'react';
import { Container } from '@mui/material/';
import StoreDialog from './components/StoreDialog';
import type { VocabularyState } from '@/types/index';
import NewCard from './components/NewCard/NewCard';
import vocabularyReducer from '@/pages/NewPage/components/NewCard/vocabularyReducer';
import { initialState } from './components/NewCard/vocabularyInitialState';

const NewPage = () => {
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>(
    localStorage.getItem('vocabulary') ? JSON.parse(localStorage.getItem('vocabulary') as string) : [],
  );
  const [vocabularyInput, DVocabularyInput] = useReducer(vocabularyReducer, initialState);
  const [open, setOpen] = useState(false);

  const filterVocabulary = useMemo(() => {}, [allVocabulary]);

  const handleDialogConfirm = () => {
    setAllVocabulary((prev) => [...prev, { ...vocabularyInput, id: Date.now().toString() }]);
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
      <NewCard onSave={handleClickOpen} DVocabularyInput={DVocabularyInput} />
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
