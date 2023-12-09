import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Ensure this import statement is present
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../projects.service';
import { Priority } from '@prisma/client';
import Swal from 'sweetalert2';

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

  constructor(private formBuilder: FormBuilder, 
              private projectsService: ProjectsService,
              
              
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
      this.projectsService.addProject(formData).subscribe(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        // Reset the form after successful submission
      this.projectForm.reset();
      }, (error) => {
        // Handle error  
      });
    } else {
      // Form is invalid, display error or perform other actions
    }
  }
}