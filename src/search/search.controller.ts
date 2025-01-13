import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ClickHouseService } from '../clickhouse/clickhouse.service';
import {
  SearchFilterByListDto,
  SearchFilterDto,
} from './dto/search-filter.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { obfuscatePhoneNumber } from '../utils';
import { FilterListPhoneNumberService } from '../filter_list_phone_number/filter_list_phone_number.service';
import { PaginatedResponseDto } from '../phone_numbers/dto/phone-number.dto';

interface ObfData {
  lrn: string;
}

@ApiBearerAuth()
@ApiTags('Client')
@Controller('search')
export class SearchController {
  constructor(
    private readonly clickHouseService: ClickHouseService,
    private readonly flpnService: FilterListPhoneNumberService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Search numbers' })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: PaginatedResponseDto,
  })
  async searchNumbers(
    @Query() filterDto: SearchFilterDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    page = Number(page);
    limit = Number(limit);
    const {
      lrn,
      ocn,
      operator,
      country,
      state,
      is_dno,
      is_dnc,
      is_litigation,
      first_complaint_on,
      last_complaint_on,
    } = filterDto;

    const conditions = [];
    if (lrn) {
      conditions.push(`(lrn LIKE '%${lrn}%')`);
    }
    if (ocn) {
      conditions.push(`(ocn LIKE '%${ocn}%')`);
    }
    if (operator) {
      conditions.push(`(operator LIKE '%${operator}%')`);
    }
    if (country) {
      conditions.push(`country='${country}'`);
    }
    if (state) {
      conditions.push(`state='${state}'`);
    }
    if (is_dno !== undefined)
      conditions.push(`is_dno=${is_dno === 'true' ? 1 : 0}`);
    if (is_dnc !== undefined)
      conditions.push(`is_dnc=${is_dnc === 'true' ? 1 : 0}`);
    if (is_litigation !== undefined)
      conditions.push(`is_litigation=${is_litigation === 'true' ? 1 : 0}`);
    if (first_complaint_on) {
      conditions.push(`first_complaint_on='${first_complaint_on}'`);
    }
    if (last_complaint_on) {
      conditions.push(`last_complaint_on='${last_complaint_on}'`);
    }

    if (conditions.length === 0) {
      conditions.push('1=1');
    }

    // const query = `SELECT lrn FROM phone_number WHERE ${conditions.join(' AND ')} ORDER BY created_on ASC`;
    // const results = await this.clickHouseService.executeQuery(query);

    const results = await this.clickHouseService.getNumbers(
      page,
      limit,
      conditions.join(' AND ')
    );

    const obfuscated = results.data.map((row: ObfData) =>
      obfuscatePhoneNumber(row.lrn)
    );
    results.data = obfuscated;

    return results;
  }

  @UseGuards(JwtAuthGuard)
  @Get('lists')
  @ApiOperation({ summary: 'Search numbers by lists' })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: [String],
  })
  async searchNumbersByLists(@Query() filterDto: SearchFilterByListDto) {
    const { page, count, lists } = filterDto;

    return this.flpnService.findByLists(page, count, lists);
  }
}
