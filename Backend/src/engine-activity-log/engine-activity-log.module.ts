import { Module } from '@nestjs/common';
import { EngineActivityLogService } from './engine-activity-log.service';
import { EngineActivityLogController } from './engine-activity-log.controller';

@Module({
  controllers: [EngineActivityLogController],
  providers: [EngineActivityLogService],
})
export class EngineActivityLogModule {}
