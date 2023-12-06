import { Injectable } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  public getProjects(): Promise<Project[]> {
    return prisma.project.findMany();
  }
}
