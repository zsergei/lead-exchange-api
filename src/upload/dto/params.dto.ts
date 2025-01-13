import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class ParamsDto {
  @ApiPropertyOptional({
    description: 'Country',
    example: 'US',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'State',
    example: 'CA',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Ocn value',
    example: '000543',
  })
  @IsOptional()
  @IsString()
  ocn?: string;

  @ApiPropertyOptional({
    description: 'Operator value',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  operator?: string;

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
