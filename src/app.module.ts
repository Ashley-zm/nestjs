// 根模块用于处理其他类的引用与共享。
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user_role/user_role.module';
import { join } from 'path';

@Module({
  imports: [
    // 加载连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'vite_node',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: ["dist/entities/*.entity{.ts,.js}"],
      // entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true,
      logging: false,
    }),
    // 子模块
    UserModule,
    MenuModule,
    RoleModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
