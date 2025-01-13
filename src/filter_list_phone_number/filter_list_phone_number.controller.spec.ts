import { Test, TestingModule } from '@nestjs/testing';
import { FilterListPhoneNumberController } from './filter_list_phone_number.controller';

describe('FilterListPhoneNumberController', () => {
  let controller: FilterListPhoneNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterListPhoneNumberController],
    }).compile();

    controller = module.get<FilterListPhoneNumberController>(
      FilterListPhoneNumberController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
