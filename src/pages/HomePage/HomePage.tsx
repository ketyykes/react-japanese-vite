import { Link as RouterLink } from 'react-router-dom';

import { Box, Container, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const HomePage = () => {
  return (
    <Container maxWidth="xl">
      {/* 頁面頂部 - 標題 */}
      <Box sx={{ mt: 3, mb: 6 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          日文練習
        </Typography>
      </Box>

      {/* 導航按鈕區域 */}
      <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              component={RouterLink}
              to="/new"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              新增
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              component={RouterLink}
              to="/quiz"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              測驗
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              component={RouterLink}
              to="/study"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              閱讀
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              component={RouterLink}
              to="/about"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              關於
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
