import type { ColorOption } from '../types';

export const COLOR_OPTIONS: ColorOption[] = [
  { value: 'red', label: '紅色 (不熟悉)', color: '#f44336' },
  { value: 'orange', label: '橙色 (一般)', color: '#ff9800' },
  { value: 'yellow', label: '黃色 (還行)', color: '#ffeb3b' },
  { value: 'green', label: '綠色 (熟悉)', color: '#4caf50' },
];

export const FADE_TIMEOUT = {
  STATISTICS: 600,
  FILTER: 800,
  EMPTY_STATE: 1000,
  CARD_BASE: 1000,
  CARD_DELAY: 100,
} as const;

export const STORAGE_KEY = 'vocabulary' as const;
