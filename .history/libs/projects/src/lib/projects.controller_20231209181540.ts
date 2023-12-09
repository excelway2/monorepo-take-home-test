import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException } from '@nestjs/common';
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

  @Put('updateOrderBetween')
  async updateOrderBetween(
    @Body() orderData: { projectId1: string; projectId2: string; order1: number; order2: number }
  ): Promise<void> {
    try {
      const { projectId1, projectId2, order1, order2 } = orderData;
  
      const project1 = await this.projectsService.findOne(projectId1);
      const project2 = await this.projectsService.findOne(projectId2);
  
      // Check if orders are the same
      if (order1 === order2) {
        // Increment the order of project2 and adjust subsequent orders
        await this.incrementOrderAndFixConflicts(project2, order2);
      } else {
        // Update orders as usual
        await this.projectsService.updateOrderBetween(project1, order1, project2, order2);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order between projects.');
    }
  }
  
  async incrementOrderAndFixConflicts(project: Project, order: number): Promise<void> {
    // Increment order for the affected project
    const updatedOrder = order + 1;
  
    // Update the affected project's order
    await this.projectsService.updateProjectOrder(project, updatedOrder);
  
    // Adjust subsequent projects' orders to prevent conflicts
    const subsequentProjects = await this.projectsService.findProjectsAfterOrder(updatedOrder);
    for (const subProject of subsequentProjects) {
      await this.projectsService.updateProjectOrder(subProject, subProject.order + 1);
    }
  }
  


  
  // DELETE /projects/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}