import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Container,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Circle } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import styles from './StudyPage.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { VocabularyState } from '@/types/index';

const StudyPage = () => {
  const { circleButton, orange, red, green, yellow } = styles;

  const [allVocabulary, setAllVocabulary] = useState<VocabularyState[]>([]);

  const changeColorHandler =
    (vocabulary: VocabularyState) => (e: React.MouseEvent<HTMLElement>) => {
      const newVocabulary = allVocabulary.map((v) => {
        if (v.id === vocabulary.id && e.currentTarget.dataset.value) {
          return { ...v, color: e.currentTarget.dataset.value };
        }
        return v;
      });
      console.log('newVocabulary', newVocabulary);
      setAllVocabulary(newVocabulary);
    };

  useEffect(() => {
    const vocabulary = JSON.parse(localStorage.getItem('vocabulary') || '[]');

    console.log(vocabulary);
    setAllVocabulary(vocabulary);
  }, []);

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(allVocabulary));
  }, [allVocabulary]);

  console.log(allVocabulary);

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
        {allVocabulary.map((vocabularyInput, index) => (
          <Grid key={index} xs={12} md={4} lg={3}>
            <Card>
              <CardHeader
                sx={{
                  bgcolor: vocabularyInput.color,
                  py: 0.5,
                }}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
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
            <Grid>
              <Stack justifyContent="space-around" direction="row">
                <IconButton
                  className={circleButton}
                  onClick={changeColorHandler(vocabularyInput)}
                  data-value="red"
                >
                  <Circle className={red} />
                </IconButton>
                <IconButton
                  className={circleButton}
                  data-value="orange"
                  onClick={changeColorHandler(vocabularyInput)}
                >
                  <Circle className={orange} />
                </IconButton>
                <IconButton
                  className={circleButton}
                  data-value="yellow"
                  onClick={changeColorHandler(vocabularyInput)}
                >
                  <Circle className={yellow} />
                </IconButton>
                <IconButton
                  className={circleButton}
                  data-value="green"
                  onClick={changeColorHandler(vocabularyInput)}
                >
                  <Circle className={green} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudyPage;
