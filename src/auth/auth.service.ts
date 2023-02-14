import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/User.entity";
// import { User } from "src/interfaces/user.interface";
import  { Decrypt } from 'src/utils/crypto'
import { UserService } from "../user/user.service";

const logger = new Logger("auth.service");

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * @description: 用户登录
   * @param {User} user
   * @return {*}
   */
  public async login(user: User) {
    let data={code: -1, msg: "用户不存在" }
    try {
      const loginName: string = user.loginName;
      const password: string = user.password;
      console.log("-------",user);
      
      const userInfo = await this.userService.findOneByLoginName(loginName);
      console.log("dddddddddd",userInfo);
      console.log("dddddddddd",userInfo[0]);
      
      if (!userInfo) {
        data={ code: -1, msg: "用户不存在" };
        return data
        // return { code: -1, msg: "用户不存在" };
        
      }
      // 解密
      // const pass = Decrypt(password);
      // if (pass === userInfo.password) {
      //   return {
      //     code: 1,
      //     msg: "登录成功",
      //     data: {
      //       userId: `${userInfo.id}`,
      //       token: await this.createToken(userInfo),
      //     },
      //   };
      // } else {
      //   return { code: -1, msg: "用户名密码错误" };
      // }
    } catch (error) {
      logger.log(error);
      return { code: -1, msg: "登录失败" };
    } finally {
      return data;
    }
  }

  /**
   * @description:创建token
   * @param {User} user
   * @return {*}
   */
  private async createToken(user: User) {
    const payload = { loginName: user.loginName, userId: `${user.id}` };
    return this.jwtService.sign(payload);
  }
}

