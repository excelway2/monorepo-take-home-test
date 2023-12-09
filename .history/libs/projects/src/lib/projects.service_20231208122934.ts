import { Prisma, PrismaClient, Project } from '@prisma/client';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

// Creating an instance of Prisma Client
const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {

  // Fetch all projects sorted by 'order' field in ascending order
  async findAllSortedByOrder(): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        orderBy: {
          order: 'asc',
        },
      });
    } catch (error) {
      // Throw InternalServerErrorException for unexpected errors
      throw new InternalServerErrorException('Unable to fetch projects. Please try again later.');
    }
  }

  // Find a project by its ID
  async findOne(id: string): Promise<Project> {
    try {
      return await prisma.project.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      // Throw NotFoundException if project with provided ID is not found
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
  }

  // Remove a project by its ID
  async remove(id: string): Promise<Project | null> {
    try {
      const projectToDelete = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!projectToDelete) {
        // Throw NotFoundException if project with provided ID is not found
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      // Delete the project from the database
      await prisma.project.delete({
        where: {
          id,
        },
      });

      // Get remaining projects sorted by order and update their order fields accordingly
      const remainingProjects = await this.findAllSortedByOrder();
      for (let i = 0; i < remainingProjects.length; i++) {
        const project = remainingProjects[i];
        if (project.order > projectToDelete.order) {
          await prisma.project.update({
            where: {
              id: project.id,
            },
            data: {
              order: project.order - 1,
            },
          });
        }
      }

      // Return the deleted project
      return projectToDelete;
    } catch (error) {
      // Handle specific errors, re-throw NotFoundException and handle other errors
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Unable to delete the project. Please try again later.');
      }
    }
  }

  // Create a new project with provided data
  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {
      // Find all projects sorted by order and determine the new project's order
      const projects = await this.findAllSortedByOrder();
      const maxOrder = projects.length > 0 ? projects[projects.length - 1].order : 0;

      // Assign an incremented order for the new project
      const newData: Prisma.ProjectCreateInput = {
        ...data,
        order: maxOrder + 1,
      };

      // Create the new project in the database
      return await prisma.project.create({
        data: newData,
      });
    } catch (error) {
      // Throw BadRequestException for invalid data provided for project creation
      throw new BadRequestException('Unable to create the project. Please provide valid data.');
    }
  }

  // Update an existing project by its ID with provided data
  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    try {
      // Update the project with the provided data
      return await prisma.project.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      // Throw BadRequestException for invalid data provided for project update
      throw new BadRequestException('Unable to update the project. Please provide valid data.');
    }
  }
}
