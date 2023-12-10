import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Project } from '@prisma/client';
import { ProjectsService } from 'libs/ui/src/lib/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent {
  $project: Observable<Project> | undefined;
  projectId: string | null = null;
  projectForm: FormGroup;
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  selectedPriority: string | null = null;

  constructor(
    public projectsService: ProjectsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.projectId = params.get('id');
          return this.projectsService.getProjectById(this.projectId!);
        })
      )
      .subscribe((project: Project) => {
        this.patchFormValues(project);
      });
  }

  patchFormValues(project: Project): void {
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      priority: project.priority,
      order: project.order,
    });
  }

  onEdit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      this.projectsService.updateProject(this.projectId, {
        ...this.projectForm.value,
        updatedAt: new Date(),
      });
      this.router.navigate(['']);
    } else {
      // Handle invalid form
      console.log('invalid form');
    }
  }
}
