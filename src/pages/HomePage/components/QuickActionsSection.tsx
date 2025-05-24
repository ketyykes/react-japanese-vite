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

import { QUICK_ACTIONS } from '../constants/navigationData';
import type { QuickAction } from '../types';

interface QuickActionsSectionProps {
  showContent: boolean;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  showContent,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        快速開始
      </Typography>
      <Stack direction="row" spacing={2}>
        {QUICK_ACTIONS.map((action: QuickAction, index: number) => (
          <Zoom in={showContent} timeout={800 + index * 200} key={action.path}>
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
                  backgroundColor: alpha(theme.palette[action.color].main, 0.1),
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
                  <Box sx={{ color: 'white', fontSize: 24 }}>{action.icon}</Box>
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
  );
};

export default QuickActionsSection;
