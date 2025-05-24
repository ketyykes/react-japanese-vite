import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Zoom,
  alpha,
  useTheme,
} from '@mui/material';

import { NAVIGATION_CARDS } from '../constants/navigationData';
import type { NavigationCard } from '../types';

interface NavigationCardsSectionProps {
  showContent: boolean;
}

const NavigationCardsSection: React.FC<NavigationCardsSectionProps> = ({
  showContent,
}) => {
  const theme = useTheme();

  return (
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
        {NAVIGATION_CARDS.map((card: NavigationCard, index: number) => (
          <Zoom in={showContent} timeout={1000 + index * 150} key={card.path}>
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
                  backgroundColor: alpha(theme.palette[card.color].main, 0.04),
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
  );
};

export default NavigationCardsSection;
