import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import { AddCircle, Edit, HelpOutline, School } from '@mui/icons-material';
import { Avatar, Box, ListItemText, Paper, Typography } from '@mui/material';

const AboutPage = () => {
  const features = [
    {
      icon: <School sx={{ color: 'common.white' }} />,
      primary: '單字學習',
      secondary: '點擊卡片來回查看單字與答案，透過主動回想加深記憶。',
    },
    {
      icon: <HelpOutline sx={{ color: 'common.white' }} />,
      primary: '單字測驗',
      secondary: '提供片假名、平假名以及個人單字庫的測驗，幫助您檢視學習成果。',
    },
    {
      icon: <AddCircle sx={{ color: 'common.white' }} />,
      primary: '新增單字',
      secondary: '自由新增個人化單字，建立自己的單字庫。',
    },
    {
      icon: <Edit sx={{ color: 'common.white' }} />,
      primary: '編輯單字',
      secondary: '隨時修改與更新已儲存的單字資訊。',
    },
  ];

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout title="關於" onGoBack={handleGoBack}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 4, md: 6 },
          borderRadius: 4,
          borderColor: 'grey.200',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          align="center"
          sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' } }}
        >
          關於 React 日語單字學習 App
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, mb: 4 }}
        >
          一個為您量身打造的現代化日語學習夥伴。
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: { xs: 6, md: 8 },
            textAlign: 'left',
            lineHeight: 1.8,
            fontSize: '1.1rem',
          }}
        >
          我們深信，學習一門新語言的核心在於「有效重複」與「個人化體驗」。本應用程式專為各階段的日語學習者設計，無論您是剛起步的初學者，或是希望擴充詞彙量的進階學習者，都能在此找到最適合您的學習節奏。我們結合了簡潔直觀的設計與強大的學習功能，讓背單字不再是枯燥的任務，而是一場有趣的探索之旅。
        </Typography>

        <Box sx={{ my: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            核心功能
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {features.map((feature) => (
              <Box
                key={feature.primary}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  {feature.icon}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="p">
                      {feature.primary}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {feature.secondary}
                    </Typography>
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default AboutPage;
