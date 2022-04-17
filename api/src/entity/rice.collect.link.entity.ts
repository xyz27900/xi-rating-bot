import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '@/entity/user.entity';

@Entity()
export class RiceCollectLink {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  chatId!: number;

  @Column()
  messageId!: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;
}
