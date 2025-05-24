import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RandomQuiz from '@/components/RandomQuiz';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

// const { Option } = Select;
const Quiz = () => {
  const navigate = useNavigate();
  const [quizType, setQuizType] = useState<'hiragana' | 'katakana'>('hiragana');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuizTypeChange = (event: SelectChangeEvent) => {
    setQuizType(event.target.value as 'hiragana' | 'katakana');
  };

  return (
    <Container maxWidth="md">
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
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textAlign: 'center',
              }}
            >
              隨機小測驗
            </Typography>
          </Grid>

          {/* 右側：空白 */}
          <Grid size={4}></Grid>
        </Grid>
      </Box>

      {/* 測驗類型選擇 */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 300 }}>
          <Select
            value={quizType}
            onChange={handleQuizTypeChange}
            displayEmpty
            sx={{
              fontSize: '1.1rem',
              '& .MuiSelect-select': {
                py: 2,
                textAlign: 'center',
              },
            }}
          >
            <MenuItem value="hiragana">平假名</MenuItem>
            <MenuItem value="katakana">片假名</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 隨機測驗組件 */}
      <RandomQuiz quizType={quizType} />
    </Container>
  );
};

export default Quiz;
