import { Test, TestingModule } from '@nestjs/testing';
import { RequestPhoneNumberController } from './request_phone_number.controller';

describe('RequestPhoneNumberController', () => {
  let controller: RequestPhoneNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestPhoneNumberController],
    }).compile();

    controller = module.get<RequestPhoneNumberController>(RequestPhoneNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
