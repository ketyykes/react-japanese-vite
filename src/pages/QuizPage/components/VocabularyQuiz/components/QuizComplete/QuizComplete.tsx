import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CheckCircle as CheckIcon,
  Home as HomeIcon,
  TrendingUp as ProgressIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  School as StudyIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { QuizScore } from '../../../../types';
import { calculatePercentage } from '../../helpers/quizUtils';

interface QuizCompleteProps {
  score: QuizScore;
  onRestart: () => void;
  onBackToSettings?: () => void;
}

const QuizComplete: FC<QuizCompleteProps> = ({
  score,
  onRestart,
  onBackToSettings,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const percentage = calculatePercentage(score.correct, score.total);

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
              mb: 4,
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
              gap: 3,
              alignItems: 'center',
            }}
          >
            {/* 重新測驗和設定按鈕 */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={onRestart}
                startIcon={<RefreshIcon />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  minWidth: 140,
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                重新測驗
              </Button>

              {onBackToSettings && (
                <Button
                  variant="outlined"
                  onClick={onBackToSettings}
                  startIcon={<SettingsIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    minWidth: 140,
                    fontWeight: 600,
                    borderWidth: 2,
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: theme.palette.secondary.dark,
                      backgroundColor: alpha(
                        theme.palette.secondary.main,
                        0.04,
                      ),
                    },
                  }}
                >
                  重新設定
                </Button>
              )}
            </Box>

            {/* 導航按鈕 */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate('/study')}
                startIcon={<StudyIcon />}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  minWidth: 140,
                  fontWeight: 600,
                }}
              >
                前往學習
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                startIcon={<HomeIcon />}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  minWidth: 140,
                  fontWeight: 600,
                }}
              >
                回到首頁
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizComplete;
