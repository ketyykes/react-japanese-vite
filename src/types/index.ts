export type VocabularyState = {
  chinese: string;
  familiar: 'red' | 'yellow' | 'green' | 'orange'; //熟悉程度
  kanji: string;
  roma: string;
  notation: string; //備忘錄，memo,remark,notation
  id: string;
};
