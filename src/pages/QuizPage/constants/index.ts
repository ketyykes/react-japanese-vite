/**
 * 測驗設定相關常數
 */
export const PRESET_QUESTION_COUNTS = [10, 20, 50] as const;

/**
 * 熟悉程度等級
 */
export const FAMILIARITY_LEVELS = {
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
} as const;

/**
 * 測驗模式
 */
export const QUIZ_MODES = {
  CHINESE_TO_KANJI: 'chinese-to-kanji',
  KANJI_TO_CHINESE: 'kanji-to-chinese',
} as const;

/**
 * 儲存相關鍵值
 */
export const STORAGE_KEYS = {
  VOCABULARY: 'vocabulary',
  QUIZ_HISTORY: 'quizHistory',
} as const;

/**
 * 測驗記錄數量限制
 */
export const QUIZ_HISTORY_LIMIT = 50;
