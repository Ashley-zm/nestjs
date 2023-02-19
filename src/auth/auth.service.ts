import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import { Encrypt } from 'src/utils/crypto'
import { UserService } from "../user/user.service";
import { RedisInstance } from "src/utils/redis";

const logger = new Logger("auth.service");

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  /**
   * @description: 用户登录
   * @param {User} loginUserDto
   * @return {*}
   */
  public async login(loginUserDto: LoginUserDto) {
    let data = {}
    try {
      const loginName: string = loginUserDto.loginName;
      const password: string = loginUserDto.password;

      const userInfo = await this.userService.findOneByLoginName(loginName);
      if (userInfo.length === 0) {
        data = { flag: false, msg: "用户不存在" };
        return;
      }
      // 加密
      const pass = Encrypt(password)
      if (pass === userInfo[0].password) {
        const token = await this.createToken(userInfo[0]);

        //存储token到redis
        const redis = await RedisInstance.initRedis("auth.login", 0);
        const key = `${userInfo[0].id}-${loginUserDto.loginName}`;
        await RedisInstance.setRedis("auth.login", 0, key, `${token}`);
        data = {
          flag: true,
          msg: "登录成功",
          userId: userInfo[0],
          token,
        };
      } else {
        data = { flag: false, msg: "用户名密码错误" };
      }
    } catch (error) {
      logger.log(error);
      data = { flag: false, msg: "登录失败" };
    } finally {
      return data;
    }
  }

  /**
   * @description:创建token
   * @param loginUserDto 
   * @returns 
   */
  private async createToken(loginUserDto: LoginUserDto) {
    const payload = { loginName: loginUserDto.loginName, id: loginUserDto.id };
    return this.jwtService.sign(payload);
  }
}

