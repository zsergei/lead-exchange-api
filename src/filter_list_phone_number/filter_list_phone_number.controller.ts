import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilterListPhoneNumberService } from '../filter_list_phone_number/filter_list_phone_number.service';
import {
  CreateFilterListPhoneNumberDto,
  FilterListPhoneNumberDto,
} from './dto/filter-list-phone-number.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Client')
@Controller('filter-list-phone-number')
export class FilterListPhoneNumberController {
  constructor(
    private readonly filterListPhoneNumberService: FilterListPhoneNumberService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create filter list / phone number relation' })
  @ApiBody({ type: CreateFilterListPhoneNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Relation created',
    type: FilterListPhoneNumberDto,
  })
  create(
    @Body() createFilterListPhoneNumberDto: CreateFilterListPhoneNumberDto
  ) {
    return this.filterListPhoneNumberService.create(
      createFilterListPhoneNumberDto
    );
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete filter list / phone number relation' })
  @ApiResponse({
    status: 200,
    description: 'Relation deleted',
  })
  remove(@Param('uuid') uuid: string) {
    return this.filterListPhoneNumberService.remove(uuid);
  }
}
