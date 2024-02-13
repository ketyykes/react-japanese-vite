import RandomQuiz from '@/components/RandomQuiz';
// const { Option } = Select;
const Quiz = () => {
  // const [quizType, setQuizType] = useState('');
  // const selectorHandler = (value: any) => {
  //   setQuizType(value);
  // };
  const quizType = 'hiragana';
  return <RandomQuiz quizType={quizType} />;
};

export default Quiz;
