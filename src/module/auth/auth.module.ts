import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModel } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config, GqlAuthGuard, RolesGuard } from '@common';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: GqlAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
