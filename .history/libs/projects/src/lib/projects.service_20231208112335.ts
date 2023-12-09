import { Prisma, PrismaClient, Project } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();
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

  async remove(id: string) {
    return await prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return await prisma.project.create({
      data,
    });
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
