import { CheckCircle } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';

type SuccessAlertProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
};

const SuccessAlert = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
}: SuccessAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        icon={<CheckCircle />}
        sx={{
          borderRadius: 2,
          fontWeight: 500,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
