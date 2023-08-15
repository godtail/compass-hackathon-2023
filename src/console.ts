import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AvatarService } from './avatar.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];

  switch (command) {
    case 'download-avatars': {
      const avatarService = app.get(AvatarService);
      await avatarService.download();
      break;
    }
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
