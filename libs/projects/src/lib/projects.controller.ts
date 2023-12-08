import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Post()
  async create(@Body() data: Project): Promise<{ success: boolean, message?: string, data?: Project | undefined }> {
    try {
    const createdProject = await this.projectsService.create(data);
    if(createdProject.success) {
      return {
        success: true,
        message: 'Project successfully added',
        data: createdProject?.data,
      };
    } 

    return {
      success: false,
      message: 'Project not added',
    };

   
  } catch (error:any) {
    return {
      success: false,
      message: error.message || 'Failed to add project',
      data: undefined,
    };
  }
  }

}
