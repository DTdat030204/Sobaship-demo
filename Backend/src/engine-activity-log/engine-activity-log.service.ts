import { Injectable } from '@nestjs/common';
import { CreateEngineActivityLogDto } from './dto/create-engine-activity-log.dto';
import { UpdateEngineActivityLogDto } from './dto/update-engine-activity-log.dto';

@Injectable()
export class EngineActivityLogService {
  create(createEngineActivityLogDto: CreateEngineActivityLogDto) {
    return 'This action adds a new engineActivityLog';
  }

  findAll() {
    return `This action returns all engineActivityLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engineActivityLog`;
  }

  update(id: number, updateEngineActivityLogDto: UpdateEngineActivityLogDto) {
    return `This action updates a #${id} engineActivityLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} engineActivityLog`;
  }
}
