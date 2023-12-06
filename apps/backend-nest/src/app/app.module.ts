import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ProjectsController,
  ProjectsService,
} from '@monorepo-take-home-test/projects';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
