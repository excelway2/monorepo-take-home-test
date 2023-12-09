import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';

  public getAPI(){
    return this.API_URL
  }

  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    const url = `${this.API_URL}/projects`;
    return this.http.get<Project[]>(url);
  }

  public deleteProject = (id: string) => {
    const url = `${this.API_URL}/projects/${id}`;
    return this.http.delete<Project>(url)
  }

  public getProjectById = (id: string):Observable<Project> => {
    const url = `${this.API_URL}/projects/${id}`;
    return this.http.get<Project>(url)
  }
  
}
