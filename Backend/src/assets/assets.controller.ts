import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() dto: CreateAssetDto) {
    return this.assetsService.create(dto);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get('by-name/:name')
  findByName(@Param('name') name: string) {
    return this.assetsService.findByName(name);
  }

  
  @Get('by-group/:group')
  findByGroup(@Param('group') group: string) {
    return this.assetsService.findByGroup(group);
  }

  @Get('by-status/:status')
  findByStatus(@Param('status') status: string) {
    return this.assetsService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAssetDto) {
    return this.assetsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }


  @Get('all_maintenance_schedule')
  get_all_maintennnce_schedule() {
    return this.assetsService.get_all_maintenance_schedule();
  }
  
}
