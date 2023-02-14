import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/entities/User.entity";
import { AuthService } from "./auth.service";
import { SkipAuth } from "./jwt-auth.guard";

@Controller("auth")
@ApiTags("用户验证")
export class AuthController {
  constructor(private authService: AuthService) {}
  // 登录
  @SkipAuth()
  @Post("login.do")
  @ApiOperation({
    summary: "用户登录",
  })
  async loginUser(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }
}

