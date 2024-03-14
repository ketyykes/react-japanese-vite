export type VocabularyAction =
  | { type: 'kanjiChange'; payload: string }
  | { type: 'japaneseChange'; payload: string }
  | { type: 'chineseChange'; payload: string }
  | { type: 'otherChange'; payload: string }
  | { type: 'confirm' };
