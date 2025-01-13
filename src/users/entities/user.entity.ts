import { ApiProperty } from '@nestjs/swagger';

export class UserId {
  @ApiProperty({
    example: 'b06c9a98-fd50-490b-bc5d-f4aa0b9f0e03',
    description: 'User id',
  })
  id: string;
}
