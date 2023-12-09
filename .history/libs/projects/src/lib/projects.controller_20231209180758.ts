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

  @Post('updateOrderBetween')
async updateOrderBetween(
  @Body() orderData: { projectId1: string; projectId2: string; order1: number; order2: number }
): Promise<void> {
  try {
    const { projectId1, projectId2, order1, order2 } = orderData;

    const project1 = await this.projectsService.findOne(projectId1);
    const project2 = await this.projectsService.findOne(projectId2);

    // Ensure uniqueness in orders
    if (order1 !== order2) {
      await this.projectsService.updateOrderBetween(project1, order1, project2, order2);
    } else {
      // Logic to handle the case where orders are the same
      const newOrder2 = order2 + 1; // For example, increment order2 by 1
      await this.projectsService.updateOrderBetween(project1, order1, project2, newOrder2);
    }
  } catch (error) {
    throw new InternalServerErrorException('Failed to update order between projects.');
  }
}

  
  // DELETE /projects/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}