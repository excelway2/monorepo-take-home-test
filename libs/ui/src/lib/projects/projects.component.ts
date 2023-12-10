import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '@prisma/client';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {

  public $projects: Observable<Project[]> = new Observable<Project[]>();
  imageUrl = 'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService ) {}

  ngOnInit(): void {
    this.$projects = this.projectsService.getAllProjects();
  }

}
