/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary Angular modules and dependencies
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority, Project } from '@prisma/client';
import { EditProjectService } from '../../services/edit-project.service';
import Swal from 'sweetalert2';

@Component({
  // Component selector and standalone mode
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,

  // Module imports for the component
  imports: [CommonModule, ReactiveFormsModule],

  // Component's HTML and CSS files
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit {
  // Initialize form group and project variables
  projectForm!: FormGroup;
  project!: Project;
  priorities = Object.values(Priority);
  projects!: Project[];

  constructor(
    // Angular services and dependencies injected via constructor
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _editProjectService: EditProjectService,
    private router: Router,
  ) {}

  // Initialize component on initialization
  ngOnInit(): void {
    this.initializeForm();
    this.getProjectById();
  }

  // Initialize form group with validators
  private initializeForm(): void {
    // Initialize form fields with validators
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  // Patch form data with project details
  private patchFormWithData(): void {
    if (this.project) {
      this.projectForm.patchValue({
        title: this.project.title,
        description: this.project.description,
        order: this.project.order,
        priority: this.project.priority,
      });
    }
  }

  // Get project details by ID from the service
  private getProjectById(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this._editProjectService.getProjectById(projectId).subscribe((project: Project) => {
        this.project = project;
        this.patchFormWithData();
      });
    }
  }

  // Check for existence of order before updating
  checkExistanceOfOrder(): void {
    if (this.projectForm.valid) {
      const updatedData = this.projectForm.value;

      // Get all projects to check if the order exists
      this._editProjectService.getAllProjects().subscribe((projects) => {
        const orderExists = projects.some((project) => {
          return project.order === updatedData.order && project.id !== updatedData.id;
        });

        // Display warning message or proceed with update based on order existence
        if (orderExists && updatedData.order !== this.project.order) {
          Swal.fire({
            // SweetAlert notification for existing order
            title: 'Order Already Exists',
            text: 'The order you want to set already exists in other projects.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            cancelButtonText: 'Cancel',
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

  // Execute the project update after checks
  private executeUpdate(updatedData: any): void {
    this._editProjectService.updateProject(this.project.id, updatedData).subscribe(
      // Success notification on successful update
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your project has been updated',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/');
      },
      // Error handling for update failure with appropriate notifications
      (error) => {
        if (error.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Project not found. Please try again.',
            confirmButtonText: 'OK',
          });
        } else if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Invalid data. Please provide valid information.',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'An error occurred while updating the project. Please try again later.',
            confirmButtonText: 'OK',
          });
        }
      }
    );
  }
}
