import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Project, Priority } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaClient) {}

// CRUD operations
  async getAllProjects(): Promise<Project[]> {
    return this.prisma.project.findMany({ orderBy: { order: 'asc' } });
  }

  async getProjectById(id: string): Promise<Project> {
    console.log('Requested project ID:', id);
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async createProject(projectData: { title: string; description?: string; priority: Priority }): Promise<Project> {
    const project = await this.prisma.project.create({ data: { ...projectData, order: 0 } });
    return project;
  }

  async updateProject(id: string, projectData: { title?: string; description?: string; priority?: Priority }): Promise<Project> {
    await this.getProjectById(id);
    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: projectData,
    });
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await this.getProjectById(id);
    await this.prisma.project.delete({ where: { id } });
  }
}
