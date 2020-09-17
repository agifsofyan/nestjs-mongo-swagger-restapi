import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } from 'src/config/configuration';
import { RefreshTokenSchema } from './schema/refresh-token.schema';

import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),

    UserModule
  
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
