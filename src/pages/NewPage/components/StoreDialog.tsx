import { FC } from 'react';

import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog';
import type { VocabularyState } from '@/types/index';
import {
  Article,
  EditNote,
  RecordVoiceOver,
  Translate,
} from '@mui/icons-material';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

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
      title="確認儲存單字"
      maxWidth="sm"
      fullWidth={true}
    >
      <Box sx={{ py: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          請確認以下資訊是否正確
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            backgroundColor: 'grey.50',
          }}
        >
          <Stack spacing={2.5}>
            {/* 漢字 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Article sx={{ color: 'primary.main', fontSize: 20 }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  漢字
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {vocabularyInput.kanji || '-'}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* 拼音 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <RecordVoiceOver sx={{ color: 'secondary.main', fontSize: 20 }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  拼音
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {vocabularyInput.roma || '-'}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* 中文 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Translate sx={{ color: 'success.main', fontSize: 20 }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  中文意思
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {vocabularyInput.chinese || '-'}
                </Typography>
              </Box>
            </Box>

            {/* 備註（如果有的話） */}
            {vocabularyInput.notation && (
              <>
                <Divider />
                <Box
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                >
                  <EditNote
                    sx={{ color: 'warning.main', fontSize: 20, mt: 0.5 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      備註
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.primary', lineHeight: 1.5 }}
                    >
                      {vocabularyInput.notation}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </ConfirmDialog>
  );
};

export default StoreDialog;
