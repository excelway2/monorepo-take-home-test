import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../projects/projects.component';
import { NavbarComponent } from '../projects/components/shared/navbar/navbar.component';

@Component({
  selector: 'monorepo-take-home-test-ui',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, NavbarComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent {}
