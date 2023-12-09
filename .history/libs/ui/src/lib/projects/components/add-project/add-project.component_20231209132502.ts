import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Ensure this import statement is present
import { CommonModule } from '@angular/common';
import { Priority, Project } from '@prisma/client';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AddProjectService } from '../../services/add-project.service';

@Component({
  selector: 'monorepo-take-home-test-add-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})



export class AddProjectComponent implements OnInit{

  projectForm!: FormGroup;
  priorities = Object.values(Priority);
  projects: Project[] = [];

  constructor(private formBuilder: FormBuilder, 
              private _addProjectService: AddProjectService,
              private router: Router
             ) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]
    });

    
  }

  onSubmit = (): void => {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      // Call your service method to add the project
      this._addProjectService.addProject(formData).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your project has been saved',
          showConfirmButton: false,
          timer: 1500
        });
        // Reset the form after successful submission
        this.projectForm.reset();
        // Navigate to another route after successful submission
        this.router.navigateByUrl('/');
      }, (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to save project',
          text: 'An error occurred while saving the project',
          showConfirmButton: true
        });
      });
    } else {
      // Form is invalid, display error or perform other actions
    }
  }
}