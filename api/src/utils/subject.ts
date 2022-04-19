import { SubjectType, subjectTypes } from 'social-credits-common/build/cjs/models/subject.model';
import { randomElement } from '@/utils/array';

export const randomSubjects = (length: number): SubjectType[] => {
  return Array.from({ length }).map(() => randomElement([...subjectTypes]));
};
