import { ApiProperty } from '@nestjs/swagger';

export class CreatePhoneNumberDto {
  @ApiProperty({
    example: '18474452849',
    description: 'Lrn field',
  })
  lrn: string;

  @ApiProperty({
    example: 'US',
    description: 'Country shortcode',
  })
  country: string;

  @ApiProperty({
    example: 'CA',
    description: 'State shortcode',
  })
  state: string;

  @ApiProperty({
    example: 1,
    description: 'Is DNO',
  })
  is_dno: number;

  @ApiProperty({
    example: 0,
    description: 'Is DNC',
  })
  is_dnc: number;

  @ApiProperty({
    example: 'ocn1',
    description: 'OCN value',
  })
  ocn: string;

  @ApiProperty({
    example: 1,
    description: 'Is letigation',
  })
  is_litigation: number;

  @ApiProperty({
    example: 'Jim Preston',
    description: 'Operator',
  })
  operator: boolean;

  @ApiProperty({
    example: '2024-11-28 12:50:22',
    description: 'First complaint on timestamp',
  })
  first_complaint_on: string;

  @ApiProperty({
    example: '2024-12-18 12:50:22',
    description: 'Last complaint on timestamp',
  })
  last_complaint_on: string;
}

export class DeletePhoneNumberDto {
  @ApiProperty({
    example: 442,
    description: 'Phone number id',
  })
  id: number;
}

export class PhoneNumber extends CreatePhoneNumberDto {
  @ApiProperty({
    example: 1152563339331315300,
    description: 'Id value',
  })
  id: number;

  @ApiProperty({
    example: '2024-11-28 12:50:22',
    description: 'Created on timestamp',
  })
  created_on: string;

  @ApiProperty({
    example: '2024-11-28 12:50:22',
    description: 'Last changed timestamp',
  })
  last_changed_on: string;
}

export class PaginatedResponseDto {
  @ApiProperty({ isArray: true, type: () => Object })
  data: PhoneNumber[];

  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}
