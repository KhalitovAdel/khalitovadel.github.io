import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import cfg from './cfg';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(cfg.server.port);
}

bootstrap();
