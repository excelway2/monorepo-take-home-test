import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Priority, Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Post()
  async  create(@Body() project: { title: string; description: string;priority: Priority;order:number}) {
    return await this.projectsService.create(project);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() project: { title?: string; description?: string;priority?: Priority;order?:number}) {
    return await this.projectsService.update(id, project);
  }

  @Delete(':id')
  async  remove(@Param('id') id: string) {
    return await this.projectsService.remove(id);
  }
  @Patch(':id/update-priority')
  async updatePriority(@Param('id') id: string, @Body('priority') priority: number) {
    return await this.projectsService.updatePriority(id, priority);
  }
  @Get('findByOrder/:order')
  async findByOrder(@Param('order') order: number): Promise<Project | null> {
    return await this.projectsService.findByOrder(order);
  }
  @Get('findByTitle/:title')
  async findByTitle(@Param('title')  title : string): Promise<Project | null> {
    return await this.projectsService.findByTitle(title);
  }
}
