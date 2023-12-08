import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Project, Priority } from '@prisma/client';

@Controller('api/projects')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // CRUD endpoints
  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.appService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return this.appService.getProjectById(id);
  }

  @Post()
  async createProject(@Body() projectData: { title: string; description?: string; priority: Priority }): Promise<Project> {
    return this.appService.createProject(projectData);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() projectData: { title?: string; description?: string; priority?: Priority }
  ): Promise<Project> {
    return this.appService.updateProject(id, projectData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<void> {
    return this.appService.deleteProject(id);
  }
}

