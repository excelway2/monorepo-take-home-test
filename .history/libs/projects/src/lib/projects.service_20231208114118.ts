import { Prisma, PrismaClient, Project } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export class ProjectsService {

  // async findAll(): Promise<Project[]> {
  //   return await prisma.project.findMany();
  // }
  async findAllSortedByOrder(): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        orderBy: {
          order: 'asc',
        },
      });
    } catch (error) {
      // Handle errors if necessary
      throw new Error('Unable to fetch projects. Please try again later.');
    }
  }

  async findOne(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<Project | null> {
    try {
      // Find the project to be deleted to get its order value
      const projectToDelete = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!projectToDelete) {
        throw new Error(`Project with ID ${id} not found.`);
      }

      // Delete the project
      await prisma.project.delete({
        where: {
          id,
        },
      });

      // Get all remaining projects sorted by order
      const remainingProjects = await this.findAllSortedByOrder();

      // Update the order field for the remaining projects
      for (let i = 0; i < remainingProjects.length; i++) {
        const project = remainingProjects[i];
        if (project.order > projectToDelete.order) {
          // Decrement the order for projects that were after the deleted project
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

      return projectToDelete; // Return the deleted project if needed
    } catch (error) {
      // Handle errors if necessary
      throw new Error('Unable to delete the project. Please try again later.');
    }
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {

      // Find the maximum 'order' value
      const projects = await this.findAllSortedByOrder();
      const maxOrder = projects.length > 0 ? projects[projects.length - 1].order : 0;

      // Increment the 'order' for the new project
      const newData: Prisma.ProjectCreateInput = {
        ...data,
        order: maxOrder + 1,
      };

      // Create the new project with the updated 'order' field
      return await prisma.project.create({
        data: newData,
      });
    } catch (error) {
      // Handle errors if necessary
      throw new Error('Unable to create the project. Please provide valid data.');
    }
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return await prisma.project.update({
      where: {
        id,
      },
      data,
    });
  }

}
