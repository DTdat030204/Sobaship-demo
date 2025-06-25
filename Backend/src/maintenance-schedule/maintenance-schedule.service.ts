import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAutoMaintenanceDto, CreateManualMaintenanceDto } from './dto/maintenance-schedule.dto';

@Injectable()
export class MaintenanceScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    // Kiểm tra Asset có tồn tại không
    const asset = await this.prisma.asset.findUnique({ where: { id: dto.assetId } });
    if (!asset) {
      throw new NotFoundException(`Ko tìm thấy tài sản với id: ${dto.assetId}`);
    }

    // Tạo MaintenanceSchedule mới
    const schedule = await this.prisma.maintenanceSchedule.create({
      data: {
        assetId: dto.assetId,
        maintenanceType: dto.maintenanceType,
        maintenanceIntervalMonths: dto.maintenanceIntervalMonths,
        maintenanceDate: new Date(dto.maintenanceDate),
        note: dto.note,
      },
    });
    return schedule;
  }

  async findAll(status?: string) {
    return this.prisma.maintenanceSchedule.findMany({
      orderBy: { maintenanceDate: 'asc' },
      include: {
        asset: {
          select: { name: true, group: true },
        },
      },
    });
  }

  async confirm(id: number, cost: number) {
    const schedule = await this.prisma.maintenanceSchedule.findUnique({ where: { id } });
  
    if (!schedule) {
      return { message: `Ko tìm thấy lịch bảo trì với mã: ${id}.` };
    }
  
    if (schedule.status === 'done') {
      return { message: `Lịch bảo trì đã được xác nhận trước đó rồi.` };
    }
  
    return this.prisma.maintenanceSchedule.update({
      where: { id },
      data: {
        status: 'done',
        cost, // cập nhật chi phí
      },
    });
  }
  

  async getTotalCostByAsset(assetId: number) {
    const result = await this.prisma.maintenanceSchedule.aggregate({
      where: {
        assetId: assetId,
        cost: { not: null }
      },
      _sum: {
        cost: true,
      },
    });
    return {
      assetId,
      totalMaintenanceCost: result._sum.cost ?? 0,        // nếu null thì trả về 0.
    };
  }
  
}
