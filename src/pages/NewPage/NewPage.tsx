import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createChineseAction,
  createKanjiAction,
  createNotationAction,
  createRomaAction,
} from '@/components/shared/VocabularyForm/vocabularyActionCreator';
import { initialState } from '@/components/shared/VocabularyForm/vocabularyInitialState';
import vocabularyReducer from '@/components/shared/VocabularyForm/vocabularyReducer';
import type { VocabularyState } from '@/types';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

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

      {/* 表單內容 */}
      <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              label="漢字"
              value={vocabularyInput.kanji || ''}
              fullWidth
              onChange={(e) => {
                DVocabularyInput(createKanjiAction(e.target.value));
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              label="拼音"
              value={vocabularyInput.roma || ''}
              fullWidth
              onChange={(e) => {
                DVocabularyInput(createRomaAction(e.target.value));
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              label="中文"
              value={vocabularyInput.chinese || ''}
              fullWidth
              onChange={(e) => {
                DVocabularyInput(createChineseAction(e.target.value));
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="其他備註"
              value={vocabularyInput.notation || ''}
              fullWidth
              onChange={(e) => {
                DVocabularyInput(createNotationAction(e.target.value));
              }}
            />
          </Grid>
        </Grid>

        {/* 按鈕區域 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
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
            onClick={handleClickOpen}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            儲存
          </Button>
        </Box>
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
