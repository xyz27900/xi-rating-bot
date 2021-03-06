import { SubjectType } from '@xyz27900/xi-rating-bot-common/build/cjs/models/subject.model';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '@/entity/user.entity';

@Entity()
export class HarvestLink {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  chatId!: number;

  @Column()
  messageId!: number;

  @Column({ type: 'simple-array' })
  subjects!: SubjectType[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;
}
