import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APP_PORT || 3333;
  const url = process.env.APP_URL || 'http://localhost';
  const mode = process.env.NODE_ENV || 'development';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port, () => {
    Logger.log(`Listening on ${url}:${port} in ${mode} mode`);
  });
}
bootstrap();
