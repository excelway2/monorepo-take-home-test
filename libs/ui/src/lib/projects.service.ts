import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/project/all`).pipe(
      map((projects: Project[]) => {
        // Sort the projects by 'order' property
        return projects.sort((a, b) => b.order - a.order);
      })
    );
  }

  public removerProject(projectId: string) {
    return this.http
      .delete(`${this.API_URL}/project/delete/${projectId}`)
      .subscribe(
        (response) => {
          console.log('Success:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  public getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/project/${projectId}`);
  }

  public updateProject(projectId: string | null, data: Project) {
    return this.http
      .put(`${this.API_URL}/project/update/${projectId}`, data)
      .subscribe(
        (response) => {
          console.log('Success:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
