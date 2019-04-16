import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Todo} from '@todo/common-api';
import {TodoEntity} from './todo.entity';
import {UserEntity} from '../user.entity';

@Injectable()
export class TodoService {


  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>,
              @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async assignToUser(todoId: string, userId: string) {


    const todo = await this.todoRepository.findOne({id:todoId});

    console.log(" ======",todoId,todo, userId);
    if (!todo) {
      throw new NotFoundException('Todo not found: ' + todoId);
    }

    if(!userId){
      todo.user = null;
      try {
        return await this.todoRepository.save(todo);
      } catch (err /*: WriteError*/) {
        throw new BadRequestException(err);
      }
    }

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found: ' + userId);
    }
console.log('here', todo);
    todo.user = user;
    try {
      return await this.todoRepository.save(todo);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async markAsSolved(id: string) {
    const todo = await this.todoRepository.findOne({id});
    if (todo) {
      todo.solved = true;
      try {
        return await this.todoRepository.save(todo);
      } catch (err /*: WriteError*/) {
        throw new BadRequestException(err);
      }
    }
  }

  async createTodo(todo: Todo) {
    todo.solved = false;
    const todoEntity = this.todoRepository.create(todo);
    try {
      return await this.todoRepository.save(todoEntity);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async deleteTodo(id: string) {
    try {
      return await this.todoRepository.delete(id);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findForUser(username: string): Promise<Todo[]> {
    const user = await this.userRepository.findOne({username});
    if (!user) {
      throw new NotFoundException('User not found: ' + username);
    }
    return await this.todoRepository.find({user});
  }


}
