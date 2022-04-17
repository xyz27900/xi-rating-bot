import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gift } from '@/entity/gift.entity';
import { User } from '@/entity/user.entity';

@Entity()
export class UserGift {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Gift, { onDelete: 'CASCADE' })
  gift!: Gift;
}
