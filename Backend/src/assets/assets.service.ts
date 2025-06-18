// Đây là file chứa các logic về việc quản lý tài sản (thêm, sửa xóa, lấy danh sách).

// import decorate này để đánh dấu class đó là Service, có thể đc ịnect vào các class khác nếu muốn.
import { Injectable } from '@nestjs/common';
// Đây là class giúp ta gọi DB bằng prisma.
import { PrismaService } from '../prisma/prisma.service';
// import 2 class dto. 
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {
  // inject PrismaService thông qua constructor => để có thể dùng this.prisma.asset gọi db. (Đó gọi là Dependence Injection.)
  constructor(private prisma: PrismaService) {}

  // Hàm này đc dùng để có thể tạo mới 1 tài sản (dto là dữ liệu đầu vào đc gởi từ Controller(REST API)).
  async create(dto: CreateAssetDto) {
    // Gọi Prisma để tạo 1 RECORD Asset mới. 
    const asset = await this.prisma.asset.create({
      // Ở đây thì copy toàn bộ field trong dto vào. (nhưng vẫn có các field cần xử lý thêm.)
      data: {
        ...dto,
        purchaseDate: new Date(dto.purchaseDate),
        lastMaintenanceDate: dto.lastMaintenanceDate ? new Date(dto.lastMaintenanceDate) : undefined,
        nextMaintenanceDate: dto.nextMaintenanceDate ? new Date(dto.nextMaintenanceDate) : undefined,
      },
    });
    return asset;
  }

  async findAll() {
    return this.prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }



  
  async findByName(name: string) {
    return this.prisma.asset.findMany({
      where: { name: { contains: name, mode: 'insensitive' } }, 
      orderBy: { createdAt: 'desc' },
    });
  }


  async findByGroup(group: string) {
    return this.prisma.asset.findMany({
      where: { group:{ contains: group, mode: 'insensitive' }  }, 
      orderBy: { createdAt: 'desc' },
    });
  }

  
  async findByStatus(status: string) {
    return this.prisma.asset.findMany({
      where: { status:{ contains: status, mode: 'insensitive' }  }, 
      orderBy: { createdAt: 'desc' },
    });
  }


  async update(id: number, dto: UpdateAssetDto) {
    return this.prisma.asset.update({
      where: { id },
      data: {
        ...dto,
        purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
        lastMaintenanceDate: dto.lastMaintenanceDate ? new Date(dto.lastMaintenanceDate) : undefined,
        nextMaintenanceDate: dto.nextMaintenanceDate ? new Date(dto.nextMaintenanceDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
