import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { UpdateBody } from './project.interface';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  createProject(@Body() newProject: ProjectDto) {
    return this.projectService.addProject(newProject);
  }

  @Put('update/:id')
  updateProject(
    @Param('id') projectId: string,
    @Body() { title, description, priority }: UpdateBody
  ) {
    return this.projectService.updateProject(projectId, {
      title,
      description,
      priority,
    });
  }

  @Delete('delete/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Get('all')
  getProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }
}
