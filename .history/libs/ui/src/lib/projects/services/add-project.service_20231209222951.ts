// Import necessary Angular modules and dependencies
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
import { ProjectsService } from '../../projects.service';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService extends ProjectsService{

  // Constructor to initialize the HTTP client
  constructor(public http: HttpClient, private _projectService: ProjectsService) {
    super();
  }

  // API URL where the project will be added
  private override API_URL = this._projectService.getAPI();

  // Method to add a new project
  public addProject = (newProject: Project): Observable<Project> => {
    // Construct the URL for adding a new project
    const url = `${this.API_URL}/projects`;

    // Send an HTTP POST request to add a new project
    return this.http.post<Project>(url, newProject);
  }
}
