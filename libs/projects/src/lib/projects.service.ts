import { PrismaClient, Project, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  
  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany({
      orderBy: { order: 'asc' }, 
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    const lastProject = await prisma.project.findFirst({
      orderBy: { order: 'desc' }, 
    });
  
    const newOrder = (lastProject?.order ?? 0) + 1; 
    return await prisma.project.create({
      data: { ...data, order: newOrder }, 
    });
  }

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    return await prisma.project.update({
      where: {
        id,
      },
      data,
    });
  }  

  async remove(id: string) {
    const deletedProject = await prisma.project.delete({
      where: { id },
    });
  
    const remainingProjects = await prisma.project.findMany();
    await Promise.all(
      remainingProjects.map(async (project, index) => {
        await prisma.project.update({
          where: { id: project.id },
          data: { order: index + 1 },
        });
      })
    );
  
    return deletedProject;
  }
  
}
