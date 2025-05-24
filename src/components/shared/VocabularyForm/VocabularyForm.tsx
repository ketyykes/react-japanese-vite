import React from 'react';
import type { FC } from 'react';

import type { VocabularyAction } from '@/pages/NewPage/components/NewCard/type';
import {
  chineseChangeChange,
  japaneseChangeChange,
  kanjiChangeChange,
  otherChangeChange,
} from '@/pages/NewPage/components/NewCard/vocabularyactionCreator';
import type { VocabularyState } from '@/types';
import { Grid, TextField } from '@mui/material';

type VocabularyFormProps = {
  vocabularyData: VocabularyState;
  dispatch: React.Dispatch<VocabularyAction>;
};

const VocabularyForm: FC<VocabularyFormProps> = ({
  vocabularyData,
  dispatch,
}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          label="漢字"
          value={vocabularyData.kanji || ''}
          sx={{ width: '100%' }}
          onChange={(e) => {
            dispatch(kanjiChangeChange(e.target.value));
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          label="拼音"
          value={vocabularyData.roma || ''}
          sx={{ width: '100%' }}
          onChange={(e) => {
            dispatch(japaneseChangeChange(e.target.value));
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          label="中文"
          value={vocabularyData.chinese || ''}
          sx={{ width: '100%' }}
          onChange={(e) => {
            dispatch(chineseChangeChange(e.target.value));
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="其他備註"
          value={vocabularyData.notation || ''}
          sx={{ width: '100%' }}
          onChange={(e) => {
            dispatch(otherChangeChange(e.target.value));
          }}
        />
      </Grid>
    </Grid>
  );
};

export default VocabularyForm;
