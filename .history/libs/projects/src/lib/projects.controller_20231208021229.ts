import { Prisma } from '@prisma/client';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
    return project;
  }

  @Post()
  async create(@Body() projectData: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectsService.createProject(projectData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() projectData: Partial<Project>): Promise<Project> {
    const updatedProject = await this.projectsService.updateProject(id, projectData);
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
    return updatedProject;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    const deletedProject = await this.projectsService.remove(id);
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
    return deletedProject;
  }
}
