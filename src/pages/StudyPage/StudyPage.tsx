import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import type { VocabularyState } from '@/types/index';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Grid } from '@mui/material';

import GroupColorButton from './components/GroupColorButton';
import VocabularyCard from './components/VocabularyCard';

const StudyPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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

  // 計算統計數據
  const statisticsData = useMemo(() => {
    const total = allVocabulary.length;
    const filtered = filterVocabulary.length;
    const statistics = colorOptions.map((option) => ({
      ...option,
      count: allVocabulary.filter((v) => v.familiar === option.value).length,
    }));
    return { total, filtered, statistics };
  }, [allVocabulary, filterVocabulary, colorOptions]);

  useEffect(() => {
    const vocabulary: VocabularyState[] = JSON.parse(
      localStorage.getItem('vocabulary') || '[]',
    );
    setAllVocabulary(vocabulary);
  }, []);

  return (
    <PageLayout
      title="單字學習"
      onGoBack={handleGoBack}
      onCancel={handleCancel}
      maxWidth="xl"
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* 頂部統計卡片 */}
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-around"
              >
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <SchoolIcon color="primary" fontSize="small" />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      學習進度總覽
                    </Typography>
                  </Stack>
                  <Box sx={{ minHeight: 60 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 0.5,
                        minWidth: 200,
                        display: 'inline-block',
                      }}
                    >
                      {statisticsData.filtered}
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          ml: 1,
                          color: 'text.secondary',
                          fontWeight: 400,
                        }}
                      >
                        / {statisticsData.total} 個單字
                      </Typography>
                    </Typography>
                    <Box sx={{ mt: 1, minHeight: 32 }}>
                      {colors.length > 0 ? (
                        <Chip
                          label="已套用篩選"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        <Box sx={{ height: 32 }} />
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* 熟悉度統計 */}
                <Box
                  sx={{ minHeight: 60, display: 'flex', alignItems: 'center' }}
                >
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {statisticsData.statistics.map((stat) => (
                      <Box key={stat.value} sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: stat.color,
                            mx: 'auto',
                            mb: 0.5,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            display: 'block',
                            fontWeight: 700,
                            color: 'text.primary',
                            fontSize: '0.9rem',
                          }}
                        >
                          {stat.count}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Paper>
        </Fade>

        {/* 過濾器區域 */}
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 4,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FilterListIcon color="action" fontSize="small" />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    篩選條件
                  </Typography>
                </Stack>

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
                          mr: 1.5,
                          border: '1px solid',
                          borderColor: 'grey.300',
                        }}
                      />
                      <Typography variant="body2">{option.label}</Typography>
                    </Box>
                  )}
                  renderValue={(value, getItemProps) =>
                    value.map((option, index) => {
                      const unifiedTextColor = '#374151'; // 統一使用優雅的深藍灰色

                      return (
                        <Chip
                          {...getItemProps({ index })}
                          key={option.value}
                          label={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '50%',
                                  backgroundColor: option.color,
                                  flexShrink: 0,
                                }}
                              />
                              {option.label}
                            </Box>
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            backgroundColor: 'transparent',
                            color: unifiedTextColor,
                            fontWeight: 600,
                            borderRadius: 2,
                            border: `2px solid ${option.color}`,
                            '&:hover': {
                              backgroundColor: `${option.color}08`,
                              borderColor: option.color,
                            },
                            '& .MuiChip-deleteIcon': {
                              color: unifiedTextColor,
                              opacity: 0.7,
                              '&:hover': {
                                opacity: 1,
                                backgroundColor: `${unifiedTextColor}15`,
                                borderRadius: '50%',
                              },
                            },
                          }}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="選擇熟悉度篩選"
                      placeholder={
                        colors.length === 0 ? '顯示全部單字' : '選擇更多顏色'
                      }
                      variant="outlined"
                      size="medium"
                    />
                  )}
                  sx={{
                    width: '100%',
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* 單字卡片網格 */}
        <Box>
          {filterVocabulary.length === 0 ? (
            <Fade in timeout={1000}>
              <Paper
                sx={{
                  py: 8,
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                  border: `1px dashed ${theme.palette.grey[300]}`,
                  borderRadius: 2,
                }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: 64,
                    color: 'grey.400',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {colors.length > 0 ? '沒有符合條件的單字' : '還沒有任何單字'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {colors.length > 0
                    ? '試試調整篩選條件'
                    : '開始新增您的第一個單字吧！'}
                </Typography>
              </Paper>
            </Fade>
          ) : (
            <Grid container spacing={3}>
              {filterVocabulary.map((vocabularyInput, index) => (
                <Fragment key={vocabularyInput.id}>
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Fade in timeout={1000 + index * 100}>
                      <Box>
                        <VocabularyCard
                          vocabularyInput={vocabularyInput}
                          onConfirm={handlerDeleteDialogConfirm}
                        />
                        <Box sx={{ mt: 2 }}>
                          <GroupColorButton
                            currentColor={vocabularyInput.familiar}
                            onChangeColor={(color) =>
                              handleChangeColor(
                                vocabularyInput.id,
                                color as 'red' | 'yellow' | 'green' | 'orange',
                              )
                            }
                          />
                        </Box>
                      </Box>
                    </Fade>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </PageLayout>
  );
};

export default StudyPage;
