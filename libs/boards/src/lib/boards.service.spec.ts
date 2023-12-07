import { Test } from '@nestjs/testing';
import { BoardsService } from './boards.service';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
