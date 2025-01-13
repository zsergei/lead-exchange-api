import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { FilterListsService } from './filter_lists.service';
import {
  CreateFilterListDto,
  FilterListDto,
  SearchFilterListDto,
  searchFilterListResDto,
} from './dto/create-filter-list.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Client')
@Controller('filter-lists')
@UseGuards(JwtAuthGuard)
export class FilterListsController {
  constructor(private readonly filterListsService: FilterListsService) {}

  @Get()
  @ApiOperation({ summary: 'Get filter lists' })
  @ApiResponse({
    status: 200,
    description: 'Phone numbers list',
    type: [searchFilterListResDto],
  })
  async findAll(@Query() searchFilterListDto: SearchFilterListDto) {
    const { name, orderBy, dir } = searchFilterListDto;
    return this.filterListsService.getAll(name, orderBy, dir);
  }

  @Post()
  @ApiOperation({ summary: 'Create filter list' })
  @ApiBody({ type: CreateFilterListDto })
  @ApiResponse({
    status: 200,
    description: 'Filter list created',
    type: FilterListDto,
  })
  create(@Body() createFilterListDto: CreateFilterListDto, @Request() req) {
    return this.filterListsService.create(createFilterListDto, req.user.userId);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete filter list' })
  @ApiResponse({
    status: 200,
    description: 'Filter list deleted',
  })
  remove(@Param('uuid') uuid: string) {
    return this.filterListsService.remove(uuid);
  }
}
