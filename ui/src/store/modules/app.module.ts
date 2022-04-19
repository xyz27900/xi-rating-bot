import { LoginArgs, LoginReply } from '@xyz27900/xi-rating-bot-common/build/es/dto/login.dto';
import { SaveArgs, SaveReply } from '@xyz27900/xi-rating-bot-common/build/es/dto/save.dto';
import { UserModel } from '@xyz27900/xi-rating-bot-common/build/es/models/user.model';
import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules';
import { login } from '@/api/login.api';
import { save } from '@/api/save.api';
import { subjectsModule, toolsModule } from '@/store';
import { AxiosReply } from '@/utils/rest';

@Module
export class AppModule extends VuexModule {
  public user: UserModel | null = null;
  public position: [number, number] = [0, 0];
  public path: [number, number][] = [this.position];

  @Mutation
  public setUser(user: UserModel): void {
    this.user = user;
  }

  @Mutation
  public setPosition(position: [number, number]): void {
    this.position = position;
  }

  @Action
  public moveTo(position: [number, number]): void {
    this.setPosition(position);
    this.path.push(position);
  }

  @Action
  public async login(args: LoginArgs): AxiosReply<LoginReply> {
    const res = await login(args);
    if (res.__state === 'success') {
      this.setUser(res.data.user);
      subjectsModule.setSubjects(res.data.subjects);
      toolsModule.setTools(res.data.tools);
    }

    return res;
  }

  @Action
  public async save(args: SaveArgs): AxiosReply<SaveReply> {
    return await save(args);
  }
}
