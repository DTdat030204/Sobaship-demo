import { Injectable } from '@nestjs/common';
import { CreateEngineActivityLogDto } from './dto/engine-activity-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EngineActivityLogService { 

  constructor(private prisma: PrismaService) {}
  
  findAll() {
    return `This action returns all engineActivityLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engineActivityLog`;
  }


  remove(id: number) {
    return `This action removes a #${id} engineActivityLog`;
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
