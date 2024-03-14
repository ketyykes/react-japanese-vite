import { Container, Grid, CardHeader, Card, CardActions, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { JapaneseCharacter } from '@/assets/JapaneseCharacter';

const HomePage = () => {
  //把日文字元存入 localStorage
  if (!localStorage.getItem('JapaneseCharacter')) {
    localStorage.setItem('JapaneseCharacter', JSON.stringify(JapaneseCharacter));
  }
  // 創造一個 localStorage 來存放錯誤的單字
  if (!localStorage.getItem('wrongInput')) {
    localStorage.setItem('wrongInput', JSON.stringify([]));
  }
  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 375 }}>
        <CardHeader title="日文練習" sx={{ textAlign: 'center' }}></CardHeader>
        <CardContent color="primary"></CardContent>
        <CardActions>
          <Grid container justifyContent="center" alignItems="center" spacing={6}>
            <Grid item xs={12} sm={6}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/new" variant="contained" size="large">
                新增
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/quiz" variant="contained" size="large">
                測驗
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button sx={{ width: '100%' }} component={RouterLink} to="/study" variant="contained" size="large">
                閱讀
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
