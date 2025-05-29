import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import RandomQuiz from '@/pages/QuizPage/components/RandomQuiz';
import VocabularyQuiz from '@/pages/QuizPage/components/VocabularyQuiz/VocabularyQuiz';
import {
  Language as LanguageIcon,
  Quiz as QuizIcon,
  AutoAwesome as SparkleIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

const Quiz = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [quizType, setQuizType] = useState<
    'hiragana' | 'katakana' | 'vocabulary'
  >('hiragana');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleQuizTypeChange = (event: SelectChangeEvent) => {
    setQuizType(event.target.value as 'hiragana' | 'katakana' | 'vocabulary');
  };

  const renderQuizComponent = () => {
    if (quizType === 'vocabulary') {
      return <VocabularyQuiz />;
    }
    return <RandomQuiz quizType={quizType as 'hiragana' | 'katakana'} />;
  };

  return (
    <PageLayout
      title="隨機小測驗"
      onGoBack={handleGoBack}
      onCancel={handleCancel}
      maxWidth="xl"
    >
      {/* 美化的測驗類型選擇區域 */}
      <Box
        sx={{
          mb: 6,
          display: 'flex',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Card
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 3,
            overflow: 'visible',
            position: 'relative',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }}
        >
          {/* 裝飾性圖標 */}
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <QuizIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>

          <CardContent sx={{ px: 4, py: 5, pt: 6 }}>
            {/* 標題區域 */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <LanguageIcon sx={{ fontSize: 20 }} />
                選擇測驗類型
                <SparkleIcon
                  sx={{ fontSize: 16, color: theme.palette.secondary.main }}
                />
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.9rem',
                }}
              >
                選擇你想要練習的文字系統
              </Typography>
            </Box>

            {/* 選擇器 */}
            <FormControl sx={{ minWidth: 280, width: '100%' }}>
              <Select
                value={quizType}
                onChange={handleQuizTypeChange}
                displayEmpty
                sx={{
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  '& .MuiSelect-select': {
                    py: 2.5,
                    textAlign: 'center',
                    fontWeight: 500,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiSelect-icon': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <MenuItem
                  value="hiragana"
                  sx={{
                    fontSize: '1.1rem',
                    py: 2,
                    justifyContent: 'center',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  平假名 ひらがな
                </MenuItem>
                <MenuItem
                  value="katakana"
                  sx={{
                    fontSize: '1.1rem',
                    py: 2,
                    justifyContent: 'center',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  片假名 カタカナ
                </MenuItem>
                <MenuItem
                  value="vocabulary"
                  sx={{
                    fontSize: '1.1rem',
                    py: 2,
                    justifyContent: 'center',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  單字測驗 📝
                </MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>

      {renderQuizComponent()}
    </PageLayout>
  );
};

export default Quiz;
