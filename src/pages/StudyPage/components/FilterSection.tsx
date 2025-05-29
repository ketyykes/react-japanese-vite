import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  Fade,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { COLOR_OPTIONS, FADE_TIMEOUT } from '../constants';
import type { ColorOption } from '../types';

interface FilterSectionProps {
  colors: string[];
  onAutocompleteChange: (_event: unknown, newValue: ColorOption[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  colors,
  onAutocompleteChange,
}) => {
  const theme = useTheme();

  return (
    <Fade in timeout={FADE_TIMEOUT.FILTER}>
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
              options={COLOR_OPTIONS}
              value={COLOR_OPTIONS.filter((option) =>
                colors.includes(option.value),
              )}
              onChange={onAutocompleteChange}
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
  );
};

export default FilterSection;
