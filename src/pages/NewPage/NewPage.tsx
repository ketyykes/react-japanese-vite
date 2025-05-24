import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import vocabularyReducer from '@/pages/NewPage/components/NewCard/vocabularyReducer';
import type { VocabularyState } from '@/types';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import NewCard from './components/NewCard/NewCard';
import { initialState } from './components/NewCard/vocabularyInitialState';
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
    <Container maxWidth="xl">
      {/* 頁面頂部 - 返回按鈕和標題 */}
      <Box sx={{ mt: 3, mb: 4 }}>
        <Grid container alignItems="center">
          {/* 左側：返回按鈕 */}
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

          {/* 中間：標題 */}
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

          {/* 右側：空白 */}
          <Grid size={4}></Grid>
        </Grid>
      </Box>

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
