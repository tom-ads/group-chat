import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ConfigType from 'src/common/enum/ConfigType';
import { IAuthConfig } from 'src/common/config/auth.config';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UserService) {
    const authConfig = configService.get<IAuthConfig>(ConfigType.AUTH);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret_key,
    });
  }

  async validate(payload: { sub: number }) {
    const user = this.userService.findById(payload.sub);
    return user;
  }
}
