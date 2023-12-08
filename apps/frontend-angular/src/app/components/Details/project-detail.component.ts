import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project.service';
import { Project } from '@prisma/client';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['../../../styles.css'],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project;
      });
    }
  }

  editProject(): void {
    if (this.project?.id) {
      this.router.navigate(['projects', this.project.id, 'edit']);
    }
  }

  deleteProject(): void {
    if (this.project?.id) {
      this.projectService.deleteProject(this.project.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
