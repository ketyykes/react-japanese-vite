import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, TextField, Button, CardActions } from '@mui/material';
import type { FC } from 'react';
import {
  otherChangeChange,
  kanjiChangeChange,
  japaneseChangeChange,
  chineseChangeChange,
} from './vocabularyactionCreator';
import type { VocabularyAction } from './type';

type NewCardProps = {
  onSave: () => void;
  DVocabularyInput: React.Dispatch<VocabularyAction>;
};

const NewCard: FC<NewCardProps> = ({ onSave, DVocabularyInput }) => {
  return (
    <Card>
      <CardHeader title="日文練習" sx={{ textAlign: 'center' }} />
      <CardContent color="primary">
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          新增單字
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="漢字"
              sx={{ width: '100%' }}
              onChange={(e) => {
                DVocabularyInput(kanjiChangeChange(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ width: '100%' }}
              onChange={(e) => {
                DVocabularyInput(japaneseChangeChange(e.target.value));
              }}
              label="拼音"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ width: '100%' }}
              onChange={(e) => {
                DVocabularyInput(chineseChangeChange(e.target.value));
              }}
              label="中文"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              onChange={(e) => {
                DVocabularyInput(otherChangeChange(e.target.value));
              }}
              label="其他備註"
            />
          </Grid>
        </Grid>
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
