import { useState, useReducer, useEffect } from 'react';
import {
  Grid,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Card,
  Container,
  Button,
  TextField,
} from '@mui/material/';
import StoreDialog from './components/StoreDialog';
import type { VocabularyState } from '@/types/index';

type VocabularyAction =
  | { type: 'kanjiChange'; payload: string }
  | { type: 'japaneseChange'; payload: string }
  | { type: 'chineseChange'; payload: string }
  | { type: 'otherChange'; payload: string }
  | { type: 'confirm' };

const NewPage = () => {
  const initialState = {
    kanji: '',
    japanese: '',
    chinese: '',
    color: 'red',
    other: '',
    id: '0',
  };

  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>(
    localStorage.getItem('vocabulary')
      ? JSON.parse(localStorage.getItem('vocabulary') as string)
      : [],
  );

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
        setAllVocabulary((prev) => [
          ...prev,
          { ...state, id: Date.now().toString() },
        ]);
        return initialState;
      }
      default:
        return state;
    }
  }
  const [vocabularyInput, DVocabularyInput] = useReducer(
    vocabularyReducer,
    initialState,
  );

  console.log('allVocabulary', allVocabulary);

  const handleDialogConfirm = () => {
    DVocabularyInput({
      type: 'confirm',
    });

    setOpen(false);
  };

  // console.log('vocabularyInput', vocabularyInput);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(allVocabulary));
  }, [allVocabulary]);

  return (
    <Container maxWidth="md">
      <form>
        <Card>
          <CardHeader
            title="日文練習"
            sx={{ textAlign: 'center' }}
          ></CardHeader>
          <CardContent color="primary">
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>
              新增單字
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  // fullWidth={true}
                  label="漢字"
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    DVocabularyInput({
                      type: 'kanjiChange',
                      payload: e.target.value,
                    });
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    DVocabularyInput({
                      type: 'japaneseChange',
                      payload: e.target.value,
                    });
                  }}
                  label="拼音"
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    DVocabularyInput({
                      type: 'chineseChange',
                      payload: e.target.value,
                    });
                  }}
                  label="中文"
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    DVocabularyInput({
                      type: 'otherChange',
                      payload: e.target.value,
                    });
                  }}
                  label="其他備註"
                ></TextField>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              sx={{ width: '100px' }}
              onClick={handleClickOpen}
              variant="contained"
            >
              儲存
            </Button>
          </CardActions>
        </Card>
        <StoreDialog
          vocabularyInput={vocabularyInput}
          open={open}
          onClose={handleClose}
          onCancel={handleDialogCancel}
          onConfirm={handleDialogConfirm}
        ></StoreDialog>
      </form>
    </Container>
  );
};

export default NewPage;
