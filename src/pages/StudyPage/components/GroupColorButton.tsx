import type { FC } from 'react';
import { memo } from 'react';

import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';

type ColorType = 'red' | 'yellow' | 'green' | 'orange';

interface GroupColorButtonProps {
  currentColor?: ColorType;
  onChangeColor: (color: ColorType) => void;
}

const GroupColorButton: FC<GroupColorButtonProps> = ({
  currentColor,
  onChangeColor,
}) => {
  const theme = useTheme();

  const colors: Array<{
    value: ColorType;
    color: string;
    label: string;
  }> = [
    { value: 'red', color: '#f44336', label: '不熟悉' },
    { value: 'orange', color: '#ff9800', label: '一般' },
    { value: 'yellow', color: '#ffeb3b', label: '還行' },
    { value: 'green', color: '#4caf50', label: '熟悉' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        backgroundColor: alpha(theme.palette.grey[50], 0.5),
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" spacing={1}>
        {colors.map(({ value, color, label }) => {
          const isSelected = currentColor === value;

          return (
            <Tooltip key={value} title={label} arrow placement="top">
              <IconButton
                onClick={() => onChangeColor(value)}
                sx={{
                  width: 44,
                  height: 44,
                  border: isSelected
                    ? `3px solid ${color}`
                    : `2px solid ${alpha(color, 0.3)}`,
                  backgroundColor: isSelected
                    ? alpha(color, 0.15)
                    : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  '&:hover': {
                    transform: isSelected ? 'scale(1.15)' : 'scale(1.05)',
                    backgroundColor: alpha(color, 0.2),
                    borderColor: color,
                    boxShadow: `0 4px 12px ${alpha(color, 0.4)}`,
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: color,
                    boxShadow: isSelected
                      ? `0 2px 8px ${alpha(color, 0.5)}`
                      : `0 1px 3px ${alpha(color, 0.3)}`,
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

export default memo(GroupColorButton);
