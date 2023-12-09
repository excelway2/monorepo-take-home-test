import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma, Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // GET /projects
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectsService.findAllSortedByOrder();
  }

  // GET /projects/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  // POST /projects
  @Post()
  async create(@Body() project: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectsService.createProject(project);
  }

  // PUT /projects/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() project: Partial<Project>): Promise<Project> {
    return this.projectsService.update(id, project);
  }

  // DELETE /projects/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}