import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { VocabularyState } from '@/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import DeleteDialog from './DeleteDialog';

type VocabularyCardProps = {
  vocabularyInput: VocabularyState;
  onConfirm: (vocabulary: VocabularyState) => void;
};

const VocabularyCard: FC<VocabularyCardProps> = ({
  vocabularyInput,
  onConfirm,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

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
  const handleEditPageOpen = () => {
    navigate(`/edit/${vocabularyInput.id}`);
  };

  return (
    <>
      <Container>
        <Card>
          <CardHeader
            sx={{
              bgcolor: vocabularyInput.familiar,
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
                >
                  <MenuItem onClick={handleEditPageOpen}>編輯</MenuItem>
                  <MenuItem onClick={handleDeleteDialogOpen}>刪除</MenuItem>
                </Menu>
              </>
            }
          />
          <CardContent>
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
          </CardContent>
        </Card>
        <DeleteDialog
          vocabularyInput={vocabularyInput}
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          onCancel={handleDeleteDialogClose}
          onConfirm={onConfirm}
        />
      </Container>
    </>
  );
};

export default VocabularyCard;
