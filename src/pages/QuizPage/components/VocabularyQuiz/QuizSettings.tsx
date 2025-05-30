import { FC, useEffect, useState } from 'react';

import {
  Check as CheckIcon,
  Quiz as QuizIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
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

interface QuizSettingsProps {
  onStartQuiz: (questionCount: number) => void;
  availableQuestionCount: number;
}

const PRESET_COUNTS = [10, 20, 50] as const;

const QuizSettings: FC<QuizSettingsProps> = ({
  onStartQuiz,
  availableQuestionCount,
}) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string>('10');
  const [customCount, setCustomCount] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 檢查是否有足夠的詞彙
  const hasEnoughVocabulary = availableQuestionCount > 0;

  useEffect(() => {
    // 如果沒有足夠的詞彙，清除錯誤訊息
    if (!hasEnoughVocabulary) {
      setError('');
    }
  }, [hasEnoughVocabulary]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setError('');

    // 如果選擇自定義，清空自定義輸入框
    if (value !== 'custom') {
      setCustomCount('');
    }
  };

  const handleCustomCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setCustomCount(value);
    setError('');
  };

  const handleStartQuiz = () => {
    let questionCount: number;

    if (selectedOption === 'custom') {
      const customValue = parseInt(customCount, 10);

      if (!customCount || isNaN(customValue) || customValue <= 0) {
        setError('請輸入有效的題目數量');
        return;
      }

      if (customValue > availableQuestionCount) {
        setError(`最多只能設定 ${availableQuestionCount} 題`);
        return;
      }

      questionCount = customValue;
    } else {
      questionCount = parseInt(selectedOption, 10);

      if (questionCount > availableQuestionCount) {
        setError(`詞彙數量不足，無法設定 ${questionCount} 題`);
        return;
      }
    }

    onStartQuiz(questionCount);
  };

  const isOptionDisabled = (count: number) => {
    return !hasEnoughVocabulary || count > availableQuestionCount;
  };

  const isStartButtonDisabled = () => {
    if (!hasEnoughVocabulary) return true;

    if (selectedOption === 'custom') {
      const customValue = parseInt(customCount, 10);
      return (
        !customCount ||
        isNaN(customValue) ||
        customValue <= 0 ||
        customValue > availableQuestionCount
      );
    }

    const presetValue = parseInt(selectedOption, 10);
    return presetValue > availableQuestionCount;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        px: { xs: 3, sm: 2 },
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'visible',
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
          <SettingsIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>

        <CardContent sx={{ px: { xs: 3, sm: 4 }, py: 4, pt: 6 }}>
          {/* 標題 */}
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
              <QuizIcon sx={{ fontSize: 20 }} />
              測驗設定
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              選擇題目數量開始測驗
            </Typography>
            <Chip
              label={`可用詞彙：${availableQuestionCount} 個`}
              color={hasEnoughVocabulary ? 'primary' : 'default'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* 詞彙不足警告 */}
          {!hasEnoughVocabulary && (
            <Alert
              severity="warning"
              icon={<WarningIcon />}
              sx={{ mb: 3, borderRadius: 2 }}
            >
              <Typography>
                目前沒有可用的詞彙資料，請先到學習頁面新增詞彙。
              </Typography>
            </Alert>
          )}

          {/* 題目數量選項 */}
          {hasEnoughVocabulary && (
            <>
              <Box sx={{ width: '100%', mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  選擇題目數量
                </Typography>

                {/* 預設選項 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {PRESET_COUNTS.map((count) => (
                    <Button
                      key={count}
                      variant={
                        selectedOption === count.toString()
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() => {
                        setSelectedOption(count.toString());
                        setCustomCount('');
                        setError('');
                      }}
                      disabled={isOptionDisabled(count)}
                      sx={{
                        justifyContent: 'flex-start',
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        '&.Mui-disabled': {
                          backgroundColor: alpha(
                            theme.palette.action.disabled,
                            0.04,
                          ),
                        },
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {selectedOption === count.toString() && (
                          <CheckIcon sx={{ fontSize: 18 }} />
                        )}
                        <Typography sx={{ fontWeight: 500 }}>
                          {count} 題
                        </Typography>
                        {isOptionDisabled(count) && (
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.disabled', ml: 1 }}
                          >
                            (詞彙不足)
                          </Typography>
                        )}
                      </Box>
                    </Button>
                  ))}
                </Box>

                {/* 自定義選項 */}
                <Button
                  variant={
                    selectedOption === 'custom' ? 'contained' : 'outlined'
                  }
                  onClick={() => {
                    setSelectedOption('custom');
                    setError('');
                  }}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    mb: selectedOption === 'custom' ? 2 : 0,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {selectedOption === 'custom' && (
                      <CheckIcon sx={{ fontSize: 18 }} />
                    )}
                    <Typography sx={{ fontWeight: 500 }}>自定義</Typography>
                  </Box>
                </Button>

                {/* 自定義輸入框 */}
                {selectedOption === 'custom' && (
                  <TextField
                    fullWidth
                    type="number"
                    label="輸入題數"
                    value={customCount}
                    onChange={handleCustomCountChange}
                    placeholder="請輸入題目數量"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    inputProps={{
                      min: 1,
                      max: availableQuestionCount,
                    }}
                  />
                )}
              </Box>

              {/* 錯誤訊息 */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* 開始按鈕 */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleStartQuiz}
                  disabled={isStartButtonDisabled()}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  開始測驗
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizSettings;
