// Import necessary Angular modules and dependencies
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {
  // API URL where the project will be added
  private API_URL = 'http://localhost:3333/api';

  // Constructor to initialize the HTTP client
  constructor(public http: HttpClient) {}

  // Method to add a new project
  public addProject = (newProject: Project): Observable<Project> => {
    // Construct the URL for adding a new project
    const url = `${this.API_URL}/projects`;

    // Send an HTTP POST request to add a new project
    return this.http.post<Project>(url, newProject);
  }
}
