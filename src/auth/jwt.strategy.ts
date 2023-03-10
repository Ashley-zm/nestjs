
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT_CONSTANT } from "./jwt.constant";
import { User } from "src/entities/User.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(payload: User) {
    return { loginName: payload.loginName, id: payload.id };
  }
}

