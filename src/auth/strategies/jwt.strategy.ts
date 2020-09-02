import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { IJwtPayload } from './../interfaces/jwt-payload.interface';
import { jwtSecret } from '../../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(jwtPayload: IJwtPayload) {
        const user = await this.authService.validateUser(jwtPayload);
        if (!user) {
            throw new HttpException('Unauthorized access.', HttpStatus.UNAUTHORIZED)
        }
        return user;
    }
}
