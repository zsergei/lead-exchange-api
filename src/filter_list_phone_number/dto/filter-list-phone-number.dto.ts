import { ApiProperty } from '@nestjs/swagger';

export class CreateFilterListPhoneNumberDto {
  @ApiProperty({
    example: 'c64fdcd3-930f-442b-b1ea-948292a3e57b',
    description: 'Related filter list',
  })
  filter_list_uuid: string;

  @ApiProperty({
    example: '01112223423',
    description: 'Phone number',
  })
  lrn: string;
}

export class DeleteFilterListPhoneNumberDto {
  @ApiProperty({
    example: 'c64fdcd3-930f-442b-b1ea-948292a3e57b',
    description: 'Related filter list',
  })
  filter_list_uuid: string;

  @ApiProperty({
    example: '01112223423',
    description: 'Phone number',
  })
  lrn: string;
}

export class FilterListPhoneNumberDto {
  @ApiProperty({
    example: 'dfs90df9-dfgdfks384293-sdfjkdfgndlfgd-sdfsdlll',
    description: 'Filter list/phone number uuid',
  })
  uuid: string;
}
