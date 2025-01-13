import { Injectable } from '@nestjs/common';
import { CreateFilterListPhoneNumberDto } from './dto/filter-list-phone-number.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { FilterListPhoneNumber } from './filter_list_phone_number.entity';
import { getCurrentFormattedDate } from '../utils';

@Injectable()
export class FilterListPhoneNumberService {
  constructor(
    @InjectRepository(FilterListPhoneNumber)
    private readonly filterListPhoneNumberRepository: Repository<FilterListPhoneNumber>
  ) {}

  async create(
    createFilterListPhoneNumberDto: CreateFilterListPhoneNumberDto
  ): Promise<any> {
    const filterListPhoneNumber = this.filterListPhoneNumberRepository.create();
    const res = await this.filterListPhoneNumberRepository.save({
      ...filterListPhoneNumber,
      created_on: getCurrentFormattedDate(),
      lrn: createFilterListPhoneNumberDto.lrn,
      filter_list_uuid: createFilterListPhoneNumberDto.filter_list_uuid,
    });
    return { uuid: res.id };
  }

  async remove(uuid: string): Promise<void> {
    await this.filterListPhoneNumberRepository.delete(uuid);
  }

  async findByLists(page: number, count: number, lists: string[]) {
    const skip = (page - 1) * count;
    const opts = lists
      ? {
          where: { filter_list_uuid: In(lists) },
          skip,
          take: count,
        }
      : { skip, take: count };
    const [items, total] =
      await this.filterListPhoneNumberRepository.findAndCount(opts);

    const rows = items.map((item) => item.lrn);

    return {
      rows,
      total,
      page,
      count,
    };
  }
}
