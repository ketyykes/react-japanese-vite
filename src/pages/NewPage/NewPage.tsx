import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import { initialState } from '@/components/shared/VocabularyForm/vocabularyInitialState';
import vocabularyReducer from '@/components/shared/VocabularyForm/vocabularyReducer';
import type { VocabularyState } from '@/types';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import StoreDialog from './components/StoreDialog';

const NewPage = () => {
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate(-1);
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  const handleDialogCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(allVocabulary));
  }, [allVocabulary]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Grid container alignItems="center">
          <Grid size={4}>
            <Button
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
              variant="text"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
            >
              返回
            </Button>
          </Grid>

          <Grid size={4}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textAlign: 'center',
              }}
            >
              新增單字
            </Typography>
          </Grid>

          <Grid size={4}></Grid>
        </Grid>
      </Box>

      {/* 表單內容 */}
      <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <VocabularyForm
            vocabularyData={vocabularyInput}
            dispatch={DVocabularyInput}
          />

          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={handleCancel}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              儲存
            </Button>
          </Box>
        </form>
      </Box>

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
