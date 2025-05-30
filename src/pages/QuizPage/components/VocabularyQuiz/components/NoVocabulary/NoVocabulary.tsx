import { FC } from 'react';

import {
  MenuBook as BookIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

interface NoVocabularyProps {
  onReload: () => void;
}

const NoVocabulary: FC<NoVocabularyProps> = ({ onReload }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card
        sx={{
          maxWidth: 500,
          background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
          border: `2px solid ${alpha(theme.palette.warning.main, 0.2)}`,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <BookIcon
            sx={{ fontSize: 64, color: theme.palette.warning.main, mb: 2 }}
          />
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            尚無詞彙資料
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            請先到新增頁面添加一些詞彙，才能開始進行單字測驗
          </Typography>
          <Button
            variant="outlined"
            onClick={onReload}
            startIcon={<RefreshIcon />}
            sx={{ borderRadius: 2 }}
          >
            重新檢查
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoVocabulary;
