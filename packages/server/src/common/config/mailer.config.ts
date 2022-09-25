import { registerAs } from '@nestjs/config';
import ConfigType from '../enum/ConfigType';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MailerConfig = registerAs(
  ConfigType.MAILER,
  (): MailerOptions => ({
    transport: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 1025,
    },
    defaults: {
      from: `"GroupChat" <${process.env.MAILER_FROM}>`,
    },
    template: {
      dir: 'src/common/template',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
);
