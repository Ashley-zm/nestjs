import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { SkipAuth } from "./jwt-auth.guard";// 跳过登录

@Controller("auth")
@ApiTags("用户验证")
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @SkipAuth()
  @Post("login.do")
  @ApiBody({type:LoginUserDto})
  @ApiOperation({
    summary: "用户登录",
  })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}

