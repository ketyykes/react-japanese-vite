import { Container, FormControl, Select, MenuItem, Stack, Box } from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import type { MouseEvent } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import type { VocabularyState } from '@/types/index';
import GroupColorButton from './components/GroupColorButton';
import VocabularyCard from './components/VocabularyCard';

const StudyPage = () => {
  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>([]);

  const handlerDeleteDialogConfirm = (vocabulary: VocabularyState) => {
    const newVocabulary = allVocabulary.filter((v) => v.id !== vocabulary.id);
    console.log(newVocabulary);
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

  useEffect(() => {
    const vocabulary = JSON.parse(localStorage.getItem('vocabulary') || '[]');
    setAllVocabulary(vocabulary);
  }, []);

  return (
    <Container disableGutters maxWidth="xl">
      <Box sx={{ my: 10 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl sx={{ width: 300 }}>
            <Select>
              <MenuItem key="red">red</MenuItem>
              <MenuItem key="green">orange</MenuItem>
              <MenuItem key="yellow">yellow</MenuItem>
              <MenuItem key="green">green</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Grid container spacing={3} disableEqualOverflow>
        {allVocabulary.map((vocabularyInput, index) => {
          return (
            <Fragment key={index}>
              <Grid xs={12} md={4} lg={3}>
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
