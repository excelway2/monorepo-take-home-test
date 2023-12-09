import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma, Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // GET /projects
  @Get()
  async findAll(): Promise<Project[]> {
    try {
      // Fetch all projects
      return await this.projectsService.findAll();
    } catch (error) {
      // Catch and handle internal server errors
      throw new InternalServerErrorException('Unable to fetch projects. Please try again later.');
    }
  }

  // GET /projects/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    try {
      // Find a single project by ID
      const project = await this.projectsService.findOne(id);
      if (!project) {
        // Throw a not found exception if project is not found
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }
      return project;
    } catch (error) {
      // Handle specific errors, re-throw not found exceptions and handle other errors
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unable to fetch the project. Please try again later.');
    }
  }

  // POST /projects
  @Post()
  async create(@Body() projectData: Prisma.ProjectCreateInput): Promise<Project> {
    try {
      // Create a new project
      return this.projectsService.createProject(projectData);
    } catch (error) {
      // Handle bad request errors (e.g., invalid data)
      throw new BadRequestException('Unable to create the project. Please provide valid data.');
    }
  }

  // PUT /projects/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() projectData: Partial<Project>): Promise<Project> {
    try {
      // Update a project by ID
      const updatedProject = await this.projectsService.update(id, projectData);
      if (!updatedProject) {
        // Throw a not found exception if project is not found
        throw new NotFoundException(`Project with id = ${id} not found.`);
      }
      return updatedProject;
    } catch (error) {
      // Handle specific errors, re-throw not found exceptions and handle other errors
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unable to update the project. Please try again later.');
    }
  }

  // DELETE /projects/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    try {
      // Delete a project by ID
      const deletedProject = await this.projectsService.remove(id);
      if (!deletedProject) {
        // Throw a not found exception if project is not found
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }
      return deletedProject;
    } catch (error) {
      // Handle specific errors, re-throw not found exceptions and handle other errors
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unable to delete the project. Please try again later.');
    }
  }
}
