import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class Post  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  message?: string;

  @Column({
    type: 'varchar',
    length: 12,
  })
  elo: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  main: string;

  @Column({
    type: 'varchar',
    array: true
  })
  other: string[];

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column({ type: 'timestamp' })
  date: Date;
}
