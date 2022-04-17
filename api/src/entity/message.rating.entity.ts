import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/entity/user.entity';

@Entity()
export class MessageRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bigint' })
  messageId!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;
}
