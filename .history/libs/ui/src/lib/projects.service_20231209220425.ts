/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary Angular modules and dependencies
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  // API URL where the service interacts with project data
  private API_URL = 'http://localhost:3333/api';

  // Method to retrieve the API URL
  public getAPI() {
    return this.API_URL;
  }

  // Constructor to initialize the HTTP client
  constructor(public http: HttpClient) {}

  // Method to fetch all projects
  public getAllProjects(): Observable<Project[]> {
    const url = `${this.API_URL}/projects`;
    return this.http.get<Project[]>(url);
  }

  // Method to delete a project by its ID
  public deleteProject = (id: string) => {
    const url = `${this.API_URL}/projects/${id}`;
    return this.http.delete<Project>(url);
  }

  // Method to retrieve a project by its ID
  public getProjectById = (id: string): Observable<Project> => {
    const url = `${this.API_URL}/projects/${id}`;
    return this.http.get<Project>(url);
  }
  
  // Method to update the order between two projects
  updateOrderBetweenProjects(
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
    return this.http.post<any>(url, body);
  }
}
