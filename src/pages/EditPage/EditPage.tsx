import React, { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import VocabularyForm from '@/components/shared/VocabularyForm/VocabularyForm';
import { initialState } from '@/pages/NewPage/components/NewCard/vocabularyInitialState';
import vocabularyReducer from '@/pages/NewPage/components/NewCard/vocabularyReducer';
import type { VocabularyState } from '@/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vocabularyInput, DVocabularyInput] = useReducer(
    vocabularyReducer,
    initialState,
  );

  // 載入編輯資料
  useEffect(() => {
    if (id) {
      const allVocabulary: VocabularyState[] = JSON.parse(
        localStorage.getItem('vocabulary') || '[]',
      );
      const vocabularyToEdit = allVocabulary.find((v) => v.id === id);
      if (vocabularyToEdit) {
        // 初始化表單數據
        DVocabularyInput({ type: 'loadData', payload: vocabularyToEdit });
      }
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      const allVocabulary: VocabularyState[] = JSON.parse(
        localStorage.getItem('vocabulary') || '[]',
      );
      const updatedVocabulary = allVocabulary.map((v) =>
        v.id === id ? { ...vocabularyInput, id } : v,
      );
      localStorage.setItem('vocabulary', JSON.stringify(updatedVocabulary));
      navigate(-1); // 返回上一頁
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="日文練習" sx={{ textAlign: 'center' }} />
        <CardContent color="primary">
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            編輯單字
          </Typography>
          <VocabularyForm
            vocabularyData={vocabularyInput}
            dispatch={DVocabularyInput}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCancel} variant="outlined">
            取消
          </Button>
          <Button onClick={handleSave} variant="contained">
            更新
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default EditPage;
