import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Ensure this import statement is present
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'monorepo-take-home-test-add-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent implements OnInit{
  projectForm: FormGroup;
  maxOrder: number = 0;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      order: [null, Validators.required], // Set initial value as null
      priority: ['', Validators.required]
    });

    // Fetch the maximum order from the projects
    this.projectsService.getAllProjects().subscribe(projects => {
      this.maxOrder = Math.max(...projects.map(project => project.order));
      this.projectForm.get('order').setValidators([Validators.required, Validators.min(this.maxOrder + 1)]);
      this.projectForm.get('order').updateValueAndValidity();
    });
  }

  onSubmit = (): void => {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      // Call your service method to add the project
      this.projectsService.addProject(formData).subscribe(() => {
        // Handle success or navigate to another page
      }, (error) => {
        // Handle error  
      });
    } else {
      // Form is invalid, display error or perform other actions
    }
  }
}
