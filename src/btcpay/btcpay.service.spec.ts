import { Test, TestingModule } from '@nestjs/testing';
import { BtcpayService } from './btcpay.service';

describe('BtcpayService', () => {
  let service: BtcpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcpayService],
    }).compile();

    service = module.get<BtcpayService>(BtcpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
