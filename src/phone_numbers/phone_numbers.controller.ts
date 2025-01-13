import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatePhoneNumberDto,
  DeletePhoneNumberDto,
  PhoneNumber,
  PaginatedResponseDto,
} from './dto/phone-number.dto';
import { ClickHouseService } from '../clickhouse/clickhouse.service';
import { generateNumericIdFromUUID } from '../utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly clickHouseService: ClickHouseService) {}

  @Get()
  @ApiOperation({ summary: 'Get phone numbers' })
  @ApiResponse({
    status: 200,
    description: 'Phone numbers list',
    type: PaginatedResponseDto,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    page = Number(page);
    limit = Number(limit);

    return this.clickHouseService.getNumbers(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create phone number' })
  @ApiBody({ type: CreatePhoneNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Phone number created',
    type: CreatePhoneNumberDto,
  })
  async create(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    const query = `INSERT INTO phone_number(id, lrn, country, state, is_dno, 
        is_dnc, first_complaint_on, last_complaint_on, ocn, is_litigation, operator) 
        VALUES(${generateNumericIdFromUUID()}, '${createPhoneNumberDto.lrn}', 
        '${createPhoneNumberDto.country}', '${createPhoneNumberDto.state}', 
        ${createPhoneNumberDto.is_dno}, ${createPhoneNumberDto.is_dnc}, 
        '${createPhoneNumberDto.first_complaint_on}', 
        '${createPhoneNumberDto.last_complaint_on}', 
        '${createPhoneNumberDto.ocn}', ${createPhoneNumberDto.is_litigation}, 
        '${createPhoneNumberDto.operator}')`;
    return this.clickHouseService.executeQuery(query);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete phone number' })
  @ApiBody({ type: DeletePhoneNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Phone number deleted',
    type: DeletePhoneNumberDto,
  })
  async remove(@Param('id') id: number) {
    const query = `ALTER TABLE phone_number DELETE WHERE id = ${id}`;
    return this.clickHouseService.executeQuery(query);
  }
}
