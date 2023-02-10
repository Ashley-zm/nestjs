import { UserRole } from '../entities/UserRole.entity';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from '../entities/User.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from '../middle-ware/logger.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRole])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
