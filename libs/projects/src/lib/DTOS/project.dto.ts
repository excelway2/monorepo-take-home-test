import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'node_modules/class-validator';
import { Priority } from '@prisma/client';

export class ProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string = '';

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(Priority)
    priority: Priority = Priority.LOW;

    @IsOptional()
    @IsInt()
    order:number = 0;
}
