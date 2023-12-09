import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../projects/projects.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'monorepo-take-home-test-ui',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, ButtonComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent {}
