import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { VocabularyState } from '@/types/index';
import { ArrowBack } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/material';

import GroupColorButton from './components/GroupColorButton';
import VocabularyCard from './components/VocabularyCard';

const StudyPage = () => {
  const navigate = useNavigate();
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const filterVocabulary = useMemo(() => {
    if (colors.length === 0) {
      return allVocabulary;
    }
    return allVocabulary.filter((vocabulary) =>
      colors.includes(vocabulary.familiar),
    );
  }, [allVocabulary, colors]);

  const handlerDeleteDialogConfirm = (vocabulary: VocabularyState) => {
    const newVocabulary = allVocabulary.filter((v) => v.id !== vocabulary.id);
    setAllVocabulary(newVocabulary);
    localStorage.setItem('vocabulary', JSON.stringify(newVocabulary));
  };

  const handleChangeColor = useCallback(
    (vocabularyId: string, newColor: 'red' | 'yellow' | 'green' | 'orange') => {
      setAllVocabulary((prev) => {
        const newVocabulary = prev.map((v) => {
          if (v.id === vocabularyId) {
            return { ...v, familiar: newColor };
          }
          return v;
        });
        localStorage.setItem('vocabulary', JSON.stringify(newVocabulary));
        return newVocabulary;
      });
    },
    [],
  );

  const colorOptions = [
    { value: 'red', label: '紅色 (不熟悉)', color: '#f44336' },
    { value: 'orange', label: '橙色 (一般)', color: '#ff9800' },
    { value: 'yellow', label: '黃色 (還行)', color: '#ffeb3b' },
    { value: 'green', label: '綠色 (熟悉)', color: '#4caf50' },
  ];

  const handleAutocompleteChange = (
    _event: unknown,
    newValue: typeof colorOptions,
  ) => {
    setColors(newValue.map((option) => option.value));
  };

  const handleGoBack = () => {
    navigate(-1); // 回到上一頁
  };

  useEffect(() => {
    const vocabulary: VocabularyState[] = JSON.parse(
      localStorage.getItem('vocabulary') || '[]',
    );
    setAllVocabulary(vocabulary);

    console.log(vocabulary);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Grid container alignItems="center">
          {/* 左側：返回按鈕 */}
          <Grid size={4}>
            <Button
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
              variant="text"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
            >
              返回
            </Button>
          </Grid>

          {/* 中間：標題 */}
          <Grid size={4}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textAlign: 'center',
              }}
            >
              單字學習
            </Typography>
          </Grid>

          {/* 右側：單字計數 */}
          <Grid size={4}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: 'right',
                pr: 2,
              }}
            >
              共 {filterVocabulary.length} 個單字
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 10 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="flex-end"
        >
          <Autocomplete
            multiple
            options={colorOptions}
            value={colorOptions.filter((option) =>
              colors.includes(option.value),
            )}
            onChange={handleAutocompleteChange}
            getOptionLabel={(option) => option.label}
            noOptionsText="沒有匹配的選項"
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: option.color,
                    mr: 1,
                  }}
                />
                {option.label}
              </Box>
            )}
            renderValue={(value, getItemProps) =>
              value.map((option, index) => (
                <Chip
                  {...getItemProps({ index })}
                  key={option.value}
                  label={option.label}
                  size="small"
                  sx={{
                    backgroundColor: option.color + '20',
                    '& .MuiChip-deleteIcon': {
                      color: option.color,
                    },
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="過濾熟悉度顏色"
                placeholder={
                  colors.length === 0 ? '顯示全部單字' : '選擇更多顏色'
                }
                variant="outlined"
              />
            )}
            sx={{ width: 400 }}
          />
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {filterVocabulary.map((vocabularyInput) => {
          return (
            <Fragment key={vocabularyInput.id}>
              <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                <VocabularyCard
                  vocabularyInput={vocabularyInput}
                  onConfirm={handlerDeleteDialogConfirm}
                />
                <GroupColorButton
                  currentColor={vocabularyInput.familiar}
                  onChangeColor={(color) =>
                    handleChangeColor(
                      vocabularyInput.id,
                      color as 'red' | 'yellow' | 'green' | 'orange',
                    )
                  }
                />
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};

export default StudyPage;
