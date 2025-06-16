import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
      super();
      console.log('Database URL:', process.env.DATABASE_URL);
  }

  async onModuleInit() {
    await this.$connect();
  }

  
    
  async enableShutdownHooks(app: INestApplication) {
    // this.$on?.('beforeExit', async () => {
    //   await app.close();
      // });
    (this as any).$on('beforeExit', async () => {
        await app.close();
    });
      
    
    }
   
}
