import { UserModel } from '@xyz27900/xi-rating-bot-common/build/cjs/models/user.model';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'bigint' })
  id!: number;

  @Column()
  rating!: number;

  @Column({ default: 300 })
  balance!: number;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  username?: string;

  get name(): string {
    return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName;
  }

  public toJSON(): UserModel {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
