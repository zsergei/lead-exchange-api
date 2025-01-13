import { Test, TestingModule } from '@nestjs/testing';
import { FilterListsController } from './filter_lists.controller';

describe('FilterListsController', () => {
  let controller: FilterListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterListsController],
    }).compile();

    controller = module.get<FilterListsController>(FilterListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
