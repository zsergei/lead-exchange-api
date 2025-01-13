import { Test, TestingModule } from '@nestjs/testing';
import { RequestPhoneNumberService } from './request_phone_number.service';

describe('RequestPhoneNumberService', () => {
  let service: RequestPhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestPhoneNumberService],
    }).compile();

    service = module.get<RequestPhoneNumberService>(RequestPhoneNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
