import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '@prisma/client';

@Component({
  selector: 'monorepo-take-home-test-edit-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit{

  projectForm!: FormGroup;
  project!: Project;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
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
}
