import {
  Add as AddIcon,
  Info as InfoIcon,
  Quiz as QuizIcon,
  MenuBook as StudyIcon,
} from '@mui/icons-material';

import type { NavigationCard, QuickAction } from '../types';

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: '開始學習',
    path: '/study',
    icon: <StudyIcon />,
    description: '複習已學內容',
    color: 'primary',
    urgent: true,
  },
  {
    title: '新增詞彙',
    path: '/new',
    icon: <AddIcon />,
    description: '添加新單字',
    color: 'secondary',
  },
];

export const NAVIGATION_CARDS: NavigationCard[] = [
  {
    title: '學習模式',
    path: '/study',
    icon: <StudyIcon />,
    description: '瀏覽和複習已學習的詞彙',
    color: 'success',
  },
  {
    title: '測驗挑戰',
    path: '/quiz',
    icon: <QuizIcon />,
    description: '測試學習成果與記憶',
    color: 'secondary',
  },
  {
    title: '新增詞彙',
    path: '/new',
    icon: <AddIcon />,
    description: '添加新的日文單字與句型',
    color: 'primary',
  },
  {
    title: '關於應用',
    path: '/about',
    icon: <InfoIcon />,
    description: '查看應用程式資訊',
    color: 'info',
  },
];

export const WELCOME_MESSAGE = {
  greeting: 'おはよう！',
  subtitle: '今天也要加油學日文',
  motivational: '準備好開始學習了嗎？',
  description: '選擇下方功能開始您的日語學習之旅',
  footer: '今天的一小步，就是日語進步的一大步 ✨',
};
