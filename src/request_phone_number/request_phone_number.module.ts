import { Module } from '@nestjs/common';
import { RequestPhoneNumberService } from './request_phone_number.service';
import { RequestPhoneNumberController } from './request_phone_number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestPhoneNumber } from '../request_phone_number/request_phone_number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestPhoneNumber])],
  providers: [RequestPhoneNumberService],
  controllers: [RequestPhoneNumberController],
  exports: [RequestPhoneNumberService],
})
export class RequestPhoneNumberModule {}
