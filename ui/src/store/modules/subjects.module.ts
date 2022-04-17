import { Module, Mutation, VuexModule } from 'vuex-class-modules';
import { SubjectType, subjectTypes } from '@/models/subject.model';
import { randomElement } from '@/utils/array';

@Module
export class SubjectsModule extends VuexModule {
  public subjects: SubjectType[][] = this.createSubjects();
  public riceAmount = 0;

  private createSubjects(): SubjectType[][] {
    return Array.from({ length: 6 }).map((_, index) => {
      return index === 0
        ? ['empty', ...this.randomSubjects(5)]
        : this.randomSubjects(6);
    });
  }

  private randomSubjects(length: number): SubjectType[] {
    return Array.from({ length }).map(() => randomElement([...subjectTypes]));
  }

  get uncollectedRice(): number {
    const totalRice = this.subjects.flat().filter(subject => subject === 'rice').length;
    return totalRice - this.riceAmount;
  }

  @Mutation
  public collectRice(): void {
    this.riceAmount += 1;
  }
}
