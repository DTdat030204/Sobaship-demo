import { Test, TestingModule } from '@nestjs/testing';
import { EngineActivityLogService } from './engine-activity-log.service';

describe('EngineActivityLogService', () => {
  let service: EngineActivityLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineActivityLogService],
    }).compile();

    service = module.get<EngineActivityLogService>(EngineActivityLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
