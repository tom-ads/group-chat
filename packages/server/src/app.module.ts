import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import DatabaseConfig from './common/config/database.config';
import ConfigType from './common/enum/ConfigType';
import { AuthConfig } from './common/config/auth.config';
import { MailerConfig } from './common/config/mailer.config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import TypeOrmDataSource from './datasource';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfig, AuthConfig, MailerConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return configService.get<TypeOrmModuleOptions>(ConfigType.DATABASE);
      },
      dataSourceFactory: async () => {
        const dataSource = await TypeOrmDataSource.initialize();
        return dataSource;
      }
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<MailerOptions>(ConfigType.MAILER);
      },
    }),
    UserModule,
    AuthModule,
  ],
})

export class AppModule {}
