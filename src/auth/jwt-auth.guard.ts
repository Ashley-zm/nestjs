import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
// @SkipAuth 跳过JWT验证
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
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

