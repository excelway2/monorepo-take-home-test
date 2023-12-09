import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Ensure this import statement is present
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'monorepo-take-home-test-add-project',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent implements OnInit{

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      order: [0, Validators.min(0)],
      priority: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
