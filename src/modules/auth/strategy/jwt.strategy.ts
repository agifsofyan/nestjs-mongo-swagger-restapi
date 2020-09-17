import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User, UserService } from "../../user/user.service";
import { JWT_SECRET_KEY } from 'src/config/configuration';
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_KEY,
        })
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userService.findByEmail(payload.email)

        if ( !user ) {
            throw new UnauthorizedException()
        }

        return user;
    }

}