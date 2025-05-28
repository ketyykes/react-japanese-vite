import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import type { VocabularyState } from '@/types/index';
import {
  Autocomplete,
  Box,
  Chip,
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
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/');
  };

  useEffect(() => {
    const vocabulary: VocabularyState[] = JSON.parse(
      localStorage.getItem('vocabulary') || '[]',
    );
    setAllVocabulary(vocabulary);

    console.log(vocabulary);
  }, []);

  return (
    <PageLayout
      title="單字學習"
      onGoBack={handleGoBack}
      onCancel={handleCancel}
      maxWidth="xl"
    >
      {/* 過濾器區域 */}
      <Box sx={{ mb: 4 }}>
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
            sx={{
              width: { xs: '100%', sm: 400 },
              maxWidth: 400,
            }}
          />
        </Stack>
      </Box>

      {/* 結果統計區域 - 放在過濾器和內容之間 */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: 1,
            py: 2,
            backgroundColor: 'grey.50',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
            }}
          >
            學習結果
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            共 {filterVocabulary.length} 個單字
            {colors.length > 0 && (
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  ml: 1,
                  fontSize: '0.875rem',
                }}
              >
                (已篩選)
              </Typography>
            )}
          </Typography>
        </Stack>
      </Box>

      {/* 單字卡片網格 */}
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
    </PageLayout>
  );
};

export default StudyPage;
