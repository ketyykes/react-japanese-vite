import React from 'react';

import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import { WELCOME_MESSAGE } from '../constants/navigationData';

const WelcomeSection: React.FC = () => {
  const theme = useTheme();

  return (
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
        {WELCOME_MESSAGE.greeting}
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
        {WELCOME_MESSAGE.subtitle}
      </Typography>

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
              {WELCOME_MESSAGE.motivational}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {WELCOME_MESSAGE.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeSection;
