/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Priority, Project } from '@prisma/client';
import { ProjectsService } from '../projects.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidationErrors, UntypedFormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'monorepo-take-home-test-updateproject',
 standalone: true,
 imports: [CommonModule,ReactiveFormsModule],
 templateUrl: './updateproject.component.html',
 styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit {
 projects: Project[] = [];
 priorities = Object.keys(Priority);
 projectId!: string;

 constructor(
    private route: Router,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    // private toaster: ToastrService
 ) {}

 ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.getProjectDetails(this.projectId);

 }

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
 getProjectDetails(id: string) {
  this.projectService.getProjectById(id).subscribe(
    (project: Project) => {
      // Check if the retrieved priority matches the enum values
      const isValidPriority = Object.values(Priority).includes(project.priority);

      // Patch the form if the priority is valid, otherwise, set to default
      if (isValidPriority) {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
        });
      } else {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          priority: Priority.LOW, // Set to a default value if priority is invalid
        });
      }
    },
    (error: any) => {
      console.error('Error retrieving project details:', error);
    }
  );
}


 updateProject() {
    if (this.projectForm.invalid) {
      // this.toaster.error('Please fill all the fields', 'Error', { closeButton: true, progressBar: true });
      return;
    }

    const { title, description, priority } = this.projectForm.value;
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Priority:', priority);

    const selectedPriority: Priority = priority || Priority.LOW;

    this.projectService.updateProject(this.projectId, { title, description, priority: selectedPriority })
      .subscribe(
        () => {
          this.route.navigate(['']);
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
 }
}
