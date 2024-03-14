import React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Word } from '@/types/word';

type WordListType = Array<Word>;

const StudyPage = () => {
  const [wordList, setWordList] = useState<WordListType>([]);
  // 讀取 localStorage 的 wrongInput
  useEffect(() => {
    const data: string | null = localStorage.getItem('wrongInput');

    if (data === null) return;
    // 將 data 轉成 JSON 格式
    const wrongInput: WordListType = JSON.parse(data);
    console.log(wrongInput, 'wrongInput');

    // 把資料存入 wordList
    setWordList(() => wrongInput);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {wordList?.map((word: any, index: number) => {
          return (
            <Grid item key={index} xs={12} sm={6}>
              <div>
                <p>{word.katakana}</p>
                <p>{word.hiragana}</p>
                <p>{word.roma}</p>
                <p>{word.japanese}</p>
                <p>{word.chinese}</p>
                <p>{word.other}</p>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default StudyPage;
