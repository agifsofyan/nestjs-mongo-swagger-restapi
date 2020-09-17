import { 
    Injectable, 
    forwardRef, 
    Inject,
    UnauthorizedException, 
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { UserService, User as IUser } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as Cryptr from 'cryptr';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { IRefreshToken } from './interface/refresh-token.interface';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { JWT_ENCRYPT_SECRET_KEY } from 'src/config/configuration';
import { AuthLoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    cryptr: any;

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<IRefreshToken>,
    ) {
        this.cryptr = new Cryptr(JWT_ENCRYPT_SECRET_KEY);
    }

    async createToken(user: IUser) {
        // Deconstruct the properties
        const { id, name, email, role } = <Record<string, any>>user

        // Encode that into a JWT
        const token = this.jwtService.sign({
            sub: id,
            name,
            email,
            role
        })

        return this.encryptText(token);
        // return token;
    }

    async createRefreshToken(req: Request, userId: string) {
        const refreshToken = new this.refreshTokenModel({
            userId,
            refreshToken: v4(),
            ip: req.ip,
            browser: req.headers['user-agent'] || 'None'
        });
        await refreshToken.save();
        return refreshToken.refreshToken;
    }

    async findRefreshToken(token: string) {
        const refreshToken = await this.refreshTokenModel.findOne({ refreshToken: token });
        if (!refreshToken) {
            throw new UnauthorizedException('Session has expired.');
        }
        return refreshToken.userId;
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if ( user !== undefined && await compare(password, (<Record<string, any>> user).password) ) {
            return user;
        }else{
            throw new UnauthorizedException('User not found.');
        }
    }

    private jwtExtractor(req: Request) {
        let token = null;

        if (req.header('x-auth-token')) {
            token = req.header('x-auth-token');
        } else if (req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '').replace(' ', '');
        } else if (req.body.token) {
            token = req.body.token.replace(' ', '');
        }

        if (req.query.token) {
            token = req.body.token.replace(' ', '');
        }

        const cryptr = new Cryptr(JWT_ENCRYPT_SECRET_KEY);
        if (token) {
            try {
                token = cryptr.decrypt(token);
                // token = token;
            } catch (err) {
                throw new BadRequestException('Invalid token authentication.');
            }
        }
        return token;
    }

    async login(req: Request, authLoginDTO: AuthLoginDTO) {
        let user = await this.userService.findByEmail(authLoginDTO.email);
        if (!user) {
            throw new NotFoundException('The email you\'ve entered does not exist.');
        }

        // Verify password
        const match = await bcrypt.compare(authLoginDTO.password, user.password);
        if (!match) {
            throw new NotFoundException('The password you\'ve entered is incorrect.');
        }

        user = user.toObject();
        delete user.password;

        return {
            // user,
            accessToken: await this.createToken(user),
            refreshToken: await this.createRefreshToken(req, String(user._id))
        }
    }

    private encryptText(text: string): string {
        return this.cryptr.encrypt(text);
    }

    returnJwtExtractor() {
        return this.jwtExtractor;
    }

}
