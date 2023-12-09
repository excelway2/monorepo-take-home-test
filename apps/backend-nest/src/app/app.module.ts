import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ProjectsController, ProjectsModule,
  ProjectsService,
} from '@monorepo-take-home-test/projects';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [ProjectsModule, PrismaModule],
  controllers: [AppController, ProjectsController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
