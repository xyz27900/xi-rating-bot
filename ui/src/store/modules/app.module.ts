import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules';
import { LoginArgs, LoginReply } from '@/api/dto/auth.dto';
import { SaveRiceArgs, SaveRiceReply } from '@/api/dto/rice.dto';
import { login } from '@/api/handlers/auth.handler';
import { saveRice } from '@/api/handlers/rice.handler';
import { User } from '@/models/user.model';
import { AxiosReply } from '@/utils/rest';

@Module
export class AppModule extends VuexModule {
  public user: User | null = null;
  public position: [number, number] = [0, 0];
  public path: [number, number][] = [this.position];

  @Mutation
  public setUser(user: User): void {
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
      this.setUser(res.data);
    }

    return res;
  }

  @Action
  public async save(args: SaveRiceArgs): AxiosReply<SaveRiceReply> {
    return await saveRice(args);
  }
}
