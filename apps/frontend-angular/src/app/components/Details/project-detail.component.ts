import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ProjectService } from '../../project.service';
import { Project } from '@prisma/client';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['../../../styles.css'],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((project) => {
        this.project = project;
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          priority: project.priority,
        });
      });
    }
  }

  editProject(): void {
  if (this.project?.id) {
    this.projectService.updateProject(this.project.id, this.projectForm.value).subscribe(() => {
      this.router.navigate(['projects', this.project!.id]);
    });
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
