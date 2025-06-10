import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const NewPage = lazy(() => import('@/pages/NewPage/NewPage'));
const QuizPage = lazy(() => import('@/pages/QuizPage/QuizPage'));
const StudyPage = lazy(() => import('@/pages/StudyPage/StudyPage'));
const EditPage = lazy(() => import('@/pages/EditPage/EditPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage/AboutPage'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: '/new',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <NewPage />
        </Suspense>
      ),
    },
    {
      path: '/quiz',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <QuizPage />
        </Suspense>
      ),
    },
    {
      path: '/study',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <StudyPage />
        </Suspense>
      ),
    },
    {
      path: '/edit/:id',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <EditPage />
        </Suspense>
      ),
    },
    {
      path: '/about',
      element: (
        <Suspense fallback={<div>載入中...</div>}>
          <AboutPage />
        </Suspense>
      ),
    },
  ],
  {
    basename: '/react-japanese-vite',
  },
);

export default router;
