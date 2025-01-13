import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchFilterDto {
  @ApiPropertyOptional({
    description: 'Search term to filter results by lrn',
    example: '17244565579',
  })
  @IsOptional()
  @IsString()
  lrn?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by ocn',
    example: '000543',
  })
  @IsOptional()
  @IsString()
  ocn?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by operator',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  operator?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by country',
    example: 'US',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by state',
    example: 'CA',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by is_dno',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_dno?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by is_dnc',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_dnc?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results by is_litigation',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_litigation?: string;

  @ApiPropertyOptional({
    example: '2024-11-28 12:50:22',
    description: 'First complaint on timestamp',
  })
  @IsOptional()
  @IsDateString()
  first_complaint_on?: string;

  @ApiPropertyOptional({
    example: '2024-12-18 12:50:22',
    description: 'Last complaint on timestamp',
  })
  @IsOptional()
  @IsDateString()
  last_complaint_on?: string;
}

export class SearchFilterByListDto {
  @ApiProperty({
    description: 'Page number (starting from 1)',
    required: false,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1; // Default value

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  count?: number = 10; // Default value

  @ApiProperty({
    description: 'Array of lists to filter by',
    type: [String],
    required: false,
    example: [
      '67abe851-865c-4bec-a86b-973ce095017e',
      '84ed3253-4c60-4001-89c3-9217b7685f63',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  lists?: string[];
}
