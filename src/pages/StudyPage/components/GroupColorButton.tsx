import type { FC } from 'react';
import { memo } from 'react';

import { Circle } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

import styles from './GroupColorButton.module.css';

type ColorType = 'red' | 'yellow' | 'green' | 'orange';

type GroupColorButtonProps = {
  currentColor?: ColorType;
  onChangeColor: (color: ColorType) => void;
};

const GroupColorButton: FC<GroupColorButtonProps> = ({
  currentColor,
  onChangeColor,
}) => {
  const { circleButton, orange, red, green, yellow } = styles;

  const colors: Array<{ value: ColorType; className: string }> = [
    { value: 'red', className: red },
    { value: 'orange', className: orange },
    { value: 'yellow', className: yellow },
    { value: 'green', className: green },
  ];

  return (
    <Stack justifyContent="space-around" direction="row">
      {colors.map(({ value, className }) => (
        <IconButton
          key={value}
          className={circleButton}
          onClick={() => onChangeColor(value)}
          sx={{
            opacity: currentColor === value ? 1 : 0.6,
            transform: currentColor === value ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <Circle className={className} />
        </IconButton>
      ))}
    </Stack>
  );
};

export default memo(GroupColorButton);
