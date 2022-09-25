import { IAuthConfig } from '../common/config/auth.config';
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigType from 'src/common/enum/ConfigType';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const authConfig = configService.get<IAuthConfig>(ConfigType.AUTH);
        return {
          secret: authConfig.secret_key,
          signOptions: {
            expiresIn: `${authConfig.expires_in}m`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
