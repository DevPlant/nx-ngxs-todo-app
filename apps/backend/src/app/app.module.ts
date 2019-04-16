import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {TransformInterceptor} from './interceptor/transform.interceptor';
import {UserEntity} from './user/user.entity';
import {UserModule} from './user/user.module';
import {TodoEntity} from './user/todo/todo.entity';
import {TodoModule} from './user/todo/todo.module';
import {AuthModule} from './auth/auth.module';


@Module({
  imports: [
    UserModule,
    TodoModule,
    AuthModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT) || 5432,
    username: process.env.TYPEORM_USER || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    database: process.env.TYPEORM_DB || 'postgres',
    synchronize: true,
    entities: [UserEntity,TodoEntity]
  }),],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  }]
})
export class AppModule {
}
