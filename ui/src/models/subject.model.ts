export const subjectTypes = ['empty', 'rice', 'stone', 'tree', 'dragon'] as const;

export type SubjectType = typeof subjectTypes[number];

export interface Subject {
  type: SubjectType;
  icon: string;
  color: string;
  highlighted: boolean;
  showIcon: boolean;
  clickable: boolean;
}
