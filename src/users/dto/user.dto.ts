import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}

export class AuthTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpheXNlcnNlckBnbWFpbC5jb20iLCJzdWIiOiJiMDZjOWE5OC1mZDUwLTQ5MGItYmM1ZC1mNGFhMGI5ZjBlMDMiLCJpYXQiOjE3MzMxNTYxODksImV4cCI6MTczMzE1OTc4OX0.16Bzw_a5Y6bgsFXLkmjf_QAEqxqS4Gj783e237ofioo',
    description: 'Access token',
  })
  access_token: string;

  @ApiProperty({ example: true, description: 'Is admin flag' })
  is_admin: boolean;
}

export class AuthAdminDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Admin email',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}

export class CreateAdminDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({ example: true, description: 'Is admin flag' })
  is_admin: boolean;

  @ApiProperty({ example: true, description: 'Is email verified flag' })
  is_email_verified: boolean;
}

export class ForgotDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  email: string;
}

export class ResetDto {
  @ApiProperty({
    example: 'sdfsadf',
    description: 'New password',
  })
  newPassword: string;
}

export class AuthBalanceDto {
  @ApiProperty({
    example: '7bf50b4e-3289-4a45-9dfa-8d0425d81c5b',
    description: 'User id',
  })
  user_id: string;

  @ApiProperty({
    example: 10.99,
    description: 'Balance increase/decrease amount',
  })
  amount: number;
}

export class CreditDto {
  @ApiProperty({
    example: '7bf50b4e-3289-4a45-9dfa-8d0425d81c5b',
    description: 'User id',
  })
  id: string;
}
