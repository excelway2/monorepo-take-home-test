import { Priority } from '@prisma/client';
import { ProjectDto } from './dto/project.dto';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
  order: number;
}

export interface PromiseReturn {
  message: string;
  project: Project;
}

export interface UpdateBody {
  title: string;
  description: string;
  priority: Priority;
}
