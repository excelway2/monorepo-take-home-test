import { Priority } from '@prisma/client';

export class ProjectDto {
  id?: string;
  title!: string;
  description!: string;
  updated_at?: string;
  priority!: Priority;
}
