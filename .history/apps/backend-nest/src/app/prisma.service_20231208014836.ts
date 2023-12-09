import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';

@Injectable()
export class MyService implements OnModuleInit {
  constructor(private readonly app: INestApplication) {}

  onModuleInit() {
    this.enableShutdownHooks(this.app);
  }

  enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
