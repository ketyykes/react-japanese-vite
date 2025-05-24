import React from 'react';

import { Box, Container, Fade, useMediaQuery, useTheme } from '@mui/material';

import FloatingActionButton from './components/FloatingActionButton';
import MotivationalFooter from './components/MotivationalFooter';
import NavigationCardsSection from './components/NavigationCardsSection';
import QuickActionsSection from './components/QuickActionsSection';
import WelcomeSection from './components/WelcomeSection';
import { useHomePageAnimation } from './components/hooks/useHomePageAnimation';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { showContent } = useHomePageAnimation();

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
          <WelcomeSection />

          {isMobile && <QuickActionsSection showContent={showContent} />}

          <NavigationCardsSection showContent={showContent} />

          <MotivationalFooter />
        </Box>
      </Fade>

      {!isMobile && <FloatingActionButton showContent={showContent} />}
    </Container>
  );
};

export default HomePage;
