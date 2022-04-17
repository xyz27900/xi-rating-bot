import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;
}
