import React from 'react';
import type { FC } from 'react';

import type { VocabularyAction } from '@/components/shared/VocabularyForm/type';
import {
  createChineseAction,
  createKanjiAction,
  createNotationAction,
  createRomaAction,
} from '@/components/shared/VocabularyForm/vocabularyActionCreator';
import type { VocabularyState } from '@/types';
import {
  Article,
  EditNote,
  RecordVoiceOver,
  Translate,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

type VocabularyFormProps = {
  vocabularyData: VocabularyState;
  dispatch: React.Dispatch<VocabularyAction>;
};

const VocabularyForm: FC<VocabularyFormProps> = ({
  vocabularyData,
  dispatch,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* 漢字欄位 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              漢字 *
            </Typography>
            <TextField
              required
              fullWidth
              placeholder="請輸入漢字"
              value={vocabularyData.kanji || ''}
              onChange={(e) => {
                dispatch(createKanjiAction(e.target.value));
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Article sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Grid>

        {/* 拼音欄位 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              拼音 *
            </Typography>
            <TextField
              required
              fullWidth
              placeholder="請輸入拼音"
              value={vocabularyData.roma || ''}
              onChange={(e) => {
                dispatch(createRomaAction(e.target.value));
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <RecordVoiceOver sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Grid>

        {/* 中文欄位 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              中文 *
            </Typography>
            <TextField
              required
              fullWidth
              placeholder="請輸入中文意思"
              value={vocabularyData.chinese || ''}
              onChange={(e) => {
                dispatch(createChineseAction(e.target.value));
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Translate sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Grid>

        {/* 備註欄位 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              其他備註
            </Typography>
            <TextField
              fullWidth
              placeholder="請輸入備註（選填）"
              value={vocabularyData.notation || ''}
              onChange={(e) => {
                dispatch(createNotationAction(e.target.value));
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditNote sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VocabularyForm;
