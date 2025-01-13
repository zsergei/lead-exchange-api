import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PhoneNumbersService } from '../src/phone_numbers/phone_numbers.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const service = app.get(PhoneNumbersService);
    await service.process();
  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
