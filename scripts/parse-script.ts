import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UploadService } from '../src/upload/upload.service';

// ts-node scripts/parse-script.ts

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const uploadService = app.get(UploadService);
    await uploadService.process();
  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
