import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'monorepo-take-home-test-button',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  constructor(private router: Router) {}

  redirectToProjectForm() {
    this.router.navigate(['/project-form']);
  }
}
