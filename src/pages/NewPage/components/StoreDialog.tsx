import { FC } from 'react';

import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog';
import type { VocabularyState } from '@/types/index';
import { Typography } from '@mui/material';

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
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title="確定儲存單字嗎"
      maxWidth="sm"
      fullWidth={true}
    >
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
    </ConfirmDialog>
  );
};

export default StoreDialog;
