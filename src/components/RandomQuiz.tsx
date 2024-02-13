import { useState, FC } from 'react';
import { Input, Box, Typography } from '@mui/material';
import style from './RandomQuiz.module.css';
import { JapaneseCharacter } from '@/assets/JapaneseCharacter';

type RandomQuiz = {
  quizType: 'hiragana' | 'katakana';
};
const RandomQuiz: FC<RandomQuiz> = ({ quizType }) => {
  const { random_quiz, defaultInput, correctInput, wrongInput } = style;

  const returnRandomIntNumber = (number: number) => Math.floor(Math.random() * number);

  //產生隨機數字做為下一題，且不能等於先前的題目
  const makeNextQuiz = () => {
    let temRandomNumber = returnRandomIntNumber(JapaneseCharacter.length);
    while (temRandomNumber === randomNumber) {
      temRandomNumber = returnRandomIntNumber(JapaneseCharacter.length);
    }
    return temRandomNumber;
  };

  const [randomNumber, setRandomNumber] = useState(returnRandomIntNumber(JapaneseCharacter.length));
  const [wordColor, setWordColor] = useState(defaultInput);
  const [readOnlyBoolean, setReadOnlyBoolean] = useState(false);

  const randomQuizHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordColor(defaultInput); //預設是黑色
    const inputStringArray = e.target.value.split(''); //將你所輸入的字變成陣列

    //透過 forEach 比對你所輸入的字和答案的字，如果不一樣就設置紅色
    inputStringArray.forEach((inputString: string, index: number) => {
      if (inputString !== JapaneseCharacter[randomNumber].roma[index]) {
        setWordColor(wrongInput);
      }
    });

    //如果全部正確則設置綠色且先不能輸入其他字 300 毫秒，最後再清空
    if (e.target.value === JapaneseCharacter[randomNumber].roma) {
      setWordColor(correctInput);
      //輸入正確就關閉使用者輸入欄
      setReadOnlyBoolean(true);
      setTimeout(function () {
        //產生隨機數字
        setRandomNumber(makeNextQuiz());
        setReadOnlyBoolean(false);
        setWordColor(defaultInput);
        e.target.value = '';
      }, 300);
    }
  };

  return (
    <Box className={random_quiz}>
      <Typography variant="h1">{JapaneseCharacter[randomNumber][quizType]}</Typography>
      <Input className={wordColor} onChange={randomQuizHandler} type="text" readOnly={readOnlyBoolean}></Input>
    </Box>
  );
};

export default RandomQuiz;
