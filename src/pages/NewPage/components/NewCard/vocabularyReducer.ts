import type { VocabularyState } from '@/types/index';
import type { VocabularyAction } from './type';
import { initialState } from './vocabularyInitialState';

function vocabularyReducer(state: VocabularyState, action: VocabularyAction) {
  switch (action.type) {
    case 'kanjiChange':
      return { ...state, kanji: action.payload };
    case 'japaneseChange':
      return { ...state, japanese: action.payload };
    case 'chineseChange':
      return { ...state, chinese: action.payload };
    case 'otherChange':
      return { ...state, other: action.payload };
    case 'confirm': {
      return initialState;
    }
    default:
      return state;
  }
}
export default vocabularyReducer;