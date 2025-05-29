import SchoolIcon from '@mui/icons-material/School';
import { Fade, Paper, Typography, useTheme } from '@mui/material';

import { FADE_TIMEOUT } from '../constants';

interface EmptyStateProps {
  hasFilter: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilter }) => {
  const theme = useTheme();

  return (
    <Fade in timeout={FADE_TIMEOUT.EMPTY_STATE}>
      <Paper
        sx={{
          py: 8,
          textAlign: 'center',
          backgroundColor: 'grey.50',
          border: `1px dashed ${theme.palette.grey[300]}`,
          borderRadius: 2,
        }}
      >
        <SchoolIcon
          sx={{
            fontSize: 64,
            color: 'grey.400',
            mb: 2,
          }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          {hasFilter ? '沒有符合條件的單字' : '還沒有任何單字'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hasFilter ? '試試調整篩選條件' : '開始新增您的第一個單字吧！'}
        </Typography>
      </Paper>
    </Fade>
  );
};

export default EmptyState;
