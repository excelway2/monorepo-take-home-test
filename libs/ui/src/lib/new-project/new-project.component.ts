import { Component } from '@angular/core';
import { Priority, Project } from '../models/project';
import { FormGroup, FormControl, Validators, UntypedFormControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
// import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-take-home-test-new-project',
  standalone: true,
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  // providers: [ToastrService]
})
export class NewProjectComponent {
  projects: Project[] = [];
  priorities = Object.keys(Priority);

  constructor(
    private route: Router,
    private projectService: ProjectsService,
    // private toaster: ToastrService
  ) {}

  projectForm = new FormGroup({
    title: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    description: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25),
      Validators.pattern('[a-zA-Z0-9 ]*')
    ]),
    priority: new FormControl(Priority.LOW, [Validators.required, this.priorityValidator.bind(this)])
  });

  priorityValidator(control: FormControl): ValidationErrors | null {
    const validPriorities = Object.values(Priority).filter(p => typeof p === 'string');
    return validPriorities.includes(control.value) ? null : { invalidPriority: true };
  }

  addProject() {
    if (this.projectForm.invalid) {
      // this.toaster.error('Please fill all the fields', 'Error', { closeButton: true, progressBar: true });
      return;
    }
  
    const { title, description, priority } = this.projectForm.value;
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Priority:', priority);

    const selectedPriority: Priority = priority || Priority.LOW;
  
    this.projectService.persistProject({ title, description, priority: selectedPriority })
  .subscribe(
    (response: any) => {
      this.projects = [response, ...this.projects];
      console.log(this.projects);
      this.route.navigate(['projects']);
    },
    (error: any) => {
      console.error('Error occurred:', error);
    }
  );
  }

 
  
}
