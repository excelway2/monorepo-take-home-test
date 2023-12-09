import { Prisma, PrismaClient, Project } from '@prisma/client';
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllSortedByOrder(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany({
        orderBy: {
          order: 'asc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch projects. Please try again later.');
    }
  }

  async findOne(id: string): Promise<Project | null> {
    try {
      return await this.prisma.project.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Project with ID ${id} not found.`);
    }
  }

  async remove(id: string): Promise<Project | null> {
    try {
      const projectToDelete = await this.prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!projectToDelete) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      await this.prisma.project.delete({
        where: {
          id,
        },
      });

      const remainingProjects = await this.findAllSortedByOrder();

      for (let i = 0; i < remainingProjects.length; i++) {
        const project = remainingProjects[i];
        if (project.order > projectToDelete.order) {
          await this.prisma.project.update({
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

      return await this.prisma.project.create({
        data: newData,
      });
    } catch (error) {
      throw new BadRequestException('Unable to create the project. Please provide valid data.');
    }
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    try {
      return await this.prisma.project.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new BadRequestException('Unable to update the project. Please provide valid data.');
    }
  }
}
