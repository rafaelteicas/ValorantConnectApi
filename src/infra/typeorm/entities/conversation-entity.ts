import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './user-entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    unique: false,
  })
  path: string;

  @Column()
  from: number;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'user_id'})
  user: User;
}
