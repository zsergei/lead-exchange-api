import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseFinishController } from './purchase_finish.controller';

describe('PurchaseFinishController', () => {
  let controller: PurchaseFinishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseFinishController],
    }).compile();

    controller = module.get<PurchaseFinishController>(PurchaseFinishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
