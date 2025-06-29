import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAutoMaintenanceDto, CreateManualMaintenanceDto } from './dto/maintenance-schedule.dto';

@Injectable()          // đây là 1 decorator 
export class MaintenanceScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    // Kiểm tra Asset có tồn tại không
    const asset = await this.prisma.asset.findUnique({ where: { id: dto.assetId } });
    if (!asset) {
      return {message: `Ko tìm thấy tài sản với id: ${dto.assetId}`};
    }

    // Tạo MaintenanceSchedule mới
    const schedule = await this.prisma.maintenanceSchedule.create({            // maintenanceSchedule là 1 bảng bên trong schema Prisma. 
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
    return this.prisma.maintenanceSchedule.findMany({  // FindMany ở đây là 1 hàm của PrismaClient dùng để truy vấn nhiều bản ghi từ 1 bảng trong CSDL.
      orderBy: { maintenanceDate: 'asc' },            // dùng các tham số truy vấn để thao tác với data.
      include: {
        asset: {
          select: { name: true, group: true },
        },
      },
    });
  }

  async confirm(id: number, cost: number) {
    const schedule = await this.prisma.maintenanceSchedule.findUnique({ where: { id } });   // Tìm 1 bản ghi duy nhất theo khóa chính (có trường unique.)
  
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
        cost, // cập nhật chi phí, vì lúc đầu cbi phí sẽ là null.
      },
    });
  }
  

  
  async getTotalCostByAsset(assetId: number) {
    const result = await this.prisma.maintenanceSchedule.aggregate({            // aggregate là hàm để dùng tính toán các giá trị tổng hợp.
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
