import { Controller, Get, Post, Body, Param, Delete, Patch} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ success: boolean; message?: string; data?: Project | undefined }> {
    try {
      const foundProject = await this.projectsService.findOne(id);
      if (foundProject) {
        return {
          success: true,
          message: 'Project found',
          data: foundProject,
        };
      }

      return {
        success: false,
        message: 'Project not found',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to find project',
        data: undefined,
      };
    }
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Project): Promise<{ success: boolean; message?: string; data?: Project | undefined }> {
    try {
      const updatedProject = await this.projectsService.update(id, data);

      if (updatedProject.success) {
        return {
          success: true,
          message: 'Project successfully updated',
          data: updatedProject?.data,
        };
      }

      return {
        success: false,
        message: 'Project not updated',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to update project',
        data: undefined,
      };
    }
  }

  

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const deletedProject = await this.projectsService.remove(id);
      if (deletedProject) {
        return {
          success: true,
          message: 'Project successfully deleted',
        };
      }

      return {
        success: false,
        message: 'Project not found or unable to delete',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to delete project',
      };
    }
  }

}
