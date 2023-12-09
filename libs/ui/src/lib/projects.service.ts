import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../../../apps/frontend-angular/src/app/models/project.model';


@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/projects`);
  }

  public deleteProject(id : string) : Observable<any> {
    return this.http.delete(`${this.API_URL}/projects/delete/${id}`);
  }

  public createProject(project: Project) : Observable<any> {
    return this.http.post(`${this.API_URL}/projects/add`, project)
  }

  public editProject(id : string, project : Project) : Observable<any> {
    return this.http.put(`${this.API_URL}/projects/edit/${id}`, project)
  }

  public getProjectById(id : string) : Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/projects/${id}`)
  }
}
