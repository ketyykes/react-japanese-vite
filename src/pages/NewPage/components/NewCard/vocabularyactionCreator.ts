import type { VocabularyAction } from './type';

function kanjiChangeChange(text: string): VocabularyAction {
  return {
    type: 'kanjiChange',
    payload: text,
  };
}

function japaneseChangeChange(text: string): VocabularyAction {
  return {
    type: 'japaneseChange',
    payload: text,
  };
}

function chineseChangeChange(text: string): VocabularyAction {
  return {
    type: 'chineseChange',
    payload: text,
  };
}

function otherChangeChange(text: string): VocabularyAction {
  return {
    type: 'otherChange',
    payload: text,
  };
}

function confirmChange(): VocabularyAction {
  return {
    type: 'confirm',
  };
}

export { kanjiChangeChange, japaneseChangeChange, chineseChangeChange, otherChangeChange, confirmChange };
