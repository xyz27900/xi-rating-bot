import { DeepPartial, Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { User } from '@/entity/user.entity';

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.userRepository = repository;
  }

  public async createUser(object: DeepPartial<User>): Promise<User> {
    const user = this.userRepository.create(object);
    await this.save(user);
    return user;
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

export const userService = new UserService(dataSource.getRepository(User));
