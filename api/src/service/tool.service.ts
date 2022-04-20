import { inject, injectable } from 'tsyringe';
import { In, Not, Repository } from 'typeorm';
import { Tool } from '@/entity/tool.entity';
import { User } from '@/entity/user.entity';
import { UserTool } from '@/entity/user.tool.entity';
import { TOOL_REPOSITORY } from '@/repository/tool.repository';
import { USER_TOOL_REPOSITORY } from '@/repository/user.tool.repository';

@injectable()
export class ToolService {
  private readonly toolRepository: Repository<Tool>;
  private readonly userToolRepository: Repository<UserTool>;

  constructor(
    @inject(TOOL_REPOSITORY) toolRepository: Repository<Tool>,
    @inject(USER_TOOL_REPOSITORY) userToolRepository: Repository<UserTool>
  ) {
    this.toolRepository = toolRepository;
    this.userToolRepository = userToolRepository;
  }

  public async getToolById(id: number): Promise<Tool | null> {
    return await this.toolRepository.findOneBy({ id });
  }

  public async getUserTools(user: User): Promise<Tool[]> {
    const userTools = await this.userToolRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['tool'],
    });
    return userTools.map(userTool => userTool.tool);
  }

  public async getUserPurchasableTools(user: User): Promise<Tool[]> {
    const tools = await this.getUserTools(user);
    return await this.toolRepository.findBy({
      id: Not(In(tools.map(tool => tool.id))),
    });
  }

  public async checkIfUserHasTool(user: User, tool: Tool): Promise<boolean> {
    const userTool = await this.userToolRepository.findOne({
      where: {
        user: { id: user.id },
        tool,
      },
    });
    return !!userTool;
  }

  public async createUserTool(user: User, tool: Tool): Promise<UserTool> {
    return this.userToolRepository.create({ user, tool });
  }
}
