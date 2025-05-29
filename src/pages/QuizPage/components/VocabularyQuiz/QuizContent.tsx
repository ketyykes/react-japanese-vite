import { FC } from 'react';

import { VocabularyState } from '@/types';
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
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

import { QuizScore } from './types';

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
  onKeyPress: (event: React.KeyboardEvent) => void;
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
          transition: 'all 0.3s ease-in-out',
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
            <Typography variant="body2" color="text.secondary">
              題目 {currentQuestionIndex + 1} / {totalQuestions}
            </Typography>
            <Chip
              label={`${score.correct} / ${score.total}`}
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* 題目 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              請輸入漢字
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 2,
                textShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              {currentQuestion.chinese}
            </Typography>
            {currentQuestion.roma && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  opacity: 0.7,
                  fontStyle: 'italic',
                  mb: 1,
                }}
              >
                {currentQuestion.roma}
              </Typography>
            )}
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
