import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Project } from '../../../../../apps/frontend-angular/src/app/models/project.model';
import { ProjectsService } from '../projects.service';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  public $projects: Observable<Project[]> = new Observable<Project[]>();
  imageUrl = 'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(private projectsService : ProjectsService) {}



  ngOnInit(): void {
    this.$projects = this.projectsService.getAllProjects();
  }

  onDeleteProject(id : string) {
    return this.projectsService.deleteProject(id).subscribe({
      next : (data) => {alert("project deleted successfully")},
      error : (err) => {alert("error")}
    })
  }
}
