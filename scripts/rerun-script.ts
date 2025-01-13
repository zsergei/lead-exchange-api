import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UploadService } from '../src/upload/upload.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const args = process.argv.slice(2);

  try {
    const uploadService = app.get(UploadService);
    await uploadService.rerun(args[0]);
  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
