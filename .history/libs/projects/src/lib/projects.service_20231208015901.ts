import { PrismaClient, Project } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Project } from './projects.model';

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

  async createProject(data: Project): Promise<Project | null>{
    return prisma.project.create({
      data,
    })
  }
}
