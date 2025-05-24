import { FC } from 'react';

import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog';
import type { VocabularyState } from '@/types';
import { Typography } from '@mui/material';

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
  const handleConfirm = () => {
    onConfirm(vocabularyInput);
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      title="確定刪除單字嗎"
      maxWidth="sm"
      fullWidth={true}
    >
      <Typography>刪除後無法復原</Typography>
    </ConfirmDialog>
  );
};

export default DeleteDialog;
