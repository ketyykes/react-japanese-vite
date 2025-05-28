import { ReactNode } from 'react';

import { ArrowBack, Close } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';

type PageLayoutProps = {
  title: string;
  isLoading?: boolean;
  onGoBack: () => void;
  onCancel: () => void;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const PageLayout = ({
  title,
  isLoading = false,
  onGoBack,
  onCancel,
  children,
  maxWidth = 'md',
}: PageLayoutProps) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 載入進度條 */}
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}

      {/* 頂部導航欄 */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <IconButton
            edge="start"
            onClick={onGoBack}
            sx={{
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            {title}
          </Typography>

          <IconButton
            onClick={onCancel}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 主要內容區域 */}
      <Container
        maxWidth={maxWidth}
        sx={{
          flex: 1,
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          pb: 10, // 為底部按鈕預留空間
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageLayout;
