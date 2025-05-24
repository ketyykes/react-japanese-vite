import React from 'react';

import { Box, Typography } from '@mui/material';

import { WELCOME_MESSAGE } from '../constants/navigationData';

const MotivationalFooter: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontStyle: 'italic',
          opacity: 0.8,
        }}
      >
        {WELCOME_MESSAGE.footer}
      </Typography>
    </Box>
  );
};

export default MotivationalFooter;
