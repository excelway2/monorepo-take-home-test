/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $Enums, Project } from '@prisma/client';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../projects.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService extends ProjectsService{

  constructor(http: HttpClient) {
    super(http);
  }

  public updateProject(id: string, updatedProjectData: any): Observable<Project> {
    return this.http.put<Project>(`${this.getAPI()}/projects/${id}`, updatedProjectData);
  }

  async checkOrderExists(order: number, currentProjectId: string): Promise<boolean> {
    try {
       const projects:_Project[] = await this.http.get<Project[]>(`${this.getAPI()}`).toPromise();

      const foundProject = projects.find(project => project.order === order && project.id !== currentProjectId);
      return !!foundProject; // Returns true if order exists in another project
    } catch (error) {
      console.error('Error while checking order:', error);
      return false;
    }
  }
}
interface _Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  priority: $Enums.Priority;
  order: number;
}