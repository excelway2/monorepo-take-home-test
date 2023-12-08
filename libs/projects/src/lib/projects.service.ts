import { PrismaClient, Project } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export class ProjectsService {
  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany();
  }

  async create(data: Project): Promise<Project> {
    return prisma.project.create({
      data,
    });
  }

  // async findOne(id: string): Promise<Project | null> {
  //   return await prisma.project.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async remove(id: string) {
  //   return await prisma.project.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
