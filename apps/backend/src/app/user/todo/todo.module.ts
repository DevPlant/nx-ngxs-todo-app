import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoEntity} from './todo.entity';
import {TodoController} from './todo.controller';
import {TodoService} from './todo.service';
import {UserEntity} from '../user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, UserEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {
}
