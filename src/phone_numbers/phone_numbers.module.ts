import { Module } from '@nestjs/common';
import { PhoneNumbersController } from './phone_numbers.controller';
import { PhoneNumbersService } from './phone_numbers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './phone_number.entity';
import { ClickHouseModule } from '../clickhouse/clickhouse.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoneNumber]),
    ClickHouseModule,
    UsersModule,
  ],
  controllers: [PhoneNumbersController],
  providers: [PhoneNumbersService],
  exports: [PhoneNumbersService],
})
export class PhoneNumbersModule {}
