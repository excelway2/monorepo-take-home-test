enum Priority {
  LOW,
  MEDIUM,
  HIGH
}


export interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
  order: number;
}
