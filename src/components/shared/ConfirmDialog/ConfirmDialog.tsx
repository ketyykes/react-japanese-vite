import { FC, ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  autoCloseOnConfirm?: boolean;
};

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  title,
  children,
  confirmText = '確定',
  cancelText = '取消',
  maxWidth = 'sm',
  fullWidth = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <StyledDialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
      <DialogTitle>
        {title}
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
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={handleConfirm}>{confirmText}</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ConfirmDialog;
