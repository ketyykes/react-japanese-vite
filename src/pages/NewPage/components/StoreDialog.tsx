import { FC } from 'react';

import type { VocabularyState } from '@/types/index';
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
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)({
  '.MuiDialogTitle-root': {
    textAlign: 'center',
  },
  '.MuiPaper-root': {
    borderRadius: '16px',
  },
});

type StoreDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  vocabularyInput: VocabularyState;
};

const StoreDialog: FC<StoreDialogProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  vocabularyInput,
}) => {
  return (
    <StyledDialog fullWidth={true} maxWidth={'md'} open={open}>
      <DialogTitle>
        確定儲存單字嗎
        {open ? (
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
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" component="p">
          中文：
          <Typography variant="h6" component="span">
            {vocabularyInput.chinese}
          </Typography>
        </Typography>
        <Typography variant="h5" component="p">
          拼音：
          <Typography variant="h6" component="span">
            {vocabularyInput.roma}
          </Typography>
        </Typography>
        <Typography variant="h5" component="p">
          漢字：
          <Typography variant="h6" component="span">
            {vocabularyInput.kanji}
          </Typography>
        </Typography>
        <Typography variant="h5" component="p">
          備註：
          <Typography variant="h6" component="span">
            {vocabularyInput.notation}
          </Typography>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onConfirm}>確定</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default StoreDialog;
