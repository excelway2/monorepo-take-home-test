import { Test } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

describe('BoardsController', () => {
  let controller: BoardsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BoardsService],
      controllers: [BoardsController],
    }).compile();

    controller = module.get(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
