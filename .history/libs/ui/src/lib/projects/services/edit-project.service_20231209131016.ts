import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
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
      const projects: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
       projects = await this.http.get<Project[]>(`${this.getAPI()}`).toPromise();

      const foundProject = projects.find(project => project.order === order && project.id !== currentProjectId);
      return !!foundProject; // Returns true if order exists in another project
    } catch (error) {
      console.error('Error while checking order:', error);
      return false;
    }
  }
}
