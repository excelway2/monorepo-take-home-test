import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, NotFoundException, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {

  constructor(private projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project: ID ${id} not found`);
    }
    return project;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async create(@Body() createProjectDto: ProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: ProjectDto) {
    const updatedProject = await this.projectsService.update(id, updateProjectDto);
    if (!updatedProject) {
      throw new NotFoundException(`Project: ID ${id} not found`);
    }
    return updatedProject;
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingProject = await this.projectsService.findOne(id);

    if (!existingProject) {
      throw new NotFoundException(`Project: ${id} not found`);
    }

    const deletedProject = await this.projectsService.remove(id);
    return { 
      message: `Project: ID ${id} has been deleted successfully`,
      deletedProject
    };
  }


}




