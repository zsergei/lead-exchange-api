import { ApiProperty } from '@nestjs/swagger';

export class UserRegister {
  @ApiProperty({
    example: 'b06c9a98-fd50-490b-bc5d-f4aa0b9f0e03',
    description: 'User id',
  })
  id: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Created on',
  })
  created_on: string;
}

export class UserVerifyEmail {
  @ApiProperty({
    example: 'b06c9a98-fd50-490b-bc5d-f4aa0b9f0e03',
    description: 'User id',
  })
  id: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: '2024-11-12 19:56:08+07',
    description: 'Last changed on',
  })
  last_changed_on: string;
}
