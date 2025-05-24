import type { VocabularyAction } from '@/components/shared/VocabularyForm/type';
import type { VocabularyState } from '@/types/index';

import { initialState } from './vocabularyInitialState';

function vocabularyReducer(state: VocabularyState, action: VocabularyAction) {
  switch (action.type) {
    case 'kanjiChange':
      return { ...state, kanji: action.payload };
    case 'japaneseChange':
      return { ...state, roma: action.payload };
    case 'chineseChange':
      return { ...state, chinese: action.payload };
    case 'otherChange':
      return { ...state, notation: action.payload };
    case 'confirm': {
      return initialState;
    }
    case 'loadData': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
export default vocabularyReducer;
