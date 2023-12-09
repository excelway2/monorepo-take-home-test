import { Priority, PrismaClient, Project } from '@prisma/client';
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

  // added
  async update(id: string, data: { title?: string; description?: string; priority?: Priority,order?:number }) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }
  async updatePriority(id: string, order: number) {
    return await prisma.project.update({
      where: { id },
      data: { order },
    });
  }
  async create(data: { title: string; description: string; priority:Priority,order:number }) {
    return await prisma.project.create({
      data,
    });
  }
  async findByOrder(order: number): Promise<Project | null> {
    return await prisma.project.findFirst({
      where: {
        order: Number(order),
      },
    });
  }
  async findByTitle(title: string): Promise<Project | null> {
    return await prisma.project.findFirst({
      where: {
        title: title,
      },
    });
  }
  
}
