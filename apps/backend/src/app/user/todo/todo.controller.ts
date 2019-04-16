import {Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards} from '@nestjs/common';
import {TodoService} from './todo.service';
import {AssignTodoRequest, Role, Todo} from '@todo/common-api';
import {Roles} from '../../guard/roles.decorator';
import {JwtAuthGuard} from '../../guard/jwt-auth.guard';
import {RolesGuard} from '../../guard/roles.guard';



@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<Todo[]> {
    this.logger.log('findAll');
    return this.todoService.findAll();
  }


  @Get('mine')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findMine(@Req() request): Promise<Todo[]> {
    this.logger.log('findMine');
    return this.todoService.findForUser(request.user.username);
  }


  @Post('assign')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async assignToUser(@Body() assignRequest: AssignTodoRequest) {
    this.logger.log('assignToUser: todoId: ' + assignRequest.todoId + ' / userId: ' + assignRequest.userId);
    return this.todoService.assignToUser(assignRequest.todoId, assignRequest.userId);
  }

  @Post('solve/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markAsSolved(@Param('id') id: string) {
    return this.todoService.markAsSolved(id);
  }


  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTodo(@Body() todo: Todo) {
    return this.todoService.createTodo(todo);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

}
