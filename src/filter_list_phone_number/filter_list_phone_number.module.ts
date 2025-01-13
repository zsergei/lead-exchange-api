import { Module } from '@nestjs/common';
import { FilterListPhoneNumberController } from './filter_list_phone_number.controller';
import { FilterListPhoneNumberService } from './filter_list_phone_number.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterListPhoneNumber } from './filter_list_phone_number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilterListPhoneNumber])],
  controllers: [FilterListPhoneNumberController],
  providers: [FilterListPhoneNumberService],
  exports: [FilterListPhoneNumberService],
})
export class FilterListPhoneNumberModule {}
