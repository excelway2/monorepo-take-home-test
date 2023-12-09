import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

// Import the parent service
import { ProjectsService } from '../../projects.service';
@Injectable({
  providedIn: 'root'
})
export class AddProjectService extends ProjectsService{

  constructor(http: HttpClient) {
    super(http);
  }

  // Service method to add a new project via HTTP POST request
  public addProject = (newProject: Project): Observable<Project> => {
    const url = `${this.getAPI()}/projects`;
    // POST request to the API to add a new project
    return this.http.post<Project>(url, newProject);
  }
}
