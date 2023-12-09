/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../projects.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService extends ProjectsService{

  constructor(http: HttpClient) {
    super(http);
  }

  public updateProject(id: string, updatedProjectData: any): Observable<Project> {
    return this.http.put<Project>(`${this.getAPI()}/projects/${id}`, updatedProjectData);
  }

}