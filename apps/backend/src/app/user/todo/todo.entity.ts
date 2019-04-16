import {Todo} from '@todo/common-api';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {UserEntity} from '../user.entity';
import {JoinColumn} from 'typeorm/decorator/relations/JoinColumn';

@Entity()
export class TodoEntity implements Todo {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({length: 50})
  title: string;
  @Column({length: 250})
  description?: string;
  @Column({type: 'boolean'})
  solved: boolean;


  @ManyToOne(type => UserEntity, {onDelete: 'SET NULL'})
  @JoinColumn()
  user: UserEntity;

  @Column({nullable: true, readonly: true})
  readonly userId: number;

}
