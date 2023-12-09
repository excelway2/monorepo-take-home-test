/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary Angular modules and dependencies
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
import { Observable } from 'rxjs';

// Import the parent service
import { ProjectsService } from '../../projects.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService extends ProjectsService {
  // Constructor to initialize the HTTP client
  constructor(http: HttpClient) {
    super(http); // Call the constructor of the parent service with HttpClient dependency
  }

  // Method to update a specific project using its ID and updated data
  public updateProject(id: string, updatedProjectData: any): Observable<Project> {
    // Send an HTTP PUT request to update the project with the given ID and data
    return this.http.put<Project>(`${this.getAPI()}/projects/${id}`, updatedProjectData);
  }
}
