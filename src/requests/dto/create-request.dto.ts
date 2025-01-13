import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({
    example: 'US',
    description: 'Country',
  })
  country: string;

  @ApiProperty({
    example: 'CA',
    description: 'State',
  })
  state: string;

  @ApiProperty({
    example: 'true',
    description: 'Is dno flag',
  })
  is_dno: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Is dnc flag',
  })
  is_dnc: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Is litigation flag',
  })
  is_litigation: boolean;

  @ApiProperty({
    example: '84ed3253-4c60-4001-89c3-9217b7685f63',
    description: 'Filter list uuid',
  })
  filter_list_uuid: string;

  @ApiProperty({
    example: 'npa-n12-0098',
    description: 'Phone number in npa format',
  })
  npa: string;
}
