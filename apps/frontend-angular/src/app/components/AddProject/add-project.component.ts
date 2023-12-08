import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['../../../styles.css'],
})
export class AddProjectComponent {
  projectForm: FormGroup;

  constructor(private router: Router, private projectService: ProjectService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [''],
    });
  }

  addProject(): void {
    this.projectService.createProject(this.projectForm.value).subscribe((newProject) => {
      this.router.navigate(['projects', newProject.id]);
    });
  }
}
