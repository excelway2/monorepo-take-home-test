import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority, Project } from '@prisma/client';
import { EditProjectService } from '../../services/edit-project.service';
import Swal from 'sweetalert2';
import { ProjectsService } from '../../../projects.service';

@Component({
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit{

  projectForm!: FormGroup;
  project!: Project;
  priorities = Object.values(Priority);
  projects!: Project[]

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _editProjectService: EditProjectService,
    private router: Router,
  ) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.initializeForm();
    this.getProjectById();
  }

  private initializeForm(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required], // Add validators as needed
      priority: ['', Validators.required] // Add validators as needed
      // Add other form fields based on your project model
    });
  }

  private patchFormWithData(): void {
    if (this.project) {
      this.projectForm.patchValue({
        title: this.project.title,
        description: this.project.description,
        order: this.project.order,
        priority: this.project.priority
      });
    }
  }

  private getProjectById(): void {
    // Get project id from url
    const projectId = this.route.snapshot.paramMap.get('id'); 
    if (projectId) {
      this._editProjectService.getProjectById(projectId).subscribe((project: Project) => {
        this.project = project;
        this.patchFormWithData();
      });
    }
  }

  checkExistanceOfOrder(): void {
    if (this.projectForm.valid) {
      const updatedData = this.projectForm.value;
  
      // Get all projects to check if the order exists
      this._editProjectService.getAllProjects().subscribe((projects) => {
        const orderExists = projects.some((project) => project.order === updatedData.order);
  
        if (orderExists) {
          // Display a warning message or take appropriate action for existing order
          Swal.fire({
            title: 'Order Already Exists',
            text: 'The order you want to set already exists in ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              this.executeUpdate(updatedData);
            }
          });
        } else {
          this.executeUpdate(updatedData);
        }
      });
    }
  }
  
  private executeUpdate(updatedData: any): void {
    this._editProjectService.updateProject(this.project.id, updatedData).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your project has been updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/');
    }, (error) => {
      // Handle error
    });
  }
  
  
}
