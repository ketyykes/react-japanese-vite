import React from 'react';
import type { FC } from 'react';

import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import type { VocabularyState } from '@/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import type { VocabularyAction } from './type';

type NewCardProps = {
  vocabularyData: VocabularyState;
  onSave: () => void;
  DVocabularyInput: React.Dispatch<VocabularyAction>;
};

const NewCard: FC<NewCardProps> = ({
  vocabularyData,
  onSave,
  DVocabularyInput,
}) => {
  return (
    <Card>
      <CardHeader title="日文練習" sx={{ textAlign: 'center' }} />
      <CardContent color="primary">
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          新增單字
        </Typography>
        <VocabularyForm
          vocabularyData={vocabularyData}
          dispatch={DVocabularyInput}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button sx={{ width: '100px' }} onClick={onSave} variant="contained">
          儲存
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewCard;
