import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { type UserAccount } from '../../../domain/userTypes'

@Entity()
export class User implements UserAccount {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column({ unique: true })
    username: string

  @Column({
    nullable: true,
    unique: true
  })
    profile_image: string
}
