import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {
  private API_URL = 'http://localhost:3333/api';

  constructor(public http: HttpClient) {}

  // Service method to add a new project via HTTP POST request
  public addProject = (newProject: Project): Observable<Project> => {
    const url = `${this.API_URL}/projects`;
    // POST request to the API to add a new project
    return this.http.post<Project>(url, newProject);
  }
}
