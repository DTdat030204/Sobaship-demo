import { Test, TestingModule } from '@nestjs/testing';
import { EngineActivityLogController } from './engine-activity-log.controller';
import { EngineActivityLogService } from './engine-activity-log.service';

describe('EngineActivityLogController', () => {
  let controller: EngineActivityLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineActivityLogController],
      providers: [EngineActivityLogService],
    }).compile();

    controller = module.get<EngineActivityLogController>(EngineActivityLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
