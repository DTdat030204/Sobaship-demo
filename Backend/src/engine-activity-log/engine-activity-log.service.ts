import { Injectable } from '@nestjs/common';
import { CreateEngineActivityLogDto } from './dto/engine-activity-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { constants } from 'buffer';

@Injectable()
export class EngineActivityLogService { 

  constructor(private prisma: PrismaService) {}
  
  findAll() {
    return this.prisma.engineActivityLog.findMany({
    })
  }

  findOne(id: number) {
    return this.prisma.engineActivityLog.findUnique({
      where: {
        id
      },
    });
  }
 
  async remove(id: number) {                                 
    return this.prisma.engineActivityLog.delete({
      where: {
        id
      },
    });
  }

  async create(dto: CreateEngineActivityLogDto) {
    // validate
    const engine = await this.prisma.engine.findUnique({
      where: {
        id: dto.engineId,
      },
    });
    if (!engine) {
      return { message: `Không tìm thấy động cơ này.` };
    } 

    return this.prisma.engineActivityLog.create({
      data: {
        ...dto,                   // cách làm này như đã ghi lại ở asset thì sẽ trải tất cả các field từ đôi tượng dto ra. 
      },
    });
  } 
}
