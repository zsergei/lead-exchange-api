import { Injectable } from '@nestjs/common';
import { CreateFilterListDto } from './dto/create-filter-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterList } from './filter_list.entity';
import { getCurrentFormattedDate } from '../utils';

@Injectable()
export class FilterListsService {
  constructor(
    @InjectRepository(FilterList)
    private readonly filterListRepository: Repository<FilterList>
  ) {}

  async getAll(name: string, orderBy: string, dir: string) {
    const builder = this.filterListRepository.createQueryBuilder('filter_list');
    if (name) {
      builder.where(`filter_list.name LIKE '%${name}%'`);
    }
    const rows = await builder
      .orderBy(
        `filter_list.${orderBy === 'created_on' ? 'created_on' : 'name'}`,
        dir === 'desc' ? 'DESC' : 'ASC'
      )
      .getMany();

    return rows.map((row) => ({
      name: row.name,
      uuid: row.id,
      created_on: row.created_on,
    }));
  }

  async create(
    createFilterListDto: CreateFilterListDto,
    user_id: string
  ): Promise<any> {
    const filterList = this.filterListRepository.create();
    const res = await this.filterListRepository.save({
      ...filterList,
      name: createFilterListDto.name,
      user_id: user_id,
      created_on: getCurrentFormattedDate(),
    });
    return { uuid: res.id };
  }

  async remove(uuid: string): Promise<void> {
    await this.filterListRepository.delete(uuid);
  }
}
