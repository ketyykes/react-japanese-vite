import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import QuizPage from '@/pages/QuizPage/QuizPage';
import StudyPage from '@/pages/StudyPage/StudyPage';
import WordManagePage from '@/pages/NewPage/NewPage';
import EditPage from '@/pages/EditPage/EditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/new',
    element: <WordManagePage />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
  },
  {
    path: '/study',
    element: <StudyPage />,
  },
  {
    path: '/edit',
    element: <EditPage />,
  },
  {
    path: '/about',
    element: <div>About</div>,
  },
]);

export default router;
