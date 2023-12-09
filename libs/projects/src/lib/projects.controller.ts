import {Body,Post, Controller, Delete, Get, Param, Put} from "@nestjs/common";
import {Project} from "@prisma/client"
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('')
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Post('add')
  createProject(@Body() project: Project) {
    return this.projectsService.createProject(project);
  }

  @Put('edit/:id')
  editProject(@Param('id') id: string, @Body() edited : Project) {
    return this.projectsService.editProject(id, edited);
  }

  @Delete ('delete/:id')
  deleteProject(@Param('id') id: string){
    return this.projectsService.deleteProject(id);
  }
}
