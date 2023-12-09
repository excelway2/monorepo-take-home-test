import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectsService } from '../../projects.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService extends ProjectsService{

  constructor(http: HttpClient) {
    super(http);
  }

  public updateProject(id: string, updatedProjectData: any): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, updatedProjectData);
  }
}
