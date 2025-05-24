import { z } from 'zod';

export const vocabularySchema = z.object({
  kanji: z.string().min(1, '漢字是必填欄位'),
  roma: z.string().min(1, '拼音是必填欄位'),
  chinese: z.string().min(1, '中文是必填欄位'),
  notation: z.string().optional(),
});

export type VocabularyFormData = z.infer<typeof vocabularySchema>;
