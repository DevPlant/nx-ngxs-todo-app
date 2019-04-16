import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {DefaultUserInitializerService} from './default-user.initializer.service';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {HashModule} from '../hash/hash.module';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [UserModule, HashModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
        secretOrPrivateKey: 'secretKey',
        signOptions: {
          expiresIn: 3600,
        }
      }
    )],
  controllers: [AuthController],
  providers: [DefaultUserInitializerService, AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {
}
