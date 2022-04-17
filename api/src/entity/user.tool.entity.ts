import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tool } from '@/entity/tool.entity';
import { User } from '@/entity/user.entity';

@Entity()
export class UserTool {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Tool, { onDelete: 'CASCADE' })
  tool!: Tool;
}
