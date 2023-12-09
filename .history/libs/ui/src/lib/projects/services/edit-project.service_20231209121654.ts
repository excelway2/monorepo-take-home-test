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
}
