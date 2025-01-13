import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty({
    example: 'b06c9a98-fd50-490b-bc5d-f4aa0b9f0e03',
    description: 'User uuid',
  })
  user_uuid: string;

  @ApiProperty({
    example: 106290,
    description: 'Confirmation code',
  })
  code: number;
}
