import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { RedisInstance } from "src/utils/redis";
// @SkipAuth 跳过JWT验证
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector,
    private jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('---re--',request);
    const authorization = request["headers"].authorization || void 0;
    let tokenNotTimeOut = true;
    if (authorization) {
      const token = authorization.split(" ")[1]; // authorization: Bearer xxx
      try {
        let payload: any = this.jwtService.decode(token);
        const key = `${payload.id}-${payload.loginName}`;
        const redis_token = await RedisInstance.getRedis(
          "jwt-auth.guard.canActivate",
          0,
          key
        );
        if (!redis_token || redis_token !== token) {
          throw new UnauthorizedException("请重新登录");
        }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException("请重新登录");
      }
    }
    
    return  tokenNotTimeOut && (super.canActivate(context) as boolean);
    // return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(err, user, info);
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
// swager装饰器：需要验证token的controller中增加装饰器@ApiBearerAuth，增加后swager请求header会携带Authorization参数。
// 生成跳过检测装饰器 @SkipAuth()
export const IS_PUBLIC_KEY = "isPublic";
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

