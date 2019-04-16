import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {HashService} from '../hash/hash.service';
import {JwtPayload} from '@todo/common-api';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService, private readonly hashService: HashService, private readonly jwtService: JwtService) {
  }

  async authenticate(username: string, password: string): Promise<string> {

    const user = await this.userService.findByUsername(username);
    this.logger.log('[authenticate] ' + username);
    if (user) {
      const passwordMatches = await this.hashService.compareHash(password, user.passwordHash);
      if (!passwordMatches) {
        throw new BadRequestException('Password invalid');
      } else {
        return this.jwtService.sign({
          username: user.username,
          roles: user.roles,
        });
      }
    } else {
      throw new NotFoundException('User does not exist');
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByUsername(payload.username);
  }

}
