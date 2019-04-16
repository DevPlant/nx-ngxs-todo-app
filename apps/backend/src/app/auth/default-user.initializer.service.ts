import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Role} from '@todo/common-api';
import {UserService} from '../user/user.service';

@Injectable()
export class DefaultUserInitializerService implements OnModuleInit {

private readonly logger = new Logger(DefaultUserInitializerService.name);


  constructor(private readonly userService: UserService) {
  }

  onModuleInit(): any {

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin';
    this.createInitialAdminUser(username, password).then(_ => {
      this.logger.log('Admin user created: '+JSON.stringify(_));
    })
  }

  async createInitialAdminUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if(!user) {
      return await this.userService.createUser({
        username: username,
        password: password,
        roles: [Role.ADMIN, Role.USER]
      });
    }else{
      return user;
    }
  }

}
