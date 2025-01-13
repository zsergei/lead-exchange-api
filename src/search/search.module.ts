import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ClickHouseModule } from '../clickhouse/clickhouse.module';
import { FilterListPhoneNumberModule } from '../filter_list_phone_number/filter_list_phone_number.module';

@Module({
  imports: [ClickHouseModule, FilterListPhoneNumberModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
