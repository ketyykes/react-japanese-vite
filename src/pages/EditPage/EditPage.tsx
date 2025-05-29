import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SuccessAlert from '@/components/shared/SuccessAlert/SuccessAlert';
import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import { ArrowBack, Close, Update } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  Paper,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';

import { useEditVocabulary } from './hooks';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    vocabularyInput,
    dispatch,
    isFormValid,
    vocabularyNotFound,
    loadVocabulary,
    updateVocabulary,
  } = useEditVocabulary();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  // 載入編輯資料
  useEffect(() => {
    if (id) {
      loadVocabulary(id);
    }
  }, [id, loadVocabulary]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid && id) {
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    if (!id || !isFormValid) return;

    updateVocabulary(id);
    setShowSuccessAlert(true);

    // 延遲返回，讓用戶看到成功提示
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  if (vocabularyNotFound) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar
            sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}
          >
            <IconButton
              edge="start"
              onClick={handleGoBack}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              編輯單字
            </Typography>
            <Box sx={{ width: 40 }} />
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              找不到該單字
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              您要編輯的單字可能已被刪除或不存在
            </Typography>
            <Button variant="contained" onClick={handleGoBack}>
              返回上頁
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 頂部導航欄 */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <IconButton
            edge="start"
            onClick={handleGoBack}
            sx={{
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            編輯單字
          </Typography>

          <IconButton
            onClick={handleCancel}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 主要內容區域 */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          pb: 10, // 為底部按鈕預留空間
        }}
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
              修改單字資訊，標註 * 的欄位為必填項目
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
              startIcon={<Close />}
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
              startIcon={<Update />}
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
              更新單字
            </Button>
          </Box>
        </form>
      </Container>

      {/* 手機版浮動更新按鈕 */}
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Fab
          color="primary"
          onClick={handleUpdate}
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
          <Update />
        </Fab>
      </Slide>

      {/* 成功提示 */}
      <SuccessAlert
        open={showSuccessAlert}
        message="單字已成功更新！"
        onClose={handleCloseSuccessAlert}
      />
    </Box>
  );
};

export default EditPage;
