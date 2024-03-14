import { FC } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, IconButton, DialogActions } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import type { VocabularyState } from '@/types';

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (vocabulary: VocabularyState) => void;
  vocabularyInput: VocabularyState;
};

const DeleteDialog: FC<DeleteDialogProps> = ({ open, onClose, onCancel, onConfirm, vocabularyInput }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        確定刪除單字嗎
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" component="p">
          刪除後無法復原
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>取消</Button>
        <Button
          onClick={() => {
            onConfirm(vocabularyInput);
            onClose();
          }}
          autoFocus
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
