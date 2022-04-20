import { inject, injectable } from 'tsyringe';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '@/entity/user.entity';
import { USER_REPOSITORY } from '@/repository/user.repository';

@injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@inject(USER_REPOSITORY) repository: Repository<User>) {
    this.userRepository = repository;
  }

  public async createUser(object: DeepPartial<User>): Promise<User> {
    return this.userRepository.create(object);
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
