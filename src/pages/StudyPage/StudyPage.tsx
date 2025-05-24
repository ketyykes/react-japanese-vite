import { Fragment, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';

import type { VocabularyState } from '@/types/index';
import { Box, Container, FormControl, MenuItem, Select, Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

import GroupColorButton from './components/GroupColorButton';
import VocabularyCard from './components/VocabularyCard';

const StudyPage = () => {
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const filterVocabulary = useMemo(() => {
    if (colors.length === 0) {
      return allVocabulary;
    }
    return allVocabulary.filter((vocabulary) => colors.includes(vocabulary.familiar));
  }, [allVocabulary, colors]);

  const handlerDeleteDialogConfirm = (vocabulary: VocabularyState) => {
    const newVocabulary = allVocabulary.filter((v) => v.id !== vocabulary.id);
    setAllVocabulary(newVocabulary);
    localStorage.setItem('vocabulary', JSON.stringify(newVocabulary));
  };
  const handleChangeColor = (vocabulary: VocabularyState) => (e: MouseEvent<HTMLElement>) => {
    const newVocabulary = allVocabulary.map((v) => {
      if (v.id === vocabulary.id && e.currentTarget.dataset.value) {
        return { ...v, color: e.currentTarget.dataset.value };
      }
      return v;
    });
    setAllVocabulary(newVocabulary);
    localStorage.setItem('vocabulary', JSON.stringify(newVocabulary));
  };
  const handleColorChange = (event: SelectChangeEvent<typeof colors>) => {
    const {
      target: { value },
    } = event;
    setColors(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const vocabulary: VocabularyState[] = JSON.parse(localStorage.getItem('vocabulary') || '[]');
    setAllVocabulary(vocabulary);

    console.log(vocabulary);
  }, []);

  return (
    <Container disableGutters maxWidth="xl">
      <Box sx={{ my: 10 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl sx={{ width: 300 }}>
            <Select onChange={handleColorChange} multiple value={colors}>
              <MenuItem key="red" value="red">
                red
              </MenuItem>
              <MenuItem key="orange" value="orange">
                orange
              </MenuItem>
              <MenuItem key="yellow" value="yellow">
                yellow
              </MenuItem>
              <MenuItem key="green" value="green">
                green
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {filterVocabulary.map((vocabularyInput, index) => {
          return (
            <Fragment key={index}>
              <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                <VocabularyCard vocabularyInput={vocabularyInput} onConfirm={handlerDeleteDialogConfirm} />
                <GroupColorButton onChangeColor={handleChangeColor(vocabularyInput)} />
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};

export default StudyPage;
