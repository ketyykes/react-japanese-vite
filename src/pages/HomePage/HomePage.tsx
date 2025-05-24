import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Add as AddIcon,
  Info as InfoIcon,
  PlayArrow as PlayIcon,
  Quiz as QuizIcon,
  MenuBook as StudyIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Fade,
  Stack,
  Typography,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// 介面定義
interface QuickAction {
  title: string;
  path: string;
  icon: React.ReactElement;
  description: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  urgent?: boolean;
}

interface NavigationCard {
  title: string;
  path: string;
  icon: React.ReactElement;
  description: string;
  color: 'primary' | 'secondary' | 'success' | 'info';
}

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showContent, setShowContent] = useState(false);

  // 快速動作按鈕 (手機版)
  const quickActions: QuickAction[] = [
    {
      title: '開始學習',
      path: '/study',
      icon: <StudyIcon />,
      description: '複習已學內容',
      color: 'primary',
      urgent: true,
    },
    {
      title: '新增詞彙',
      path: '/new',
      icon: <AddIcon />,
      description: '添加新單字',
      color: 'secondary',
    },
  ];

  // 主要導航卡片
  const navigationCards: NavigationCard[] = [
    {
      title: '學習模式',
      path: '/study',
      icon: <StudyIcon />,
      description: '瀏覽和複習已學習的詞彙',
      color: 'success',
    },
    {
      title: '測驗挑戰',
      path: '/quiz',
      icon: <QuizIcon />,
      description: '測試學習成果與記憶',
      color: 'secondary',
    },
    {
      title: '新增詞彙',
      path: '/new',
      icon: <AddIcon />,
      description: '添加新的日文單字與句型',
      color: 'primary',
    },
    {
      title: '關於應用',
      path: '/about',
      icon: <InfoIcon />,
      description: '查看應用程式資訊',
      color: 'info',
    },
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleQuickStart = () => {
    navigate('/study');
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3 },
        pb: { xs: 10, md: 4 }, // 為手機底部導航留空間
      }}
    >
      <Fade in={showContent} timeout={600}>
        <Box>
          {/* 歡迎區域 */}
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              おはよう！
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                fontWeight: 400,
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              今天也要加油學日文
            </Typography>

            {/* 簡單的歡迎卡片 */}
            <Card
              sx={{
                mb: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
                textAlign: 'center',
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  mb={2}
                >
                  <TrophyIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight={600}>
                    準備好開始學習了嗎？
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  選擇下方功能開始您的日語學習之旅
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* 快速動作區域 (手機優先) */}
          {isMobile && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                快速開始
              </Typography>
              <Stack direction="row" spacing={2}>
                {quickActions.map((action, index) => (
                  <Zoom
                    in={showContent}
                    timeout={800 + index * 200}
                    key={action.path}
                  >
                    <Card
                      component={RouterLink}
                      to={action.path}
                      sx={{
                        flex: 1,
                        textDecoration: 'none',
                        border: '1px solid',
                        borderColor: action.urgent
                          ? theme.palette.primary.main
                          : 'divider',
                        backgroundColor: action.urgent
                          ? alpha(theme.palette.primary.main, 0.05)
                          : 'background.paper',
                        '&:hover': {
                          backgroundColor: alpha(
                            theme.palette[action.color].main,
                            0.1,
                          ),
                          borderColor: theme.palette[action.color].main,
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${theme.palette[action.color].main}, ${alpha(theme.palette[action.color].main, 0.8)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <Box sx={{ color: 'white', fontSize: 24 }}>
                            {action.icon}
                          </Box>
                        </Box>
                        <Typography variant="body2" fontWeight={600} mb={0.5}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))}
              </Stack>
            </Box>
          )}

          {/* 主要功能導航 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={3}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              所有功能
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: { xs: 2, sm: 3 },
              }}
            >
              {navigationCards.map((card, index) => (
                <Zoom
                  in={showContent}
                  timeout={1000 + index * 150}
                  key={card.path}
                >
                  <Card
                    component={RouterLink}
                    to={card.path}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        backgroundColor: alpha(
                          theme.palette[card.color].main,
                          0.04,
                        ),
                        borderColor: alpha(theme.palette[card.color].main, 0.3),
                        boxShadow: `0 8px 32px ${alpha(theme.palette[card.color].main, 0.15)}`,
                        transform: 'translateY(-4px)',
                      },
                      '&:active': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, sm: 4 }, height: '100%' }}>
                      <Stack
                        spacing={2}
                        height="100%"
                        alignItems="center"
                        textAlign="center"
                      >
                        <Box
                          sx={{
                            width: { xs: 64, sm: 72 },
                            height: { xs: 64, sm: 72 },
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${theme.palette[card.color].main}, ${alpha(theme.palette[card.color].main, 0.8)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              color: 'white',
                              fontSize: { xs: 32, sm: 36 },
                            }}
                          >
                            {card.icon}
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            variant="h6"
                            component="h3"
                            fontWeight={600}
                            mb={1}
                            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                          >
                            {card.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.5 }}
                          >
                            {card.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Zoom>
              ))}
            </Box>
          </Box>

          {/* 底部激勵文字 */}
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                opacity: 0.8,
              }}
            >
              今天的一小步，就是日語進步的一大步 ✨
            </Typography>
          </Box>
        </Box>
      </Fade>

      {/* 浮動快速開始按鈕 (桌面版) */}
      {!isMobile && (
        <Zoom in={showContent} timeout={1500}>
          <Fab
            color="primary"
            aria-label="快速開始學習"
            onClick={handleQuickStart}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: theme.zIndex.fab,
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <PlayIcon />
          </Fab>
        </Zoom>
      )}
    </Container>
  );
};

export default HomePage;
