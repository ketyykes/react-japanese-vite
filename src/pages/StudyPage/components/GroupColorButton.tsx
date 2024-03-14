import { IconButton, Stack } from '@mui/material';
import { Circle } from '@mui/icons-material';
import styles from './GroupColorButton.module.css';
import type { MouseEvent, FC } from 'react';

type GroupColorButtonProps = {
  onChangeColor: (e: MouseEvent<HTMLElement>) => void;
};
const GroupColorButton: FC<GroupColorButtonProps> = ({ onChangeColor }) => {
  const { circleButton, orange, red, green, yellow } = styles;
  return (
    <Stack justifyContent="space-around" direction="row">
      <IconButton className={circleButton} data-value="red" onClick={onChangeColor}>
        <Circle className={red} />
      </IconButton>
      <IconButton className={circleButton} data-value="orange" onClick={onChangeColor}>
        <Circle className={orange} />
      </IconButton>
      <IconButton className={circleButton} data-value="yellow" onClick={onChangeColor}>
        <Circle className={yellow} />
      </IconButton>
      <IconButton className={circleButton} data-value="green" onClick={onChangeColor}>
        <Circle className={green} />
      </IconButton>
    </Stack>
  );
};

export default GroupColorButton;
