import {Module} from '@nestjs/common';
import {HashModule} from '../hash/hash.module';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserEntity} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [HashModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
