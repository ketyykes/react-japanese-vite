import { Link as RouterLink } from 'react-router-dom';

import { Card, CardActions, CardContent, CardHeader, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="日文練習" sx={{ textAlign: 'center' }}></CardHeader>
        <CardContent color="primary"></CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Grid container spacing={12}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/new" variant="contained" size="large">
                新增
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/quiz" variant="contained" size="large">
                測驗
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/study" variant="contained" size="large">
                閱讀
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/about" variant="contained" size="large">
                關於
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default HomePage;
