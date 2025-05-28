import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import type { VocabularyState } from '@/types';
import { CheckCircle, Save } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Fab,
  Slide,
  Snackbar,
  Typography,
} from '@mui/material';

import StoreDialog from './components/StoreDialog';
import { useVocabularyForm } from './components/hooks';

const NewPage = () => {
  const navigate = useNavigate();
  const { vocabularyInput, dispatch, isFormValid, resetForm } =
    useVocabularyForm();

  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>(
    localStorage.getItem('vocabulary')
      ? JSON.parse(localStorage.getItem('vocabulary') as string)
      : [],
  );
  const [open, setOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
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
    resetForm();
    setOpen(false);
    setShowSuccessAlert(true);

    // 延遲返回，讓用戶看到成功提示
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    if (isFormValid) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogCancel = () => {
    setOpen(false);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(allVocabulary));
  }, [allVocabulary]);

  return (
    <>
      <PageLayout
        title="新增單字"
        onGoBack={handleGoBack}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          {/* 表單說明 */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: 1.6,
              }}
            >
              請填寫完整的單字資訊，標註 * 的欄位為必填項目
            </Typography>
          </Box>

          {/* 表單內容 */}
          <VocabularyForm
            vocabularyData={vocabularyInput}
            dispatch={dispatch}
          />

          {/* 桌面版按鈕區域 */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={handleCancel}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={!isFormValid}
              startIcon={<Save />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              儲存單字
            </Button>
          </Box>
        </form>
      </PageLayout>

      {/* 手機版浮動儲存按鈕 */}
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Fab
          color="primary"
          onClick={handleSave}
          disabled={!isFormValid}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            position: 'fixed',
            bottom: 24,
            right: 24,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          <Save />
        </Fab>
      </Slide>

      {/* 確認對話框 */}
      <StoreDialog
        vocabularyInput={vocabularyInput}
        open={open}
        onClose={handleClose}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />

      {/* 成功提示 */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          variant="filled"
          icon={<CheckCircle />}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          單字已成功儲存！
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewPage;
