import { Observable } from 'rxjs';
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
    return this.http.get<Project[]>(`${this.API_URL}/projects`);
  }

  public getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/projects/${id}`);
  }

  public createProject(data: Partial<Project>){
    return this.http.post<Project>(`${this.API_URL}/projects`, data);
  }

  public updateProject(id: string, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/projects/${id}`, data);
  }

  public deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/projects/${id}`);
  }

}
