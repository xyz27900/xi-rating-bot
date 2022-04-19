import { SubjectType } from '@xyz27900/xi-rating-bot-common/build/es/models/subject.model';
import { Module, Mutation, VuexModule } from 'vuex-class-modules';

@Module
export class SubjectsModule extends VuexModule {
  public subjects: SubjectType[] = [];
  public riceAmount = 0;

  get uncollectedRice(): number {
    const totalRice = this.subjects.flat().filter(subject => subject === 'rice').length;
    return totalRice - this.riceAmount;
  }

  @Mutation
  public setSubjects(subjects: SubjectType[]): void {
    this.subjects = subjects;
  }

  @Mutation
  public collectRice(): void {
    this.riceAmount += 1;
  }
}
