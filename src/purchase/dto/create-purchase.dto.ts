import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({
    example: 'balance',
    description: 'Payment gateway - btcpay|balance',
  })
  payment_gateway: string;

  @ApiProperty({
    example: 2,
    description: 'Amount',
  })
  amount: number;

  @ApiProperty({
    example: '84ed3253-4c60-4001-89c3-9217b7685f63',
    description: 'Filter list uuid',
  })
  filter_list_uuid: string;

  @ApiProperty({
    example: 'US',
    description: 'Country',
  })
  country: string;

  @ApiProperty({
    example: 'FL',
    description: 'State',
  })
  state: string;

  @ApiProperty({
    example: 'npa-n12-0098',
    description: 'Phone number in npa format',
  })
  npa: string;

  @ApiProperty({
    example: true,
    description: 'Is dno flag',
  })
  is_dno: boolean;

  @ApiProperty({
    example: false,
    description: 'Is dnc flag',
  })
  is_dnc: boolean;

  @ApiProperty({
    example: false,
    description: 'Is litigation flag',
  })
  is_litigation: boolean;
}

export class CreatePurchaseResultDto {
  @ApiProperty({
    example: true,
    description: 'Status',
  })
  success: boolean;

  @ApiProperty({
    example: 'https://example.com/i/QEDpz',
    description: 'Payment link',
  })
  paymentUrl: string;
}

export class FinishPurchaseDto {}

export class FinishPurchaseResultDto {}
