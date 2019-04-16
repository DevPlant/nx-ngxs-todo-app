import {Role, User} from '@todo/common-api';
import {Exclude} from 'class-transformer';
import {PrimaryGeneratedColumn, OneToMany, Column, Entity, Index} from 'typeorm';

@Entity()
export class UserEntity implements User {

  @PrimaryGeneratedColumn()
  id: string;

  @Exclude()
  @Column({length: 250})
  passwordHash: string;

  @Column({length: 250})
  @Index({unique: true})
  username: string;

  @Column({type: 'text', array: true, nullable: true})
  roles: Role[];


}
