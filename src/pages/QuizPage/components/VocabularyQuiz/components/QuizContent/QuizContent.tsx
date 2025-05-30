import { FC, KeyboardEvent } from 'react';

import { VocabularyState } from '@/types';
import { Cancel as CancelIcon, Check as CheckIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { QuizScore } from '../../../../types';

interface QuizContentProps {
  currentQuestion: VocabularyState;
  currentQuestionIndex: number;
  totalQuestions: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean;
  score: QuizScore;
  onAnswerChange: (answer: string) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const QuizContent: FC<QuizContentProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswer,
  isAnswered,
  isCorrect,
  score,
  onAnswerChange,
  onSubmitAnswer,
  onNextQuestion,
  onKeyPress,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* 進度顯示 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              題目 {currentQuestionIndex + 1} / {totalQuestions}
            </Typography>
            <Chip
              label={`${score.correct} / ${currentQuestionIndex + (isAnswered ? 1 : 0)}`}
              color="primary"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* 題目顯示 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="body1"
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              請輸入漢字
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 2,
                fontSize: { xs: '3rem', sm: '4rem' },
              }}
            >
              {currentQuestion.roma}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                color: theme.palette.text.secondary,
                mb: 3,
              }}
            >
              {currentQuestion.chinese}
            </Typography>
          </Box>

          {/* 輸入框 */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="輸入漢字..."
              disabled={isAnswered}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  '& input': {
                    textAlign: 'center',
                    fontWeight: 500,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Box>

          {/* 答案顯示 */}
          {isAnswered && (
            <Box sx={{ mb: 3 }}>
              <Alert
                severity={isCorrect ? 'success' : 'error'}
                icon={isCorrect ? <CheckIcon /> : <CancelIcon />}
                sx={{ borderRadius: 2, fontSize: '1rem' }}
              >
                {isCorrect ? (
                  <Typography>
                    <strong>正確！</strong> 答案是：{currentQuestion.kanji}
                  </Typography>
                ) : (
                  <Typography>
                    <strong>錯誤！</strong> 正確答案是：
                    <strong>{currentQuestion.kanji}</strong>
                  </Typography>
                )}
              </Alert>
            </Box>
          )}

          {/* 按鈕 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {!isAnswered ? (
              <Button
                variant="contained"
                onClick={onSubmitAnswer}
                disabled={!userAnswer.trim()}
                sx={{ borderRadius: 2, px: 4 }}
              >
                確認答案
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={onNextQuestion}
                sx={{ borderRadius: 2, px: 4 }}
              >
                {currentQuestionIndex < totalQuestions - 1
                  ? '下一題'
                  : '完成測驗'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizContent;
