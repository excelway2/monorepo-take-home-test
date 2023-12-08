import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../project.service';
import { Project } from '@prisma/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../styles.css'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  viewProject(id: string): void {
    this.router.navigate(['projects', id]);
  }

  navigateToAddProject(): void {
    this.router.navigate(['add-project']);
  }
}
