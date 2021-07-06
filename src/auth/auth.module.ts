import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAdminStrategy } from './strategy/jwt-admin.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../modules/user/user.module';
import { LoginStrategy } from './strategy/login.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
  providers: [AuthService, LoginStrategy, JwtAdminStrategy],
})
export class AuthModule {}
