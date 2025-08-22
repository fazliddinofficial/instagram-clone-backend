import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModel } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@common';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
