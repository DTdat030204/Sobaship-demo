// src/maintenance-schedule/maintenance-schedule.controller.ts

import { Controller, Post, Body, Get, Query, Patch, Param } from '@nestjs/common';
import { MaintenanceScheduleService } from './maintenance-schedule.service';
import { ConfirmMaintenanceDto, CreateAutoMaintenanceDto, CreateManualMaintenanceDto } from './dto/maintenance-schedule.dto';
import { parse } from 'path';

@Controller('maintenance-schedules')
export class MaintenanceScheduleController {
  constructor(private readonly maintenanceScheduleService: MaintenanceScheduleService) {}

  // POST /maintenance-schedules
  // @Post()
  // create(@Body() createMaintenanceScheduleDto: CreateMaintenanceScheduleDto) {
  //   return this.maintenanceScheduleService.create(createMaintenanceScheduleDto);
  // }


  @Post('auto')
  createAuto(@Body() dto: CreateAutoMaintenanceDto) {
    return this.maintenanceScheduleService.create({
      ...dto, 
      maintenanceType: 'auto',
    })
  }

  @Post('manual')
  createManual(@Body() dto: CreateManualMaintenanceDto) {
    return this.maintenanceScheduleService.create({
      ...dto,
      maintenanceType: 'manual',
    })
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.maintenanceScheduleService.findAll(status);
  }


  @Patch(':id/confirm')
  confirmMaintenance(
    @Param('id') id: string,
    @Body() body: ConfirmMaintenanceDto,
  ) {
    return this.maintenanceScheduleService.confirm(+id, body.cost);
  }


  @Get('total-cost')
  getTotalCost(@Query('assetId') assetId: string) {
    const id = parseInt(assetId, 10);
    if (isNaN(id)) {
      return {message: `Không tồn tại id này.`}
    }
    return this.maintenanceScheduleService.getTotalCostByAsset(id);
  }
}
