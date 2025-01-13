import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterList } from './filter_list.entity';
import { FilterListsController } from '../filter_lists/filter_lists.controller';
import { FilterListsService } from './filter_lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilterList])],
  controllers: [FilterListsController],
  providers: [FilterListsService],
  exports: [FilterListsService],
})
export class FilterListsModule {}
