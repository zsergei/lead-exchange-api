import { Test, TestingModule } from '@nestjs/testing';
import { FilterListsService } from './filter_lists.service';

describe('FilterListsService', () => {
  let service: FilterListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterListsService],
    }).compile();

    service = module.get<FilterListsService>(FilterListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
