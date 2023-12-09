import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';
import { ProjectModel } from '../lib/Project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api/projects';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}`);
  }
  public getProjectById(){
   
  }
  public changeProjectOrder(){

  }
  public createProject(project:ProjectModel){
    return this.http.post<Project>(this.API_URL,project);
  }
  public findByOrder(order: number): Observable<Project | null> {
    return this.http.get<Project | null>(`${this.API_URL}/findByOrder/${order}`);
  }
  public findByTitle(title: string): Observable<Project | null> {
    return this.http.get<Project | null>(`${this.API_URL}/findByTitle/${title}`);
  }
  checkOrderIfExist(existingOrders: number): Observable<boolean> {
    return this.findByOrder(existingOrders).pipe(
      map((project) => !!project) // Convert the result to a boolean
    );
  }
  checkTitleIfExist(existingTitle: string): Observable<boolean> {
    return this.findByTitle(existingTitle).pipe(
      map((project) => !!project) // Convert the result to a boolean
    );
  }
  deleteProject(projectId: string):Observable<void>{
 return this.http.delete<void>(`${this.API_URL}/${projectId}`)
  }
}
