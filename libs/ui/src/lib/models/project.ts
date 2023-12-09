export interface Project {
    id: string;
    title: string;
    description?: string | null;
    created_at: Date;
    updated_at: Date;
    priority: Priority;
    order: number;
}
  
export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface SingleProjectRes {
    success: boolean;
    project: Project;
}