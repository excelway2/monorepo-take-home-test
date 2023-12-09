import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
import { map } from 'rxjs/operators';
import { SingleProjectRes } from './models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<{ projects: Project[] }>(`${this.API_URL}/projects`)
      .pipe(
        map(response => response.projects)
      );
  }
  
  public getOnlyProject(id: string): Observable<SingleProjectRes>{
    return this.http.get<SingleProjectRes>(`${this.API_URL}/projects/${id}`)
  }

  public persistProject(data: Partial<Project>){
    return this.http.post<Project>(`${this.API_URL}/projects`, data);
  }

  public patchProject(id: string, data: Partial<Project>){
    return this.http.patch<Project>(`${this.API_URL}/projects/${id}`, data)
  }

  public deleteProject(id: string){
    return this.http.delete<Project>(`${this.API_URL}/projects/${id}`);
  }
  

  

  
}
