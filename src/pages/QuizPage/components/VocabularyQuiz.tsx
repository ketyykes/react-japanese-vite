import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VocabularyState } from '@/types';
import {
  MenuBook as BookIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
  Home as HomeIcon,
  TrendingUp as ProgressIcon,
  Refresh as RefreshIcon,
  School as StudyIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

const VocabularyQuiz: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [vocabularyList, setVocabularyList] = useState<VocabularyState[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hasVocabulary, setHasVocabulary] = useState(true);
  const [answerResults, setAnswerResults] = useState<{
    [key: string]: boolean;
  }>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // 從 localStorage 讀取詞彙資料
  const loadVocabularyFromStorage = useCallback(() => {
    try {
      const storedVocabulary = localStorage.getItem('vocabulary');
      if (storedVocabulary) {
        const vocabularyData: VocabularyState[] = JSON.parse(storedVocabulary);
        if (vocabularyData.length > 0) {
          setVocabularyList(vocabularyData);
          setHasVocabulary(true);
          // 隨機化題目順序
          const shuffledList = [...vocabularyData].sort(
            () => Math.random() - 0.5,
          );
          setVocabularyList(shuffledList);
        } else {
          setHasVocabulary(false);
        }
      } else {
        setHasVocabulary(false);
      }
    } catch (error) {
      console.error('載入詞彙資料時發生錯誤：', error);
      setHasVocabulary(false);
    }
  }, []);

  useEffect(() => {
    loadVocabularyFromStorage();
  }, [loadVocabularyFromStorage]);

  // 根據測驗結果更新詞彙熟悉程度
  const updateVocabularyFamiliarity = useCallback(() => {
    try {
      const storedVocabulary = localStorage.getItem('vocabulary');
      if (!storedVocabulary) return;

      const allVocabulary: VocabularyState[] = JSON.parse(storedVocabulary);
      const updatedVocabulary = allVocabulary.map((vocab) => {
        const wasAnsweredCorrectly = answerResults[vocab.id];
        if (wasAnsweredCorrectly === undefined) return vocab; // 沒有測試到的單字保持原狀

        // 根據答題結果調整熟悉程度
        let newFamiliar = vocab.familiar;
        if (wasAnsweredCorrectly) {
          // 答對了，提升熟悉度
          switch (vocab.familiar) {
            case 'red':
              newFamiliar = 'orange';
              break;
            case 'orange':
              newFamiliar = 'yellow';
              break;
            case 'yellow':
              newFamiliar = 'green';
              break;
            case 'green':
              // 已經是最高級，保持綠色
              break;
          }
        } else {
          // 答錯了，降低熟悉度
          switch (vocab.familiar) {
            case 'green':
              newFamiliar = 'yellow';
              break;
            case 'yellow':
              newFamiliar = 'orange';
              break;
            case 'orange':
              newFamiliar = 'red';
              break;
            case 'red':
              // 已經是最低級，保持紅色
              break;
          }
        }

        return { ...vocab, familiar: newFamiliar };
      });

      localStorage.setItem('vocabulary', JSON.stringify(updatedVocabulary));
    } catch (error) {
      console.error('更新詞彙熟悉程度失敗：', error);
    }
  }, [answerResults]);

  // 儲存測驗記錄
  const saveQuizResult = useCallback(() => {
    try {
      const quizResult = {
        date: new Date().toISOString(),
        score: score,
        percentage: Math.round((score.correct / score.total) * 100),
        totalQuestions: vocabularyList.length,
        mode: 'chinese-to-kanji', // 測驗模式標識
      };

      const existingResults = localStorage.getItem('quizHistory');
      const quizHistory = existingResults ? JSON.parse(existingResults) : [];
      quizHistory.push(quizResult);

      // 只保留最近 50 次測驗記錄
      if (quizHistory.length > 50) {
        quizHistory.splice(0, quizHistory.length - 50);
      }

      localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
    } catch (error) {
      console.error('儲存測驗記錄失敗：', error);
    }
  }, [score, vocabularyList]);

  // 完成測驗時的綜合動作
  const handleCompleteQuiz = useCallback(() => {
    console.log('handleCompleteQuiz called with answerResults:', answerResults);
    updateVocabularyFamiliarity();
    saveQuizResult();
  }, [updateVocabularyFamiliarity, saveQuizResult]);

  // 重置測驗
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0 });
    loadVocabularyFromStorage();
  };

  // 處理答案提交
  const handleSubmitAnswer = () => {
    if (!vocabularyList[currentQuestionIndex] || isAnswered) return;

    const correctAnswer = vocabularyList[currentQuestionIndex].kanji.trim();
    const userAnswerTrimmed = userAnswer.trim();
    const correct = userAnswerTrimmed === correctAnswer;

    setIsCorrect(correct);
    setIsAnswered(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    setAnswerResults((prev) => ({
      ...prev,
      [vocabularyList[currentQuestionIndex].id]: correct,
    }));
  };

  // 下一題
  const handleNextQuestion = () => {
    console.log(
      'handleNextQuestion clicked, currentIndex:',
      currentQuestionIndex,
      'total:',
      vocabularyList.length,
    );

    if (currentQuestionIndex < vocabularyList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // 最後一題，觸發測驗完成
      console.log('Last question, completing quiz...');
      setIsQuizCompleted(true);
      handleCompleteQuiz();
    }
  };

  // 處理 Enter 鍵
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!isAnswered) {
        handleSubmitAnswer();
      } else {
        handleNextQuestion();
      }
    }
  };

  // 如果沒有詞彙資料
  if (!hasVocabulary || vocabularyList.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Card
          sx={{
            maxWidth: 500,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <BookIcon
              sx={{ fontSize: 64, color: theme.palette.warning.main, mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              尚無詞彙資料
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              請先到新增頁面添加一些詞彙，才能開始進行單字測驗
            </Typography>
            <Button
              variant="outlined"
              onClick={resetQuiz}
              startIcon={<RefreshIcon />}
              sx={{ borderRadius: 2 }}
            >
              重新檢查
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // 測驗完成
  if (isQuizCompleted || currentQuestionIndex >= vocabularyList.length) {
    console.log('Quiz completed! Showing completion screen...');
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Card
          sx={{
            maxWidth: 600,
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.success.main, 0.2)}`,
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckIcon
              sx={{ fontSize: 64, color: theme.palette.success.main, mb: 2 }}
            />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              測驗完成！
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.primary.main }}
            >
              得分：{score.correct} / {score.total} ({percentage}%)
            </Typography>

            {/* 進度更新提示 */}
            <Alert
              severity="info"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%',
                  textAlign: 'center',
                },
              }}
              icon={<ProgressIcon />}
            >
              <Typography variant="body2">
                已根據測驗結果自動更新單字熟悉程度 ✨
              </Typography>
            </Alert>

            {/* 動作按鈕組 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <ButtonGroup
                variant="contained"
                sx={{
                  '& .MuiButton-root': {
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                  },
                }}
              >
                <Button
                  onClick={() => navigate('/study')}
                  startIcon={<StudyIcon />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  }}
                >
                  前往學習
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                  }}
                >
                  回到首頁
                </Button>
              </ButtonGroup>

              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setUserAnswer('');
                  setIsAnswered(false);
                  setIsCorrect(false);
                  setScore({ correct: 0, total: 0 });
                  setAnswerResults({});
                  setIsQuizCompleted(false);
                  loadVocabularyFromStorage();
                }}
                startIcon={<RefreshIcon />}
                sx={{ borderRadius: 2, px: 4 }}
              >
                重新測驗
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const currentQuestion = vocabularyList[currentQuestionIndex];

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
              題目 {currentQuestionIndex + 1} / {vocabularyList.length}
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
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
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
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                sx={{ borderRadius: 2, px: 4 }}
              >
                確認答案
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                sx={{ borderRadius: 2, px: 4 }}
              >
                {currentQuestionIndex < vocabularyList.length - 1
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

export default VocabularyQuiz;
