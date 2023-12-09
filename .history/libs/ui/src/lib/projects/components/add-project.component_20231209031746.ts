import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  maxOrder: number = 0; // Initialize with default value

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

  onSubmit() {
    // Your form submission logic here
  }
}
