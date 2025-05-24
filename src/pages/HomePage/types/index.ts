import { ReactElement } from 'react';

export interface QuickAction {
  title: string;
  path: string;
  icon: ReactElement;
  description: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  urgent?: boolean;
}

export interface NavigationCard {
  title: string;
  path: string;
  icon: ReactElement;
  description: string;
  color: 'primary' | 'secondary' | 'success' | 'info';
}
