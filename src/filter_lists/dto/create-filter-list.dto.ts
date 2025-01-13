import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFilterListDto {
  @ApiProperty({
    example: 'List of clients',
    description: 'Name of the list',
  })
  name: string;
}

export class FilterListDto {
  @ApiProperty({
    example: 'dfs90df9-dfgdfks384293-sdfjkdfgndlfgd-sdfsdlll',
    description: 'Filter list uuid',
  })
  uuid: string;
}

export class SearchFilterListDto {
  @ApiPropertyOptional({
    description: 'Search term to filter results',
    example: 'cars',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Order results by field - created_on/name',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Order results direction - asc/desc',
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  dir?: string;
}

export class searchFilterListResDto {
  @ApiProperty({
    example: 'List of cars',
    description: 'List name',
  })
  name: string;

  @ApiProperty({
    example: 'dfs90df9-dfgdfks384293-sdfjkdfgndlfgd-sdfsdlll',
    description: 'Filter list uuid',
  })
  uuid: string;

  @ApiProperty({
    example: '2024-11-28 12:50:22',
    description: 'Created on timestamp',
  })
  created_on: string;
}
