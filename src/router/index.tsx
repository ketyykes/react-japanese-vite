import { createBrowserRouter } from 'react-router-dom';

import EditPage from '@/pages/EditPage/EditPage';
import HomePage from '@/pages/HomePage/HomePage';
import WordManagePage from '@/pages/NewPage/NewPage';
import QuizPage from '@/pages/QuizPage/QuizPage';
import StudyPage from '@/pages/StudyPage/StudyPage';

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
    path: '/edit/:id',
    element: <EditPage />,
  },
  {
    path: '/about',
    element: <div>About</div>,
  },
]);

export default router;
