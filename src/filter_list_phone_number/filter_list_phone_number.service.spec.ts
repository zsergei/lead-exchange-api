import { Test, TestingModule } from '@nestjs/testing';
import { FilterListPhoneNumberService } from './filter_list_phone_number.service';

describe('FilterListPhoneNumberService', () => {
  let service: FilterListPhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterListPhoneNumberService],
    }).compile();

    service = module.get<FilterListPhoneNumberService>(
      FilterListPhoneNumberService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
