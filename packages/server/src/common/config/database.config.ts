import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ConfigType from 'src/common/enum/ConfigType';
import { User } from 'src/user/entity/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const DatabaseConfig = registerAs(
  ConfigType.DATABASE,
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3333,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    entities: [__dirname + '/../dist/**/*.entity.{js,ts}'],
    migrations: ["dist/common/database/migrations/*.js"],
    namingStrategy: new SnakeNamingStrategy()
  }),
);

export default DatabaseConfig;
