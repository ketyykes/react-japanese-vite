import { FC } from 'react';

import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog';
import type { VocabularyState } from '@/types';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Chip, Stack, Typography, alpha, useTheme } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (vocabulary: VocabularyState) => void;
  vocabularyInput: VocabularyState;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onClose,
  onCancel,
  onConfirm,
  vocabularyInput,
}) => {
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm(vocabularyInput);
  };

  // 熟悉度顏色映射
  const getFamiliarityInfo = (familiar: string) => {
    const familiarityMap = {
      red: { label: '不熟悉', color: '#f44336' },
      orange: { label: '一般', color: '#ff9800' },
      yellow: { label: '還行', color: '#ffeb3b' },
      green: { label: '熟悉', color: '#4caf50' },
    };
    return (
      familiarityMap[familiar as keyof typeof familiarityMap] ||
      familiarityMap.red
    );
  };

  const familiarityInfo = getFamiliarityInfo(vocabularyInput.familiar);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      title="確定刪除單字嗎？"
      maxWidth="sm"
      fullWidth={true}
    >
      <Stack spacing={3}>
        {/* 警告圖示與提醒文字 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <WarningIcon
              sx={{
                color: 'warning.main',
                fontSize: 28,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: 'warning.dark',
                fontWeight: 500,
              }}
            >
              此操作無法復原，請確認要刪除以下單字
            </Typography>
          </Stack>
        </Box>

        {/* 單字詳細資訊 */}
        <Box
          sx={{
            p: 3,
            backgroundColor: 'grey.50',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack spacing={2}>
            {/* 標題 */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                單字資訊
              </Typography>
              <Chip
                size="small"
                label={familiarityInfo.label}
                sx={{
                  backgroundColor: alpha(familiarityInfo.color, 0.2),
                  color: familiarityInfo.color,
                  fontWeight: 500,
                }}
              />
            </Stack>

            {/* 單字內容 */}
            <Stack spacing={1.5}>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  中文
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {vocabularyInput.chinese || '－'}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  拼音
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {vocabularyInput.roma || '－'}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  漢字
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.1rem', fontWeight: 500 }}
                >
                  {vocabularyInput.kanji || '－'}
                </Typography>
              </Box>

              {vocabularyInput.notation && (
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    備註
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    {vocabularyInput.notation}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </ConfirmDialog>
  );
};

export default DeleteDialog;
