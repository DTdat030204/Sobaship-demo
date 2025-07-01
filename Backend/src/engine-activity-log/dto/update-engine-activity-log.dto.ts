import { PartialType } from '@nestjs/swagger';
import { CreateEngineActivityLogDto } from './create-engine-activity-log.dto';

export class UpdateEngineActivityLogDto extends PartialType(CreateEngineActivityLogDto) {}
