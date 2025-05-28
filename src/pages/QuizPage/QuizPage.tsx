import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import RandomQuiz from '@/pages/QuizPage/components/RandomQuiz';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizType, setQuizType] = useState<'hiragana' | 'katakana'>('hiragana');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleQuizTypeChange = (event: SelectChangeEvent) => {
    setQuizType(event.target.value as 'hiragana' | 'katakana');
  };

  return (
    <PageLayout
      title="隨機小測驗"
      onGoBack={handleGoBack}
      onCancel={handleCancel}
      maxWidth="xl"
    >
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

      <RandomQuiz quizType={quizType} />
    </PageLayout>
  );
};

export default Quiz;
