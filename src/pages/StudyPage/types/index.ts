export interface ColorOption {
  value: 'red' | 'yellow' | 'green' | 'orange';
  label: string;
  color: string;
}

export interface StatisticsData {
  total: number;
  filtered: number;
  statistics: Array<ColorOption & { count: number }>;
}

export interface FilterState {
  colors: string[];
}

export type FamiliarityLevel = 'red' | 'yellow' | 'green' | 'orange';
