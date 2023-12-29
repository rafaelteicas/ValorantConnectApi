import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './user-entity';
import {type PostModel} from '../../../domain/models/post/post-model';
import {
  AgentsModel,
  ElosModel,
} from '../../../domain/models/game/valorant-model';

@Entity()
export class Post implements PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  message?: string;

  @Column({
    type: 'varchar',
    length: 12,
  })
  elo: ElosModel;

  @Column({
    type: 'varchar',
    length: 15,
  })
  main: AgentsModel;

  @Column({
    type: 'varchar',
    array: true,
  })
  other: AgentsModel[];

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column({type: 'timestamp'})
  date: Date;
}
