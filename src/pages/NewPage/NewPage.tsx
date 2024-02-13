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
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
const NewPage = () => {
  const [open, setOpen] = useState(false);
  const initialState = {
    kanji: '',
    japanese: '',
    chinese: '',
    other: '',
  };
  function vocabularyReducer(state: any, action: any) {
    switch (action.type) {
      case 'kanjiChange':
        return { ...state, kanji: action.payload };
      case 'japaneseChange':
        return { ...state, japanese: action.payload };
      case 'chineseChange':
        return { ...state, chinese: action.payload };
      case 'otherChange':
        return { ...state, other: action.payload };
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

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ minWidth: 375 }}>
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
            <Button sx={{ width: '100px', m: 2 }} onClick={handleClickOpen} variant="contained">
              儲存
            </Button>
          </CardActions>
        </Card>
      </Container>
      <StoreDialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
        <DialogTitle>
          測試
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
      </StoreDialog>
    </>
  );
};
export default NewPage;
