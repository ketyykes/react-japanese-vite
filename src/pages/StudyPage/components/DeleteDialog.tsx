import { FC } from 'react';

import type { VocabularyState } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (vocabulary: VocabularyState) => void;
  vocabularyInput: VocabularyState;
};

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  vocabularyInput,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>確定刪除單字嗎</DialogTitle>
      <DialogContent>
        <Typography>刪除後無法復原</Typography>
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
