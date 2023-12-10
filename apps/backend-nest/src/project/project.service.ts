import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { Priority, PrismaClient, Project } from '@prisma/client';
import { PromiseReturn, UpdateBody } from './project.interface';

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async addProject(
    projectData: ProjectDto
  ): Promise<PromiseReturn | undefined | unknown> {
    try {
      const new_project = await prisma.project.create({
        data: {
          title: projectData.title,
          description: projectData.description,
          priority: projectData.priority,
          order: 0,
        },
      });

      if (new_project) {
        return {
          message: 'Project created successfully !',
          project: new_project,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async updateProject(
    id: string,
    newInformation: UpdateBody
  ): Promise<PromiseReturn | undefined | unknown> {
    try {
      const updated_project = await prisma.project.update({
        where: {
          id,
        },
        data: {
          title: newInformation.title,
          description: newInformation.description,
          priority: newInformation.priority,
        },
      });

      if (updated_project) {
        return {
          message: 'Project Updated Successfully !',
          project: updated_project,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProject(id: string) {
    try {
      const deleted_project = await prisma.project.delete({
        where: {
          id,
        },
      });

      if (deleted_project) {
        return { message: 'Project Removed !' };
      }
    } catch (error) {
      return error;
    }
  }

  async getAllProjects() {
    try {
      const existing_projects = await prisma.project.findMany();

      if (existing_projects.length > 0) {
        return existing_projects;
      }
    } catch (error) {
      return error;
    }
  }

  async getProjectById(id: string): Promise<Project | undefined | unknown> {
    try {
      const existing_project = await prisma.project.findFirst({
        where: {
          id,
        },
      });

      if (existing_project) {
        return existing_project;
      }
    } catch (error) {
      return error;
    }
  }
}
