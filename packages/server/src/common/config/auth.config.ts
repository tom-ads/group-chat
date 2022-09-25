import { registerAs } from '@nestjs/config';
import ConfigType from 'src/common/enum/ConfigType';

export interface IAuthConfig {
  secret_key: string;
  expires_in: number;
}

export const AuthConfig = registerAs(
  ConfigType.AUTH,
  (): IAuthConfig => ({
    secret_key: process.env.JWT_SECRET_KEY,
    expires_in: parseInt(process.env.JWT_EXPIRES_IN, 10) || 60,
  }),
);
