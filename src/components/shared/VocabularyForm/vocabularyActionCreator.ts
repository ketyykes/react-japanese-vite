import type { VocabularyAction } from './type';

function createKanjiAction(text: string): VocabularyAction {
  return {
    type: 'kanjiChange',
    payload: text,
  };
}

function createRomaAction(text: string): VocabularyAction {
  return {
    type: 'japaneseChange',
    payload: text,
  };
}

function createChineseAction(text: string): VocabularyAction {
  return {
    type: 'chineseChange',
    payload: text,
  };
}

function createNotationAction(text: string): VocabularyAction {
  return {
    type: 'otherChange',
    payload: text,
  };
}

function createConfirmAction(): VocabularyAction {
  return {
    type: 'confirm',
  };
}

export {
  createKanjiAction,
  createRomaAction,
  createChineseAction,
  createNotationAction,
  createConfirmAction,
};
