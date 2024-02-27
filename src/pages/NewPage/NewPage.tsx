import { useState, useReducer } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

type VocabularyState = {
  kanji: string;
  japanese: string;
  chinese: string;
  other: string;
  id: string;
};
type VocabularyAction =
  | { type: 'kanjiChange'; payload: string }
  | { type: 'japaneseChange'; payload: string }
  | { type: 'chineseChange'; payload: string }
  | { type: 'otherChange'; payload: string }
  | { type: 'addId' };

const NewPage = () => {
  const [open, setOpen] = useState(false);
  const initialState = {
    kanji: '',
    japanese: '',
    chinese: '',
    other: '',
    id: '0',
  };
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
      case 'addId':
        return { ...state, id: Date.now().toString() };
      default:
        return state;
    }
  }
  const [vocabularyInput, DVocabularyInput] = useReducer(vocabularyReducer, initialState);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const StoreDialog = styled(Dialog)({
    '.MuiDialogTitle-root': {
      textAlign: 'center',
    },
    '.MuiPaper-root': {
      borderRadius: '16px',
    },
  });

  const handleDialogConfirm = () => {
    DVocabularyInput({
      type: 'addId',
    });
    console.log(vocabularyInput);
  };

  const handleDialogCancel = () => {};

  console.log(vocabularyInput);

  return (
    <Container maxWidth="md">
      <form>
        <Card>
          <CardHeader title="日文練習" sx={{ textAlign: 'center' }}></CardHeader>
          <CardContent color="primary">
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>
              新增單字
            </Typography>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  // fullWidth={true}
                  label="日文"
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
            <Button sx={{ width: '100px' }} onClick={handleClickOpen} variant="contained">
              儲存
            </Button>
          </CardActions>
        </Card>
        <StoreDialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
          <DialogTitle>
            確定儲存單字嗎
            {open ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleDialogCancel}>取消</Button>
            <Button onClick={handleDialogConfirm} autoFocus>
              確定
            </Button>
          </DialogActions>
        </StoreDialog>
      </form>
    </Container>
  );
};
export default NewPage;
