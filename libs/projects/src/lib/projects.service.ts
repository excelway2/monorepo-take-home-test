import { PrismaClient, Project } from '@prisma/client';
import { Injectable,Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger = new Logger('ProjectsService');

@Injectable()
export class ProjectsService {
  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Project): Promise<{ success: boolean, message?: string, data?: Project | undefined }> {
    try {
      const createdProject = await prisma.project.create({
        data,
      });

      // if project successfuly created
      return {
        success: true,
        message: 'Project successfully added',
        data: createdProject,
      };
    } catch (error:any) {

      //  if project creation fails
      return {
        success: false,
        message: error.message || 'Failed to add project',
        data: undefined,
      };
    }
  }

  async remove(id: string) {
    return await prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
