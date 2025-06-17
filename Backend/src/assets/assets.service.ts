import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAssetDto) {
    const asset = await this.prisma.asset.create({
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



  
  async findOne(id: number) {
    return this.prisma.asset.findUnique({
      where: { id },
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
