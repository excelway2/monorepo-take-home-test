import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma, Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // GET /projects - Fetches all projects sorted by order
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectsService.findAllSortedByOrder();
  }

  // GET /projects/:id - Retrieves a single project by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  // POST /projects - Creates a new project
  @Post()
  async create(@Body() project: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectsService.createProject(project);
  }

  // PUT /projects/:id - Updates an existing project partially
  @Put(':id')
  async update(@Param('id') id: string, @Body() project: Partial<Project>): Promise<Project> {
    return this.projectsService.update(id, project);
  }

  // POST /projects/updateOrderBetween - Reorders projects based on given positions
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
        // Subtract 1 from the order numbers to start from 0-based indexing
        const newOrder1 = order1 - 1;
        const newOrder2 = order2 - 1;

        await this.projectsService.updateOrderBetween(project1, newOrder1, project2, newOrder2);
      } else {
        // Logic to handle the case where orders are the same
        const newOrder2 = order2 - 1 + 1; // Incrementing by 1 to maintain uniqueness
        await this.projectsService.updateOrderBetween(project1, order1 - 1, project2, newOrder2);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order between projects.');
    }
  }

  // DELETE /projects/:id - Deletes a project by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove(id);
  }
}
