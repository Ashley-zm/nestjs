import { UserModule } from './../user/user.module';
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JWT_CONSTANT } from "./jwt.constant";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
    // 使用 UserModule 的内容
    UserModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //挂载全局接口
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

