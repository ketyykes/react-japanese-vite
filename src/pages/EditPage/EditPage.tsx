import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import { initialState } from '@/components/shared/VocabularyForm/vocabularyInitialState';
import vocabularyReducer from '@/components/shared/VocabularyForm/vocabularyReducer';
import type { VocabularyState } from '@/types';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vocabularyInput, DVocabularyInput] = useReducer(
    vocabularyReducer,
    initialState,
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  // 載入編輯資料
  useEffect(() => {
    if (id) {
      const allVocabulary: VocabularyState[] = JSON.parse(
        localStorage.getItem('vocabulary') || '[]',
      );
      const vocabularyToEdit = allVocabulary.find((v) => v.id === id);
      if (vocabularyToEdit) {
        // 初始化表單數據
        DVocabularyInput({ type: 'loadData', payload: vocabularyToEdit });
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      const allVocabulary: VocabularyState[] = JSON.parse(
        localStorage.getItem('vocabulary') || '[]',
      );
      const updatedVocabulary = allVocabulary.map((v) =>
        v.id === id ? { ...vocabularyInput, id } : v,
      );
      localStorage.setItem('vocabulary', JSON.stringify(updatedVocabulary));
      navigate(-1); // 返回上一頁
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
              編輯單字
            </Typography>
          </Grid>

          {/* 右側：空白 */}
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

          {/* 按鈕區域 */}
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
              更新
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditPage;
