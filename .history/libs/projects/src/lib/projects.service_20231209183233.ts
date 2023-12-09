import { Prisma, PrismaClient, Project } from '@prisma/client';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export class ProjectsService {

  async findAllSortedByOrder(): Promise<Project[]> {
    try {
      return await prisma.project.findMany({
        orderBy: {
          order: 'asc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch projects. Please try again later.');
    }
  }
  
  async findOne(id: string): Promise<Project> {
    const foundProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });
  
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
  
    return foundProject;
  }
  
  async remove(id: string): Promise<Project> {
    try {
      const projectToDelete = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!projectToDelete) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      await prisma.project.delete({
        where: {
          id,
        },
      });

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

      return projectToDelete;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Unable to delete the project. Please try again later.');
      }
    }
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {
      const projects = await this.findAllSortedByOrder();
      const maxOrder = projects.length > 0 ? projects[projects.length - 1].order : 0;

      const newData: Prisma.ProjectCreateInput = {
        ...data,
        order: maxOrder + 1,
      };

      return await prisma.project.create({
        data: newData,
      });
    } catch (error) {
      throw new BadRequestException('Unable to create the project. Please provide valid data.');
    }
  }
  
  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    try {
      const projectToUpdate = await prisma.project.findUnique({
        where: {
          id,
        },
      });
  
      if (!projectToUpdate) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }
  
      const { order: newOrder } = data;
  
      // Check if the new order is different from the current order
      if (newOrder !== undefined && newOrder !== projectToUpdate.order) {
        const existingProjectWithNewOrder = await prisma.project.findFirst({
          where: {
            order: Number(newOrder),
            id: {
              not: id,
            },
          },
        });
  
        // If another project already has the new order, perform the switch
        if (existingProjectWithNewOrder) {
          await prisma.project.update({
            where: {
              id: existingProjectWithNewOrder.id,
            },
            data: {
              order: projectToUpdate.order,
            },
          });
  
          // Update the project with the new order
          return await prisma.project.update({
            where: {
              id,
            },
            data,
          });
        }
      }
  
      // If the new order doesn't exist, update the project without switching
      return await prisma.project.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new BadRequestException('Unable to update the project. Please provide valid data.');
    }
  }
    
    async updateOrderBetween(
      project1: Project,
      order1: number,
      project2: Project,
      order2: number
    ): Promise<void> {
      try {
        // Your existing logic to fetch projects...
  
        // Update the orders between the two projects
        await prisma.project.update({
          where: { id: project1.id },
          data: { order: order2 },
        });
  
        await prisma.project.update({
          where: { id: project2.id },
          data: { order: order1 },
        });
  
        // Fetch all projects again after the update
        const updatedProjects = await this.findAllSortedByOrder();
  
        // Ensure a successive order for all projects after the update
        await this.fixSuccessiveOrder(updatedProjects);
      } catch (error) {
        throw new InternalServerErrorException('Failed to update order between projects.');
      }
    }
  
    // Existing methods...
  
    // Helper method to ensure successive order values
    async fixSuccessiveOrder(projects: Project[]): Promise<void> {
      try {
        for (let i = 0; i < projects.length; i++) {
          const currentProject = projects[i];
          if (currentProject.order !== i) {
            await prisma.project.update({
              where: { id: currentProject.id },
              data: { order: i },
            });
          }
        }
      } catch (error) {
        throw new InternalServerErrorException('Failed to ensure a successive order for projects.');
      }
    }

}