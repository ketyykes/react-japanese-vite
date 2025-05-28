import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { VocabularyState } from '@/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import DeleteDialog from './DeleteDialog';

interface VocabularyCardProps {
  vocabularyInput: VocabularyState;
  onConfirm: (vocabulary: VocabularyState) => void;
}

const VocabularyCard: FC<VocabularyCardProps> = ({
  vocabularyInput,
  onConfirm,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditPageOpen = () => {
    navigate(`/edit/${vocabularyInput.id}`);
    handleMenuClose();
  };

  // 根據熟悉度顏色獲取主題色
  const getColorTheme = (color: string) => {
    const colorMap = {
      red: '#f44336',
      orange: '#ff9800',
      yellow: '#ffeb3b',
      green: '#4caf50',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const cardColor = getColorTheme(vocabularyInput.familiar);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          height: '100%',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
            borderColor: alpha(cardColor, 0.5),
          },
        }}
      >
        {/* 頂部顏色條 */}
        <Box
          sx={{
            height: 4,
            background: `linear-gradient(90deg, ${cardColor} 0%, ${alpha(cardColor, 0.6)} 100%)`,
          }}
        />

        {/* 卡片內容 */}
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Stack spacing={2.5} sx={{ height: '100%' }}>
            {/* 標題列與操作按鈕 */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: cardColor,
                  mt: 0.5,
                }}
              />
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha(cardColor, 0.1),
                    color: cardColor,
                  },
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Stack>

            {/* 單字內容 */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              {/* 中文 */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  中文
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mt: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  {vocabularyInput.chinese || '－'}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.6 }} />

              {/* 拼音 */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  拼音
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    mt: 0.5,
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                  }}
                >
                  {vocabularyInput.roma || '－'}
                </Typography>
              </Box>

              {/* 漢字 */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  漢字
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    mt: 0.5,
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                >
                  {vocabularyInput.kanji || '－'}
                </Typography>
              </Box>

              {/* 備註 */}
              {vocabularyInput.notation && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    備註
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mt: 0.5,
                      lineHeight: 1.4,
                      fontStyle: 'italic',
                    }}
                  >
                    {vocabularyInput.notation}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </CardContent>

        {/* 選單 */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: theme.shadows[8],
              border: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <MenuItem onClick={handleEditPageOpen}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="編輯" />
          </MenuItem>
          <MenuItem
            onClick={handleDeleteDialogOpen}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="刪除" />
          </MenuItem>
        </Menu>
      </Card>

      <DeleteDialog
        vocabularyInput={vocabularyInput}
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onCancel={handleDeleteDialogClose}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default VocabularyCard;
