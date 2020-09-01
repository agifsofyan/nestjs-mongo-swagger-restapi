import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret || 'secret'
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  // async validate(payload: JwtPayload) {
  //   const {username} = payload;
  //   const user = await this.UserModel.findOne({username});

  //   if(!user) {
  //       throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}