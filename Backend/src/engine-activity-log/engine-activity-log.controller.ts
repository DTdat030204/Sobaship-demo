import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EngineActivityLogService } from './engine-activity-log.service';
import { CreateEngineActivityLogDto } from './dto/engine-activity-log.dto';

@Controller('engine-activity-log')
export class EngineActivityLogController {
  constructor(private readonly engineActivityLogService: EngineActivityLogService) {}

  @Post()
  create(@Body() createEngineActivityLogDto: CreateEngineActivityLogDto) {
    return this.engineActivityLogService.create(createEngineActivityLogDto);
  }

  @Get()
  findAll() {
    return this.engineActivityLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineActivityLogService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineActivityLogService.remove(+id);
  }
}
