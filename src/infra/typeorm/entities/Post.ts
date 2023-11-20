import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    message: string

  @Column()
    elo: string

  @Column()
    main: string

  @ManyToOne(() => User, (user) => user.posts)
    user: User
}
