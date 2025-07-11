import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) { }       // PrismaService ở đây là service dùng để giao tiếp với db. 
  // constructor là cách để thao tác với db.
  async create(dto: CreateAssetDto) {                     // Hàm này dùng để tạo mới 1 tài sản, tránh nhầm với create ở dưới           
    const asset = await this.prisma.asset.create({        // create để tạo mới 1 bản ghi. 
      data: {
        ...dto,                        // phần này là copy hết các field của dto mà truyền vào. 
        purchaseDate: new Date(dto.purchaseDate),               
      },
    });

    if (dto.group === "Động cơ") {
      await this.prisma.engine.create({
        data: {
          assetId: asset.id,                  // assetId ở đây là khóa ngoại của bảng engine để liên kết với bảng Asset đó.
        },
      });
    }

    return asset;
  }

  async findAll() {
    return this.prisma.asset.findMany({                
      orderBy: { createdAt: 'desc' },           // desc là viết tắt của descending (giảm dần), ở đây là mới nhất nhất lên trc. 
    });
  }

  async findByName(name: string) {
    return this.prisma.asset.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByGroup(group: string) {
    return this.prisma.asset.findMany({
      where: { group: { contains: group, mode: 'insensitive' } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.asset.findMany({
      where: { status: { contains: status, mode: 'insensitive' } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, dto: UpdateAssetDto) {
    return this.prisma.asset.update({
      where: { id },
      data: {
        ...dto,
        purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }

  async gettotalprice() {
    const result = await this.prisma.asset.aggregate({
      _sum: {
        price: true,
      },
    });

    return {
      totalAssetValue: result._sum.price ?? 0,
    };
  }

}



















// // Đây là file chứa các logic về việc quản lý tài sản (thêm, sửa xóa, lấy danh sách).

// // import decorate này để đánh dấu class đó là Service, có thể đc ịnect vào các class khác nếu muốn.
// import { Injectable, NotFoundException } from '@nestjs/common';
// // Đây là class giúp ta gọi DB bằng prisma.
// import { PrismaService } from '../prisma/prisma.service';
// // import 2 class dto.
// import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

// import { addMonths } from 'date-fns';

// @Injectable()
// export class AssetsService {
//   // inject PrismaService thông qua constructor => để có thể dùng this.prisma.asset gọi db. (Đó gọi là Dependence Injection.)
//   constructor(private prisma: PrismaService) {}

//   // Hàm này đc dùng để có thể tạo mới 1 tài sản (dto là dữ liệu đầu vào đc gởi từ Controller(REST API)).
//   async create(dto: CreateAssetDto) {
//     const lastMaintenanceDate = dto.lastMaintenanceDate ? new Date(dto.lastMaintenanceDate) : undefined;

//     // Nếu có lastMaintenanceDate + maintenanceIntervalMonths → tính nextMaintenanceDate
//     const nextMaintenanceDate = (lastMaintenanceDate && dto.maintenanceIntervalMonths)
//       ? addMonths(lastMaintenanceDate, dto.maintenanceIntervalMonths)
//       : undefined;
//     // Gọi Prisma để tạo 1 RECORD Asset mới.
//     const asset = await this.prisma.asset.create({
//       // Ở đây thì copy toàn bộ field trong dto vào. (nhưng vẫn có các field cần xử lý thêm.)
//       data: {
//         ...dto,
//         purchaseDate: new Date(dto.purchaseDate),
        
//         // nextMaintenanceDate: dto.nextMaintenanceDate ? new Date(dto.nextMaintenanceDate) : undefined,
//       },
//     });
//     return asset;
//   }

//   async findAll() {
//     return this.prisma.asset.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }



  
//   async findByName(name: string) {
//     return this.prisma.asset.findMany({
//       where: { name: { contains: name, mode: 'insensitive' } },
//       orderBy: { createdAt: 'desc' },
//     });
//   }


//   async findByGroup(group: string) {
//     return this.prisma.asset.findMany({
//       where: { group:{ contains: group, mode: 'insensitive' }  },
//       orderBy: { createdAt: 'desc' },
//     });
//   }

  
//   async findByStatus(status: string) {
//     return this.prisma.asset.findMany({
//       where: { status:{ contains: status, mode: 'insensitive' }  },
//       orderBy: { createdAt: 'desc' },
//     });
//   }


//   async update(id: number, dto: UpdateAssetDto) {
//     const lastMaintenanceDate = dto.lastMaintenanceDate ? new Date(dto.lastMaintenanceDate) : undefined;

//     // Nếu người dùng update có lastMaintenanceDate hoặc maintenanceIntervalMonths → tính lại nextMaintenanceDate
//     const nextMaintenanceDate = (lastMaintenanceDate && dto.maintenanceIntervalMonths)
//       ? addMonths(lastMaintenanceDate, dto.maintenanceIntervalMonths)
//       : undefined;
    
//     return this.prisma.asset.update({
//       where: { id },
//       data: {
//         ...dto,
//         purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
//       },
//     });
//   }

//   async remove(id: number) {
//     return this.prisma.asset.delete({
//       where: { id },
//     });
//   }


//   // async get_all_maintenance_schedule() {
//   //   return this.prisma.asset.findMany({
//   //     where: {                                  // ở đây dùng where để ;ọc ra các thông tin sản phẩm.
//   //       nextMaintenanceDate: { not: null },
//   //     },
//   //     orderBy: { nextMaintenanceDate: 'asc' },    // dùng orderBy để sắp xếp thứ tự các thông tin theo 1 trường nhất định.
//   //     select: {                                     // Dùng select để lựa chọn những thông tin đc xuất hiện.
//   //       name: true,
//   //       group: true,
//   //       nextMaintenanceDate: true,
//   //     },
//   //   });
//   // }
// }

