import {Body, Controller, Get, Logger, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {LoginRequest, TokenResponse, User} from '@todo/common-api';
import {JwtAuthGuard} from '../guard/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService, private readonly userService: UserService) {
  }

  @Post('login')
  async login(@Body() loginRequest: LoginRequest): Promise<TokenResponse> {
    this.logger.log('login');
    const token = await this.authService.authenticate(loginRequest.username, loginRequest.password);
    return {token: token};
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() request): Promise<User> {
    this.logger.log('me');
    return await this.userService.findByUsername(request.user.username);
  }


}
