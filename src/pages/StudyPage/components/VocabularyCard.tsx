import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteDialog from './DeleteDialog';
import type { VocabularyState } from '@/types';

type VocabularyCardProps = {
  vocabularyInput: {
    id: string;
    chinese: string;
    japanese: string;
    kanji: string;
    other: string;
    color: string;
  };
  onConfirm: (vocabulary: VocabularyState) => void;
};

const VocabularyCard: FC<VocabularyCardProps> = ({ vocabularyInput, onConfirm }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            bgcolor: vocabularyInput.color,
            py: 0.5,
          }}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleMenuClose}>編輯</MenuItem>
                <MenuItem onClick={handleDeleteDialogOpen}>刪除</MenuItem>
              </Menu>
            </>
          }
        ></CardHeader>
        <CardContent>
          <Typography variant="h5" component="p">
            中文：
            <Typography variant="h6" component="span">
              {vocabularyInput.chinese}
            </Typography>
          </Typography>
          <Typography variant="h5" component="p">
            日文：
            <Typography variant="h6" component="span">
              {vocabularyInput.japanese}
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
              {vocabularyInput.other}
            </Typography>
          </Typography>
        </CardContent>
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