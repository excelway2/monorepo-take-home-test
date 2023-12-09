import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import {PrismaClient} from '@prisma/client'


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
 
    onModuleInit() {
        this.enableShutdownHooks(this.app);
      }
    
      enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
          await app.close();
        });
      }

}