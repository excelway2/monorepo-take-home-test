import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../lib-components/projects/projects.component';
import { ButtonComponent } from '../lib-components/button/button.component';
import { ProjectFormComponent } from '../lib-components/project-form/project-form.component';

@Component({
  selector: 'monorepo-take-home-test-ui',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, ButtonComponent, ProjectFormComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent {}
