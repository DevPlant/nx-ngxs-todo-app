import {Body, Controller, Delete, Get, Logger, Param, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {Role, User} from '@todo/common-api';
import {Roles} from '../guard/roles.decorator';
import {JwtAuthGuard} from '../guard/jwt-auth.guard';
import {RolesGuard} from '../guard/roles.guard';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    this.logger.log('findAll');
    return this.userService.findAll();
  }


  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createUser(@Body() user: User): Promise<User> {
    this.logger.log('createUser: ' + user.username);
    return this.userService.createUser(user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    this.logger.log('deleteUser: ' + id);
    return this.userService.deleteUser(id);
  }

}
