import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';
import {Agents, Elos} from '../../../domain/game/valorantTypes';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({
    type: 'varchar',
    length: 12,
  })
  elo: Elos;

  @Column({
    type: 'varchar',
    length: 15,
  })
  main: Agents;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'user_id'})
  user: User;
}
