import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from '../header.service';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsService } from 'libs/ui/src/lib/projects.service';

@Component({
  selector: 'monorepo-take-home-test-creation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './creation-form.component.html',
  styleUrl: './creation-form.component.css',
})
export class CreationFormComponent {
  private API_URL = 'http://localhost:3333/api';
  private subscription: Subscription;
  showCreationForm = false;
  creationForm: FormGroup;
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  selectedPriority: string | null = null;

  constructor(
    private headerService: HeaderService,
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public projectService: ProjectsService
  ) {
    this.subscription = this.headerService
      .getCreationFormVisibility()
      .subscribe((value) => {
        this.showCreationForm = value;
      });

    this.creationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createProject(): void {
    if (this.creationForm.valid) {
      const formData = this.creationForm.value;
      // Handle the priority value from the form here
      const priorityValue = formData.priority; // This will contain 'HIGH', 'MEDIUM', or 'LOW'

      // Prepare the data to send
      const projectData = {
        ...formData,
        priority: priorityValue,
      };

      this.http.post(`${this.API_URL}/project/create`, projectData).subscribe(
        (response) => {
          console.log(response);
          // Upon successful creation, reset form and hide it
          this.creationForm.reset();
          // this.showCreationForm = false;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error response here
        }
      );

      console.log('project created', formData);
    } else {
      console.log('data required');
    }
  }
}
