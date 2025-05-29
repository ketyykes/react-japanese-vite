import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  CardContent,
  Chip,
  Fade,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { FADE_TIMEOUT } from '../constants';
import type { StatisticsData } from '../types';

interface StatisticsCardProps {
  statisticsData: StatisticsData;
  hasFilter: boolean;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  statisticsData,
  hasFilter,
}) => {
  const theme = useTheme();

  return (
    <Fade in timeout={FADE_TIMEOUT.STATISTICS}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ py: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-around"
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <SchoolIcon color="primary" fontSize="small" />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  學習進度總覽
                </Typography>
              </Stack>
              <Box sx={{ minHeight: 60 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 0.5,
                    minWidth: 200,
                    display: 'inline-block',
                  }}
                >
                  {statisticsData.filtered}
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      ml: 1,
                      color: 'text.secondary',
                      fontWeight: 400,
                    }}
                  >
                    / {statisticsData.total} 個單字
                  </Typography>
                </Typography>
                <Box sx={{ mt: 1, minHeight: 32 }}>
                  {hasFilter ? (
                    <Chip
                      label="已套用篩選"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ) : (
                    <Box sx={{ height: 32 }} />
                  )}
                </Box>
              </Box>
            </Box>

            {/* 熟悉度統計 */}
            <Box sx={{ minHeight: 60, display: 'flex', alignItems: 'center' }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {statisticsData.statistics.map((stat) => (
                  <Box key={stat.value} sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: stat.color,
                        mx: 'auto',
                        mb: 0.5,
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        display: 'block',
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: '0.9rem',
                      }}
                    >
                      {stat.count}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Paper>
    </Fade>
  );
};

export default StatisticsCard;
