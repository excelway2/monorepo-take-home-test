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

  public addProject = (newProject: Project): Observable<Project> => {
    const url = `${this.API_URL}/projects`;
    return this.http.post<Project>(url, newProject);
  }
}
