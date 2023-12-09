import { $Enums, Prisma } from "@prisma/client";

export class Project implements Prisma.ProjectCreateInput{
    
    id!: string;
    title!: string;
    description!: string;
    createdAt!: Date;
    updatedAt!: string;
    priority!: $Enums.Priority;
    order!: number;
    
}