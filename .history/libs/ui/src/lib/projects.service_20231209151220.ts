/* eslint-disable @typescript-eslint/no-explicit-any */
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
  
  public updateOrderBetweenProjects(
    projectId1: string,
    order1: number,
    projectId2: string,
    order2: number
  ): Observable<any> {
    const url = `${this.API_URL}/projects/updateOrderBetween`;
    const body = {
      projectId1,
      order1,
      projectId2,
      order2,
    };
    return this.http.put<any>(url, body);
  }

}
