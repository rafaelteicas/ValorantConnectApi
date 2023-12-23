import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {type UserAccount} from '../../../domain/models/user/user-model';
import {Post} from './post-entity';

@Entity()
export class User implements UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({unique: true})
  username: string;

  @Column({unique: false})
  riotId: string;

  @Column({unique: true, nullable: true})
  token: string;

  @Column({unique: true, nullable: true})
  refreshToken: string;

  @Column({
    nullable: true,
    unique: true,
  })
  profile_image: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

export type UserDataType = User;
