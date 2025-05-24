import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayArrow as PlayIcon } from '@mui/icons-material';
import { Fab, Zoom, useTheme } from '@mui/material';

interface FloatingActionButtonProps {
  showContent: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  showContent,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleQuickStart = () => {
    navigate('/study');
  };

  return (
    <Zoom in={showContent} timeout={1500}>
      <Fab
        color="primary"
        aria-label="快速開始學習"
        onClick={handleQuickStart}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: theme.zIndex.fab,
          '&:hover': {
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <PlayIcon />
      </Fab>
    </Zoom>
  );
};

export default FloatingActionButton;
