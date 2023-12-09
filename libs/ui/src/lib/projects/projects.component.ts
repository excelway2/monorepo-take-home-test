import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable, map } from 'rxjs';
import { Project } from '@prisma/client';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {

  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';


  constructor(public projectsService: ProjectsService,
    private router: Router) {}

  public $projects: Observable<Project[]> = new Observable<Project[]>();

  ngOnInit(): void {
    this.$projects = this.projectsService.getAllProjects();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'high-priority';
      case 'MEDIUM':
        return 'medium-priority';
      case 'LOW':
        return 'low-priority';
      default:
        return '';
    }
  }

  removeProject(id: string) {
    this.projectsService.deleteProject(id).subscribe(() => {
      this.$projects = this.$projects.pipe(
        map((projects: Project[]) => projects.filter(project => project.id !== id))
      );
    });
  }

  
  
}
