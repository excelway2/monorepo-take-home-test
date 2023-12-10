import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, NotFoundException, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './DTOS/project.dto';
// import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {

  constructor(private projectsService: ProjectsService) {}

  @Get()
  async findAll()  {
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
      message: `Project: ${id} has been deleted successfully`,
      deletedProject
    };
  }


}

// @Get()
//   async findAll(): Promise<{ success: boolean, projects?: Project[], message?: string }> {
//     try {
//       const projects = await this.projectsService.findAll();
//       if (!projects || projects.length === 0) {
//         throw new NotFoundException('No projects found');
//       }
//       return {
//         success: true,
//         projects: projects,
//       };
//     } catch (error : any) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<{ success: boolean, project?: Project, message?: string }> {
//     try {
//       const project = await this.projectsService.findOne(id);
//       if (!project) {
//         throw new NotFoundException(`Project: ID ${id} not found`);
//       }
//       return {
//         success: true,
//         project: project,
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }


//   @Post()
//   @UsePipes(new ValidationPipe({ transform: true }))
//   async create(@Body() createProjectDto: ProjectDto): Promise<{ success: boolean, createdProject?: Project, message?: string }> {
//     try {
//       const createdProject = await this.projectsService.create(createProjectDto);
//       return {
//         success: true,
//         createdProject: createdProject,
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() updateProjectDto: ProjectDto): Promise<{ success: boolean, updatedProject?: Project, message?: string }> {
//     try {
//       const updatedProject = await this.projectsService.update(id, updateProjectDto);
//       if (!updatedProject) {
//         throw new NotFoundException(`Project: ID ${id} not found`);
//       }
//       return {
//         success: true,
//         updatedProject: updatedProject,
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string): Promise<{ success: boolean, message?: string }> {
//     try {
//       const existingProject = await this.projectsService.findOne(id);
//       if (!existingProject) {
//         throw new NotFoundException(`Project: ID ${id} not found`);
//       }

//       await this.projectsService.remove(id);
//       return {
//         success: true,
//         message: `Project: ID ${id} has been deleted successfully`
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }
// }
