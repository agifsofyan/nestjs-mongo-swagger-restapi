import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
// import { sign } from 'jsonwebtoken';

import { v4 } from 'uuid';
import { Request } from 'express';
import * as Cryptr from 'cryptr';

import { IUser } from '../user/interfaces/user.interface';
import { IRefreshToken } from './interfaces/refresh-token.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JWT_ENCRYPT_SECRET_KEY } from '../config/configuration';

@Injectable()
export class AuthService {
    cryptr: any;

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<IRefreshToken>,
        private readonly jwtService: JwtService
    ) {
        this.cryptr = new Cryptr(JWT_ENCRYPT_SECRET_KEY);
    }

    async createAccessToken(userId: string) {
        // const accessToken = sign({ userId }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
        const accessToken = this.jwtService.sign({ userId });
        return this.encryptText(accessToken);
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

    async validateUser(jwtPayload: IJwtPayload): Promise<any> {
        const user = await this.userModel.findOne({ _id: jwtPayload.userId });
        if (!user) {
            throw new UnauthorizedException('User not found.');
        }
        return user;
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
            } catch (err) {
                throw new BadRequestException('Invalid token authentication.');
            }
        }
        return token;
    }

    private encryptText(text: string): string {
        return this.cryptr.encrypt(text);
    }
    
    returnJwtExtractor() {
        return this.jwtExtractor;
    }
}
